# 🏛️ VibeLens: Finalized Frontend Design Specification (Direction A)

> **Status:** APPROVED & LOCKED FOR PRODUCTION  
> **Aesthetic Framework:** CrashLens Industrial Telemetry + Optical X-Ray  
> **Target Execution Window:** Days 1–15 (Prasunex Innovathon 2026)  
> **Core Stack:** Next.js 15 (App Router), React 19, TypeScript, Three.js (`@react-three/fiber` & `@react-three/drei`), Tailwind CSS v4, `shadcn/ui` (Radix Primitives)

---

## 1. Visual Identity & Design Tokens

VibeLens adheres strictly to the **CrashLens Industrial Telemetry** design framework: zero white-screen defaults, pitch-black obsidian backgrounds, CAD blueprint precision crosshairs, and live monospace telemetry chips.

### 🚫 Strict Invariant: Zero Gradients
* **BANNED:** Absolutely NO CSS gradients (`bg-gradient-to-...`), no radial background glows, no rainbow mesh gradients, and no blurry gradient blobs. Gradients are the signature of cheap AI templates.
* **MANDATORY:** Pure solid matte surfaces (`#060608`, `#09090b`, `#111115`), crisp 1px hairline borders (`border-white/10` or `border-zinc-800`), and razor-sharp solid color signals.

### 1.1 Color Palette & Token Conventions
* **Void Background:** Solid `#060608` (Base WebGL & Page Canvas)
* **Surface Panels:** Solid matte `#09090b` or `#111115` with `border border-white/10` (no heavy dynamic blur lag)
* **Text Hierarchy:** High-contrast neutral `#f8fafc` (Headings), `#94a3b8` (Body/Subtitles), `#64748b` (Muted CAD labels)
* **The 4-Tier Semantic Signals:**
  * 🔴 **Neon Red (`#ef4444`):** Reachable zero-day exploit paths / Verified vulnerability attack vectors.
  * 🟠 **Orange Flare (`#f97316`):** Blast radius breaking callers / Likely indirect dependencies.
  * 🟡 **Amber Yellow (`#f59e0b`):** AI vibe slop / Hallucinated duplicate helper clusters.
  * 🟢 **Emerald Green (`#10b981`):** Pristine modules / Silenced phantom CVE shields / Sentinel active status.
  * 🔵 **Cyan Laser (`#06b6d4`):** ReachableSec live AST scanline.

### 1.2 Typography & CAD Ornamentation
* **Primary Sans:** `Geist Sans` / `Inter` (Tight tracking: `-0.02em` for headings).
* **Telemetry Monospace:** `Geist Mono` / `JetBrains Mono` for hardware status chips:
  * `[STATUS: ACTIVE // 12ms]`
  * `[DAG_NODES: 72 // RESIDUAL: 0.04]`
  * `[CVE_FILTER: 88.6% SILENCED]`
  * `[TOKEN_BURN: -39.6% VERIFIED]`
* **Micro-Details:** 1px hairline CAD crosshairs (`+ [X: 140, Y: -20]`), subtle dot-matrix background grids, and interactive spring hover states.

---

## 2. The Two Core Frontend Surfaces

```
                              ┌────────────────────────────────────────────────────────┐
                              │                 VIBELENS FRONTEND ARCH                 │
                              └───────────────────────────┬────────────────────────────┘
                                                          │
                    ┌─────────────────────────────────────┴─────────────────────────────────────┐
                    ▼                                                                           ▼
┌───────────────────────────────────────────────┐               ┌───────────────────────────────────────────────┐
│     SURFACE 1: THE STORYTELLING LANDING       │               │      SURFACE 2: 3D SPATIAL X-RAY (APP)        │
│ • 5-Act Builder Journey (Dawn ➔ Dusk ➔ Dawn)  │               │ • Interactive Three.js WebGL Galaxy Canvas    │
│ • Persistent [Plain] vs [Show Code] Toggle    │               │ • ReachableSec Laser Exploit Tracers          │
│ • Interactive Optical Diagnostic Lens Slider  │               │ • Clickable Blast Radius Slide-out Inspector  │
└───────────────────────────────────────────────┘               └───────────────────────────────────────────────┘
```

---

## 3. Surface 1: The Storytelling Landing Page

### 3.1 The Persistent Bilingual Toggle (`components/landing/bilingual-toggle.tsx`)
Positioned top-right in the header. Toggles the entire landing page copywriting between non-technical human empathy and deep engineering truth in 20 lines of React state:
* **`[Plain English]` Mode:** *"You built it in an afternoon. Now see what you built."* / *"Ten alarms are ringing. Only one is in a room a stranger can reach."*
* **`[Show me the code]` Mode:** *"Works on my machine. Reviewed by nobody."* / *"ReachableSec SAST: 10 CVEs detected. 88.6% filtered as unreachable dead code."*

