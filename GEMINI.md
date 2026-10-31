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
6. **Local Embeddings Only (Zero Cloud Leaks).** Never call cloud embedding APIs (OpenAI, Voyage, etc.) with repository symbols or user feature prompts. Intent-to-AST matching must execute 100% locally on-device using quantized sentence transformers (`all-MiniLM-L6-v2` / `bge-small` via Transformers.js in WebAssembly / Node.js). Zero API keys required.
7. **Local Location Calibration Contract.** User location/city selected during sign-up or onboarding is stored strictly on-device in `.vibelens/config.json` and browser `localStorage`. Zero geolocation tracking or external cloud IP queries.

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
   - `[GRID: BLR // 12.9716° N, 77.5946° E]`
5. **Tactile Matte Panels (No Heavy Blur Lag):** Use crisp, solid translucent panels (`bg-zinc-950/85 border border-white/10`) without expensive dynamic `backdrop-blur` during scroll to ensure guaranteed 60–120 FPS.
6. **4-Tier Color Conventions (Solid Pure Hues):**
   - 🔴 **Red (`#ef4444`):** Reachable zero-day exploit paths / Critical vulnerabilities.
   - 🟠 **Orange (`#f97316`):** Likely indirect paths / Blast radius breaking callers.
   - 🟡 **Yellow (`#f59e0b`):** AI Vibe Slop / Duplicate helper clusters / Unknown dynamic code.
   - 🟢 **Emerald (`#10b981`):** Healthy code / Silenced phantom CVE shields / Green test passes.
7. **The Zephium Aesthetic Benchmark (`zephium.app` & `zephium-browser/website`):**
   - **Graphite Neutral Tokens:** Ground (`#09090b`), Plate (`#111113`), Surface (`#18181b`), Raised (`#212125`), Hairline borders (`rgb(255 255 255 / 0.07)` to `0.12`).
   - **Halftone Dither & Sky Dissolve:** Cloud and atmospheric backgrounds dissolving into pitch-black `#09090b` ground via mathematical halftone dot-matrix stippling.
   - **Vibrancy Glass & Floating Capsules:** Hairline translucent pills (`backdrop-blur-md bg-white/5 border border-white/10 rounded-full`), top-notch omnibar, floating left dock rail, and bottom telemetry pill widgets.
   - **Geometric Stencil Display:** Geometric tracked wordmark and clean monospace status metrics. Zero generic AI slop.

---

## 🏗️ Architecture & Component Boundaries

1. **One Place Constructs the Database Client:**
   - All Supabase and Drizzle ORM queries live inside `lib/db/`.
   - Never import raw database connection strings inside client components.
2. **Server Components vs. Client Components:**
   - Database reads and server actions stay in React Server Components (`app/`).
   - Three.js WebGL canvas (`@react-three/fiber`) and interactive sliders are strictly `"use client"`.
3. **Spatial 3D Architecture:**
   - **City View (Folder-Based Treemap):** The primary default spatial view. 100% deterministic, zero simulation drift, permanent pin anchoring.
   - **Personalized Metropolitan Grids:** Incorporates the user's home location chosen during sign-up/onboarding (`BLR`, `SFO`, `NYC`, `LHR`, `HND`, `BER`) to calibrate district boundaries, bridges, and aerospace telemetry (`[GRID: BLR // 12.97° N, 77.59° E]`).
   - **Wiring Graph:** The secondary view behind the toggle. Both views share the identical underlying data model and selection state.
4. **Tri-Bridge Universal Agent & IDE Connector (Apps & Web):**
   - **Bridge 1 (Desktop IDE Apps):** Standalone stdio/HTTP MCP server (`bin/mcp-server.js` & `lib/mcp/`) for Cursor, Claude Code, and Windsurf.
   - **Bridge 2 (Web AI Platforms):** Deterministic 380-token AST state snapshot (`.vibelens/handover.json`) + 1-Click Clipboard Relay for v0.dev, Bolt.new, Lovable.dev, and Replit.
   - **Bridge 3 (Browser Extensions & Web Tools):** Local CORS-enabled REST API (`app/api/vibelens/handover` & `app/api/vibelens/check-utility`).
5. **The Zero-Slop Prompt Compiler:**
   - Combines local quantized `all-MiniLM-L6-v2` dense vectors with exact AST keyword matching.
   - Intercepts developer feature intents, searches local symbols, and compiles a surgical ~140-token guardrail instruction before the coding agent writes code.
