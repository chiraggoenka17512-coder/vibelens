"use client";

import React, { useState, useMemo } from "react";
import { ScanResult, Pin } from "../../types/graph";
import { buildCityLayout } from "../../lib/city/layout";
import { resolvePins } from "../../lib/city/pins";
import { getOnDemandReachabilityArcs } from "../../lib/city/reachability";
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
    <div className="w-full h-screen flex flex-col bg-[#060608] text-[#f8fafc] overflow-hidden select-none font-sans">
      {/* Top Industrial Telemetry Navigation Bar */}
      <header className="h-14 border-b border-white/10 px-6 flex items-center justify-between bg-[#09090b] z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#10b981]" />
            <span className="font-mono text-sm tracking-wider font-bold">
              VIBELENS // SPATIAL ARCHITECTURE
            </span>
          </div>

          {/* Core View Toggle: City vs Wiring (Graph) */}
          <div className="flex items-center bg-[#060608] border border-white/10 p-0.5">
            <button
              onClick={() => setViewMode("city")}
              data-testid="toggle-city"
              className={`px-3 py-1 font-mono text-xs transition-colors ${
                viewMode === "city"
                  ? "bg-[#111115] text-[#06b6d4] font-bold border border-white/10"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              [🏙️ City View]
            </button>
            <button
              onClick={() => setViewMode("graph")}
              data-testid="toggle-graph"
              className={`px-3 py-1 font-mono text-xs transition-colors ${
                viewMode === "graph"
                  ? "bg-[#111115] text-[#06b6d4] font-bold border border-white/10"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              [⚡ Wiring (Graph)]
            </button>
          </div>
        </div>

        {/* Telemetry Status Chips */}
        <div className="hidden md:flex items-center gap-2 font-mono text-xs">
          <div className="px-2.5 py-1 bg-[#060608] border border-white/10 text-[#06b6d4]">
            [MODE: {viewMode.toUpperCase()}]
          </div>
          <div className="px-2.5 py-1 bg-[#060608] border border-white/10 text-[#f8fafc]">
            [DISTRICTS: {layout.districts.length}] // [BUILDINGS: {layout.buildings.length}]
          </div>
          <div className="px-2.5 py-1 bg-[#060608] border border-white/10 text-[#10b981]">
            [PINS: {anchoredCount}]
          </div>
          {orphanedCount > 0 && (
            <div className="px-2.5 py-1 bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b]">
              [ORPHANED: {orphanedCount}]
            </div>
          )}
        </div>
      </header>

      {/* Main View Area */}
      <div className="flex-1 relative flex">
        {/* Left Telemetry Sidebar / Explorer */}
        <aside className="w-80 border-r border-white/10 bg-[#09090b]/90 p-4 z-10 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="font-mono text-xs text-[#64748b] mb-1">[SEARCH_EXPLORER]</div>
              <input
                type="text"
                placeholder="Filter files / symbols..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full bg-[#060608] border border-white/10 px-2.5 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-[#06b6d4]"
              />
            </div>

            {/* Quick Diagnostic Shortcuts */}
            <div>
              <div className="font-mono text-xs text-[#64748b] mb-2">[CRITICAL_VECTORS]</div>
              <button
                onClick={() => handleSelectBuilding("node_modules/jsonwebtoken")}
                className="w-full text-left p-2 bg-[#ef4444]/10 border border-[#ef4444]/30 hover:bg-[#ef4444]/20 font-mono text-xs text-[#ef4444] transition-colors mb-2"
              >
                🔴 jsonwebtoken (Reachable CVE Arc)
              </button>
              <button
                onClick={() => handleSelectBuilding("src/broken-runner.ts")}
                className="w-full text-left p-2 bg-[#09090b] border border-white/10 hover:border-white/30 font-mono text-xs text-[#94a3b8] transition-colors"
              >
                ⚠️ src/broken-runner.ts (Test Failure)
              </button>
            </div>

            {/* Districts List (Click-to-Focus) */}
            <div>
              <div className="font-mono text-xs text-[#64748b] mb-2">[DISTRICTS]</div>
              <div className="space-y-1">
                {layout.districts.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelectDistrict(d.id)}
                    className="w-full text-left px-2.5 py-1.5 bg-[#060608] border border-white/5 hover:border-white/20 font-mono text-xs text-[#94a3b8] flex items-center justify-between"
                  >
                    <span>{d.name}</span>
                    <span className="text-[10px] text-[#64748b]">{d.fileCount} bldgs</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pins List */}
            <div>
              <div className="font-mono text-xs text-[#64748b] mb-2">[ANNOTATION_PINS]</div>
              <div className="space-y-1">
                {resolvedPins.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPin(p.id)}
                    className={`w-full text-left p-2 border font-mono text-xs transition-colors ${
                      p.id === selectedPinId
                        ? "bg-[#111115] border-[#06b6d4] text-white"
                        : p.orphaned
                        ? "bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]"
                        : "bg-[#060608] border-white/5 text-[#94a3b8] hover:border-white/20"
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
          <div className="border-t border-white/10 pt-3 mt-4 font-mono text-[11px] text-[#64748b]">
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
            <div className="absolute top-4 left-6 bg-[#09090b]/95 border border-[#ef4444] px-4 py-2 font-mono text-xs text-[#ef4444] shadow-2xl flex items-center gap-3">
              <div className="w-2 h-2 bg-[#ef4444] animate-ping" />
              <span>
                [REACHABILITY_LASER: ACTIVE // {reachabilityArcs.length} ATTACK ARC RENDERED]
              </span>
            </div>
          )}

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
    </div>
  );
}
