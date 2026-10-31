"use client";

import React, { useState } from "react";

interface LensLayer {
  id: string;
  ringNumber: string;
  cadTag: string;
  mechanicalName: string;
  opticalRole: string;
  engineModule: string;
  techStack: string;
  telemetryTag: string;
  statusMetric: string;
  color: string;
  description: string;
  specDetails: string[];
}

const LENS_LAYERS: LensLayer[] = [
  {
    id: "layer-1",
    ringNumber: "RING 01",
    cadTag: "OPT-OBJ-01 // FRONT COLLECTOR",
    mechanicalName: "Objective Front Glass & Baffle Barrel",
    opticalRole: "Photonic Code Ingestion & Ray Collimation",
    engineModule: "Local AST Parser & Dependency Lexer",
    techStack: "@babel/parser + es-module-lexer",
    telemetryTag: "[INGESTION: 100% LOCAL // 0 CLOUD LEAKS]",
    statusMetric: "1.2ms / file scan",
    color: "#06b6d4",
    description:
      "Scans local JavaScript and TypeScript files directly on disk. Extracts imports, exports, and call-sites without uploading raw source code to external servers.",
    specDetails: [
      "Zero network egress (100% offline local V8 engine)",
      "Handles ESM, CommonJS, and dynamic imports",
      "Outputs deterministic call-graph node vertices",
    ],
  },
  {
    id: "layer-2",
    ringNumber: "RING 02",
    cadTag: "MEC-HEL-02 // FOCUS HELICOID",
    mechanicalName: "Precision Internal Focus Helicoid",
    opticalRole: "Focal Plane Adjustment & Semantic Alignment",
    engineModule: "On-Device Quantized Vector Engine",
    techStack: "Transformers.js (all-MiniLM-L6-v2 in WASM)",
    telemetryTag: "[EMBEDDING: 384-DIM // ON-DEVICE WASM]",
    statusMetric: "0 external API keys",
    color: "#f59e0b",
    description:
      "Computes 384-dimensional dense vectors on-device using quantized sentence transformers in WebAssembly. Matches feature prompts to AST symbol definitions locally.",
    specDetails: [
      "Zero OpenAI / Voyage API key requirements",
      "Executes in local Node.js / Browser WebAssembly",
      "Semantic cosine matching against local repository symbols",
    ],
  },
  {
    id: "layer-3",
    ringNumber: "RING 03",
    cadTag: "OPT-IRIS-03 // APERTURE GATE",
    mechanicalName: "Multi-Blade Calibrated Iris Diaphragm",
    opticalRole: "Aperture Control & Noise Constriction",
    engineModule: "ReachableSec Static Call-Graph Gate",
    techStack: "Deterministic DFS AST Traversal Engine",
    telemetryTag: "[CVE_FILTER: 88.6% SILENCED // 2 REACHABLE]",
    statusMetric: "34 phantom alerts filtered",
    color: "#ef4444",
    description:
      "Traces execution paths from public entry points (Next.js routes, CLI commands, exports) to vulnerable packages. Silences phantom vulnerabilities while illuminating true zero-day exploit paths.",
    specDetails: [
      "Distinguishes 'Reachable' vs 'Unknown (dynamic)' vs 'Not Found'",
      "Strict Invariant: Never falsely claims dynamic eval is safe",
      "Automated verification: 100% green local test suite gate",
    ],
  },
  {
    id: "layer-4",
    ringNumber: "RING 04",
    cadTag: "MEC-BAY-04 // BAYONET COUPLING",
    mechanicalName: "Bayonet Flange Mount & Interface Collar",
    opticalRole: "Optical Transmission & Camera Coupling",
    engineModule: "Universal Tri-Bridge Agent Connector",
    techStack: "MCP JSON-RPC + Handover File + Local REST",
    telemetryTag: "[TRI-BRIDGE: MCP // REST // 380-TOKEN FILE]",
    statusMetric: "Cursor • Claude • v0.dev",
    color: "#10b981",
    description:
      "Universal connector bridging VibeLens AST context to desktop IDE agents (Cursor, Claude Code, Windsurf) and web AI builders (v0.dev, Bolt.new) with zero prompt bloat.",
    specDetails: [
      "Bridge 1: Stdio/HTTP Model Context Protocol (MCP) server",
      "Bridge 2: 380-token deterministic handover state file",
      "Bridge 3: Local CORS-enabled REST API for browser extensions",
    ],
  },
  {
    id: "layer-5",
    ringNumber: "RING 05",
    cadTag: "SEN-FOC-05 // SENSOR PLANE",
    mechanicalName: "CMOS Focal Plane & Digital Telemetry Plate",
    opticalRole: "Image Capture & Spatial Projection",
    engineModule: "3D Spatial Treemap & Wiring Cockpit",
    techStack: "Three.js + React Three Fiber WebGL",
    telemetryTag: "[RENDER: 60-120 FPS // LOCAL TREEMAP]",
    statusMetric: "Squarified Treemap + Wiring",
    color: "#3b82f6",
    description:
      "Transforms the codebase into a living 3D metropolitan software city. Building heights reflect deterministic lines of code, district boundaries calibrate to the builder's home city, and reachable lasers ignite in red.",
    specDetails: [
      "Deterministic squarified treemap layout with zero drift",
      "Dual mode: City Treemap ➔ Orbital 3D Wiring Graph",
      "Personalized metropolitan grid calibration (BLR, SFO, NYC, LHR)",
    ],
  },
];

