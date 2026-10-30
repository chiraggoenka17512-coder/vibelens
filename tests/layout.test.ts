import { describe, it, expect } from "vitest";
import {
  buildCityLayout,
  calculateBuildingHeight,
  getNodeVisualStates,
  MIN_BUILDING_HEIGHT,
  MAX_BUILDING_HEIGHT,
} from "../src/lib/city/layout";
import { CodebaseNode } from "../src/types/graph";

function createMockNode(path: string, lines: number, overrides: Partial<CodebaseNode["metrics"]> = {}): CodebaseNode {
  const parts = path.split("/");
  const name = parts[parts.length - 1];
  return {
    id: path,
    name,
    path,
    type: "file",
    metrics: {
      lines,
      complexity: 5,
      duplication: 0,
      reachableCVEs: 0,
      totalCVEs: 0,
      tests: "pass",
      reachability: "reachable",
      ...overrides,
    },
  };
}

describe("City Layout & Building Height Scale", () => {
  it("computes building height with sqrt and log scale, clamped between MIN and MAX", () => {
    // Zero LOC -> MIN_BUILDING_HEIGHT
    expect(calculateBuildingHeight(0)).toBe(MIN_BUILDING_HEIGHT);
    expect(calculateBuildingHeight(-5)).toBe(MIN_BUILDING_HEIGHT);

    // Monotonic scaling
    const h10 = calculateBuildingHeight(10);
    const h100 = calculateBuildingHeight(100);
    const h1000 = calculateBuildingHeight(1000);

    expect(h10).toBeGreaterThan(MIN_BUILDING_HEIGHT);
    expect(h100).toBeGreaterThan(h10);
    expect(h1000).toBeGreaterThan(h100);

    // Clamped at MAX_BUILDING_HEIGHT for huge files
    expect(calculateBuildingHeight(50000)).toBe(MAX_BUILDING_HEIGHT);

    // Log scale mode
    const hLog10 = calculateBuildingHeight(10, "log");
    const hLog100 = calculateBuildingHeight(100, "log");
    expect(hLog100).toBeGreaterThan(hLog10);
    expect(calculateBuildingHeight(100000, "log")).toBe(MAX_BUILDING_HEIGHT);
  });

  it("Acceptance Check 1: Scanning the same repo twice produces an identical city layout", () => {
    const nodes: CodebaseNode[] = [
      createMockNode("src/components/Header.tsx", 85),
      createMockNode("src/components/Button.tsx", 42),
      createMockNode("src/components/Card.tsx", 110),
      createMockNode("src/lib/api.ts", 250),
      createMockNode("src/lib/auth.ts", 180),
      createMockNode("src/utils/date.ts", 35),
    ];

    const layout1 = buildCityLayout(nodes);
    const layout2 = buildCityLayout(nodes);

    expect(layout1).toEqual(layout2);
    expect(layout1.buildings.length).toBe(6);
    expect(layout1.districts.length).toBe(3);

    // Deep compare coordinates
    for (let i = 0; i < layout1.buildings.length; i++) {
      const b1 = layout1.buildings[i];
      const b2 = layout2.buildings[i];
      expect(b1.id).toBe(b2.id);
      expect(b1.x).toBe(b2.x);
      expect(b1.z).toBe(b2.z);
      expect(b1.width).toBe(b2.width);
      expect(b1.depth).toBe(b2.depth);
      expect(b1.height).toBe(b2.height);
    }
  });

  it("Acceptance Check 2: Adding an unrelated file does not move existing buildings", () => {
    const baseNodes: CodebaseNode[] = [
      createMockNode("src/components/Header.tsx", 80),
      createMockNode("src/components/Button.tsx", 40),
      createMockNode("src/lib/api.ts", 200),
      createMockNode("src/utils/date.ts", 30),
    ];

    const layoutBefore = buildCityLayout(baseNodes);

    // Add an unrelated file in another directory (e.g. src/utils/format.ts or fixtures/sample.ts)
    const nodesWithUnrelated = [
      ...baseNodes,
      createMockNode("src/utils/format.ts", 55),
    ];

    const layoutAfter = buildCityLayout(nodesWithUnrelated);

    // Buildings in src/components must remain in the EXACT same position and footprint
    const headerBefore = layoutBefore.buildings.find((b) => b.filePath === "src/components/Header.tsx")!;
    const headerAfter = layoutAfter.buildings.find((b) => b.filePath === "src/components/Header.tsx")!;
    const buttonBefore = layoutBefore.buildings.find((b) => b.filePath === "src/components/Button.tsx")!;
    const buttonAfter = layoutAfter.buildings.find((b) => b.filePath === "src/components/Button.tsx")!;

    expect(headerAfter.x).toBe(headerBefore.x);
    expect(headerAfter.z).toBe(headerBefore.z);
    expect(headerAfter.width).toBe(headerBefore.width);
    expect(headerAfter.depth).toBe(headerBefore.depth);

    expect(buttonAfter.x).toBe(buttonBefore.x);
    expect(buttonAfter.z).toBe(buttonBefore.z);
    expect(buttonAfter.width).toBe(buttonBefore.width);
    expect(buttonAfter.depth).toBe(buttonBefore.depth);

    // Buildings in src/lib must also remain in the exact same position
    const apiBefore = layoutBefore.buildings.find((b) => b.filePath === "src/lib/api.ts")!;
    const apiAfter = layoutAfter.buildings.find((b) => b.filePath === "src/lib/api.ts")!;

    expect(apiAfter.x).toBe(apiBefore.x);
    expect(apiAfter.z).toBe(apiBefore.z);
    expect(apiAfter.width).toBe(apiBefore.width);
    expect(apiAfter.depth).toBe(apiBefore.depth);
  });

  it("maps visual states correctly across working, broken, under construction, vulnerable, and dim-ghost", () => {
    const workingNode = createMockNode("src/working.ts", 50, { tests: "pass" });
    const { primaryState: pWork, activeStates: aWork } = getNodeVisualStates(workingNode);
    expect(pWork).toBe("working");
    expect(aWork).toContain("working");

    const brokenNode = createMockNode("src/broken.ts", 50, { tests: "fail", errors: 3 });
    const { primaryState: pBroken, activeStates: aBroken } = getNodeVisualStates(brokenNode);
    expect(pBroken).toBe("broken");
    expect(aBroken).toContain("broken");

    const vulnerableNode = createMockNode("src/vuln.ts", 50, { reachableCVEs: 1 });
    const { primaryState: pVuln, activeStates: aVuln } = getNodeVisualStates(vulnerableNode);
    expect(pVuln).toBe("vulnerable");
    expect(aVuln).toContain("vulnerable");

    const underConstNode = createMockNode("src/todo.ts", 50, { todosCount: 4 });
    const { primaryState: pConst, activeStates: aConst } = getNodeVisualStates(underConstNode);
    expect(pConst).toBe("under-construction");
    expect(aConst).toContain("under-construction");

    const ghostNode = createMockNode("src/dead.ts", 50, { isDeadCode: true, reachability: "unreachable" });
    const { primaryState: pGhost, activeStates: aGhost } = getNodeVisualStates(ghostNode);
    expect(pGhost).toBe("dim-ghost");
    expect(aGhost).toContain("dim-ghost");

    // Dual states (e.g. vulnerable AND under construction)
    const dualNode = createMockNode("src/dual.ts", 50, { reachableCVEs: 2, todosCount: 3 });
    const { primaryState: pDual, activeStates: aDual } = getNodeVisualStates(dualNode);
    expect(pDual).toBe("vulnerable");
    expect(aDual).toContain("vulnerable");
    expect(aDual).toContain("under-construction");
  });
});
