# 👑 Chirag

> **Assigned Focus:** Master UI Architecture, Zephium Shell & Onboarding Experience  
> **Relevant Specs:** `docs/FINALIZED_FRONTEND_DESIGN_A.md`, `docs/specs/04-frontend-deslop.md`

---

## 🎯 Your Mission
You own the entire visual identity, design system, and the user interface shell of VibeLens. You are building the high-craft **Zephium Industrial Telemetry** frontend (graphite `#09090b` ground, hairline borders, halftone dot-matrix stippling, floating capsules) that frames the whole product and wows the Prasunex Innovathon judges.

### 🚫 Strict Rule: ZERO GRADIENTS (Zephium Benchmark)
* Absolutely NO CSS gradients (`bg-gradient-to-...`), no radial background glows, and no blurry gradient blobs.
* Use pure solid graphite surfaces (`#09090b`, `#111113`, `#18181b`), sharp hairline borders (`rgb(255 255 255 / 0.07)` to `0.12`), mathematical halftone dot-matrix stippling, and pure flat typography.

---

## 📂 Your Files & Directories
You own `app/` and `src/components/`:
* `app/layout.tsx`: Root dark theme layout, Geist Sans + Geist Mono typography pairing.
* `app/page.tsx`: Unified Master Workbench and storytelling experience.
* `app/app/xray/page.tsx`: Standalone 3D cockpit route wrapping Vihaan's 3D city and Aaryan's HUD.
* **The Zephium UI Shell Components:**
  * **Top-Notch Omnibar:** Floating translucent capsule command palette (`Search codebase symbols or natural language intent... (⌘K)`).
  * **Onboarding Location Modal ("Calibrate Your Grid"):** Collects user's home city during sign-up/onboarding (`BLR`, `SFO`, `NYC`, `LHR`, `HND`, `BER`) and updates the spatial coordinates telemetry.
  * **Floating Left Dock Rail:** 48px vertical rail for switching between `[City View]`, `[Wiring Graph]`, `[SAST Laser]`, `[Blast Radius]`, and `[MCP Bridge]`.
  * **Floating Bottom Telemetry Capsules:** Real-time monospace pills:
    `[🛡️ 88.6% CVEs Silenced]` `[⚡ 12ms AST Latency]` `[💥 1 Active Attack Path]`.
  * **Halftone Stipple Horizon:** Mathematical dot-matrix dissolve into the `#09090b` ground.
* `src/components/features/optical-slider.tsx`: Interactive draggable split de-slop comparison slider.
* `src/components/shared/telemetry-chip.tsx`: Reusable monospace hardware status chips (`[STATUS: ACTIVE // 12ms]`).

---

## 🔗 Who You Coordinate With
* **Vihaan & Aaryan:** You embed Vihaan's 3D City Canvas and Aaryan's Blast Radius Drawer into the main Zephium app shell.
* **Rajveer & Archit:** You wire up the live counter metrics on the dashboard based on Rajveer's ReachableSec benchmarks and Archit's CLI telemetry.
