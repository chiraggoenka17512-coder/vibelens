# AGENTS.md - Agent Routing, Design System & Universal Bridge Handbook

This file defines architecture invariants, design systems, and integration contracts for all AI coding agents (Antigravity, Cursor, Claude Code, Windsurf, v0.dev, Bolt.new, Lovable.dev) working in the **VibeLens** repository.

---

## 🎯 1. Non-Negotiable Domain Invariants

Every agent generating or modifying code in this repository MUST strictly follow these 6 invariants:

1. **Honest Reachability (Never Guess):** Dynamic `require(variable)`, `eval()`, and runtime reflection must ALWAYS be classified honestly as **`Unknown`**. Never falsely claim dynamic code is safe.
2. **Deterministic Graphs Only:** An edge in the AST Call-Graph exists only if verified by `@babel/traverse` or `es-module-lexer`. If an edge cannot be resolved, flag it as unresolvable.
3. **100% Local Privacy (Zero Cloud Code Uploads):** All AST parsing, call-graph traversal, file-watching, and embedding inference must execute **100% locally on the developer's machine**. Anonymized dependency names only for querying local/cached CVE databases.
4. **Local Verification Gate (Never Commit Broken Tests):** Automated merges, refactors, and pull requests must execute `npm test` (`vitest run`) locally first. If any test fails, abort the refactor and report the error.
5. **Pure JavaScript / TypeScript Stack:** Stick strictly to the Next.js / TypeScript / React ecosystem. No foreign language runtimes (no Python, no Rust, no Go binary wrappers).
6. **Local Embeddings Only (Zero Cloud Leaks):** Never call cloud embedding APIs (OpenAI, Voyage, etc.) with repository symbols or user feature prompts. Intent-to-AST matching must execute 100% locally on-device using quantized sentence transformers (`all-MiniLM-L6-v2` / `bge-small` via Transformers.js in WebAssembly / Node.js). Zero API keys required.

---

## 🎨 2. The "CrashLens" Design System & Styling Rules

VibeLens interfaces follow the **CrashLens Industrial Telemetry** design framework:

1. **Pitch Black Canvas:** Backgrounds must use obsidian/pitch black (`#060608` or `#09090b`) with high-contrast neutral text (`#f4f4f5`, `#a1a1aa`).
2. **ZERO CSS GRADIENTS (Strict Rule):** Absolutely NO CSS gradients (`bg-gradient-to-...`), no radial gradients, and no blurry colored gradient orbs/blobs. All surfaces must be solid matte planes (`#060608`, `#09090b`, `#111115`) with sharp 1px borders (`border-white/10`).
3. **CAD Blueprint & Grid Markings:** Subtle grid coordinate markings (`[+000, +000]`), technical crosshairs, and dot matrices.
4. **Hardware Monospace Telemetry:** Monospace typography (Geist Mono / JetBrains Mono) for status chips, pings, vector clocks, and token metrics:
   - `[STATUS: ACTIVE // 12ms]`
   - `[DAG_NODES: 72 // RESIDUAL: 0.04]`
   - `[CVE_FILTER: 88.6% SILENCED]`
5. **Tactile Matte Panels (No Expensive Blur Lag):** Use crisp, solid translucent panels (`bg-zinc-950/85 border border-white/10`) without expensive dynamic `backdrop-blur` during scroll to ensure guaranteed 60–120 FPS.
6. **4-Tier Pure Solid Hues:**
   - 🔴 **Red (`#ef4444`):** Reachable zero-day exploit paths / Critical vulnerabilities.
   - 🟠 **Orange (`#f97316`):** Likely indirect paths / Blast radius breaking callers.
   - 🟡 **Yellow (`#f59e0b`):** AI Vibe Slop / Duplicate helper clusters / Unknown dynamic code.
   - 🟢 **Emerald (`#10b981`):** Healthy code / Silenced phantom CVE shields / Green test passes.

---

## 🌐 3. The Tri-Bridge Universal Agent Architecture

VibeLens is built to connect seamlessly to both desktop IDE agents and web-based AI builders:

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

### Agent Integration Instructions:
- **Before creating a new utility function:** Query `.vibelens/handover.json` or call `POST /api/vibelens/check-utility` with your intended utility signature to reuse existing canonical helpers rather than generating duplicates.
- **Before modifying exported functions:** Check the Blast Radius via MCP tool `vibelens_get_blast_radius` or verify callers to prevent breaking downstream code.
- **For Web AI Prompting:** When copying handover prompts into v0.dev or Bolt.new, utilize the pre-compiled ~140-token Zero-Slop Prompt Compiler instructions generated by VibeLens.

---

## 🏗️ 4. Spatial 3D Architecture Guidelines

1. **City View (Folder-Based Treemap):**
   - The primary default spatial view.
   - 100% deterministic squarified treemap layout.
   - Building heights derived deterministically from Lines of Code (LOC) clamped via `sqrt` scaling.
   - Pins & comments permanently anchored to file paths and AST function fingerprints.
2. **Wiring Graph:**
   - Orbital 3D force-directed dependency view accessed via the UI toggle.
   - Shares identical selection state, node keys, and metrics with City View.
3. **On-Demand Reachability Lasers:**
   - 0 laser arcs rendered by default to eliminate visual noise.
   - Red laser arcs render only when an infected/vulnerable node is actively selected.

---

## 🧪 5. Testing & Verification

Always run the full test suite before committing or claiming completion:
```bash
npm test
```
Vitest must report 100% green across all test suites (`layout.test.ts`, `states.test.ts`, `pins.test.ts`, `reachability.test.ts`, `toggle.test.ts`).
