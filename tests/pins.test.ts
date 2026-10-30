import { describe, it, expect } from "vitest";
import { resolvePins } from "../src/lib/city/pins";
import { buildCityLayout } from "../src/lib/city/layout";
import { CodebaseNode, Pin } from "../src/types/graph";

describe("Pins and Comments Anchor & Orphan Mechanics", () => {
  const nodes: CodebaseNode[] = [
    {
      id: "src/utils/formatDate.ts",
      name: "formatDate.ts",
      path: "src/utils/formatDate.ts",
      type: "file",
      metrics: {
        lines: 30,
        complexity: 3,
        duplication: 0,
        reachableCVEs: 0,
        totalCVEs: 0,
        tests: "pass",
        reachability: "reachable",
      },
      functions: [
        {
          id: "fn_formatDate",
          name: "formatDate",
          astFingerprint: "fp_fmt_date_123",
          lines: 15,
          reachability: "reachable",
        },
      ],
    },
    {
      id: "src/api/checkout.ts",
      name: "checkout.ts",
      path: "src/api/checkout.ts",
      type: "file",
      metrics: {
        lines: 55,
        complexity: 8,
        duplication: 0,
        reachableCVEs: 1,
        totalCVEs: 1,
        tests: "pass",
        reachability: "reachable",
      },
    },
  ];

  it("Acceptance Check 3: Anchors pins to building and matching function fingerprint", () => {
    const layout = buildCityLayout(nodes);

    const pins: Pin[] = [
      {
        id: "pin-1",
        filePath: "src/utils/formatDate.ts",
        functionFingerprint: "fp_fmt_date_123",
        title: "Check date edge case",
        comment: "Ensure leap year handling",
        author: "Vihaan",
        createdAt: "2026-10-30",
      },
      {
        id: "pin-2",
        filePath: "src/api/checkout.ts",
        title: "Reachable CVE Risk",
        comment: "Check token expiration",
        author: "Rajveer",
        createdAt: "2026-10-30",
      },
    ];

    const { resolvedPins, orphanedCount, anchoredCount } = resolvePins(pins, layout);

    expect(anchoredCount).toBe(2);
    expect(orphanedCount).toBe(0);

    const pin1 = resolvedPins.find((p) => p.id === "pin-1")!;
    expect(pin1.orphaned).toBe(false);
    expect(pin1.buildingId).toBe("bldg_src/utils/formatDate.ts");
    expect(pin1.targetName).toContain("formatDate()");

    const pin2 = resolvedPins.find((p) => p.id === "pin-2")!;
    expect(pin2.orphaned).toBe(false);
    expect(pin2.buildingId).toBe("bldg_src/api/checkout.ts");
  });

  it("Acceptance Check 3 (Orphaned): If file is renamed/moved, pin is marked orphaned rather than hidden", () => {
    const layout = buildCityLayout(nodes);

    const pinsWithRenamed: Pin[] = [
      {
        id: "pin-old",
        filePath: "src/utils/legacyDateParser.ts", // File was renamed/removed
        title: "Old deprecation note",
        comment: "Was attached to legacyDateParser",
        author: "Chirag",
        createdAt: "2026-10-29",
      },
    ];

    const { resolvedPins, orphanedCount, anchoredCount } = resolvePins(pinsWithRenamed, layout);

    expect(anchoredCount).toBe(0);
    expect(orphanedCount).toBe(1);

    const orphanPin = resolvedPins[0];
    expect(orphanPin.orphaned).toBe(true);
    expect(orphanPin.targetName).toContain("ORPHANED");
    expect(orphanPin.x).toBeLessThan(layout.bounds.minX); // Placed in perimeter staging dock
  });
});
