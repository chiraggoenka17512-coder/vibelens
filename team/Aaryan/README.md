# 🔍 Aaryan

> **Assigned Focus:** Blast Radius Inspector, Detail Telemetry HUD & **Universal Agent/IDE Connection Bridge (Apps & Web)**  
> **Relevant Specs:** `docs/specs/03-3d-galaxy-canvas.md`, `docs/specs/06-zero-token-context-relay.md`, `docs/PROJECT_BLUEPRINT.md` (Section 6.4)  
> **Target Branch:** `feat/blast-radius-aaryan`  
> **Target Test Suite:** `tests/reachability.test.ts` & local API tests

---

## 🤖 1-Click Prompt for Antigravity & Qoder
> **Instructions for Aaryan:** When you open Antigravity or Qoder, copy-paste this prompt into the chat window:

```text
I am Aaryan working on feature branch feat/blast-radius-aaryan.
1. Read team/Aaryan/README.md, AGENTS.md, and GEMINI.md for my strict scope.
2. My mission is implementing the Blast Radius HUD drawer in src/components/hud/ and the Tri-Bridge REST API in app/api/vibelens/.
3. Invariants: ZERO CSS gradients. Matte panels with border-white/10. Test-gated PRs must run vitest first.
4. Data Contract: Consume CodebaseNode & CodebaseEdge from src/types/graph.ts.
5. Definition of Done: Your work is done ONLY when 'npm run verify' exits with 0 errors.
```

---

## 🎯 Your Mission

You own two critical systems in VibeLens:

1. **Problem #5: The Black-Box Terror (Blast Radius HUD):**
   - When developers vibe code, they are terrified to touch or delete files because they don't know what will break.
   - You build the interactive slide-out **Blast Radius HUD** that opens when any node in the 3D space is clicked, calculating the exact blast radius and offering a test-gated 1-click safe fix.

2. **The Tri-Bridge Universal Agent & IDE Connector (Apps & Web):**
   - VibeLens must connect effortlessly to **every** coding agent and IDE, whether they are desktop apps or web platforms.
   - You build the **Bridge Layer** connecting:
     - **Desktop Apps & Terminals** (Cursor, Claude Code, Windsurf, VS Code) via MCP tool endpoints.
     - **Web AI Platforms** (v0.dev, Bolt.new, Lovable.dev, Replit, ChatGPT Canvas) via the 1-click `[COPY CONTEXT RELAY]` clipboard button and `.vibelens/handover.json` synchronization.
     - **Web Extensions & Browser Integrations** via local CORS-enabled REST API endpoints (`/api/vibelens/handover` and `/api/vibelens/check-utility`).

---

## 📂 Your Files & Directories

You own `src/components/hud/` and `app/api/vibelens/`:

### 1. Blast Radius Inspector Components (`src/components/hud/`)
* `src/components/hud/blast-radius-pane.tsx`: Slide-out glassmorphic drawer (`backdrop-blur-md bg-zinc-950/60 border border-white/10`) pinned to the selected node.
* `src/components/hud/upstream-impact.tsx`: Tree view calculating all incoming callers and public API routes that will break if the selected node is altered or deleted.
* `src/components/hud/downstream-deps.tsx`: List of all imported npm packages and sub-utilities required to execute the node.
* `src/components/hud/telemetry-badge.tsx`: Monospace CAD telemetry badges (`[STATUS: ACTIVE // 12ms] [DAG_NODES: 72]`).
* `src/components/hud/pr-trigger-button.tsx`: The interactive `[GENERATE TEST-GATED SAFE PR]` action button.
* `src/lib/git/pr-generator.ts`: Spawns local child process running `npm test`; if 100% green, uses `@octokit/rest` to open an authenticated GitHub Pull Request.

### 2. Universal Agent & IDE Bridge (`app/api/vibelens/` & HUD Relay)
* `src/components/hud/context-relay-copy-button.tsx`: 1-Click `[COPY CONTEXT RELAY]` button copying the 380-token compressed invariant payload ready to paste into web AI agents (v0, Bolt, Lovable, ChatGPT Canvas).
* `app/api/vibelens/handover/route.ts`: CORS-enabled REST endpoint (`GET /api/vibelens/handover`) serving `.vibelens/handover.json` to web extensions, browser tools, and cloud agents.
* `app/api/vibelens/check-utility/route.ts`: CORS-enabled REST endpoint (`POST /api/vibelens/check-utility`) allowing web agents to check whether a proposed helper already exists in the AST before writing a duplicate.

---

## 🔗 Who You Coordinate With

* **Vihaan (MCP Server):** Vihaan consumes your REST endpoints or routes if running in HTTP mode and sends you node selection events from the 3D WebGL space.
* **Rajveer (AST Engine):** You ingest Rajveer's AST call-graph edges to calculate upstream breaking callers and his generated `.vibelens/handover.json` manifest.
* **Chirag (Master UI):** Chirag embeds your Blast Radius drawer and `[COPY CONTEXT RELAY]` button directly into the main application layout (`/app/xray`).
* **Archit (CLI Sentinel):** Archit's CLI alerts point developers to your Blast Radius HUD when an unsafe deletion is attempted.
