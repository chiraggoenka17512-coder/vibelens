"use client";

import React, { useState } from "react";

export function BlastRadiusTester() {
  const [selectedFile, setSelectedFile] = useState<string>("utils/formatDate.ts");
  const [copied, setCopied] = useState(false);
  const [prStatus, setPrStatus] = useState<"idle" | "running-tests" | "pr-created">("idle");
  const [apiResult, setApiResult] = useState<string | null>(null);
  const [checkName, setCheckName] = useState<string>("formatDate");
  const [checking, setChecking] = useState(false);

  const fileData: Record<
    string,
    {
      name: string;
      upstream: string[];
      downstream: string[];
      riskLevel: "CRITICAL" | "MODERATE" | "SAFE_TO_PURGE";
      riskColor: string;
      tokenWeight: number;
    }
  > = {
    "utils/formatDate.ts": {
      name: "formatDate.ts",
      upstream: ["app/api/checkout/route.ts", "components/xray/blast-radius-hud.tsx"],
      downstream: ["Intl.DateTimeFormat (Native)"],
      riskLevel: "MODERATE",
      riskColor: "#f97316",
      tokenWeight: 420,
    },
    "node_modules/jsonwebtoken": {
      name: "jsonwebtoken",
      upstream: ["app/api/checkout/route.ts"],
      downstream: ["jws", "ms", "buffer-equal-constant-time"],
      riskLevel: "CRITICAL",
      riskColor: "#ef4444",
      tokenWeight: 2840,
    },
    "helpers/parseDate.ts": {
      name: "parseDate.ts (Duplicate Vibe Slop)",
      upstream: [],
      downstream: [],
      riskLevel: "SAFE_TO_PURGE",
      riskColor: "#10b981",
      tokenWeight: 380,
    },
  };

  const current = fileData[selectedFile] || fileData["utils/formatDate.ts"];

  const handleCopyContextRelay = () => {
    const payload = JSON.stringify(
      {
        $schema: "https://vibelens.dev/schemas/handover.v1.json",
        project: "vibelens-core",
        canonical_utilities: {
          formatDate: "utils/formatDate.ts#L8",
          getIsoTimestamp: "utils/formatDate.ts#L18",
        },
        architectural_invariants: {
          theme: "obsidian_cad (#060608)",
          zero_gradients: true,
          rules: ["100% JS/TS only", "Zero raw code uploads", "Run npm test before PR"],
        },
        blast_radius_locks: ["node_modules/jsonwebtoken", "app/api/checkout/route.ts"],
      },
      null,
      2
    );

    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunPrGenerator = () => {
    setPrStatus("running-tests");
    setTimeout(() => {
      setPrStatus("pr-created");
    }, 1200);
  };

  const handleTestGetHandover = async () => {
    try {
      const res = await fetch("/api/vibelens/handover");
      const data = await res.json();
      setApiResult(JSON.stringify(data, null, 2));
    } catch {
      setApiResult(JSON.stringify({ error: "Failed to connect to /api/vibelens/handover" }));
    }
  };

  const handleTestCheckUtility = async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/vibelens/check-utility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: checkName }),
      });
      const data = await res.json();
      setApiResult(JSON.stringify(data, null, 2));
    } catch {
      setApiResult(JSON.stringify({ error: "Failed to connect to /api/vibelens/check-utility" }));
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="bg-[#09090b] border border-white/10 p-6 text-[#f8fafc] font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f97316]" />
            <h3 className="font-mono text-sm font-bold text-white tracking-wider">
              FEATURE 03: BLAST RADIUS HUD &amp; UNIVERSAL AGENT BRIDGE
            </h3>
          </div>
          <p className="text-xs text-[#94a3b8] mt-1">
            Aaryan&apos;s Module: Calculating upstream breaking callers, test-gated PRs, and the Tri-Bridge API.
          </p>
        </div>

        {/* 1-Click Clipboard Relay Button */}
        <button
          onClick={handleCopyContextRelay}
          className="px-4 py-2 bg-[#111115] hover:bg-white/10 border border-[#10b981] text-[#10b981] font-mono text-xs font-bold transition-all flex items-center gap-2"
        >
          <span>📋</span>
          <span>{copied ? "[COPIED TO CLIPBOARD! (380 Tokens)]" : "[COPY CONTEXT RELAY FOR WEB AI]"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Blast Radius Impact Inspector */}
        <div className="p-4 bg-[#060608] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
              <span className="font-mono text-xs text-[#64748b]">[FILE_SELECTOR]</span>
              <div className="flex gap-1 font-mono text-[10px]">
                {Object.keys(fileData).map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setSelectedFile(f);
                      setPrStatus("idle");
                    }}
                    className={`px-2 py-0.5 border ${
                      selectedFile === f
                        ? "bg-white/10 text-white border-white/30"
                        : "text-[#64748b] border-white/5"
                    }`}
                  >
                    {fileData[f].name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Target File Telemetry */}
            <div className="mb-4">
              <div className="font-mono text-xs text-[#94a3b8]">{selectedFile}</div>
              <div className="flex items-center gap-3 mt-1 font-mono text-xs">
                <span
                  className="px-2 py-0.5 font-bold border text-[10px]"
                  style={{
                    color: current.riskColor,
                    borderColor: `${current.riskColor}40`,
                    backgroundColor: `${current.riskColor}10`,
                  }}
                >
                  [{current.riskLevel}]
                </span>
                <span className="text-[#64748b]">TOKEN WEIGHT: ~{current.tokenWeight} TOKENS</span>
              </div>
            </div>

            {/* Upstream Impact (What Breaks) */}
            <div className="space-y-3 mb-4">
              <div className="p-3 bg-[#111115] border border-white/5 font-mono text-xs">
                <div className="text-[#f97316] font-bold mb-1">
                  ⬆ UPSTREAM BREAKING CALLERS ({current.upstream.length})
                </div>
                {current.upstream.length === 0 ? (
                  <div className="text-[#10b981] text-[11px]">
                    ✔ 0 callers detected. Safe to delete or deduplicate without cascading breakage.
                  </div>
                ) : (
                  current.upstream.map((caller) => (
                    <div key={caller} className="text-white text-[11px] pl-2 border-l border-[#f97316]">
                      {caller}
                    </div>
                  ))
                )}
              </div>

              {/* Downstream Dependencies */}
              <div className="p-3 bg-[#111115] border border-white/5 font-mono text-xs">
                <div className="text-[#06b6d4] font-bold mb-1">
                  ⬇ DOWNSTREAM DEPENDENCIES ({current.downstream.length})
                </div>
                {current.downstream.length === 0 ? (
                  <div className="text-[#64748b] text-[11px]">No external package imports.</div>
                ) : (
                  current.downstream.map((dep) => (
                    <div key={dep} className="text-white text-[11px] pl-2 border-l border-[#06b6d4]">
                      {dep}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Test-Gated PR Trigger Button */}
          <div className="border-t border-white/10 pt-4">
            {prStatus === "idle" && (
              <button
                onClick={handleRunPrGenerator}
                className="w-full py-2.5 bg-[#111115] hover:bg-white/10 border border-[#10b981] text-[#10b981] font-mono text-xs font-bold transition-all"
              >
                [GENERATE TEST-GATED SAFE PR]
              </button>
            )}

            {prStatus === "running-tests" && (
              <div className="p-3 bg-[#111115] border border-[#f59e0b] font-mono text-xs text-[#f59e0b] flex items-center justify-between">
                <span>[GATEWAY: RUNNING LOCAL TEST SUITE...]</span>
                <span className="animate-spin">⏳</span>
              </div>
            )}

            {prStatus === "pr-created" && (
              <div className="p-3 bg-[#10b981]/10 border border-[#10b981] font-mono text-xs text-[#10b981] space-y-1">
                <div className="font-bold">✔ 14/14 TESTS PASSED GREEN</div>
                <div className="text-[11px] text-[#f8fafc]">
                  PR #14 Created: &quot;refactor(date): consolidate duplicate into canonical formatDate&quot;
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Tri-Bridge REST API & MCP Tester */}
        <div className="p-4 bg-[#060608] border border-white/10 flex flex-col justify-between font-mono text-xs">
          <div>
            <div className="text-[#64748b] border-b border-white/10 pb-2 mb-3">
              [TRI-BRIDGE REST API &amp; WEB AGENT CONSOLE]
            </div>

            {/* Test 1: GET /api/vibelens/handover */}
            <div className="mb-4">
              <div className="text-[11px] text-[#94a3b8] mb-1">
                TEST ENDPOINT 1: <span className="text-[#06b6d4]">GET /api/vibelens/handover</span>
              </div>
              <button
                onClick={handleTestGetHandover}
                className="px-3 py-1.5 bg-[#111115] hover:bg-white/10 border border-white/20 text-white text-xs transition-colors"
              >
                [EXECUTE GET REQUEST]
              </button>
            </div>

            {/* Test 2: POST /api/vibelens/check-utility */}
            <div className="mb-4">
              <div className="text-[11px] text-[#94a3b8] mb-1">
                TEST ENDPOINT 2: <span className="text-[#06b6d4]">POST /api/vibelens/check-utility</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={checkName}
                  onChange={(e) => setCheckName(e.target.value)}
                  placeholder="e.g. formatDate"
                  className="flex-1 bg-[#111115] border border-white/10 px-2 py-1 text-xs text-white focus:outline-none focus:border-[#06b6d4]"
                />
                <button
                  onClick={handleTestCheckUtility}
                  disabled={checking}
                  className="px-3 py-1 bg-[#111115] hover:bg-white/10 border border-[#06b6d4] text-[#06b6d4] text-xs font-bold transition-colors"
                >
                  {checking ? "[CHECKING...]" : "[CHECK UTILITY]"}
                </button>
              </div>
              <div className="text-[10px] text-[#64748b] mt-1">
                Tip: Try &apos;formatDate&apos; (duplicate warning) vs &apos;calculateTax&apos; (clean).
              </div>
            </div>
          </div>

          {/* Live JSON Response Output */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="text-[10px] text-[#64748b] mb-1">[LIVE_HTTP_RESPONSE_INSPECTOR]</div>
            <pre className="p-3 bg-[#111115] border border-white/10 text-[11px] text-[#06b6d4] overflow-x-auto max-h-48 leading-relaxed">
              {apiResult || "// Click one of the endpoints above to test the live API response."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
