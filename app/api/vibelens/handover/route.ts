import { NextResponse } from "next/server";

export async function GET() {
  const handoverManifest = {
    $schema: "https://vibelens.dev/schemas/handover.v1.json",
    vibelens_version: "1.0.0",
    project: "vibelens-core",
    active_branch: "feat/ui-chirag",
    timestamp: new Date().toISOString(),
    token_footprint: 378,
    canonical_utilities: {
      formatDate: "utils/formatDate.ts#L8",
      getIsoTimestamp: "utils/formatDate.ts#L18",
    },
    architectural_invariants: {
      theme: "obsidian_cad (#060608)",
      palette: "4-tier pure hues (Red, Orange, Yellow, Emerald)",
      zero_gradients: true,
      strict_rules: [
        "100% JS/TS/React ecosystem only (no Python/Rust binaries)",
        "Never upload raw source code to external cloud servers",
        "Dynamic require() must be classified honestly as 'Unknown'",
        "Run local test suite before opening any GitHub PR",
      ],
    },
    blast_radius_locks: [
      "node_modules/jsonwebtoken (CRITICAL: 1 incoming caller via /api/checkout)",
      "app/api/checkout/route.ts (PUBLIC HTTP ENTRYPOINT)",
    ],
    reachable_cves: {
      total: 1,
      silenced_unreachable: 3,
      items: [
        {
          id: "CVE-2022-23529",
          package: "jsonwebtoken",
          entrypoint: "app/api/checkout/route.ts",
          status: "REACHABLE",
        },
      ],
    },
  };

  return NextResponse.json(handoverManifest, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