export function ExplodedLensEngine() {
  const [explosionDistance, setExplosionDistance] = useState<number>(65); // 0 = assembled, 100 = fully exploded
  const [activeLayerId, setActiveLayerId] = useState<string>("layer-3");

  const activeLayer =
    LENS_LAYERS.find((l) => l.id === activeLayerId) || LENS_LAYERS[2];

  return (
    <div className="w-full bg-[#060608] text-[#f8fafc] font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="font-mono text-xs text-[#64748b] flex items-center gap-2">
            <span>[CAD-BLUEPRINT // SECTION-06]</span>
            <span>//</span>
            <span className="text-[#06b6d4]">OPTICAL ENGINE TELEMETRY</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1">
            The Exploded Optical Lens Assembly
          </h2>
          <p className="text-xs md:text-sm text-[#94a3b8] mt-1 font-mono">
            How VibeLens focuses raw source code into verified reachability: 5 compound optical layers.
          </p>
        </div>

        {/* Global Telemetry Chips */}
        <div className="flex items-center gap-2 font-mono text-[11px] flex-wrap">
          <div className="px-2.5 py-1 bg-[#111115] border border-white/10 text-[#06b6d4]">
            [SYSTEM: 5 COMPOUND ELEMENTS]
          </div>
          <div className="px-2.5 py-1 bg-[#111115] border border-white/10 text-[#10b981]">
            [CALIBRATION: 100% LOCAL]
          </div>
        </div>
      </div>

      {/* Hardware Caliper / Timeline Scrubber (Anime.js Style) */}
      <div className="my-6 p-4 bg-[#09090b] border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#ef4444]" />
            <span className="text-white font-bold tracking-wider">
              OPTICAL AXIS EXPANSION CALIPER
            </span>
            <span className="text-[#64748b]">
              [Z_OFFSET: {(explosionDistance * 1.8).toFixed(1)}mm]
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#94a3b8]">
            <span>
              MODE:{" "}
              <strong className="text-white">
                {explosionDistance < 20
                  ? "SOLID ASSEMBLED"
                  : explosionDistance > 80
                  ? "FULL CAD DISASSEMBLY"
                  : "CALIBRATED EXPLOSION"}
              </strong>
            </span>
            <button
              onClick={() => setExplosionDistance(0)}
              className="px-2 py-0.5 bg-[#111115] hover:bg-white/10 border border-white/10 text-white transition-colors"
            >
              [Assemble]
            </button>
            <button
              onClick={() => setExplosionDistance(100)}
              className="px-2 py-0.5 bg-[#111115] hover:bg-white/10 border border-white/10 text-[#06b6d4] transition-colors"
            >
              [Explode]
            </button>
          </div>
        </div>

        {/* Tactile Scrubber Bar with Tick Marks */}
        <div className="relative flex items-center py-2">
          {/* Background Tick Marks Tape */}
          <div className="w-full h-8 bg-[#060608] border border-white/10 relative flex items-center px-2 overflow-hidden select-none">
            {/* Tick grid lines */}
            <div className="absolute inset-0 flex justify-between items-center opacity-30 pointer-events-none px-1">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-px ${
                    i % 6 === 0 ? "h-6 bg-white" : i % 2 === 0 ? "h-3 bg-zinc-400" : "h-1.5 bg-zinc-600"
                  }`}
                />
              ))}
            </div>

            {/* Slider Input overlay */}
            <input
              type="range"
              min={0}
              max={100}
              value={explosionDistance}
              onChange={(e) => setExplosionDistance(Number(e.target.value))}
              className="w-full h-8 opacity-0 cursor-ew-resize z-20"
              aria-label="Explosion distance scrubber"
            />

            {/* Red Indicator Caliper Needle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#ef4444] z-10 pointer-events-none transition-all duration-75"
              style={{ left: `calc(${explosionDistance}% - 2px)` }}
            >
              <div className="w-2.5 h-1.5 bg-[#ef4444] -translate-x-[3px] -translate-y-1" />
              <div className="w-2.5 h-1.5 bg-[#ef4444] -translate-x-[3px] translate-y-7" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: Exploded Visualizer + Telemetry Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        {/* Left Column: Exploded Optical Lens Assembly Schematic (7 Cols) */}
        <div className="lg:col-span-7 bg-[#09090b] border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden min-h-[460px]">
          {/* Subtle CAD Background Markings */}
          <div className="absolute top-3 left-4 font-mono text-[10px] text-[#64748b] tracking-wider pointer-events-none">
            [CROSS-SECTION: LATERAL OPTICAL AXIS // Z-ALIGNMENT]
          </div>
          <div className="absolute top-3 right-4 font-mono text-[10px] text-[#64748b] pointer-events-none">
            [GRID: 1px = 0.5mm // ZERO-SLOP BENCH]
          </div>

          {/* Central Optical Ray / Laser Axis */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-px bg-white/10 z-0">
            <div className="w-full h-full bg-gradient-to-r from-[#06b6d4]/40 via-[#ef4444]/60 to-[#3b82f6]/40" />
          </div>

          {/* Slices Container */}
          <div className="relative z-10 my-auto py-12 flex items-center justify-between gap-1 sm:gap-2 px-2">
            {LENS_LAYERS.map((layer, index) => {
              const isActive = layer.id === activeLayerId;
              // Calculate dynamic translation based on explosion slider
              const spreadMultiplier = (index - 2) * (explosionDistance / 100);
              const xOffset = spreadMultiplier * 32; // px offset

              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayerId(layer.id)}
                  style={{ transform: `translateX(${xOffset}px)` }}
                  className={`flex flex-col items-center cursor-pointer transition-transform duration-150 group ${
                    isActive ? "scale-105" : "hover:scale-102 opacity-80 hover:opacity-100"
                  }`}
                >
                  {/* Mechanical Ring CAD Tag */}
                  <span
                    className={`font-mono text-[9px] mb-2 px-1 py-0.5 border transition-colors ${
                      isActive
                        ? "bg-white/10 border-white text-white font-bold"
                        : "border-transparent text-[#64748b] group-hover:text-zinc-300"
                    }`}
                  >
                    0{index + 1}
                  </span>

                  {/* 3D-styled Mechanical Cylinder Ring Slice */}
                  <div
                    className={`relative w-12 sm:w-16 md:w-20 transition-all duration-200 border-2 rounded-sm flex flex-col items-center justify-center p-1 ${
                      isActive
                        ? "bg-[#111115] shadow-lg shadow-black"
                        : "bg-[#060608] hover:bg-[#111113]"
                    }`}
                    style={{
                      height: `${130 + index * 10}px`,
                      borderColor: isActive ? layer.color : "rgba(255,255,255,0.15)",
                    }}
                  >
                    {/* Concentric Ticks and Mechanical Ribs */}
                    <div className="w-full h-full border border-white/5 flex flex-col justify-between py-2 px-1 relative">
                      {/* Top rib */}
                      <div className="w-full h-1 bg-white/10" />

                      {/* Optical center glass core */}
                      <div
                        className="w-full my-auto h-12 flex items-center justify-center border border-dashed transition-colors"
                        style={{
                          borderColor: isActive ? `${layer.color}88` : "rgba(255,255,255,0.1)",
                          backgroundColor: isActive ? `${layer.color}15` : "transparent",
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: isActive ? layer.color : "#64748b",
                          }}
                        />
                      </div>

                      {/* Bottom rib */}
                      <div className="w-full h-1 bg-white/10" />
                    </div>

                    {/* Active Indicator Crosshair */}
                    {isActive && (
                      <div
                        className="absolute -bottom-2 w-1.5 h-1.5 rotate-45"
                        style={{ backgroundColor: layer.color }}
                      />
                    )}
                  </div>

                  {/* Ring Label */}
                  <div className="mt-3 text-center font-mono text-[10px]">
                    <div
                      className="font-bold whitespace-nowrap"
                      style={{ color: isActive ? layer.color : "#94a3b8" }}
                    >
                      {layer.ringNumber}
                    </div>
                    <div className="text-[9px] text-[#64748b] hidden sm:block truncate max-w-[80px]">
                      {layer.opticalRole.split(" ")[0]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Assembly Telemetry Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#64748b]">
            <div className="flex items-center gap-2">
              <span className="text-[#10b981]">●</span>
              <span>ACTIVE INSPECTOR:</span>
              <strong className="text-white">{activeLayer.ringNumber} // {activeLayer.engineModule}</strong>
            </div>
            <div>
              <span>DRAG SCABBER TO EXPAND CAD LAYERS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Engine Telemetry Card (5 Cols) */}
        <div className="lg:col-span-5 bg-[#09090b] border border-white/10 p-6 flex flex-col justify-between">
          <div>
            {/* Layer Subtitle & CAD Code */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span
                className="font-mono text-xs px-2 py-0.5 border"
                style={{
                  color: activeLayer.color,
                  borderColor: `${activeLayer.color}40`,
                  backgroundColor: `${activeLayer.color}10`,
                }}
              >
                {activeLayer.cadTag}
              </span>
              <span className="font-mono text-[11px] text-[#64748b]">
                {activeLayer.statusMetric}
              </span>
            </div>

            {/* Layer Mechanical Title */}
            <h3 className="text-lg font-bold text-white mt-4 mb-1">
              {activeLayer.engineModule}
            </h3>
            <div className="font-mono text-xs text-[#94a3b8] mb-4">
              {activeLayer.mechanicalName}
            </div>

            {/* Description */}
            <p className="text-sm text-[#cbd5e1] leading-relaxed mb-5">
              {activeLayer.description}
            </p>

            {/* Technical Stack Specifications */}
            <div className="p-3 bg-[#060608] border border-white/10 mb-4 font-mono text-xs">
              <div className="text-[10px] text-[#64748b] mb-1">UNDERLYING ENGINE STACK:</div>
              <div className="text-white font-bold">{activeLayer.techStack}</div>
              <div className="text-[11px] mt-1" style={{ color: activeLayer.color }}>
                {activeLayer.telemetryTag}
              </div>
            </div>

            {/* Key Invariants / Spec Details */}
            <div className="space-y-2 mb-4">
              <div className="font-mono text-[10px] text-[#64748b]">LAYER INVARIANTS:</div>
              {activeLayer.specDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                  <span className="font-mono text-[#10b981] mt-0.5">✓</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Selection Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
            <span className="text-[#64748b]">INSPECT RING:</span>
            <div className="flex items-center gap-1">
              {LENS_LAYERS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActiveLayerId(l.id)}
                  className={`w-6 h-6 flex items-center justify-center border transition-colors ${
                    l.id === activeLayerId
                      ? "border-white bg-white text-black font-bold"
                      : "border-white/10 bg-[#111115] text-[#94a3b8] hover:text-white"
                  }`}
                >
                  {l.ringNumber.split(" ")[1]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
