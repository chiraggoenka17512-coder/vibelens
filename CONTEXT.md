# CONTEXT.md - VibeLens Architecture & System Context

> **Project:** VibeLens  
> **Mission:** Autonomous 3D Codebase X-Ray, ReachableSec SAST & Dual MCP Prevention Engine for AI Vibe Coders  
> **Target Event:** Prasunex Innovathon 2026 (Unstop)  
> **Architecture:** 100% Local-First TypeScript / React Ecosystem

---

## 1. Executive Summary

VibeLens cures the **"48-Hour Vibe Coding Hangover"** and enterprise DevSecOps alert fatigue:
1. **ReachableSec 4-Tier SAST:** Traces static AST execution paths from public HTTP entrypoints down to third-party dependencies, mathematically proving that **88.6% of Dependabot CVE alerts are dead code** (dropping 35 scary alerts to 1 real exploit).
2. **3D Spatial Architecture (City View & Wiring Graph):** Renders the repository as a deterministic squarified treemap software city with multi-state visual overlays (lit windows, scaffolding, flood zones, dim ghost) and an orbital 3D wiring graph toggle.
3. **Tri-Bridge Universal Agent & IDE Connector:** Connects seamlessly to both desktop IDE apps (Cursor, Windsurf, Claude Code via MCP) and web AI platforms (v0.dev, Bolt.new, Lovable.dev via `.vibelens/handover.json` and 1-click clipboard relay).
4. **Zero-Slop Prompt Compiler:** Uses a local on-device quantized embedding model (`all-MiniLM-L6-v2` / `bge-small` in ~23MB WASM) to map natural language feature intent to existing AST utilities, compiling ~140-token surgical guardrails before the coding agent writes code.

---

## 2. Non-Negotiable Domain Invariants

1. **Honest Reachability:** Dynamic `require()`, `eval()`, and runtime reflection must ALWAYS be classified honestly as **`Unknown`**. Never guess.
2. **Deterministic Graphs Only:** An edge in the call-graph exists only if verified by `@babel/traverse` or `es-module-lexer`.
3. **100% Local Privacy:** Source code is NEVER uploaded to cloud servers. All AST parsing, graph traversal, and file-watching execute on-device.
4. **Automated Safety Gate:** Never open a Pull Request without running local unit tests (`npm test` / `vitest`).
5. **Pure JS/TS Stack:** No Python, Rust, or Go binary wrappers.
6. **Local Embeddings Only:** Embedding inference runs 100% locally via Transformers.js in WebAssembly/Node.js. Zero API keys, zero cloud leaks, $0.00 token cost.
7. **ZERO GRADIENTS (CrashLens Invariant):** All surfaces are solid obsidian/matte planes (`#060608`, `#09090b`, `#111115`) with sharp 1px borders (`border-white/10`) and Geist Mono hardware telemetry.

---

## 3. Team Roster & Subsystem Allocation

| Teammate | Focus | Core Deliverables | Directory |
| :--- | :--- | :--- | :--- |
| **👑 Chirag** | **Master UI & Storytelling** | Whole UI shell, Bilingual Toggle, Optical Diagnostic Split Slider, 5-Act Journey | `team/Chirag/` & `app/` |
| **🛡️ Rajveer** | **ReachableSec SAST & Handover** | `@babel/parser` AST call-graph, 4-tier classifier, `.vibelens/handover.json` generator | `team/Rajveer/` & `src/lib/reachablesec/` |
| **🌌 Vihaan** | **3D Spatial X-Ray & MCP** | Three.js City View & Wiring Graph, shader meshes, red laser arcs, MCP server tools | `team/Vihaan/` & `src/components/city/` |
| **🔍 Aaryan** | **Blast Radius & Universal Bridge** | Slide-out HUD drawer, breaking callers, test-gated PR, REST API gateway, Clipboard Relay | `team/Aaryan/` & `src/components/hud/` |
| **🛡️ Archit** | **VibeWatcher CLI Sentinel** | `npx vibelens watch` 1Hz daemon (`commander` + `chokidar`), terminal alert UI, 1-key auto-link | `team/Archit/` & `src/cli/` |

---

## 4. The Tri-Bridge Architecture (Apps & Web)

```
                       ┌──────────────────────────────────────────────┐
                       │              VIBELENS CORE HUB               │
                       │        (Local Engine & 3D Web Cockpit)       │
                       └──────────────────────┬───────────────────────┘
                                              │
         ┌────────────────────────────────────┼────────────────────────────────────┐
         ▼                                    ▼                                    ▼
┌─────────────────────────────────┐ ┌────────────────────────────────┐ ┌─────────────────────────────────┐
│      BRIDGE 1: MCP SERVER       │ │   BRIDGE 2: FILE CONTRACT      │ │    BRIDGE 3: LOCAL REST API     │
│  (Desktop IDE Apps & Terminals) │ │    (Web AI Cloud Platforms)    │ │   (Browser Extensions & DApps)  │
├─────────────────────────────────┤ ├────────────────────────────────┤ ├─────────────────────────────────┤
│ • Cursor IDE (Desktop App)      │ │ • v0.dev (Web)                 │ │ • Chrome / Browser Extensions   │
│ • Claude Code CLI (Terminal)    │ │ • Bolt.new (Web)               │ │ • Web IDEs (Replit/Codespaces)  │
│ • Windsurf / Cascade (App)      │ │ • Lovable.dev (Web)            │ │ • Localhost curl scripts        │
│ • VS Code / Antigravity         │ │ • ChatGPT Canvas (Web)         │ │ • CORS: Access-Control-Allow:*  │
│ ➔ Stdio/HTTP MCP JSON-RPC       │ │ ➔ .vibelens/handover.json      │ │ ➔ GET  /api/vibelens/handover   │
│ ➔ Tool: vibelens_get_handover   │ │ ➔ 1-Click Clipboard Relay      │ │ ➔ POST /api/vibelens/check-util │
└─────────────────────────────────┘ └────────────────────────────────┘ └─────────────────────────────────┘
```

---

## 5. Key File Locations

- **Master Workbench Page:** [`app/page.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/app/page.tsx)
- **3D Spatial X-Ray Route:** [`app/app/xray/page.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/app/app/xray/page.tsx)
- **City Layout Generator:** [`src/lib/city/layout.ts`](file:///c:/Users/Chirag/Desktop/vibelens/src/lib/city/layout.ts)
- **City Canvas:** [`src/components/city/city-canvas.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/src/components/city/city-canvas.tsx)
- **3D Wiring Graph:** [`src/components/xray/graph-canvas.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/src/components/xray/graph-canvas.tsx)
- **Pin & Comment System:** [`src/lib/city/pins.ts`](file:///c:/Users/Chirag/Desktop/vibelens/src/lib/city/pins.ts) & [`src/components/city/comment-panel.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/src/components/city/comment-panel.tsx)
- **On-Demand Reachability Laser:** [`src/lib/city/reachability.ts`](file:///c:/Users/Chirag/Desktop/vibelens/src/lib/city/reachability.ts) & [`src/components/city/reachability-laser.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/src/components/city/reachability-laser.tsx)
- **Universal REST API Endpoints:** [`app/api/vibelens/handover/route.ts`](file:///c:/Users/Chirag/Desktop/vibelens/app/api/vibelens/handover/route.ts) & [`app/api/vibelens/check-utility/route.ts`](file:///c:/Users/Chirag/Desktop/vibelens/app/api/vibelens/check-utility/route.ts)
- **Test Suite:** [`tests/`](file:///c:/Users/Chirag/Desktop/vibelens/tests/) (`vitest run` — 14 tests green)
