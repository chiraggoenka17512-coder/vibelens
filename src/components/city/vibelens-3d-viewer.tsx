"use client";

import React, { useState, useMemo } from "react";
import { ScanResult, Pin } from "../../types/graph";
import { buildCityLayout } from "../../lib/city/layout";
import { resolvePins } from "../../lib/city/pins";
import { getOnDemandReachabilityArcs } from "../../lib/city/reachability";
import { METRO_PRESETS, detectDefaultMetro, getMetroPreset } from "../../lib/city/metro-presets";
import { MetroGridPreset } from "../../lib/city/types";
import { CityCanvas } from "./city-canvas";
import { GraphCanvas } from "../xray/graph-canvas";
import { CommentPanel } from "./comment-panel";

export type ViewMode = "city" | "graph";

interface VibeLens3DViewerProps {
  initialScan: ScanResult;
}

export function VibeLens3DViewer({ initialScan }: VibeLens3DViewerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("city");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [pins, setPins] = useState<Pin[]>(initialScan.pins);
  const [focusedTarget, setFocusedTarget] = useState<[number, number, number] | null>(null);
  const [filterQuery, setFilterQuery] = useState("");
  
  // Metro grid calibration (detected from locale or chosen by user)
  const [activeMetro, setActiveMetro] = useState<MetroGridPreset>(() => detectDefaultMetro());
  const [showMetroModal, setShowMetroModal] = useState(false);

  // 1. Compute stable city layout (100% deterministic)
  const layout = useMemo(() => {
    return buildCityLayout(initialScan.nodes);
  }, [initialScan.nodes]);

  // 2. Resolve pins (anchored to building/room or marked as orphaned)
  const { resolvedPins, orphanedCount, anchoredCount } = useMemo(() => {
    return resolvePins(pins, layout);
  }, [pins, layout]);

  // 3. Resolve on-demand reachability arcs (0 by default, only drawn for vulnerable nodes)
  const reachabilityArcs = useMemo(() => {
    return getOnDemandReachabilityArcs(
      selectedNodeId,
      initialScan.nodes,
      initialScan.edges,
      layout
    );
  }, [selectedNodeId, initialScan.nodes, initialScan.edges, layout]);

  // Selected building reference for comment panel
  const selectedBuilding = useMemo(() => {
    if (!selectedNodeId) return null;
    return layout.buildings.find((b) => b.nodeId === selectedNodeId) || null;
  }, [selectedNodeId, layout.buildings]);

  // Handle building selection
  const handleSelectBuilding = (nodeId: string) => {
    setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
    setSelectedPinId(null);

    const bldg = layout.buildings.find((b) => b.nodeId === nodeId);
    if (bldg) {
      setFocusedTarget([bldg.x + bldg.width / 2, bldg.height, bldg.z + bldg.depth / 2]);
    }
  };

  // Handle pin selection (pans camera to pin)
  const handleSelectPin = (pinId: string) => {
    setSelectedPinId(pinId);
    const p = resolvedPins.find((rp) => rp.id === pinId);
    if (p) {
      if (p.buildingId) {
        const bldg = layout.buildings.find((b) => b.id === p.buildingId);
        if (bldg) setSelectedNodeId(bldg.nodeId);
      }
      setFocusedTarget([p.x, p.y, p.z]);
    }
  };

  // Handle district focus
  const handleSelectDistrict = (districtId: string) => {
    const dist = layout.districts.find((d) => d.id === districtId);
    if (dist) {
      setFocusedTarget([dist.x + dist.width / 2, 2, dist.z + dist.depth / 2]);
    }
  };

  // Add new pin
  const handleAddPin = (newPinData: Omit<Pin, "id" | "createdAt">) => {
    const newPin: Pin = {
      ...newPinData,
      id: `pin_${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setPins((prev) => [...prev, newPin]);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#09090b] text-[#f4f4f6] overflow-hidden select-none font-sans">
      {/* Top Zephium-Style Omnibar & Navigation Bar */}
      <header className="h-14 border-b border-white/10 px-6 flex items-center justify-between bg-[#111113] z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#10b981]" />
            <span className="font-mono text-xs tracking-wider font-bold text-white">
              VIBELENS // COCKPIT
            </span>
          </div>

          {/* Core View Toggle: City vs Wiring (Graph) */}
          <div className="flex items-center bg-[#09090b] border border-white/10 p-0.5 rounded-md">
            <button
              onClick={() => setViewMode("city")}
              data-testid="toggle-city"
              className={`px-3 py-1 font-mono text-xs transition-colors rounded ${
                viewMode === "city"
                  ? "bg-[#18181b] text-[#10b981] font-bold border border-white/10"
                  : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              [🏙️ City View]
            </button>
            <button
              onClick={() => setViewMode("graph")}
              data-testid="toggle-graph"
              className={`px-3 py-1 font-mono text-xs transition-colors rounded ${
                viewMode === "graph"
                  ? "bg-[#18181b] text-[#10b981] font-bold border border-white/10"
                  : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              [⚡ Wiring (Graph)]
            </button>
          </div>
        </div>

        {/* Center Omnibar Search Capsule */}
        <div className="hidden lg:flex items-center bg-[#18181b] border border-white/10 rounded-full px-4 py-1.5 w-96 text-xs text-[#a1a1aa] font-mono">
          <span className="mr-2 text-white">🔍</span>
          <span className="truncate">Type intent: &quot;add cart expiry timer&quot; (⌘K)</span>
        </div>

        {/* Right Telemetry & Metro Grid Selector */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Active Metro Grid Selector Button */}
          <button
            onClick={() => setShowMetroModal(true)}
            className="px-3 py-1 bg-[#18181b] border border-white/10 hover:border-white/30 text-[#10b981] rounded flex items-center gap-1.5 transition-colors"
            title="Click to calibrate home metropolitan grid"
          >
            <span>📍</span>
            <span>[GRID: {activeMetro.code} // {activeMetro.lat}]</span>
          </button>

          <div className="hidden md:flex px-2.5 py-1 bg-[#09090b] border border-white/10 text-white rounded">
            [{layout.districts.length} DISTRICTS // {layout.buildings.length} BLDGS]
          </div>
          {orphanedCount > 0 && (
            <div className="px-2.5 py-1 bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b] rounded">
              [ORPHANED: {orphanedCount}]
            </div>
          )}
        </div>
      </header>

      {/* Main View Area */}
      <div className="flex-1 relative flex">
        {/* Left Telemetry Sidebar / Explorer */}
        <aside className="w-80 border-r border-white/10 bg-[#111113]/95 p-4 z-10 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="font-mono text-xs text-[#a1a1aa] mb-1">[SEARCH_EXPLORER]</div>
              <input
                type="text"
                placeholder="Filter files / symbols..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full bg-[#09090b] border border-white/10 px-2.5 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-[#10b981]"
              />
            </div>

            {/* Quick Diagnostic Shortcuts */}
            <div>
              <div className="font-mono text-xs text-[#a1a1aa] mb-2">[CRITICAL_VECTORS]</div>
              <button
                onClick={() => handleSelectBuilding("node_modules/jsonwebtoken")}
                className="w-full text-left p-2 bg-[#ef4444]/10 border border-[#ef4444]/30 hover:bg-[#ef4444]/20 font-mono text-xs text-[#ef4444] transition-colors mb-2"
              >
                🔴 jsonwebtoken (Reachable CVE Arc)
              </button>
              <button
                onClick={() => handleSelectBuilding("src/broken-runner.ts")}
                className="w-full text-left p-2 bg-[#18181b] border border-white/10 hover:border-white/30 font-mono text-xs text-[#a1a1aa] transition-colors"
              >
                ⚠️ src/broken-runner.ts (Test Failure)
              </button>
            </div>

            {/* Districts List (Mapped to Metro Grid Neighborhoods) */}
            <div>
              <div className="font-mono text-xs text-[#a1a1aa] mb-2 flex items-center justify-between">
                <span>[METRO_DISTRICTS]</span>
                <span className="text-[10px] text-[#10b981]">{activeMetro.name}</span>
              </div>
              <div className="space-y-1">
                {layout.districts.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelectDistrict(d.id)}
                    className="w-full text-left px-2.5 py-1.5 bg-[#09090b] border border-white/5 hover:border-white/20 font-mono text-xs text-[#a1a1aa] flex items-center justify-between rounded"
                  >
                    <div className="truncate">
                      <span className="text-white">{d.name}</span>
                      <div className="text-[10px] text-[#71717a] truncate">
                        {d.id.includes("api") || d.id.includes("app")
                          ? activeMetro.districtLabels.core
                          : d.id.includes("comp")
                          ? activeMetro.districtLabels.components
                          : activeMetro.districtLabels.utils}
                      </div>
                    </div>
                    <span className="text-[10px] text-[#71717a] ml-2 shrink-0">{d.fileCount} bldgs</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pins List */}
            <div>
              <div className="font-mono text-xs text-[#a1a1aa] mb-2">[ANNOTATION_PINS]</div>
              <div className="space-y-1">
                {resolvedPins.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPin(p.id)}
                    className={`w-full text-left p-2 border font-mono text-xs transition-colors rounded ${
                      p.id === selectedPinId
                        ? "bg-[#18181b] border-[#10b981] text-white"
                        : p.orphaned
                        ? "bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]"
                        : "bg-[#09090b] border-white/5 text-[#a1a1aa] hover:border-white/20"
                    }`}
                  >
                    <div className="truncate font-semibold">{p.title}</div>
                    <div className="text-[10px] opacity-75 truncate">{p.targetName}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Active Selection Telemetry */}
          <div className="border-t border-white/10 pt-3 mt-4 font-mono text-[11px] text-[#a1a1aa]">
            <div>[SELECTED_NODE]</div>
            <div className="text-white truncate font-bold">
              {selectedNodeId || "None (Click building or pin)"}
            </div>
          </div>
        </aside>

        {/* 3D Canvas View (City or Graph) */}
        <main className="flex-1 relative h-full">
          {viewMode === "city" ? (
            <CityCanvas
              layout={layout}
              pins={resolvedPins}
              reachabilityArcs={reachabilityArcs}
              selectedNodeId={selectedNodeId}
              selectedPinId={selectedPinId}
              focusedTarget={focusedTarget}
              onSelectBuilding={handleSelectBuilding}
              onSelectPin={handleSelectPin}
              onSelectDistrict={handleSelectDistrict}
            />
          ) : (
            <GraphCanvas
              nodes={initialScan.nodes}
              edges={initialScan.edges}
              selectedNodeId={selectedNodeId}
              onSelectNode={handleSelectBuilding}
            />
          )}

          {/* On-Demand Laser HUD Alert Banner */}
          {reachabilityArcs.length > 0 && (
            <div className="absolute top-4 left-6 bg-[#09090b]/95 border border-[#ef4444] px-4 py-2 font-mono text-xs text-[#ef4444] shadow-2xl flex items-center gap-3 rounded">
              <div className="w-2 h-2 bg-[#ef4444] animate-ping" />
              <span>
                [REACHABILITY_LASER: ACTIVE // {reachabilityArcs.length} ATTACK ARC RENDERED]
              </span>
            </div>
          )}

          {/* Floating Zephium-Style Bottom Status Telemetry Capsules */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-auto">
            <div className="bg-[#111113]/90 border border-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full font-mono text-xs text-white shadow-xl flex items-center gap-2">
              <span className="text-[#10b981]">🛡️</span>
              <span>88.6% CVEs Silenced</span>
            </div>
            <div className="bg-[#111113]/90 border border-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full font-mono text-xs text-[#a1a1aa] shadow-xl flex items-center gap-2">
              <span className="text-[#06b6d4]">⚡</span>
              <span>12ms AST Latency</span>
            </div>
            <div className="bg-[#111113]/90 border border-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full font-mono text-xs text-[#ef4444] shadow-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
              <span>1 Reachable Exploit</span>
            </div>
          </div>

          {/* Sliding Comment Panel for Selected Building */}
          {selectedBuilding && (
            <CommentPanel
              building={selectedBuilding}
              pins={pins}
              onClose={() => setSelectedNodeId(null)}
              onAddPin={handleAddPin}
            />
          )}
        </main>
      </div>

      {/* Onboarding / Location Grid Calibration Modal */}
      {showMetroModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111113] border border-white/20 max-w-lg w-full p-6 font-mono text-xs shadow-2xl rounded-lg">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2 text-white font-bold">
                <span>📍</span>
                <span>CALIBRATE METROPOLITAN GRID</span>
              </div>
              <button
                onClick={() => setShowMetroModal(false)}
                className="text-[#a1a1aa] hover:text-white"
              >
                [✕]
              </button>
            </div>

            <p className="text-[#a1a1aa] mb-4">
              Where are you building from? VibeLens synthesizes your repository&apos;s 3D software city around your home metropolitan layout.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {METRO_PRESETS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveMetro(m);
                    setShowMetroModal(false);
                  }}
                  className={`p-3 text-left border rounded transition-all ${
                    activeMetro.id === m.id
                      ? "bg-[#18181b] border-[#10b981] text-white"
                      : "bg-[#09090b] border-white/10 text-[#a1a1aa] hover:border-white/30"
                  }`}
                >
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>{m.name}</span>
                    <span className="text-[#10b981] text-[10px]">[{m.code}]</span>
                  </div>
                  <div className="text-[10px] text-[#71717a] mt-0.5">{m.country}</div>
                  <div className="text-[10px] text-[#a1a1aa] mt-1">{m.lat}, {m.lon}</div>
                </button>
              ))}
            </div>

            <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[11px] text-[#71717a]">
              <span>Stored locally in .vibelens/config.json</span>
              <button
                onClick={() => setShowMetroModal(false)}
                className="px-4 py-1.5 bg-[#18181b] hover:bg-[#212125] text-white border border-white/10 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
