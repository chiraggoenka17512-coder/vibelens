# 🔍 Aaryan

> **Assigned Focus:** Blast Radius Inspector & Detail Telemetry HUD  
> **Relevant Specs:** `docs/specs/03-3d-galaxy-canvas.md`, `docs/specs/04-frontend-deslop.md`  
> **Priority:** 🟠 Priority 3 (Days 6–10)

---

## 🎯 Your Mission
You solve **Problem #5: The Black-Box Terror**. When developers vibe code, they are terrified to touch or delete files because they don't know what will break. You build the interactive slide-out **Blast Radius HUD** that opens when any node in Vihaan's 3D galaxy is clicked, calculating the exact blast radius and offering a test-gated 1-click safe fix.

---

## 📂 Your Files & Directories
You own `src/components/hud/`:
* `src/components/hud/blast-radius-pane.tsx`: Slide-out glassmorphic drawer (`backdrop-blur-md bg-zinc-950/60 border border-white/10`) pinned to the selected node.
* `src/components/hud/upstream-impact.tsx`: Tree view calculating all incoming callers and public API routes that will break if the selected node is altered or deleted.
* `src/components/hud/downstream-deps.tsx`: List of all imported npm packages and sub-utilities required to execute the node.
* `src/components/hud/telemetry-badge.tsx`: Monospace CAD telemetry badges (`[STATUS: ACTIVE // 12ms] [DAG_NODES: 72]`).
* `src/components/hud/pr-trigger-button.tsx`: The interactive `[GENERATE TEST-GATED SAFE PR]` action button.
* `src/lib/git/pr-generator.ts`: Spawns local child process running `npm test`; if 100% green, uses `@octokit/rest` to open an authenticated GitHub Pull Request.

---

## 🔗 Who You Coordinate With
* **Vihaan:** Vihaan sends you the `selectedNodeId` event when a user clicks a node in the 3D space, triggering your drawer to open.
* **Rajveer:** You traverse Rajveer's AST call-graph edges (incoming and outgoing) to calculate the upstream breaking callers.
* **Chirag:** Chirag places your HUD drawer into the main application layout (`/app/xray`).
