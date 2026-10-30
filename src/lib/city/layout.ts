import { CodebaseNode, CodebaseFunction } from "../../types/graph";
import {
  CityBuilding,
  CityDistrict,
  CityLayout,
  CityRoom,
  CityVisualState,
  TreemapRect,
} from "./types";

export const MIN_BUILDING_HEIGHT = 2;
export const MAX_BUILDING_HEIGHT = 45;
export const BASE_BUILDING_HEIGHT = 2;
export const DISTRICT_PADDING = 8;
export const DISTRICT_GUTTER = 16;
export const BUILDING_MARGIN = 1.2;

/**
 * Calculates building height proportional to lines of code with sqrt/log scale
 * and strict min/max clamp.
 */
export function calculateBuildingHeight(
  linesOfCode: number,
  mode: "sqrt" | "log" = "sqrt"
): number {
  const safeLines = Math.max(0, linesOfCode || 0);
  let computed: number;
  if (mode === "log") {
    computed = BASE_BUILDING_HEIGHT + Math.log2(safeLines + 1) * 3.5;
  } else {
    computed = BASE_BUILDING_HEIGHT + Math.sqrt(safeLines) * 1.2;
  }
  return Number(Math.min(MAX_BUILDING_HEIGHT, Math.max(MIN_BUILDING_HEIGHT, computed)).toFixed(2));
}

/**
 * Maps existing metrics to visual states.
 * Missing metrics default safely and are reported in CHANGES.md.
 */
export function getNodeVisualStates(node: CodebaseNode): {
  primaryState: CityVisualState;
  activeStates: CityVisualState[];
} {
  const activeStates: CityVisualState[] = [];
  const m = node.metrics;

  const isVulnerable = m.reachableCVEs > 0;
  const isBroken = m.tests === "fail" || Boolean(m.errors && m.errors > 0) || Boolean(m.hasBuildFailure);
  const isUnderConstruction = Boolean(m.todosCount && m.todosCount > 0) || Boolean(m.isUnfinishedBranch) || Boolean(m.hasActiveSession);
  const isDimGhost = Boolean(m.isDeadCode) || m.reachability === "unreachable";

  if (isVulnerable) activeStates.push("vulnerable");
  if (isBroken) activeStates.push("broken");
  if (isUnderConstruction) activeStates.push("under-construction");
  if (isDimGhost) activeStates.push("dim-ghost");

  if (activeStates.length === 0) {
    activeStates.push("working");
  }

  // Primary state priority: vulnerable > broken > under-construction > dim-ghost > working
  let primaryState: CityVisualState = "working";
  if (activeStates.includes("vulnerable")) {
    primaryState = "vulnerable";
  } else if (activeStates.includes("broken")) {
    primaryState = "broken";
  } else if (activeStates.includes("under-construction")) {
    primaryState = "under-construction";
  } else if (activeStates.includes("dim-ghost")) {
    primaryState = "dim-ghost";
  }

  return { primaryState, activeStates };
}

/**
 * Implementation of the Squarified Treemap Algorithm (Bruls, Huizing, van Wijk).
 * Ensures aspect ratios close to 1 while respecting deterministic input order.
 */
interface TreemapItem {
  id: string;
  weight: number;
  data: CodebaseNode;
}

