# Spec 03: 3D Spatial X-Ray Galaxy & Blast Radius HUD

> **Module:** Visual Observability & Interactive Topology  
> **Framework:** Three.js via `@react-three/fiber` & `@react-three/drei`  
> **UI Layer:** Tailwind CSS v4 + `shadcn/ui` (CrashLens Industrial Design System)

---

## 1. Overview
Renders the repository as an interactive 3D WebGL galaxy against an obsidian canvas (`#09090b`), displaying real-time telemetry, node clustering, and bidirectional blast radius inspection.

## 2. Visual Encodings & Shaders
* **Emerald Nodes (`#10b981`):** Clean, active modules with zero dead dependencies.
* **Yellow Cluster Arcs (`#f59e0b`):** AI vibe slop, duplicate functions, and token-bloated files.
* **Gray Shield Nodes (`#64748b`):** Silenced 85% phantom CVEs.
* **Red Laser Beams (`#ef4444`):** Reachable zero-day exploit paths with animated packet pulses.

## 3. The Blast Radius Inspector (Solving Problem #5)
* **Interaction:** Clicking any 3D node triggers an animated camera swoop and opens the slide-out `detail-pane.tsx`.
* **Upstream Impact:** Traces incoming edges to highlight every calling file that breaks if the node is deleted.
* **Downstream Dependencies:** Traces outgoing edges to show packages and sub-utilities required.

