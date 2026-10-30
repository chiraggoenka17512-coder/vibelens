# 🛡️ Rajveer

> **Assigned Focus:** ReachableSec 4-Tier SAST Engine & ContextRelay State Generator  
> **Relevant Specs:** `docs/specs/02-ast-reachablesec.md`, `docs/specs/06-zero-token-context-relay.md`, `docs/PROJECT_BLUEPRINT.md`  
> **Priority:** 🔴 Priority 1 (Days 1–4)

---

## 🎯 Your Mission
You build the mathematical "brain" and core intellectual property of VibeLens:
1. **ReachableSec SAST Engine:** Statically traces live AST execution paths from public HTTP entry points into `node_modules`, proving mathematically that 88.6% of Dependabot CVE alerts are dead code.
2. **ContextRelay State Generator:** Generates the deterministic `.vibelens/handover.json` snapshot capturing canonical utilities and invariants in ~380 tokens.

---

## 📂 Your Files & Directories
You own `src/lib/reachablesec/` and the ContextRelay manifest generator:
* `src/lib/reachablesec/parser.ts`: JavaScript/TypeScript parsing via `@babel/parser` and import/export extraction via `es-module-lexer`.
* `src/lib/reachablesec/entrypoints.ts`: Auto-discovery of public HTTP routes (`app/api/**/route.ts`, Express routes, Next.js server actions).
* `src/lib/reachablesec/callgraph.ts`: Depth-First Search (DFS) traversal constructing the in-memory Directed Acyclic Graph (DAG) into third-party packages.
* `src/lib/reachablesec/osv.ts`: Client querying the OSV.dev vulnerability database feed and caching results in Upstash Redis.
* `src/lib/reachablesec/classifier.ts`: 4-Tier confidence classifier:
  * 🔴 `REACHABLE` (Active attack path)
  * 🟠 `LIKELY` (Indirect / conditional path)
  * 🟡 `UNKNOWN` (Dynamic reflection boundary)
  * 🟢 `UNREACHABLE` (Mathematically proven dead code)
* `src/lib/mcp/generator/handover-manifest.ts`: Compiles `.vibelens/handover.json` containing locked canonical utilities, architectural invariants, and blast radius locks.

---

## 🔗 Who You Coordinate With
* **Vihaan:** You emit the canonical JSON DAG `{ nodes, edges, reachability }` that Vihaan's 3D Galaxy Canvas renders.
* **Vihaan (ContextRelay):** Your manifest generator feeds directly into Vihaan's MCP server tools.
* **Aaryan:** Aaryan's Blast Radius inspector uses your call-graph edges to determine which upstream routes break.