function computeSquarifiedTreemap(
  items: TreemapItem[],
  rect: TreemapRect
): Array<{ item: TreemapItem; rect: TreemapRect }> {
  if (items.length === 0) return [];
  if (items.length === 1) {
    return [{ item: items[0], rect }];
  }

  const totalWeight = items.reduce((acc, curr) => acc + curr.weight, 0);
  if (totalWeight <= 0) return [];

  const results: Array<{ item: TreemapItem; rect: TreemapRect }> = [];
  let currentRect = { ...rect };
  let remaining = [...items];

  while (remaining.length > 0) {
    const isWider = currentRect.width >= currentRect.depth;
    const side = isWider ? currentRect.depth : currentRect.width;

    const row: TreemapItem[] = [remaining[0]];
    let remainingSub = remaining.slice(1);

    function worstAspect(rowItems: TreemapItem[], sideLength: number, totalRemainingWeight: number): number {
      if (sideLength <= 0) return Infinity;
      const rowWeight = rowItems.reduce((s, i) => s + i.weight, 0);
      const rowFraction = rowWeight / totalRemainingWeight;
      const rowBreadth = (isWider ? currentRect.width : currentRect.depth) * rowFraction;
      if (rowBreadth <= 0) return Infinity;

      let worst = 0;
      for (const it of rowItems) {
        const itemFraction = it.weight / rowWeight;
        const itemLength = sideLength * itemFraction;
        const aspect = Math.max(itemLength / rowBreadth, rowBreadth / itemLength);
        if (aspect > worst) worst = aspect;
      }
      return worst;
    }

    const currentRemWeight = remaining.reduce((s, i) => s + i.weight, 0);

    while (remainingSub.length > 0) {
      const candidate = remainingSub[0];
      const currentWorst = worstAspect(row, side, currentRemWeight);
      const nextWorst = worstAspect([...row, candidate], side, currentRemWeight);

      if (nextWorst <= currentWorst) {
        row.push(candidate);
        remainingSub.shift();
      } else {
        break;
      }
    }

    // Lay out the current row
    const rowWeight = row.reduce((s, i) => s + i.weight, 0);
    const rowFraction = rowWeight / currentRemWeight;

    if (isWider) {
      const rowWidth = currentRect.width * rowFraction;
      let currZ = currentRect.z;
      for (const it of row) {
        const itFraction = it.weight / rowWeight;
        const itDepth = currentRect.depth * itFraction;
        results.push({
          item: it,
          rect: {
            x: currentRect.x,
            z: currZ,
            width: rowWidth,
            depth: itDepth,
          },
        });
        currZ += itDepth;
      }
      currentRect.x += rowWidth;
      currentRect.width -= rowWidth;
    } else {
      const rowDepth = currentRect.depth * rowFraction;
      let currX = currentRect.x;
      for (const it of row) {
        const itFraction = it.weight / rowWeight;
        const itWidth = currentRect.width * itFraction;
        results.push({
          item: it,
          rect: {
            x: currX,
            z: currentRect.z,
            width: itWidth,
            depth: rowDepth,
          },
        });
        currX += itWidth;
      }
      currentRect.z += rowDepth;
      currentRect.depth -= rowDepth;
    }

    remaining = remainingSub;
  }

  return results;
}

/**
 * Extracts folder path (district) from a file path.
 */
export function getDistrictPath(filePath: string): string {
  const normalized = filePath.replace(/\\/g, "/");
  const parts = normalized.split("/");
  if (parts.length <= 1) {
    return "(root)";
  }
  return parts.slice(0, -1).join("/");
}

/**
 * Computes deterministic room partitions for functions inside a building.
 */
function computeBuildingRooms(
  funcs: CodebaseFunction[] | undefined,
  buildingX: number,
  buildingZ: number,
  buildingWidth: number,
  buildingDepth: number,
  buildingHeight: number
): CityRoom[] {
  if (!funcs || funcs.length === 0) return [];

  // Deterministically sort functions by name and fingerprint
  const sortedFuncs = [...funcs].sort((a, b) => a.name.localeCompare(b.name));
  const count = sortedFuncs.length;
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);

  const roomWidth = (buildingWidth * 0.9) / cols;
  const roomDepth = (buildingDepth * 0.9) / rows;
  const startX = buildingX + buildingWidth * 0.05;
  const startZ = buildingZ + buildingDepth * 0.05;

  return sortedFuncs.map((f, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const roomHeight = calculateBuildingHeight(f.lines, "sqrt") * 0.35;

    return {
      id: f.id,
      name: f.name,
      astFingerprint: f.astFingerprint,
      functionData: f,
      x: Number((startX + col * roomWidth).toFixed(2)),
      z: Number((startZ + row * roomDepth).toFixed(2)),
      width: Number((roomWidth * 0.9).toFixed(2)),
      depth: Number((roomDepth * 0.9).toFixed(2)),
      height: Number(roomHeight.toFixed(2)),
      isVulnerable: Boolean(f.isVulnerable || f.reachability === "reachable"),
    };
  });
}

/**
 * Main Deterministic City Layout Generator
 * 
 * Invariants:
 * 1. Output is 100% deterministic: same nodes array produces exact identical coordinates.
 * 2. Unrelated files in other districts do NOT move existing buildings in their districts.
 * 3. Never uses force simulation.
 */
