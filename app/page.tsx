"use client";

import React, { useState } from "react";
import { VibeLens3DViewer } from "../src/components/city/vibelens-3d-viewer";
import { SAMPLE_SCAN_RESULT } from "../src/data/sample-scan";
import { SastTester } from "../src/components/features/sast-tester";
import { BlastRadiusTester } from "../src/components/features/blast-radius-tester";
import { CliSentinelTester } from "../src/components/features/cli-sentinel-tester";
import { OpticalSlider } from "../src/components/features/optical-slider";

export default function Home() {
  const [bilingualMode, setBilingualMode] = useState<"plain" | "code">("plain");

  return (
    <div className="min-h-screen bg-[#060608] text-[#f8fafc] font-sans selection:bg-[#10b981] selection:text-black">
      {/* 1. Master Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#09090b]/95 border-b border-white/10 px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#10b981]" />
          <span className="font-mono text-sm tracking-wider font-bold text-white">
            VIBELENS // ALL-FEATURE MASTER WORKBENCH
          </span>
          <span className="font-mono text-[10px] px-2 py-0.5 bg-[#111115] border border-white/10 text-[#64748b]">
            PRASUNEX 2026
          </span>
        </div>

        {/* Persistent Bilingual Toggle (Chirag) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#060608] border border-white/10 p-0.5 font-mono text-xs">
            <button
              onClick={() => setBilingualMode("plain")}
              className={`px-3 py-1 transition-colors ${
                bilingualMode === "plain"
                  ? "bg-[#111115] text-[#10b981] font-bold border border-white/10"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              [Plain English]
            </button>
            <button
              onClick={() => setBilingualMode("code")}
              className={`px-3 py-1 transition-colors ${
                bilingualMode === "code"
                  ? "bg-[#111115] text-[#06b6d4] font-bold border border-white/10"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              [Show me the code]
            </button>
          </div>

          {/* Quick Monospace Telemetry */}
          <div className="hidden xl:flex items-center gap-2 font-mono text-[11px]">
            <div className="px-2 py-0.5 bg-[#060608] border border-white/10 text-[#10b981]">
              [SENTINEL: ACTIVE // 12ms]
            </div>
            <div className="px-2 py-0.5 bg-[#060608] border border-white/10 text-[#06b6d4]">
              [CVE_FILTER: 88.6% SILENCED]
            </div>
          </div>
        </div>
      </header>

      {/* 2. Feature Jump Rail (One-Click Anchor Navigation) */}
      <nav className="bg-[#060608] border-b border-white/10 px-6 py-2.5 overflow-x-auto">
        <div className="flex items-center gap-2 font-mono text-xs whitespace-nowrap min-w-max">
          <span className="text-[#64748b] mr-2">[FEATURE TESTBENCH]:</span>
          <a
            href="#section-xray"
            className="px-2.5 py-1 bg-[#09090b] hover:bg-white/10 border border-white/10 text-white transition-colors"
          >
            01. 3D Spatial X-Ray (Vihaan)
          </a>
          <a
            href="#section-sast"
            className="px-2.5 py-1 bg-[#09090b] hover:bg-white/10 border border-white/10 text-[#ef4444] transition-colors"
          >
            02. ReachableSec SAST (Rajveer)
          </a>
          <a
            href="#section-blast"
            className="px-2.5 py-1 bg-[#09090b] hover:bg-white/10 border border-white/10 text-[#f97316] transition-colors"
          >
            03. Blast Radius &amp; Universal Bridge (Aaryan)
          </a>
          <a
            href="#section-sentinel"
            className="px-2.5 py-1 bg-[#09090b] hover:bg-white/10 border border-white/10 text-[#f59e0b] transition-colors"
          >
            04. CLI Sentinel (Archit)
          </a>
          <a
            href="#section-optical"
            className="px-2.5 py-1 bg-[#09090b] hover:bg-white/10 border border-white/10 text-[#06b6d4] transition-colors"
          >
            05. Optical De-Slop Loupe (Chirag)
          </a>
        </div>
      </nav>

      {/* 3. Hero & Bilingual Context */}
      <section className="px-6 py-12 max-w-7xl mx-auto border-b border-white/10">
        <div className="font-mono text-xs text-[#64748b] mb-3 flex items-center gap-2">
          <span>[+000, +000] // SECTOR-00</span>
          <span>//</span>
          <span>TEAM TESTING PLAYGROUND</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          {bilingualMode === "plain" ? (
            <>
              You built it in an afternoon.
              <br />
              <span className="text-[#94a3b8]">Now test every feature before deployment.</span>
            </>
          ) : (
            <>
              Works on my machine. Reviewed by nobody.
              <br />
              <span className="text-[#06b6d4]">Mathematically verified by compiler science.</span>
            </>
          )}
        </h1>

        <p className="text-base md:text-lg text-[#94a3b8] max-w-3xl leading-relaxed mb-6">
          {bilingualMode === "plain" ? (
            "Welcome to the master workbench. Whenever anyone on the team pushes code, all 5 subsystems—the 3D City View, ReachableSec SAST, Blast Radius HUD, CLI Sentinel, and Optical Loupe—can be tested live in one place."
          ) : (
            "Complete end-to-end telemetry harness for AST parsing, 4-tier DFS reachability classification, deterministic squarified treemap layout, Model Context Protocol tools, and cross-agent context synchronization."
          )}
        </p>

        {/* Live Metrics Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#09090b] border border-white/10">
            <div className="text-[10px] text-[#64748b]">AST CALL-GRAPH</div>
            <div className="text-lg font-bold text-[#10b981] mt-0.5">72 Nodes</div>
            <div className="text-[10px] text-[#94a3b8]">DFS Traversal Active</div>
          </div>
          <div className="p-3 bg-[#09090b] border border-white/10">
            <div className="text-[10px] text-[#64748b]">PHANTOM CVE DROP</div>
            <div className="text-lg font-bold text-[#10b981] mt-0.5">35 ➔ 1 Real</div>
            <div className="text-[10px] text-[#94a3b8]">88.6% Dead Code Filtered</div>
          </div>
          <div className="p-3 bg-[#09090b] border border-white/10">
            <div className="text-[10px] text-[#64748b]">CONTEXT OVERHEAD</div>
            <div className="text-lg font-bold text-[#06b6d4] mt-0.5">~378 Tokens</div>
            <div className="text-[10px] text-[#94a3b8]">-39.6% Prompt Burn</div>
          </div>
          <div className="p-3 bg-[#09090b] border border-white/10">
            <div className="text-[10px] text-[#64748b]">SAFE AUTOMATION GATE</div>
            <div className="text-lg font-bold text-[#10b981] mt-0.5">14/14 Tests Green</div>
            <div className="text-[10px] text-[#94a3b8]">0 PRs Opened on Red</div>
          </div>
        </div>
      </section>

      {/* 4. Section 01: Vihaan's 3D Spatial X-Ray (City View & Wiring Graph) */}
      <section id="section-xray" className="px-6 py-10 max-w-7xl mx-auto border-b border-white/10">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#06b6d4]" />
            <h2 className="font-mono text-base font-bold text-white tracking-wider">
              01. 3D SPATIAL ARCHITECTURE &amp; CITY VIEW (VIHAAN)
            </h2>
          </div>
          <p className="text-xs text-[#94a3b8] mt-1 font-mono">
            Deterministic squarified treemap software city. Toggle between City View and Wiring Graph.
            Click buildings to open annotations; click vulnerable node &apos;jsonwebtoken&apos; to trigger the red laser arc.
          </p>
        </div>

        {/* Embedded Interactive 3D Viewer */}
        <div className="h-[620px] w-full border border-white/10 overflow-hidden shadow-2xl relative">
          <VibeLens3DViewer initialScan={SAMPLE_SCAN_RESULT} />
        </div>
      </section>

      {/* 5. Section 02: Rajveer's ReachableSec SAST Engine */}
      <section id="section-sast" className="px-6 py-10 max-w-7xl mx-auto border-b border-white/10">
        <SastTester />
      </section>

      {/* 6. Section 03: Aaryan's Blast Radius HUD & Universal Agent Bridge */}
      <section id="section-blast" className="px-6 py-10 max-w-7xl mx-auto border-b border-white/10">
        <BlastRadiusTester />
      </section>

      {/* 7. Section 04: Archit's VibeWatcher 1Hz CLI Sentinel */}
      <section id="section-sentinel" className="px-6 py-10 max-w-7xl mx-auto border-b border-white/10">
        <CliSentinelTester />
      </section>

      {/* 8. Section 05: Chirag's Optical Diagnostic Lens (De-Slop Slider) */}
      <section id="section-optical" className="px-6 py-10 max-w-7xl mx-auto border-b border-white/10">
        <OpticalSlider />
      </section>

      {/* 9. The 5-Act Builder Journey Timeline */}
      <section className="px-6 py-12 max-w-7xl mx-auto border-b border-white/10 font-mono text-xs">
        <div className="text-[#64748b] mb-4">[THE 5-ACT 24-HOUR BUILDER JOURNEY]</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-[#09090b] border border-white/10">
            <div className="text-[10px] text-[#10b981] font-bold">ACT 1: 10:00 AM</div>
            <div className="text-white font-bold my-1">The Morning Spark</div>
            <div className="text-[#94a3b8] text-[11px]">
              Effortless AI vibe coding. Clean sparse nodes, pure momentum.
            </div>
          </div>

          <div className="p-4 bg-[#09090b] border border-[#f59e0b]/40">
            <div className="text-[10px] text-[#f59e0b] font-bold">ACT 2: 02:30 AM</div>
            <div className="text-white font-bold my-1">The Hangover</div>
            <div className="text-[#94a3b8] text-[11px]">
              14 duplicate helpers, 35 red CVE alarms, total architectural fear.
            </div>
          </div>

          <div className="p-4 bg-[#09090b] border border-[#ef4444]/40">
            <div className="text-[10px] text-[#ef4444] font-bold">ACT 3: 04:15 AM</div>
            <div className="text-white font-bold my-1">The SAST Laser</div>
            <div className="text-[#94a3b8] text-[11px]">
              ReachableSec cuts the noise: 31 alarms dissolve; 1 real exploit isolated.
            </div>
          </div>

          <div className="p-4 bg-[#09090b] border border-[#f97316]/40">
            <div className="text-[10px] text-[#f97316] font-bold">ACT 4: 06:00 AM</div>
            <div className="text-white font-bold my-1">Blast Radius Fix</div>
            <div className="text-[#94a3b8] text-[11px]">
              1-click test-gated PR #14 purges duplicates without breaking code.
            </div>
          </div>

          <div className="p-4 bg-[#09090b] border border-[#10b981]/40">
            <div className="text-[10px] text-[#10b981] font-bold">ACT 5: 08:00 AM</div>
            <div className="text-white font-bold my-1">Equilibrium</div>
            <div className="text-[#94a3b8] text-[11px]">
              1Hz VibeWatcher sentinel active. Clean, verified, ready to ship.
            </div>
          </div>
        </div>
      </section>

      {/* 10. Footer Telemetry & Team Roster */}
      <footer className="px-6 py-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#64748b]">
        <div className="flex items-center gap-2">
          <span>VIBELENS INDUSTRIAL TELEMETRY</span>
          <span>//</span>
          <span>PRASUNEX INNOVATHON 2026</span>
        </div>
        <div>
          TEAM: Chirag (UI) • Rajveer (SAST) • Vihaan (3D) • Aaryan (HUD/Bridge) • Archit (CLI)
        </div>
      </footer>
    </div>
  );
}
