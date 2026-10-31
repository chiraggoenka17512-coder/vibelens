# Qoder Agent Rules - VibeLens Architecture & Invariants

You are working on the **VibeLens** codebase. You must strictly follow these non-negotiable rules without exception.

---

## 🚫 Non-Negotiable Domain Invariants

1. **Honest Reachability (Never Guess):** Dynamic `require(variable)`, `eval()`, and runtime reflection must ALWAYS be classified as **`Unknown`**. Never falsely claim dynamic code is safe or unreachable.
2. **Deterministic Graphs Only:** An edge in the AST Call-Graph exists only if verified by `@babel/traverse` or `es-module-lexer`. Never invent imaginary edges.
3. **100% Local Privacy (Zero Cloud Code Uploads):** All AST parsing, call-graph traversal, file-watching, and embedding inference must execute **100% locally on the developer's machine**. Anonymized dependency names only for querying local/cached CVE databases.
4. **Local Verification Gate (Never Break Tests):** Before finishing, you must verify that `npm test` (`vitest run`) and `npx tsc --noEmit` exit with 0 errors. If any test fails, fix it immediately.
5. **Pure JavaScript / TypeScript Stack:** Stick strictly to the Next.js / TypeScript / React ecosystem. No foreign language runtimes (no Python, no Rust, no Go binary wrappers).
6. **Local Embeddings Only (Zero Cloud Leaks):** Never call cloud embedding APIs (OpenAI, Voyage, etc.) with repository symbols or user feature prompts. Intent-to-AST matching must execute 100% locally on-device using quantized sentence transformers (`all-MiniLM-L6-v2` / `bge-small` via Transformers.js in WebAssembly / Node.js). Zero API keys required.
7. **Local Location Calibration Contract:** Location / city selected during sign-up or onboarding is stored strictly on-device in `.vibelens/config.json` and browser `localStorage`. Zero geolocation tracking or external cloud IP queries.

---

## 🎨 The "CrashLens" & Zephium Design System

1. **Zero CSS Gradients (STRICT RULE):** Absolutely NO CSS gradients (`bg-gradient-to-...`), no radial background glows, and no blurry gradient blobs. All surfaces must be solid matte planes (`#09090b`, `#111113`, `#18181b`) with sharp hairline borders (`border-white/10`).
2. **Halftone Dot-Matrix Stippling:** Atmospheric sky and horizons dissolve into the `#09090b` ground via mathematical halftone stippling.
3. **Hardware Monospace Telemetry:** Wrap status metrics and counters in monospace chips (`[STATUS: ACTIVE // 12ms]`, `[DAG_NODES: 72]`, `[GRID: BLR // 12.9716° N]`).
4. **4-Tier Solid Hues:**
   - 🔴 Red (`#ef4444`): Reachable zero-day exploit paths / Critical vulnerabilities.
   - 🟠 Orange (`#f97316`): Likely indirect paths / Blast radius breaking callers.
   - 🟡 Yellow (`#f59e0b`): AI Vibe Slop / Duplicate helper clusters / Unknown dynamic code.
   - 🟢 Emerald (`#10b981`): Healthy code / Silenced phantom CVE shields / Green test passes.

---

## 🔒 Contract-First Types (Do Not Invent Data Models)

All shared data structures must be imported directly from:
- `src/types/graph.ts` (Nodes, Edges, Metrics, ScanResult, Pin)
- `src/lib/city/types.ts` (CityLayout, CityBuilding, CityDistrict, CityRoom)
- `src/lib/city/metro-presets.ts` (MetroGridPreset: BLR, SFO, NYC, LHR, HND, BER)

Do not create alternative duplicate interfaces for nodes or metrics.
