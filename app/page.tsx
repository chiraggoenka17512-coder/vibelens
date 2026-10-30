import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060608] text-[#f8fafc] font-sans flex flex-col justify-between p-6 md:p-12">
      {/* Top Telemetry Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#10b981]" />
          <span className="font-mono text-sm tracking-widest text-[#f8fafc] font-bold">
            VIBELENS {"//"} INDUSTRIAL TELEMETRY
          </span>
          <span className="font-mono text-xs text-[#64748b]">v1.0.0-rc</span>
        </div>

        {/* Live Monospace Telemetry Chips */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <div className="px-2.5 py-1 bg-[#09090b] border border-white/10 text-[#10b981]">
            [STATUS: ACTIVE {"//"} 12ms]
          </div>
          <div className="px-2.5 py-1 bg-[#09090b] border border-white/10 text-[#06b6d4]">
            [DAG_NODES: 72 {"//"} RESIDUAL: 0.04]
          </div>
          <div className="px-2.5 py-1 bg-[#09090b] border border-white/10 text-[#f59e0b]">
            [CVE_FILTER: 88.6% SILENCED]
          </div>
        </div>
      </header>

      {/* Main Hero & Pre-Flight Showcase */}
      <section className="my-16 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2 font-mono text-xs text-[#64748b] mb-4">
          <span>[+000, +000]</span>
          <span>{"//"}</span>
          <span>SECTOR-01 {"//"} BOOTSTRAP</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#f8fafc] mb-6">
          You built it in an afternoon.
          <br />
          <span className="text-[#94a3b8]">Now see what you built.</span>
        </h1>

        <p className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mb-10 leading-relaxed">
          Autonomous 3D Codebase X-Ray, ReachableSec SAST &amp; Dual MCP Prevention Engine.
          Transforming AI-generated code chaos into mathematically verified architecture.
        </p>

        {/* 4-Tier Semantic Telemetry Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 bg-[#09090b] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#ef4444] font-bold">[REACHABLE]</span>
              <div className="w-2 h-2 bg-[#ef4444]" />
            </div>
            <p className="font-mono text-xs text-[#94a3b8]">Verified AST Exploit Paths</p>
          </div>

          <div className="p-4 bg-[#09090b] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#f97316] font-bold">[BLAST_RADIUS]</span>
              <div className="w-2 h-2 bg-[#f97316]" />
            </div>
            <p className="font-mono text-xs text-[#94a3b8]">Cascading Breaking Callers</p>
          </div>

          <div className="p-4 bg-[#09090b] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#f59e0b] font-bold">[VIBE_SLOP]</span>
              <div className="w-2 h-2 bg-[#f59e0b]" />
            </div>
            <p className="font-mono text-xs text-[#94a3b8]">Duplicate Utility Clusters</p>
          </div>

          <div className="p-4 bg-[#09090b] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#10b981] font-bold">[SENTINEL]</span>
              <div className="w-2 h-2 bg-[#10b981]" />
            </div>
            <p className="font-mono text-xs text-[#94a3b8]">Silenced Phantom Shields</p>
          </div>
        </div>

        {/* Pre-Flight Checklist Day 0 Status Card */}
        <div className="p-6 bg-[#09090b] border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#10b981] font-bold">PRE-FLIGHT CHECKLIST (DAY 0)</span>
              <span className="font-mono text-[10px] text-[#64748b]">PASS {"//"} GREEN</span>
            </div>
            <span className="font-mono text-xs text-[#64748b]">http://localhost:3000</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#f8fafc]">
                <span className="text-[#10b981]">✔</span>
                <span>Dependencies: lenis, gsap, @gsap/react</span>
              </div>
              <div className="flex items-center gap-2 text-[#f8fafc]">
                <span className="text-[#10b981]">✔</span>
                <span>Next.js Skeleton: app/layout.tsx &amp; app/page.tsx</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#f8fafc]">
                <span className="text-[#10b981]">✔</span>
                <span>Test Fixture: fixtures/sample-app/</span>
              </div>
              <div className="flex items-center gap-2 text-[#f8fafc]">
                <span className="text-[#10b981]">✔</span>
                <span>Git Strategy: 5 Feature Branches Isolated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Telemetry */}
      <footer className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#64748b]">
        <div>VIBELENS INDUSTRIAL TELEMETRY SYSTEM {"//"} PRASUNEX INNOVATHON 2026</div>
        <div>[LATENCY: 380ms] {"//"} [SYS_CLOCK: SYNCHRONIZED]</div>
      </footer>
    </main>
  );
}
