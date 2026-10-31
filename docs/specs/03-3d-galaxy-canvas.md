# Spec 03: 3D Spatial X-Ray City View & Metropolitan Grid System

> **Module:** Visual Observability, Spatial Topology & Personalization  
> **Framework:** Three.js via `@react-three/fiber` & `@react-three/drei`  
> **Aesthetic Benchmark:** Zephium (`zephium.app`) + CrashLens Industrial Telemetry  
> **Master Design Spec:** `docs/FINALIZED_FRONTEND_DESIGN_A.md`

---

## 1. Overview
Renders the repository as an interactive 3D WebGL software city against an obsidian graphite canvas (`#09090b`), displaying real-time AST telemetry, multi-state building overlays, on-demand reachability attack paths, and a personalized metropolitan grid tailored to the user's home location selected during sign-up/onboarding.

---

## 2. Spatial 3D Architecture

### 2.1 City View (Primary View: Folder-Based Treemap)
* **Deterministic Layout:** Uses a squarified treemap algorithm (`src/lib/city/layout.ts`) that guarantees 0% simulation drift and permanent spatial coordinate stability.
* **Building Height Scaling:** Derived deterministically from Lines of Code (LOC) with `sqrt` scaling:
  $$\text{Height} = \text{clamp}(1.0, 14.0, \sqrt{\text{LOC}} \times 0.7)$$
* **Multi-State Building Geometry:**
  * **Working (`#10b981` Emerald):** Clean production modules with lit window lattices.
  * **Broken (`#ef4444` Red):** Modules with test failures or build errors.
  * **Under-Construction (`#f59e0b` Yellow):** Active git staging branches, wrapped in 3D scaffolding wireframe cages.
  * **Vulnerable (`#ef4444` Crimson):** Reachable zero-day CVEs, surrounded by an animated red flood zone base plane.
  * **Dim Ghost (`#27272a` Zinc):** Dead code and unreachable packages dimmed to 30% opacity.

### 2.2 Wiring Graph (Secondary View: Orbital Force Graph)
* Accessible via the top-notch omnibar view switcher `[City View]` ⇄ `[Wiring (Graph)]`.
* Shares identical selection state, node keys, and metrics with the City View.

### 2.3 On-Demand Reachability Lasers
* 0 laser arcs rendered by default to eliminate visual noise.
* When a vulnerable node is clicked, red quadratic bezier laser arcs (`#ef4444`) dynamically trace the verified attack path from public HTTP entrypoints down to the compromised package.

---

## 3. The Personalized Metropolitan Grid (Sign-Up Location Calibration)

### 3.1 Onboarding Flow: "Where Are You Building From?"
During user sign-in or initial repository initialization (`npx vibelens init`), VibeLens prompts the developer for their home city.
* Stored 100% locally in `.vibelens/config.json` (`{ "metro": "BLR", "name": "Bengaluru" }`) and `localStorage` (`vibelens_metro`). Zero cloud telemetry.
* Sets the active spatial blueprint and aerospace telemetry coordinates in the top bar: `[GRID: BLR // 12.9716° N, 77.5946° E]`.

### 3.2 Pre-Bundled Metropolitan Grid Presets (`src/lib/city/metro-presets.ts`)
1. **Bengaluru (`BLR` - 12.9716° N, 77.5946° E):** Outer ring road tech corridors hold dependencies; central CBD houses public API routes.
2. **San Francisco (`SFO` - 37.7749° N, 122.4194° W):** Peninsula coastline with Bay Bridge & Golden Gate cross-bay reachability arcs.
3. **New York City (`NYC` - 40.7128° N, 74.0060° W):** Manhattan street grid with towering skyscrapers and waterfront avenues.
4. **London (`LHR` - 51.5074° N, 0.1278° W):** River Thames curve dividing server-side routes and client components.
5. **Tokyo (`HND` - 35.6762° N, 139.6503° E):** Yamanote radial railway ring and Tokyo Bay maritime utilities.
6. **Berlin (`BER` - 52.5200° N, 13.4050° E):** Spree river arteries and clean Bauhaus architectural blocks.

---

## 4. The Zephium UI Aesthetic Framework

VibeLens interfaces follow the visual standard established by `zephium.app` and `zephium-browser/website`:
* **Top-Notch Omnibar:** A floating capsule search bar in the top notch: `[ 🔍 Search codebase symbols or natural language intent... (⌘K) ]`.
* **Floating Left Dock Rail:** 48px vertical rail with view switchers (`City`, `Wiring`, `SAST`, `Blast Radius`, `MCP`).
* **Floating Bottom Telemetry Capsules:** Monospace pills at the footer: `[🛡️ 88.6% CVEs Silenced] [⚡ 12ms AST Latency] [💥 1 Active Attack Path]`.
* **Halftone Dot-Matrix Horizon:** Night sky and atmospheric backgrounds dissolve into the `#09090b` graphite ground via mathematical halftone stippling.
* **Graphite Neutrals:** Ground (`#09090b`), Plate (`#111113`), Surface (`#18181b`), Raised (`#212125`), Hairline borders (`rgb(255 255 255 / 0.07)`).
