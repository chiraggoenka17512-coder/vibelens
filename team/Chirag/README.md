# 👑 Chirag

> **Assigned Focus:** Master UI Architecture & Storytelling Landing Page  
> **Relevant Specs:** `docs/FINALIZED_FRONTEND_DESIGN_A.md`, `docs/specs/04-frontend-deslop.md`

---

## 🎯 Your Mission
You own the entire visual identity, design system, and the public-facing storytelling experience of VibeLens. You are building the high-craft **CrashLens Industrial Telemetry** frontend (obsidian `#060608`, CAD blueprint crosshairs, solid matte panels) that frames the whole product and wows the Prasunex Innovathon judges.

### 🚫 Strict Rule: ZERO GRADIENTS
* Absolutely NO CSS gradients (`bg-gradient-to-...`), no radial background glows, and no blurry gradient blobs.
* Use pure solid matte backgrounds (`#060608`, `#09090b`), sharp 1px borders (`border-white/10`), and pure flat typography. Gradients scream generic AI slop; flat, matte precision screams high-end engineering.

---

## 📂 Your Files & Directories
You own `app/` and `src/components/landing/`:
* `app/layout.tsx`: Root dark theme layout, Geist Sans + Geist Mono typography, and CAD viewport grid.
* `app/page.tsx`: Main storytelling landing page orchestrator.
* `app/app/xray/page.tsx`: Main application dashboard wrapping Vihaan's 3D galaxy and Aaryan's HUD.
* `src/components/landing/hero-section.tsx`: *"You built it in an afternoon. Now see what you built."*
* `src/components/landing/bilingual-toggle.tsx`: The 20-line persistent header toggle switching between **`[Plain English]`** and **`[Show me the code]`**.
* `src/components/landing/story-scroller.tsx`: The 5-Act 24-Hour Builder Journey (Dawn ➔ Midnight Fog ➔ SAST Laser ➔ Blast Radius ➔ Equilibrium).
* `src/components/landing/optical-lens-slider.tsx`: Interactive draggable circular optical loupe with CSS backdrop-blur and refraction.
* `src/components/shared/telemetry-chip.tsx`: Reusable monospace hardware status chips (`[STATUS: ACTIVE // 12ms]`).
* `src/components/shared/glass-panel.tsx`: CAD blueprint glass container (`backdrop-blur-md bg-zinc-950/60 border border-white/10`).

---

## 🔗 Who You Coordinate With
* **Vihaan & Aaryan:** You embed Vihaan's 3D Galaxy Canvas and Aaryan's Blast Radius Drawer into the main app shell (`/app/xray`).
* **Rajveer & Archit:** You wire up the live counter metrics on the landing page based on Rajveer's ReachableSec benchmarks and Archit's CLI telemetry.
