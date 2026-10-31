import { describe, it, expect } from "vitest";
import { getOnDemandReachabilityArcs } from "../src/lib/city/reachability";
import { buildCityLayout } from "../src/lib/city/layout";
import { CodebaseEdge, CodebaseNode } from "../src/types/graph";

describe("On-Demand Reachability Arcs (Step 4 & Acceptance Check 4)", () => {
  const nodes: CodebaseNode[] = [
    {
      id: "app/api/checkout/route.ts",
      name: "route.ts",
      path: "app/api/checkout/route.ts",
      type: "file",
      metrics: {
        lines: 60,
        complexity: 4,
        duplication: 0,
        reachableCVEs: 0,
        totalCVEs: 0,
        tests: "pass",
        reachability: "reachable",
      },
    },
    {
      id: "node_modules/jsonwebtoken",
      name: "jsonwebtoken",
      path: "node_modules/jsonwebtoken",
      type: "file",
      metrics: {
        lines: 350,
        complexity: 12,
        duplication: 0,
        reachableCVEs: 1, // VULNERABLE REACHABLE CVE
        totalCVEs: 1,
        tests: "pass",
        reachability: "reachable",
      },
    },
    {
      id: "node_modules/lodash",
      name: "lodash",
      path: "node_modules/lodash",
      type: "file",
      metrics: {
        lines: 400,
        complexity: 15,
        duplication: 0,
        reachableCVEs: 0, // DEAD CODE
        totalCVEs: 3,
        tests: "pass",
        reachability: "unreachable",
      },
    },
    {
      id: "utils/formatDate.ts",
      name: "formatDate.ts",
      path: "utils/formatDate.ts",
      type: "file",
      metrics: {
        lines: 20,
        complexity: 2,
        duplication: 0,
        reachableCVEs: 0,
        totalCVEs: 0,
        tests: "pass",
        reachability: "reachable",
      },
    },
  ];

  const edges: CodebaseEdge[] = [
    {
      id: "edge-checkout-to-jwt",
      source: "app/api/checkout/route.ts",
      target: "node_modules/jsonwebtoken",
      type: "call",
      isEntryPath: true,
    },
    {
      id: "edge-checkout-to-formatDate",
      source: "app/api/checkout/route.ts",
      target: "utils/formatDate.ts",
      type: "call",
      isEntryPath: false,
    },
  ];

  const layout = buildCityLayout(nodes);

  it("Acceptance Check 4: By default (no selection), 0 edges are drawn", () => {
    const arcs = getOnDemandReachabilityArcs(null, nodes, edges, layout);
    expect(arcs).toEqual([]);
    expect(arcs.length).toBe(0);
  });

  it("Acceptance Check 4: When a non-vulnerable node is selected, 0 edges are drawn", () => {
    // Select formatDate.ts (non-vulnerable)
    const arcs = getOnDemandReachabilityArcs("utils/formatDate.ts", nodes, edges, layout);
    expect(arcs).toEqual([]);
    expect(arcs.length).toBe(0);
  });

  it("Acceptance Check 4: Selecting a vulnerable node draws its entry-point path and nothing else", () => {
    // Select jsonwebtoken (vulnerable node)
    const arcs = getOnDemandReachabilityArcs("node_modules/jsonwebtoken", nodes, edges, layout);

    // Exactly 1 arc path is drawn (from entrypoint to vulnerable node)
    expect(arcs.length).toBe(1);
    expect(arcs[0].sourceId).toBe("app/api/checkout/route.ts");
    expect(arcs[0].targetId).toBe("node_modules/jsonwebtoken");
    expect(arcs[0].isVulnerablePath).toBe(true);

    // Unrelated edges (e.g. edge-checkout-to-formatDate) are NOT drawn
    const otherEdge = arcs.find((a) => a.targetId === "utils/formatDate.ts");
    expect(otherEdge).toBeUndefined();
  });
});

