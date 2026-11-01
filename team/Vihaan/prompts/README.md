# 🏙️ Vihaan

> **Assigned Focus:** 3D Spatial X-Ray City View, Personalized Metro Grids & MCP Server Tools  
> **Relevant Specs:** `docs/specs/03-3d-city-canvas.md`, `docs/specs/06-zero-token-context-relay.md`, `docs/specs/01-mcp-prevention.md`  
> **Target Branch:** `feat/3d-xray-vihaan`  
> **Target Test Suites:** `tests/layout.test.ts`, `tests/pins.test.ts`, `tests/metro.test.ts`

---

## 📜 3D "Repo as a City" Section Implementation Prompts (Prompts 0 - 11)

> **Workflow Rule:** Send Prompt 0 first, then each prompt in numerical order. Each prompt builds upon the previous, self-contained and verified step, ending with an explicit Acceptance Check. Always attach the reference screenshot to every prompt sent to an AI assistant.

| Step | File | Prompt Title | Focus & Acceptance Criteria |
| :---: | :--- | :--- | :--- |
| **0** | [`0.md`](./0.md) | **Ground Rules & Design System** | Standalone HTML contract (`repo-city.html`), exact CDN libraries, color tokens, font specs, zero-drag invariant. |
| **1** | [`1.md`](./1.md) | **Page Section & Layout** | Full-width `#repo-city` section, eyebrow, serif heading, bottom-left dark translucent panel, responsive mobile stacking. |
| **2** | [`2.md`](./2.md) | **Three.js Scene & Isometric Camera** | WebGL renderer setup, transparent canvas, OrthographicCamera at `(20, 20, 20)`, lighting, invisible ground plane & grid helper. |
| **3** | [`3.md`](./3.md) | **Data Loader & Placeholder Data** | Decoupled `loadCityData()`, seeded `mulberry32(42)`, 64 deterministic files, LOC distribution, flagged and dead code flags. |
| **4** | [`4.md`](./4.md) | **Building Geometry & Materials** | `0.9 x 0.9` footprints, base pivot anchor at `y=0`, multi-face material arrays, slate blue, orange flagged, and ghosted dead code outlines. |
| **5** | [`5.md`](./5.md) | **City Layout by Folder Districts** | Deterministic 3x2 folder district grid, 4x3 subgrid slots, inter-district arterial gaps, centered coordinates. |
| **6** | [`6.md`](./6.md) | **Entry Animation (Back-to-Front Wave)** | GSAP ScrollTrigger one-time wave, staggered diagonal rise from back to front over 1.2s, camera swoop from `(14, 26, 26)`. |
| **7** | [`7.md`](./7.md) | **Idle Sway** | Subtle `±2°` harmonic orbital camera drift (25s period), frozen when hovering or out of viewport. |
| **8** | [`8.md`](./8.md) | **Hover Lift & Label** | Layer-filtered raycasting on live buildings, `0.15` unit tactile lift, screen-projected HTML tooltip with path, LOC, and flag status. |
| **9** | [`9.md`](./9.md) | **Click-to-Trace Red Arc** | Public route entry marker at `(-10.5, 0.1, 0)`, animated quadratic bezier laser arc to clicked flagged building, breathing pulse, clean disposal. |
| **10** | [`10.md`](./10.md) | **Scroll Integration & Final Polish** | ScrollTrigger 120% section pinning, master timeline hook `window.repoCityTimeline()`, full garbage cleanup `destroy()`, zero console logs. |
| **11** | [`11.md`](./11.md) | **Final QA Against Screenshot** | 20-point verification checklist (PASS/FAIL) checking typography, colors, animations, responsive behavior, and clean runtime. |

---

## 🤖 1-Click Prompt for Antigravity & Qoder
> **Instructions for Vihaan:** When you open Antigravity or Qoder, copy-paste this prompt into the chat window:

