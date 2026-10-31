"use client";

import React, { useState, useEffect } from "react";

export function CliSentinelTester() {
  const [logs, setLogs] = useState<string[]>([
    "[11:45:00] [SENTINEL BOOT] VibeWatcher v1.0.0 daemon started.",
    "[11:45:00] [WATCHER] Monitoring 6 files across fixtures/sample-app at 1Hz.",
    "[11:45:01] [AST REGISTRY] 2 canonical utilities registered in memory.",
    "[11:45:02] [SENTINEL: ACTIVE] Waiting for Cursor / Claude file save events...",
  ]);
  const [slopPending, setSlopPending] = useState(false);
  const [purgedCount, setPurgedCount] = useState(1);
  const [tick, setTick] = useState(0);

  // 1Hz Sentinel Heartbeat
  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerSlopSimulation = () => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      `[${time}] [FILE_EVENT] User prompted Cursor IDE to create a new Date helper.`,
      `[${time}] [VibeLens Sentinel] ⚠️ SLOP DETECTED in src/components/Card.tsx`,
      `   ➔ Cursor just hallucinated a duplicate 'formatDate' helper.`,
      `   ➔ Found existing canonical utility in utils/formatDate.ts#L8.`,
      `   ➔ Press [Y] to auto-link existing function and cancel duplication.`,
    ]);
    setSlopPending(true);
  };

  const handleConfirmAutoLink = () => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      `[${time}] [AUTO-RESOLVER] Key [Y] pressed by developer.`,
      `[${time}] [REWRITE] Updated src/components/Card.tsx:`,
      `   import { formatDate } from "@/utils/formatDate";`,
      `[${time}] ✔ Duplication cancelled at source. 420 prompt tokens saved!`,
      `[${time}] [STATUS: READY] Sentinel back to 1Hz standby.`,
    ]);
    setSlopPending(false);
    setPurgedCount((c) => c + 1);
  };

  const triggerPackageCheck = () => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      `[${time}] [WATCHER] package.json updated: detected 'lodash@4.17.21'.`,
      `[${time}] [SAST RADAR] Checking OSV vulnerability database...`,
      `[${time}] [AST TRACE] lodash has 0 references in application entrypoints.`,
      `[${time}] 🟢 UNREACHABLE: lodash is dead code. 3 Dependabot CVEs silenced into phantom shields.`,
    ]);
  };

  const handleClearLogs = () => {
    setLogs(["[VibeWatcher] Terminal reset. Sentinel standing by at 1Hz."]);
    setSlopPending(false);
  };

  return (
    <div className="bg-[#09090b] border border-white/10 p-6 text-[#f8fafc] font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f59e0b]" />
            <h3 className="font-mono text-sm font-bold text-white tracking-wider">
              FEATURE 04: VIBEWATCHER 1HZ CLI SENTINEL
            </h3>
          </div>
          <p className="text-xs text-[#94a3b8] mt-1">
            Archit&apos;s Module: Real-time background file sentinel with instant one-key duplication auto-linker.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-2.5 py-1 bg-[#060608] border border-white/10 text-[#10b981] flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#10b981] animate-ping" />
            <span>[1Hz SENTINEL TICK: {tick}s]</span>
          </div>
          <div className="px-2.5 py-1 bg-[#060608] border border-white/10 text-[#06b6d4]">
            [SLOP PURGED: {purgedCount}]
          </div>
        </div>
      </div>

      {/* Interactive Trigger Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={triggerSlopSimulation}
          className="px-3 py-1.5 bg-[#111115] hover:bg-white/10 border border-[#f59e0b] text-[#f59e0b] font-mono text-xs font-bold transition-colors"
        >
          [SIMULATE AI DUPLICATE HELPER]
        </button>

        {slopPending && (
          <button
            onClick={handleConfirmAutoLink}
            className="px-3 py-1.5 bg-[#10b981]/20 hover:bg-[#10b981]/30 border border-[#10b981] text-[#10b981] font-mono text-xs font-bold transition-colors animate-pulse"
          >
            [PRESS &apos;Y&apos; TO AUTO-LINK CANONICAL UTILITY]
          </button>
        )}

        <button
          onClick={triggerPackageCheck}
          className="px-3 py-1.5 bg-[#111115] hover:bg-white/10 border border-white/20 text-[#94a3b8] font-mono text-xs hover:text-white transition-colors"
        >
          [SIMULATE PACKAGE INGESTION]
        </button>

        <button
          onClick={handleClearLogs}
          className="px-3 py-1.5 bg-[#060608] border border-white/10 text-[#64748b] font-mono text-xs hover:text-white transition-colors ml-auto"
        >
          [CLEAR TERMINAL]
        </button>
      </div>

      {/* Terminal Output Window */}
      <div className="bg-[#060608] border border-white/10 p-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 text-[#64748b]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#ef4444]" />
            <div className="w-2.5 h-2.5 bg-[#f59e0b]" />
            <div className="w-2.5 h-2.5 bg-[#10b981]" />
            <span className="text-[11px] ml-2">TERMINAL: npx vibelens watch</span>
          </div>
          <span className="text-[10px]">[1Hz DAEMON // CHOKIDAR + BABEL]</span>
        </div>

        <div className="space-y-1.5 max-h-64 overflow-y-auto leading-relaxed">
          {logs.map((log, index) => {
            const isWarning = log.includes("⚠️") || log.includes("SLOP");
            const isSuccess = log.includes("✔") || log.includes("CONFIRMED");
            const isPath = log.includes("➔");

            return (
              <div
                key={index}
                className={
                  isWarning
                    ? "text-[#f59e0b] font-bold"
                    : isSuccess
                    ? "text-[#10b981] font-bold"
                    : isPath
                    ? "text-[#06b6d4]"
                    : "text-[#94a3b8]"
                }
              >
                {log}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