export function buildCityLayout(nodes: CodebaseNode[]): CityLayout {
  // Filter for file nodes only (functions are represented as rooms inside files)
  const fileNodes = nodes.filter((n) => n.type === "file" || !n.type);

  // Group files into districts by folder path
  const districtMap = new Map<string, CodebaseNode[]>();
  for (const node of fileNodes) {
    const distPath = getDistrictPath(node.path);
    if (!districtMap.has(distPath)) {
      districtMap.set(distPath, []);
    }
    districtMap.get(distPath)!.push(node);
  }

  // Deterministically sort district paths alphabetically
  const sortedDistrictPaths = Array.from(districtMap.keys()).sort((a, b) => a.localeCompare(b));

  const districts: CityDistrict[] = [];
  const buildings: CityBuilding[] = [];

  // Deterministic grid arrangement for districts
  // Using fixed 6 columns so adding files or folders never causes column count shifts
  const gridColumns = 6;
  const defaultDistrictSize = 60;

  sortedDistrictPaths.forEach((distPath, index) => {
    const dFiles = districtMap.get(distPath)!;

    // Deterministically sort files within district by path
    const sortedFiles = [...dFiles].sort((a, b) => a.path.localeCompare(b.path));

    // Dynamic district size based on file count, with standard minimum
    const filesCount = sortedFiles.length;
    const districtDimension = Math.max(
      defaultDistrictSize,
      Math.ceil(Math.sqrt(filesCount)) * 14
    );

    const col = index % gridColumns;
    const row = Math.floor(index / gridColumns);

    const districtX = col * (defaultDistrictSize + DISTRICT_GUTTER * 2);
    const districtZ = row * (defaultDistrictSize + DISTRICT_GUTTER * 2);

    // Compute aggregated states for the district
    const districtStatesSet = new Set<CityVisualState>();

    // Prepare items for squarified treemap
    // Each building has weight based on lines of code (with minimum weight so small files have clear footprint)
    const treemapItems: TreemapItem[] = sortedFiles.map((file) => ({
      id: file.id,
      weight: Math.max(8, file.metrics?.lines || 10),
      data: file,
    }));

    // Area inside district margins
    const innerRect: TreemapRect = {
      x: districtX + DISTRICT_PADDING,
      z: districtZ + DISTRICT_PADDING,
      width: districtDimension - DISTRICT_PADDING * 2,
      depth: districtDimension - DISTRICT_PADDING * 2,
    };

    const laidOutCells = computeSquarifiedTreemap(treemapItems, innerRect);

    laidOutCells.forEach(({ item, rect }) => {
      const fileNode = item.data;
      const { primaryState, activeStates } = getNodeVisualStates(fileNode);

      for (const st of activeStates) {
        districtStatesSet.add(st);
      }

      const buildingWidth = Math.max(2, rect.width - BUILDING_MARGIN);
      const buildingDepth = Math.max(2, rect.depth - BUILDING_MARGIN);
      const buildingHeight = calculateBuildingHeight(fileNode.metrics.lines);

      const buildingX = rect.x + BUILDING_MARGIN / 2;
      const buildingZ = rect.z + BUILDING_MARGIN / 2;

      const rooms = computeBuildingRooms(
        fileNode.functions,
        buildingX,
        buildingZ,
        buildingWidth,
        buildingDepth,
        buildingHeight
      );

      buildings.push({
        id: `bldg_${fileNode.id}`,
        nodeId: fileNode.id,
        filePath: fileNode.path,
        fileName: fileNode.name,
        node: fileNode,
        districtId: `dist_${distPath}`,
        districtPath: distPath,
        x: Number(buildingX.toFixed(2)),
        z: Number(buildingZ.toFixed(2)),
        width: Number(buildingWidth.toFixed(2)),
        depth: Number(buildingDepth.toFixed(2)),
        height: buildingHeight,
        primaryState,
        activeStates,
        rooms,
      });
    });

    districts.push({
      id: `dist_${distPath}`,
      name: distPath === "(root)" ? "Root District" : distPath.split("/").pop() || distPath,
      path: distPath,
      x: Number(districtX.toFixed(2)),
      z: Number(districtZ.toFixed(2)),
      width: Number(districtDimension.toFixed(2)),
      depth: Number(districtDimension.toFixed(2)),
      fileCount: filesCount,
      states: Array.from(districtStatesSet),
    });
  });

  // Calculate layout bounds
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const d of districts) {
    if (d.x < minX) minX = d.x;
    if (d.x + d.width > maxX) maxX = d.x + d.width;
    if (d.z < minZ) minZ = d.z;
    if (d.z + d.depth > maxZ) maxZ = d.z + d.depth;
  }

  if (districts.length === 0) {
    minX = maxX = minZ = maxZ = 0;
  }

  return {
    districts,
    buildings,
    bounds: {
      minX: Number(minX.toFixed(2)),
      maxX: Number(maxX.toFixed(2)),
      minZ: Number(minZ.toFixed(2)),
      maxZ: Number(maxZ.toFixed(2)),
      width: Number((maxX - minX).toFixed(2)),
      depth: Number((maxZ - minZ).toFixed(2)),
    },
  };
}
