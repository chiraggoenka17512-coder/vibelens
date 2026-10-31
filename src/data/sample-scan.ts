import { ScanResult } from "../types/graph";

export const SAMPLE_SCAN_RESULT: ScanResult = {
  repo: "fixtures/sample-app",
  timestamp: "2026-10-30T23:30:00Z",
  nodes: [
    {
      id: "app/api/checkout/route.ts",
      name: "route.ts",
      path: "app/api/checkout/route.ts",
      type: "file",
      metrics: {
        lines: 65,
        complexity: 6,
        duplication: 0,
        reachableCVEs: 0,
        totalCVEs: 0,
        tests: "pass",
        reachability: "reachable",
      },
      functions: [
        {
          id: "fn_POST",
          name: "POST",
          astFingerprint: "fp_route_checkout_post",
          lines: 48,
          reachability: "reachable",
        },
      ],
    },
    {
      id: "utils/formatDate.ts",
      name: "formatDate.ts",
      path: "utils/formatDate.ts",
      type: "file",
      metrics: {
        lines: 24,
        complexity: 2,
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
          astFingerprint: "fp_format_date_canon",
          lines: 16,
          reachability: "reachable",
        },
      ],
    },
    {
      id: "helpers/parseDate.ts",
      name: "parseDate.ts",
      path: "helpers/parseDate.ts",
      type: "file",
      metrics: {
        lines: 24,
        complexity: 2,
        duplication: 92, // Duplicate AI Vibe Slop
        reachableCVEs: 0,
        totalCVEs: 0,
        tests: "pass",
        todosCount: 2,
        reachability: "unreachable",
      },
      functions: [
        {
          id: "fn_parseDate",
          name: "parseDate",
          astFingerprint: "fp_parse_date_dupe",
          lines: 16,
          reachability: "unreachable",
        },
      ],
    },
    {
      id: "node_modules/jsonwebtoken",
      name: "jsonwebtoken",
      path: "node_modules/jsonwebtoken",
      type: "file",
      metrics: {
        lines: 420,
        complexity: 18,
        duplication: 0,
        reachableCVEs: 1, // CRITICAL: Reachable attack vector
        totalCVEs: 1,
        tests: "pass",
        reachability: "reachable",
      },
      functions: [
        {
          id: "fn_jwt_sign",
          name: "sign",
          astFingerprint: "fp_jwt_sign",
          lines: 80,
          reachability: "reachable",
          isVulnerable: true,
          cves: ["CVE-2022-23529"],
        },
      ],
    },
    {
      id: "node_modules/lodash",
      name: "lodash",
      path: "node_modules/lodash",
      type: "file",
      metrics: {
        lines: 680,
        complexity: 24,
        duplication: 0,
        reachableCVEs: 0, // 0 reachable -> mathematically silenced phantom CVE
        totalCVEs: 4,
        tests: "pass",
        isDeadCode: true,
        reachability: "unreachable",
      },
    },
    {
      id: "src/broken-runner.ts",
      name: "broken-runner.ts",
      path: "src/broken-runner.ts",
      type: "file",
      metrics: {
        lines: 95,
        complexity: 9,
        duplication: 0,
        reachableCVEs: 0,
        totalCVEs: 0,
        tests: "fail", // BROKEN STATE
        errors: 3,
        reachability: "reachable",
      },
    },
  ],
  edges: [
    {
      id: "edge-checkout-jwt",
      source: "app/api/checkout/route.ts",
      target: "node_modules/jsonwebtoken",
      type: "call",
      isEntryPath: true,
    },
    {
      id: "edge-checkout-formatDate",
      source: "app/api/checkout/route.ts",
      target: "utils/formatDate.ts",
      type: "call",
      isEntryPath: false,
    },
  ],
  pins: [
    {
      id: "pin-jwt-audit",
      filePath: "node_modules/jsonwebtoken",
      functionFingerprint: "fp_jwt_sign",
      title: "Reachable CVE-2022-23529 Exploit Vector",
      comment: "AST call-graph confirmed execution path from /api/checkout into sign(). Upgrade to jwt v9.0.2.",
      author: "Rajveer",
      createdAt: "2026-10-30",
    },
    {
      id: "pin-date-canon",
      filePath: "utils/formatDate.ts",
      functionFingerprint: "fp_format_date_canon",
      title: "Canonical Date Utility",
      comment: "Registered in .vibelens/handover.json. Do not re-implement in helpers.",
      author: "Vihaan",
      createdAt: "2026-10-30",
    },
    {
      id: "pin-orphaned-legacy",
      filePath: "helpers/legacyDateTool.ts", // Intentionally removed file
      title: "Deprecated Legacy Date Tool",
      comment: "This file was pruned in refactor #4. Pin preserved as orphaned for audit fidelity.",
      author: "Chirag",
      createdAt: "2026-10-28",
    },
  ],
};

