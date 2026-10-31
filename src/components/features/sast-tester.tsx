"use client";

import React, { useState } from "react";

export function SastTester() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(true);
  const [selectedTier, setSelectedTier] = useState<"all" | "reachable" | "likely" | "unknown" | "unreachable">("all");
  const [activeTab, setActiveTab] = useState<"findings" | "handover">("findings");

  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
    }, 700);
  };

  const cveFindings = [
    {
      id: "CVE-2022-23529",
      package: "jsonwebtoken",
      version: "^9.0.0",
      tier: "reachable",
      badgeColor: "#ef4444",
      callPath: "POST /api/checkout ➔ formatDate() ➔ jwt.sign()",
      status: "ACTIVE ATTACK PATH",
      summary: "Insecure key verification in jwt.verify() can allow arbitrary code execution.",
      detail: "Reachable via static AST call trace from public HTTP entrypoint.",
    },
    {
      id: "CVE-2023-26136",
      package: "tough-cookie",
      version: "4.1.2",
      tier: "likely",
      badgeColor: "#f97316",
      callPath: "POST /api/checkout ➔ (eventEmitter.emit) ➔ cookieJar",
      status: "INDIRECT / CONDITIONAL",
      summary: "Prototype pollution in CookieJar.setCookie.",
      detail: "Call path traverses internal event callback queue.",
    },
    {
      id: "CVE-2024-21538",
      package: "nanoid",
      version: "3.3.6",
      tier: "unknown",
      badgeColor: "#f59e0b",
      callPath: "utils/dynamicLoader.ts ➔ eval(pkgName)",
      status: "DYNAMIC REFLECTION BOUNDARY",
      summary: "Potential prototype pollution via variable reflection.",
      detail: "Static traversal halted at dynamic require/eval boundary; cannot guarantee safety.",
    },
    {
      id: "CVE-2021-23337",
      package: "lodash",
      version: "4.17.21",
      tier: "unreachable",
      badgeColor: "#10b981",
      callPath: "0 Application Entrypoints (Unreferenced dead dependency)",
      status: "SILENCED PHANTOM SHIELD",
      summary: "Command injection in lodash.template.",
      detail: "Mathematically proven 0 AST references from any public or internal route. 100% safe to ignore.",
    },
    {
      id: "CVE-2020-28500",
      package: "lodash",
      version: "4.17.21",
      tier: "unreachable",
      badgeColor: "#10b981",
      callPath: "0 Application Entrypoints (Unreferenced dead dependency)",
      status: "SILENCED PHANTOM SHIELD",
      summary: "Regular expression denial of service (ReDoS).",
      detail: "Dead code in package.json. Filtered out from alert fatigue.",
    },
  ];

  const filtered = cveFindings.filter(
    (c) => selectedTier === "all" || c.tier === selectedTier
  );

  return (
    <div className="bg-[#09090b] border border-white/10 p-6 text-[#f8fafc] font-sans">
      {/* Header & Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#ef4444]" />
            <h3 className="font-mono text-sm font-bold text-white tracking-wider">
              FEATURE 02: REACHABLESEC 4-TIER SAST ENGINE
            </h3>
          </div>
          <p className="text-xs text-[#94a3b8] mt-1">
            Rajveer&apos;s AST Call-Graph Analyzer: Tracing public entrypoints into third-party dependencies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="font-mono text-xs px-2.5 py-1 bg-[#060608] border border-white/10 text-[#06b6d4]">
            [TARGET: fixtures/sample-app]
          </div>
          <button
            onClick={runScan}
            disabled={isScanning}
            className="px-4 py-2 bg-[#111115] hover:bg-white/10 border border-[#ef4444] text-[#ef4444] font-mono text-xs font-bold transition-colors"
          >
            {isScanning ? "[ANALYZING AST CALLS...]" : "[RUN REACHABILITY SCAN]"}
          </button>
        </div>
      </div>

      {/* The Famous Alert Drop Counter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-[#060608] border border-white/10">
          <div className="font-mono text-xs text-[#94a3b8]">DEPENDABOT RAW ALERTS</div>
          <div className="text-3xl font-mono font-bold text-white mt-1">35</div>
          <div className="font-mono text-[10px] text-[#ef4444] mt-1">Conventional noise</div>
        </div>

        <div className="p-4 bg-[#060608] border border-white/10">
          <div className="font-mono text-xs text-[#10b981]">SILENCED PHANTOM SHIELDS</div>
          <div className="text-3xl font-mono font-bold text-[#10b981] mt-1">31</div>
          <div className="font-mono text-[10px] text-[#10b981] mt-1">88.6% uncalled dead code</div>
        </div>

        <div className="p-4 bg-[#060608] border border-white/10">
          <div className="font-mono text-xs text-[#ef4444]">REAL REACHABLE EXPLOITS</div>
          <div className="text-3xl font-mono font-bold text-[#ef4444] mt-1">1</div>
          <div className="font-mono text-[10px] text-[#ef4444] mt-1">Immediate patch priority</div>
        </div>

        <div className="p-4 bg-[#060608] border border-white/10">
          <div className="font-mono text-xs text-[#06b6d4]">TRIAGE TIME SAVED</div>
          <div className="text-3xl font-mono font-bold text-[#06b6d4] mt-1">94%</div>
          <div className="font-mono text-[10px] text-[#06b6d4] mt-1">&lt;12ms local execution</div>
        </div>
      </div>

      {/* Tabs: Findings vs Handover Manifest */}
      <div className="flex items-center justify-between border-b border-white/10 mb-4">
        <div className="flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => setActiveTab("findings")}
            className={`px-3 py-1.5 border-b-2 transition-colors ${
              activeTab === "findings"
                ? "border-[#06b6d4] text-[#06b6d4] font-bold"
                : "border-transparent text-[#94a3b8] hover:text-white"
            }`}
          >
            [4-TIER FINDINGS MATRIX]
          </button>
          <button
            onClick={() => setActiveTab("handover")}
            className={`px-3 py-1.5 border-b-2 transition-colors ${
              activeTab === "handover"
                ? "border-[#06b6d4] text-[#06b6d4] font-bold"
                : "border-transparent text-[#94a3b8] hover:text-white"
            }`}
          >
            [.VIBELENS/HANDOVER.JSON (380 TOKENS)]
          </button>
        </div>

        {activeTab === "findings" && (
          <div className="flex items-center gap-1 font-mono text-[10px]">
            {(["all", "reachable", "likely", "unknown", "unreachable"] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-2 py-0.5 border ${
                  selectedTier === tier
                    ? "bg-white/10 text-white border-white/30"
                    : "text-[#64748b] border-white/5 hover:border-white/20"
                }`}
              >
                {tier.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab 1: Findings Table */}
      {activeTab === "findings" && (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-[#060608] border border-white/10 hover:border-white/20 transition-all font-mono"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 text-[10px] font-bold border"
                    style={{
                      color: item.badgeColor,
                      borderColor: `${item.badgeColor}40`,
                      backgroundColor: `${item.badgeColor}15`,
                    }}
                  >
                    [{item.tier.toUpperCase()}]
                  </span>
                  <span className="font-bold text-xs text-white">{item.id}</span>
                  <span className="text-xs text-[#94a3b8]">
                    {item.package}@{item.version}
                  </span>
                </div>
                <span className="text-[10px] text-[#64748b]">{item.status}</span>
              </div>

              <div className="text-xs text-[#f8fafc] mb-2">{item.summary}</div>

              <div className="p-2 bg-[#111115] border border-white/5 text-[11px] text-[#06b6d4] flex items-center gap-2">
                <span className="text-[#64748b]">AST CALL PATH:</span>
                <span>{item.callPath}</span>
              </div>

              <div className="text-[10px] text-[#94a3b8] mt-2 italic">{item.detail}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: .vibelens/handover.json Snapshot */}
      {activeTab === "handover" && (
        <div className="p-4 bg-[#060608] border border-white/10 font-mono text-xs text-[#94a3b8] overflow-x-auto">
          <div className="flex items-center justify-between text-[#64748b] border-b border-white/10 pb-2 mb-3">
            <span>FILE: .vibelens/handover.json</span>
            <span>TOKEN COUNT: ~378 TOKENS // 99.2% REDUCTION</span>
          </div>
          <pre className="text-[#06b6d4] leading-relaxed">
{`{
  "$schema": "https://vibelens.dev/schemas/handover.v1.json",
  "vibelens_version": "1.0.0",
  "project": "vibelens-core",
  "canonical_utilities": {
    "formatDate": "utils/formatDate.ts#L8",
    "getIsoTimestamp": "utils/formatDate.ts#L18"
  },
  "architectural_invariants": {
    "theme": "obsidian_cad (#060608)",
    "zero_gradients": true,
    "stack": "Next.js 15 (App Router) + React 19 + Tailwind v3 + Three.js",
    "strict_rules": [
      "100% JS/TS/React ecosystem only (no foreign runtimes)",
      "Never upload raw source code to external servers",
      "Dynamic require() must be classified honestly as 'Unknown'",
      "Run local test suite before opening any GitHub PR"
    ]
  },
  "blast_radius_locks": [
    "node_modules/jsonwebtoken (CRITICAL: Reachable attack vector via /api/checkout)",
    "app/api/checkout/route.ts (PUBLIC HTTP ENTRYPOINT)"
  ]
}`}
          </pre>
        </div>
      )}
    </div>
  );
}

