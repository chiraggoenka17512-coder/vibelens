"use client";

import React, { useState } from "react";

export function OpticalSlider() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="bg-[#09090b] border border-white/10 p-6 text-[#f8fafc] font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#06b6d4]" />
            <h3 className="font-mono text-sm font-bold text-white tracking-wider">
              FEATURE 05: OPTICAL DIAGNOSTIC LENS (SPLIT DE-SLOP SLIDER)
            </h3>
          </div>
          <p className="text-xs text-[#94a3b8] mt-1">
            Chirag&apos;s Module: Interactive before/after split viewer comparing generic AI slop to CrashLens industrial telemetry.
          </p>
        </div>

        <div className="font-mono text-xs px-2.5 py-1 bg-[#060608] border border-white/10 text-[#06b6d4]">
          [LOUPE_POSITION: {sliderPos}%]
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full h-80 border border-white/10 overflow-hidden select-none bg-[#060608]">
        {/* Right Side: Clean CrashLens Industrial Interface (Base) */}
        <div className="absolute inset-0 bg-[#060608] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#10b981]" />
              <span className="font-mono text-xs text-white font-bold">
                AFTER: VIBELENS PRECISION ARCHITECTURE
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#10b981]">[31 SHIELDS SILENCED]</span>
          </div>

          <div className="grid grid-cols-3 gap-4 font-mono text-xs my-auto">
            <div className="p-3 bg-[#09090b] border border-white/10">
              <div className="text-[10px] text-[#64748b]">CANONICAL UTILITIES</div>
              <div className="text-lg font-bold text-[#10b981] mt-1">1 Single Source</div>
              <div className="text-[10px] text-[#94a3b8]">utils/formatDate.ts</div>
            </div>
            <div className="p-3 bg-[#09090b] border border-[#ef4444]/40">
              <div className="text-[10px] text-[#ef4444]">REACHABLE CVE EXPLOIT</div>
              <div className="text-lg font-bold text-[#ef4444] mt-1">1 Real Path</div>
              <div className="text-[10px] text-[#94a3b8]">jsonwebtoken.sign()</div>
            </div>
            <div className="p-3 bg-[#09090b] border border-white/10">
              <div className="text-[10px] text-[#64748b]">TOKEN BURDEN</div>
              <div className="text-lg font-bold text-[#06b6d4] mt-1">-39.6% SAVED</div>
              <div className="text-[10px] text-[#94a3b8]">Locked to AST</div>
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] text-[#64748b] border-t border-white/10 pt-2">
            <span>[100% MATHEMATICAL CLARITY]</span>
            <span>ZERO UNVERIFIED CODE</span>
          </div>
        </div>

        {/* Left Side: Messy AI Vibe Slop (Clipped) */}
        <div
          className="absolute inset-0 bg-[#1e1b4b] p-6 flex flex-col justify-between transition-all"
          style={{ width: `${sliderPos}%`, overflow: "hidden" }}
        >
          <div className="flex items-center justify-between border-b border-purple-400/20 pb-3 min-w-[500px]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#ef4444] animate-ping" />
              <span className="font-mono text-xs text-purple-200 font-bold">
                BEFORE: THE 48-HOUR VIBE CODING HANGOVER
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#ef4444]">[35 SCREAMING ALERTS]</span>
          </div>

          <div className="grid grid-cols-3 gap-4 font-mono text-xs my-auto min-w-[500px]">
            <div className="p-3 bg-purple-950/60 border border-purple-500/30">
              <div className="text-[10px] text-purple-300">DUPLICATE HELPERS</div>
              <div className="text-lg font-bold text-[#f59e0b] mt-1">14 Duplicate Files</div>
              <div className="text-[10px] text-purple-400">utils/ date/ helpers/</div>
            </div>
            <div className="p-3 bg-red-950/60 border border-red-500/50">
              <div className="text-[10px] text-red-300">RAW DEPENDABOT CVES</div>
              <div className="text-lg font-bold text-[#ef4444] mt-1">35 Critical Alarms</div>
              <div className="text-[10px] text-red-400">85% are dead code!</div>
            </div>
            <div className="p-3 bg-purple-950/60 border border-purple-500/30">
              <div className="text-[10px] text-purple-300">PROMPT TOKENS</div>
              <div className="text-lg font-bold text-red-400 mt-1">48,200 Tokens</div>
              <div className="text-[10px] text-purple-400">Context bloat &amp; lag</div>
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] text-purple-300 border-t border-purple-400/20 pt-2 min-w-[500px]">
            <span>UNTESTED AI PURPLE SLOP</span>
            <span>CANNOT DEPLOY SAFELY</span>
          </div>
        </div>

        {/* Divider Line & Draggable Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#06b6d4] shadow-[0_0_10px_#06b6d4] cursor-ew-resize z-10 flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-7 h-7 bg-[#09090b] border border-[#06b6d4] text-[#06b6d4] flex items-center justify-center font-mono text-[10px] font-bold shadow-xl">
            ↔
          </div>
        </div>
      </div>

      {/* Slider Control Input */}
      <div className="mt-4 flex items-center gap-4 font-mono text-xs text-[#94a3b8]">
        <span>[SLOP]</span>
        <input
          type="range"
          min="5"
          max="95"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="flex-1 accent-[#06b6d4] bg-[#060608] cursor-pointer"
        />
        <span>[PRECISION]</span>
      </div>
    </div>
  );
}