```text
I am Vihaan working on feature branch feat/3d-xray-vihaan.
1. Read team/Vihaan/README.md, AGENTS.md, and GEMINI.md for my strict scope.
2. My mission is building the 3D City View treemap, metro presets, and Wiring Graph in src/components/city/ and src/lib/city/.
3. Invariants: ZERO CSS gradients. Background must be solid graphite #09090b. Height scales with LOC.
4. Data Contract: Consume ScanResult from src/types/graph.ts and CityLayout from src/lib/city/types.ts.
5. Definition of Done: Your work is done ONLY when 'npm run verify' exits with 0 errors.
```

---

## 🎯 Your Mission
You build the flagship visual experience and the AI agent integration bridge of VibeLens:
1. **3D Spatial Software City (City View):** Uses Three.js and `@react-three/fiber` to render a 100% deterministic squarified treemap software city where building height scales with LOC and multi-state overlays reflect health, scaffolding, and flood zones.
2. **Personalized Metropolitan Grids:** Incorporates the user's home location chosen during sign-up/onboarding (`BLR`, `SFO`, `NYC`, `LHR`, `HND`, `BER`) to calibrate the city layout's district boundaries and arterial bridges.
3. **Wiring Graph & On-Demand Lasers:** Provides the secondary orbital 3D force graph toggle and renders red quadratic bezier laser arcs (`#ef4444`) on demand only when a vulnerable node is selected.
4. **ContextRelay MCP Server & Tools:** Implements the Model Context Protocol (MCP) server so Cursor, Claude Code, and Windsurf can query VibeLens with 0 prompt token overhead.

### 🚫 Strict Rule: ZERO GRADIENTS & Zephium Aesthetic
* No blurry gradient orbs, no colorful background washes. Keep the WebGL background solid obsidian graphite (`#09090b`). Let the clean geometric buildings, lit window lattices, and crisp red laser lines do all the visual work.

---

## 📂 Your Files & Directories
You own `src/components/city/`, `src/lib/city/`, and `src/lib/mcp/`:
* `src/lib/city/layout.ts`: Deterministic squarified treemap layout generator and LOC building height scaling.
* `src/lib/city/metro-presets.ts`: Metropolitan grid presets (`BLR`, `SFO`, `NYC`, `LHR`, `HND`, `BER`) and location calibration.
* `src/lib/city/states.ts`: Multi-state visual overlay resolver (working, broken, under-construction, vulnerable, dim-ghost).
* `src/lib/city/pins.ts`: Pin resolution engine with AST fingerprint room matching and orphaned pin dock.
* `src/lib/city/reachability.ts`: On-demand reachability arc paths for vulnerable nodes.
* `src/components/city/vibelens-3d-viewer.tsx`: Master 3D viewer with `[City View]` vs `[Wiring (Graph)]` view toggle.
* `src/components/city/city-canvas.tsx`: Three.js City View canvas container.
* `src/components/xray/graph-canvas.tsx`: Three.js Wiring Graph canvas container.
* `src/components/city/building-mesh.tsx`: 3D building geometry with lit windows, scaffolding cage, and rooms.
* `src/components/city/reachability-laser.tsx`: Animated pulsing red laser beam (`#ef4444`) tracing the single verified zero-day exploit path.
* `src/lib/mcp/server.ts`: JSON-RPC over stdio server using `@modelcontextprotocol/sdk`.
* `src/lib/mcp/tools/get-handover.ts`: Native tool `vibelens_get_handover` returning Rajveer's 380-token handover manifest.
* `src/lib/mcp/tools/find-utility.ts`: Native tool `find_existing_utility` querying AST vector registry before AI writes duplicate code.
* `src/lib/mcp/tools/check-package.ts`: Native tool `check_package` checking package CVE status against OSV before `npm install`.

---

## 🔗 Who You Coordinate With
* **Rajveer:** You consume Rajveer's ReachableSec JSON DAG for the 3D canvas and his `.vibelens/handover.json` for the MCP handover tool.
* **Aaryan:** When a user clicks a building/node in your 3D canvas, you trigger an animated camera swoop and notify Aaryan's Blast Radius inspector to open.
* **Chirag:** Chirag embeds your 3D canvas directly into the Zephium-style app shell (`app/page.tsx` and `app/app/xray/page.tsx`).
