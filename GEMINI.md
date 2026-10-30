# GEMINI.md - Agent Instructions & Architecture Handbook

This document governs all AI agents and developers building within the **VibeLens** repository.

---

## 🎯 Core Mission & Domain Invariants

VibeLens is a local-first codebase hygiene, vulnerability reachability, and 3D architecture visualization system designed for the generative AI coding era.

### 🚫 The Banned Failure Modes (Non-Negotiable)
1. **Never falsely claim an unreachable CVE is safe if it involves dynamic code.** Dynamic `require(variable)`, `eval()`, and runtime reflection must ALWAYS be classified honestly as **`Unknown`**. Never guess.
2. **Never invent imaginary call paths.** An edge in the AST Call-Graph exists only if verified by `@babel/traverse` or `es-module-lexer`. If an edge cannot be resolved, flag it as unresolvable.
3. **Never upload raw source code to external servers.** All AST parsing, call-graph traversal, and file-watching must execute **100% locally on the developer's machine**. Only anonymized dependency names query the OSV/NVD CVE cache.
4. **Never open a GitHub Pull Request without running the local test suite.** Automated merges and refactors must execute `npm test` / `vitest` locally first. If any test fails, abort the refactor and log the failure.
5. **Stick strictly to the JavaScript / TypeScript / React stack.** No foreign language runtimes (no Python, no Rust, no Go binary wrappers).

---

## 🎨 The "CrashLens" Design System & Styling Rules

VibeLens interfaces follow the **CrashLens Industrial Telemetry** design framework:

1. **No White Screen Default:** Canvas must use obsidian/pitch black (`#09090b` or `#050507`) with high-contrast neutral text.
2. **ZERO GRADIENTS (Strict Rule):** Absolutely NO CSS gradients (`bg-gradient-to-...`), no radial gradients, and no blurry colored gradient orbs/blobs. All surfaces must be solid matte planes (`#060608`, `#09090b`, `#111115`) with sharp 1px borders (`border-white/10`).
3. **CAD Blueprint & Grid Markings:** Subtle grid coordinate markings (`[+000, +000]`), technical crosshairs, and dot matrices.
4. **Hardware Monospace Telemetry:** Monospace typography (Geist Mono / JetBrains Mono) for status chips, pings, vector clocks, and token metrics:
   - `[STATUS: ACTIVE // 12ms]`
   - `[DAG_NODES: 72 // RESIDUAL: 0.04]`
   - `[CVE_FILTER: 88.6% SILENCED]`
5. **Tactile Matte Panels (No Heavy Blur Lag):** Use crisp, solid translucent panels (`bg-zinc-950/85 border border-white/10`) without expensive dynamic `backdrop-blur` during scroll to ensure guaranteed 60–120 FPS.
6. **4-Tier Color Conventions (Solid Pure Hues):**
   - 🔴 **Red (`#ef4444`):** Reachable zero-day exploit paths / Critical vulnerabilities.
   - 🟠 **Orange (`#f97316`):** Likely indirect paths / Blast radius breaking callers.
   - 🟡 **Yellow (`#f59e0b`):** AI Vibe Slop / Duplicate helper clusters / Unknown dynamic code.
   - 🟢 **Emerald (`#10b981`):** Healthy code / Silenced phantom CVE shields / Green test passes.

---

## 🏗️ Architecture & Component Boundaries

1. **One Place Constructs the Database Client:**
   - All Supabase and Drizzle ORM queries live inside `lib/db/`.
   - Never import raw database connection strings inside client components.
2. **Server Components vs. Client Components:**
   - Database reads and server actions stay in React Server Components (`app/`).
   - Three.js WebGL canvas (`@react-three/fiber`) and interactive sliders are strictly `"use client"`.
3. **MCP Tooling Isolation:**
   - Model Context Protocol server tools live in `lib/mcp/` and run as a standalone stdio process (`bin/mcp-server.js`).

