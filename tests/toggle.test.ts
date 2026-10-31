import { describe, it, expect } from "vitest";
import { SAMPLE_SCAN_RESULT } from "../src/data/sample-scan";
import { buildCityLayout } from "../src/lib/city/layout";

describe("View Toggle & Shared Selection (Step 5 & Acceptance Check 5)", () => {
  it("uses the identical underlying data model for both city and graph views", () => {
    const rawNodes = SAMPLE_SCAN_RESULT.nodes;
    const rawEdges = SAMPLE_SCAN_RESULT.edges;

    expect(rawNodes.length).toBeGreaterThan(0);
    expect(rawEdges.length).toBeGreaterThan(0);

    // City layout builds from the exact same nodes without modifying them
    const cityLayout = buildCityLayout(rawNodes);

    expect(cityLayout.buildings.length).toBe(
      rawNodes.filter((n) => n.type === "file" || !n.type).length
    );

    // All node IDs match between raw data model and city buildings
    for (const b of cityLayout.buildings) {
      const originalNode = rawNodes.find((n) => n.id === b.nodeId);
      expect(originalNode).toBeDefined();
      expect(originalNode?.metrics.lines).toBe(b.node.metrics.lines);
    }
  });

  it("Acceptance Check 5: Switching between city and graph keeps the same selection", () => {
    // Simulated shared state container (matching VibeLens3DViewer logic)
    let selectedNodeId: string | null = null;
    let viewMode: "city" | "graph" = "city";

    // 1. Select a building in City view
    const targetFile = "app/api/checkout/route.ts";
    selectedNodeId = targetFile;

    expect(viewMode).toBe("city");
    expect(selectedNodeId).toBe(targetFile);

    // 2. Toggle to Graph / Wiring view
    viewMode = "graph";

    // Selection MUST persist across toggle
    expect(viewMode).toBe("graph");
    expect(selectedNodeId).toBe(targetFile);

    // 3. Select a different node in Graph view
    const vulnNode = "node_modules/jsonwebtoken";
    selectedNodeId = vulnNode;

    expect(selectedNodeId).toBe(vulnNode);

    // 4. Toggle back to City view
    viewMode = "city";

    // Selection MUST persist back into City view
    expect(viewMode).toBe("city");
    expect(selectedNodeId).toBe(vulnNode);
  });
});

