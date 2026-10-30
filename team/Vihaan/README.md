# 🌌 Vihaan

> **Assigned Focus:** 3D Spatial X-Ray Galaxy & ContextRelay MCP Server Tools  
> **Relevant Specs:** `docs/specs/03-3d-galaxy-canvas.md`, `docs/specs/06-zero-token-context-relay.md`, `docs/specs/01-mcp-prevention.md`  
> **Priority:** 🔴 Priority 2 (Days 4–8)

---

## 🎯 Your Mission
You build the flagship visual experience and the AI agent integration bridge of VibeLens:
1. **3D Spatial X-Ray Galaxy Canvas:** Uses Three.js and `@react-three/fiber` to ingest Rajveer's ReachableSec JSON DAG and render an interactive, beautiful 3D topology of the codebase.
2. **ContextRelay MCP Server & Tools:** Implements the Model Context Protocol (MCP) server so Cursor, Claude Code, and Windsurf can query VibeLens with 0 prompt token overhead.

### 🚫 Strict Rule: ZERO GRADIENTS
* No blurry gradient orbs, no colorful background washes. Keep the WebGL background solid void black (`#060608`). Let the clean geometric nodes and crisp solid laser lines do all the visual work.

---

## 📂 Your Files & Directories
You own `src/components/xray/` and `src/lib/mcp/`:
* `src/components/xray/galaxy-canvas.tsx`: Three.js Canvas container with smooth camera orbit controls on an obsidian canvas (`#060608`).
* `src/components/xray/node-mesh.tsx`: 3D node meshes with custom 4-tier color shaders:
  * 🟢 Emerald Green (`#10b981`): Healthy modules & green shields.
  * 🟡 Amber Yellow (`#f59e0b`): AI duplicate helper clusters.
  * ⚪ Muted Gray (`#64748b`): Silenced 88% phantom CVE shields.
* `src/components/xray/laser-tracer.tsx`: Animated pulsing red laser beam (`#ef4444`) tracing the single verified zero-day exploit path.
* `src/lib/mcp/server.ts`: JSON-RPC over stdio server using `@modelcontextprotocol/sdk`.
* `src/lib/mcp/tools/get-handover.ts`: Native tool `vibelens_get_handover` returning Rajveer's 380-token handover manifest.
* `src/lib/mcp/tools/find-utility.ts`: Native tool `find_existing_utility` querying AST vector registry before AI writes duplicate code.
* `src/lib/mcp/tools/check-package.ts`: Native tool `check_package` checking package CVE status against OSV before `npm install`.
* `bin/vibelens-mcp.js`: Standalone executable entry point for Cursor and Claude Code configurations.

---

## 🔗 Who You Coordinate With
* **Rajveer:** You consume Rajveer's ReachableSec JSON DAG for the 3D canvas and his `.vibelens/handover.json` for the MCP handover tool.
* **Aaryan:** When a user clicks a node in your 3D canvas, you trigger an animated camera swoop and notify Aaryan's Blast Radius inspector to open.
* **Chirag:** Chirag embeds your 3D canvas directly into the main app shell (`/app/xray`).
