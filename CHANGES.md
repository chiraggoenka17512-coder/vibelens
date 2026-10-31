# 🏙️ CHANGES.md: VibeLens City View & Graph Toggle

## 1. Files Touched & Created

### Core City Layout & States
- [`src/lib/city/types.ts`](file:///c:/Users/Chirag/Desktop/vibelens/src/lib/city/types.ts): Data contracts for districts, buildings, rooms, treemap rects, and visual states.
- [`src/lib/city/layout.ts`](file:///c:/Users/Chirag/Desktop/vibelens/src/lib/city/layout.ts): Deterministic squarified treemap layout generator and building height calculator (sqrt/log scale with min/max clamp).
- [`src/lib/city/states.ts`](file:///c:/Users/Chirag/Desktop/vibelens/src/lib/city/states.ts): Multi-state visual overlay resolver and CrashLens color tokens.
- [`src/lib/city/pins.ts`](file:///c:/Users/Chirag/Desktop/vibelens/src/lib/city/pins.ts): Pin resolution engine with AST fingerprint room matching and orphaned pin preservation.
- [`src/lib/city/reachability.ts`](file:///c:/Users/Chirag/Desktop/vibelens/src/lib/city/reachability.ts): On-demand reachability arc calculator (0 edges by default, highlights only active exploit path on selection).

### 3D Renderers & UI Components
- [`src/components/city/building-mesh.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/src/components/city/building-mesh.tsx): Three.js building geometry with lit windows, flood zones, scaffolding cage, and function rooms.
- [`src/components/city/district-mesh.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/src/components/city/district-mesh.tsx): Ground plane tiles with district boundaries and aggregated state halos.
- [`src/components/city/pin-mesh.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/src/components/city/pin-mesh.tsx): 3D CAD diamond pin beacons with orphaned warning indicators.
- [`src/components/city/reachability-laser.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/src/components/city/reachability-laser.tsx): Red quadratic bezier laser arcs for verified exploit paths.
- [`src/components/city/comment-panel.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/src/components/city/comment-panel.tsx): Slide-out comment inspector for dropping and reading annotations on buildings.
- [`src/components/city/city-canvas.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/src/components/city/city-canvas.tsx): Interactive Three.js R3F Canvas with camera focus controller and OrbitControls.
- [`src/components/xray/graph-canvas.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/src/components/xray/graph-canvas.tsx): Secondary 3D dependency graph view ("Wiring") sharing identical data and selection state.
- [`src/components/city/vibelens-3d-viewer.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/src/components/city/vibelens-3d-viewer.tsx): Top-level orchestrator with `[City View]` vs `[Wiring (Graph)]` view toggle, sidebar filters, and telemetry chips.

### App Routes & Data
- [`src/data/sample-scan.ts`](file:///c:/Users/Chirag/Desktop/vibelens/src/data/sample-scan.ts): Realistic scan output for `fixtures/sample-app`.
- [`app/app/xray/page.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/app/app/xray/page.tsx): Main 3D spatial dashboard route.
- [`app/page.tsx`](file:///c:/Users/Chirag/Desktop/vibelens/app/page.tsx): Updated storytelling hero with direct launcher link to `/app/xray`.

### Tests
- [`tests/layout.test.ts`](file:///c:/Users/Chirag/Desktop/vibelens/tests/layout.test.ts): Determinism (Acceptance Check 1), stability on unrelated file addition (Acceptance Check 2), and height scale (Acceptance Check 6).
- [`tests/states.test.ts`](file:///c:/Users/Chirag/Desktop/vibelens/tests/states.test.ts): Multi-state overlay resolution.
- [`tests/pins.test.ts`](file:///c:/Users/Chirag/Desktop/vibelens/tests/pins.test.ts): Pin anchoring to buildings/functions and orphaned pin mechanics (Acceptance Check 3).
- [`tests/reachability.test.ts`](file:///c:/Users/Chirag/Desktop/vibelens/tests/reachability.test.ts): On-demand arc rendering and 0 edges by default (Acceptance Check 4).
- [`tests/toggle.test.ts`](file:///c:/Users/Chirag/Desktop/vibelens/tests/toggle.test.ts): View toggle and shared selection persistence (Acceptance Check 5).

---

## 2. Metrics Mapped to Visual States

| Visual State | Visual Appearance | Scanner Metrics Used |
| :--- | :--- | :--- |
| **Working** | Solid dark matte (`#1e293b`), lit emerald windows (`#10b981`), normal CAD lines | `metrics.tests === "pass" && !hasErrors && reachableCVEs === 0 && !isDeadCode` |
| **Broken** | Submerged/flooded dark hull (`#09090b`), red distress wireframe (`#ef4444`) | `metrics.tests === "fail" \|\| metrics.errors > 0 \|\| metrics.hasBuildFailure` |
| **Under construction** | Amber lattice scaffolding cage overlay (`#f59e0b`) | `metrics.todosCount > 0 \|\| metrics.isUnfinishedBranch \|\| metrics.hasActiveSession` |
| **Vulnerable** | Crimson hazard flood zone perimeter on ground floor (`#ef4444`) | `metrics.reachableCVEs > 0` |
| **Dim/ghost** | Muted dark gray, translucent faded material (`opacity: 0.35`, `transparent: true`) | `metrics.isDeadCode === true \|\| metrics.reachability === "unreachable"` |

*Note: A district and a building can carry multiple states simultaneously (e.g., both vulnerable flood zone and scaffolding cage overlays).*

---

## 3. Missing Scanner Metrics & Fallback Strategy

The following metrics are referenced in the visual specification but were not present in the initial raw scanner JSON:
1. **`hasActiveSession`**: Indicates an active AI coding session in Cursor/Claude. Defaulted safely to `false` when absent.
2. **`isUnfinishedBranch`**: Indicates a WIP git branch. Defaulted safely to `false` when absent.
3. **`hasBuildFailure`**: Indicates build compilation failure. Defaulted to checking `metrics.errors > 0` or `false` when absent.

---

## 4. Description of Default View on the Sample Repo (`fixtures/sample-app`)

When loading the sample repo in the default **City View**:
1. **Districts:**
   - `app/api/checkout`: Houses `route.ts` with HTTP entry point.
   - `node_modules`: Houses `jsonwebtoken` (tall building) and `lodash` (dim/ghost building).
   - `utils`: Houses canonical utility `formatDate.ts` (working state).
   - `helpers`: Houses duplicate helper `parseDate.ts` (under-construction scaffolding).
   - `src`: Houses `broken-runner.ts` (broken/flooded dark state).
2. **Default Edge Visibility:**
   - Exactly **0 edges or lines** are drawn across the city by default.
3. **Pins:**
   - 2 anchored diamond pins (`pin-jwt-audit` and `pin-date-canon`) hover over their respective buildings with connecting anchor stems.
   - 1 orphaned pin (`pin-orphaned-legacy`) hovers in the western perimeter staging dock with an amber indicator ring.
4. **On-Demand Reachability Laser:**
   - Clicking `node_modules/jsonwebtoken` instantly ignites a glowing neon red arc leaping through the air from `app/api/checkout/route.ts` to `jsonwebtoken`.
5. **View Toggle:**
   - Clicking `[⚡ Wiring (Graph)]` transitions smoothly to the 3D orbital dependency graph while preserving the exact selection on `jsonwebtoken`.

