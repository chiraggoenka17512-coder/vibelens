import { CodebaseEdge, CodebaseNode } from "../../types/graph";
import { CityLayout, CityBuilding } from "./types";

export interface ReachabilityArc {
  edgeId: string;
  sourceId: string;
  targetId: string;
  start: [number, number, number];
  end: [number, number, number];
  control: [number, number, number];
  isVulnerablePath: boolean;
}

/**
 * Resolves on-demand reachability path.
 * 
 * Invariants:
 * 1. Returns empty array if no node is selected or selected node is not vulnerable.
 * 2. Uses existing scan edges and reachability flags (never recomputes reachability graph).
 * 3. Draws ONLY the entry-point path to the selected vulnerable node and nothing else.
 */
export function getOnDemandReachabilityArcs(
  selectedNodeId: string | null,
  nodes: CodebaseNode[],
  edges: CodebaseEdge[],
  layout: CityLayout
): ReachabilityArc[] {
  if (!selectedNodeId) return [];

  const targetNode = nodes.find((n) => n.id === selectedNodeId);
  if (!targetNode) return [];

  // A node is vulnerable ONLY if it has reachable CVEs or contains vulnerable functions
  const isVulnerable =
    (targetNode.metrics?.reachableCVEs || 0) > 0 ||
    Boolean(
      targetNode.functions?.some(
        (f) => f.isVulnerable || (f.cves && f.cves.length > 0)
      )
    );

  if (!isVulnerable) {
    // Non-vulnerable selection -> 0 edges drawn
    return [];
  }

  // Find pre-computed entry path edges leading to this target
  const relevantEdges = edges.filter(
    (e) => (e.target === selectedNodeId || e.isEntryPath) && (e.target === selectedNodeId || e.source === selectedNodeId || e.isEntryPath)
  );

  // If no explicitly tagged entry path edge, find direct incoming edge from an entrypoint
  const pathEdges: CodebaseEdge[] = [];
  const directEdge = relevantEdges.find((e) => e.target === selectedNodeId);
  if (directEdge) {
    pathEdges.push(directEdge);
    // If incoming source also has an entrypath edge leading to it, include it
    const upstreamEdge = edges.find((e) => e.target === directEdge.source && e.isEntryPath);
    if (upstreamEdge) {
      pathEdges.unshift(upstreamEdge);
    }
  } else {
    const entryEdge = edges.find((e) => e.isEntryPath);
    if (entryEdge) pathEdges.push(entryEdge);
  }

  const buildingMap = new Map<string, CityBuilding>();
  for (const b of layout.buildings) {
    buildingMap.set(b.nodeId, b);
  }

  const arcs: ReachabilityArc[] = [];

  for (const edge of pathEdges) {
    const srcBldg = buildingMap.get(edge.source);
    const tgtBldg = buildingMap.get(edge.target);

    if (srcBldg && tgtBldg) {
      const startX = srcBldg.x + srcBldg.width / 2;
      const startY = srcBldg.height + 0.5;
      const startZ = srcBldg.z + srcBldg.depth / 2;

      const endX = tgtBldg.x + tgtBldg.width / 2;
      const endY = tgtBldg.height + 0.5;
      const endZ = tgtBldg.z + tgtBldg.depth / 2;

      const midX = (startX + endX) / 2;
      const midZ = (startZ + endZ) / 2;
      const dist = Math.hypot(endX - startX, endZ - startZ);
      const apexY = Math.max(startY, endY) + Math.min(30, Math.max(6, dist * 0.4));

      arcs.push({
        edgeId: edge.id,
        sourceId: edge.source,
        targetId: edge.target,
        start: [startX, startY, startZ],
        end: [endX, endY, endZ],
        control: [midX, apexY, midZ],
        isVulnerablePath: true,
      });
    }
  }

  return arcs;
}
