"use client";

import React, { useState } from "react";
import { CityBuilding } from "../../lib/city/types";
import { Pin } from "../../types/graph";

interface CommentPanelProps {
  building: CityBuilding | null;
  pins: Pin[];
  onClose: () => void;
  onAddPin: (newPin: Omit<Pin, "id" | "createdAt">) => void;
}

export function CommentPanel({
  building,
  pins,
  onClose,
  onAddPin,
}: CommentPanelProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("Engineer");

  if (!building) return null;

  const buildingPins = pins.filter((p) => p.filePath === building.filePath);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim()) return;

    onAddPin({
      filePath: building.filePath,
      title: newTitle.trim(),
      comment: newComment.trim(),
      author: author.trim() || "Engineer",
    });

    setNewTitle("");
    setNewComment("");
  };

  return (
    <aside className="fixed right-6 top-20 w-96 max-h-[85vh] overflow-y-auto bg-[#09090b]/95 border border-white/10 p-5 shadow-2xl z-50 text-[#f8fafc] font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div>
          <div className="font-mono text-xs text-[#64748b]">[COMMENT_INSPECTOR]</div>
          <h3 className="font-bold text-sm tracking-tight truncate max-w-[260px]">
            {building.fileName}
          </h3>
          <p className="font-mono text-[11px] text-[#94a3b8] truncate">{building.filePath}</p>
        </div>
        <button
          onClick={onClose}
          className="text-[#64748b] hover:text-white font-mono text-xs px-2 py-1 border border-white/10"
        >
          [ESC]
        </button>
      </div>

      {/* Building Telemetry Chips */}
      <div className="flex flex-wrap gap-2 mb-4 font-mono text-[10px]">
        <div className="px-2 py-0.5 bg-[#111115] border border-white/10 text-[#06b6d4]">
          LOC: {building.node.metrics.lines}
        </div>
        <div className="px-2 py-0.5 bg-[#111115] border border-white/10 text-[#10b981]">
          STATE: {building.primaryState.toUpperCase()}
        </div>
        {building.node.metrics.reachableCVEs > 0 && (
          <div className="px-2 py-0.5 bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444]">
            CVE: {building.node.metrics.reachableCVEs} REACHABLE
          </div>
        )}
      </div>

      {/* Existing Pins & Comments List */}
      <div className="space-y-3 mb-6">
        <h4 className="font-mono text-xs text-[#94a3b8] border-b border-white/5 pb-1">
          ANCHORED PINS ({buildingPins.length})
        </h4>

        {buildingPins.length === 0 ? (
          <p className="text-xs text-[#64748b] italic py-2">
            No pinned annotations on this building yet. Add one below.
          </p>
        ) : (
          buildingPins.map((pin) => (
            <div key={pin.id} className="p-3 bg-[#111115] border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#f8fafc]">{pin.title}</span>
                <span className="font-mono text-[10px] text-[#64748b]">{pin.createdAt}</span>
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed">{pin.comment}</p>
              <div className="font-mono text-[10px] text-[#06b6d4]">@{pin.author}</div>
            </div>
          ))
        )}
      </div>

      {/* Add New Pin Form */}
      <form onSubmit={handleSubmit} className="border-t border-white/10 pt-4 space-y-3">
        <h4 className="font-mono text-xs text-[#f8fafc]">DROP NEW PIN ON BUILDING</h4>

        <div>
          <label className="block font-mono text-[10px] text-[#94a3b8] mb-1">PIN TITLE</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Audit checkout session validation"
            className="w-full bg-[#111115] border border-white/10 px-2.5 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#06b6d4]"
          />
        </div>

        <div>
          <label className="block font-mono text-[10px] text-[#94a3b8] mb-1">COMMENT / NOTE</label>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            placeholder="Document invariant, vulnerability risk, or refactoring intent..."
            className="w-full bg-[#111115] border border-white/10 px-2.5 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#06b6d4]"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            className="w-24 bg-[#111115] border border-white/10 px-2 py-1 text-xs text-[#94a3b8]"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-[#09090b] border border-[#10b981] hover:bg-[#10b981]/10 text-[#10b981] font-mono text-xs transition-colors"
          >
            [SAVE PIN]
          </button>
        </div>
      </form>
    </aside>
  );
}
