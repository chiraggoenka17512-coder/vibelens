# 🌌 Vihaan

> **Assigned Focus:** 3D Spatial X-Ray City View, Personalized Metro Grids & MCP Server Tools  
> **Relevant Specs:** `docs/specs/03-3d-galaxy-canvas.md`, `docs/specs/06-zero-token-context-relay.md`, `docs/specs/01-mcp-prevention.md`  
> **Priority:** 🔴 Priority 2 (Days 4–8)

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