### 3.2 The 5-Act Scrollytelling Flow
1. **Act 1: The Spark (10:00 AM // Morning Sunlight):** Clean, sparse emerald nodes. Telemetry: `[AST SLOP: 0%] [LATENCY: 380ms]`.
2. **Act 2: The Hangover (02:30 AM // Midnight Clutter):** Camera pulls back into chaos. Dense yellow duplicate clusters and 35 screaming red CVE alarms.
3. **Act 3: The ReachableSec X-Ray Pulse:** Cyan laser cuts horizontally. 31 alerts dim into gray shields (`[SILENCED]`). 1 single sharp red laser illuminates the true exploit path.
4. **Act 4: Interactive Blast Radius:** Clickable cluster triggers a shockwave ripple. Upstream callers highlight in orange; duplicate files dissolve into particle dust.
5. **Act 5: The Sentinel Equilibrium (08:00 AM):** Harmonious crystalline emerald architecture. `npx vibelens watch // 1Hz SENTINEL ACTIVE`.

### 3.3 The Optical Diagnostic Lens Slider (`components/landing/optical-lens-slider.tsx`)
An interactive circular optical glass magnifier with real CSS backdrop-blur and refraction that visitors can physically drag across the screen to wipe away simulated alert clutter and see the clean architecture underneath.

---

## 4. Surface 2: 3D Spatial X-Ray Galaxy (The Main App)

### 4.1 WebGL Architecture (`components/xray/galaxy-canvas.tsx`)
* **Renderer:** Three.js via `@react-three/fiber` and `@react-three/drei`.
* **Geometry:** Point cloud and dynamic bezier line connections driven by ReachableSec JSON DAG data.
* **Camera Controls:** Smooth orbit controls with programmatic camera dolly on node selection.

### 4.2 The Blast Radius Inspector (`components/xray/blast-radius-hud.tsx`)
Clicking any node in the 3D space locks the camera and triggers the slide-out inspector:
* **Header:** Node name, file path, AST depth, token weight.
* **Upstream Impact (What Breaks):** Highlights callers that break if the node is deleted.
* **Downstream Dependencies (What It Needs):** Lists all imported packages.
* **Action Button:** `[GENERATE TEST-GATED SAFE PR]` with local `npm test` gate.

---

## 5. Component Tree & Directory Structure

```
c:\Users\Chirag\Desktop\vibelens\
├── app/
│   ├── layout.tsx              # Dark theme wrapper & Geist font pairing
│   ├── page.tsx                # Surface 1: Storytelling Landing Page
│   └── app/
│       └── xray/
│           └── page.tsx        # Surface 2: Main 3D Spatial X-Ray Dashboard
├── components/
│   ├── landing/
│   │   ├── hero-section.tsx    # "You asked. It appeared." hero
│   │   ├── bilingual-toggle.tsx# [Plain] vs [Show me the code] switcher
│   │   ├── story-scroller.tsx  # 5-Act timeline orchestrator
│   │   └── optical-lens.tsx    # Interactive drag-to-clarify lens slider
│   ├── xray/
│   │   ├── galaxy-canvas.tsx   # Three.js WebGL canvas provider
│   │   ├── node-mesh.tsx       # Emerald, yellow, gray shield node meshes
│   │   ├── laser-tracer.tsx    # Animated red exploit path shader
│   │   └── blast-radius-hud.tsx# Slide-out DAG impact inspection drawer
│   └── shared/
│       ├── telemetry-chip.tsx  # Monospace status badges
│       └── glass-panel.tsx     # Reusable CAD glass container
└── lib/
    ├── reachablesec/           # Core SAST engine (Data Provider)
    └── mcp/                    # ContextRelay & Model Context Protocol server
```

---

## 6. Production Timeline (Days 1 to 15)

* **Days 1–4 (Core Brain):** ReachableSec AST engine (`lib/reachablesec/`) producing the JSON DAG.
* **Days 5–8 (Core Canvas):** Three.js 3D Spatial X-Ray (`components/xray/`) ingesting real ReachableSec data.
* **Days 9–11 (Context & Prevention):** Zero-Token ContextRelay (`.vibelens/handover.json`) & Cursor MCP tools.
* **Days 12–13 (Storytelling Surface):** Landing page, bilingual toggle, and optical lens slider.
* **Days 14–15 (Submission):** Vercel deployment, automated test verification, and Prasunex Innovathon pitch recording.

