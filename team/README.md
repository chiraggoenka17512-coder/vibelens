# 👥 VibeLens Team Roster & Master Work Allocation

> **Competition:** Prasunex Innovathon 2026 (Unstop)  
> **Sprint Duration:** 15 Days  
> **Architecture:** 100% JS/TS/React Ecosystem

---

## 🏆 The Team Allocation

| Teammate | Assigned Focus | Core Deliverables | Directory |
| :--- | :--- | :--- | :--- |
| **👑 Chirag** | **Master UI & Storytelling Landing Page** | Whole UI shell, 5-Act Builder Journey, Bilingual Toggle, Optical Diagnostic Lens | [`team/Chirag/`](./Chirag/README.md) |
| **🛡️ Rajveer** | **ReachableSec SAST & ContextRelay State** | `@babel/parser` AST call-graph, 4-tier reachability classifier, `.vibelens/handover.json` manifest | [`team/Rajveer/`](./Rajveer/README.md) |
| **🌌 Vihaan** | **3D Spatial X-Ray Galaxy & ContextRelay MCP** | Three.js WebGL canvas (`@react-three/fiber`), node shaders, red laser tracers, MCP server tools | [`team/Vihaan/`](./Vihaan/README.md) |
| **🔍 Aaryan** | **Blast Radius Inspector & Detail HUD** | Slide-out glassmorphic drawer, upstream breaking callers, downstream dependencies, test-gated PR | [`team/Aaryan/`](./Aaryan/README.md) |
| **🛡️ Archit** | **VibeWatcher CLI Sentinel** | `npx vibelens watch` 1Hz daemon (`commander` + `chokidar`), terminal alert UI, 1-key auto-link | [`team/Archit/`](./Archit/README.md) |

---

## 🔗 The Complete Integration Flow

```
                             ┌──────────────────────────────────────┐
                             │       Rajveer (ReachableSec)         │
                             │  • Traces AST call-graph from routes │
                             │  • Emits verified JSON DAG data      │
                             │  • Generates handover.json manifest  │
                             └──────────────────┬───────────────────┘
                                                │
                 ┌──────────────────────────────┼──────────────────────────────┐
                 ▼                              ▼                              ▼
  ┌─────────────────────────────┐┌─────────────────────────────┐┌─────────────────────────────┐
  │     Vihaan (3D Galaxy)      ││    Aaryan (Blast Radius)    ││   Vihaan (MCP Context)      │
  │ • Ingests Rajveer's JSON DAG││ • Traverses DAG callers/deps││ • Serves handover.json via  │
  │ • Renders 3D nodes & lasers ││ • Opens slide-out HUD on tap││   MCP to Cursor/Claude      │
  │ • Fires node click events   ││ • Runs test-gated safe PR   ││ • Prevents duplicate slop   │
  └──────────────┬──────────────┘└──────────────┬──────────────┘└─────────────────────────────┘
                 │                              │
                 └──────────────────────┬───────┘
                                        │
                                        ▼
                     ┌──────────────────────────────────────┐
                     │          Chirag (Master UI)          │
                     │  • Assembles 3D Canvas + Blast HUD   │
                     │  • Builds 5-Act Story Landing Page   │
                     │  • Crafts [Plain] / [Code] Toggle    │
                     │  • Builds Optical Lens Drag Slider   │
                     └──────────────────▲───────────────────┘
                                        │ (Displays live CLI stats)
                     ┌──────────────────┴───────────────────┐
                     │         Archit (CLI Sentinel)        │
                     │  • 1Hz background file watcher       │
                     │  • 'npx vibelens watch' daemon       │
                     │  • Interactively auto-links utils    │
                     └──────────────────────────────────────┘
```
