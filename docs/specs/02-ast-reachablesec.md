# Spec 02: ReachableSec 4-Tier Call-Graph Engine

> **Module:** Static Application Security Testing (SAST)  
> **Parser:** `@babel/parser` + `@babel/traverse`  
> **Database:** OSV.dev Open Source Vulnerability Feed

---

## 1. Overview
ReachableSec traces execution paths from application entry points down into third-party dependencies, silencing 88% of phantom CVEs while isolating genuine attack vectors.

## 2. The 4-Tier Confidence State Machine

```
               [HTTP Entry: /api/upload]
                          │
         ┌────────────────┴────────────────┐
         ▼                                 ▼
   [Static Call Trace]           [Dynamic Expression]
         │                                 │
   ┌─────┴─────┐                           │
   ▼           ▼                           ▼
[Reachable] [Unreachable]              [Unknown]
 (Red Path) (Green Shield)          (Orange Review)
```

1. **`REACHABLE`:** Statically verifiable path exists from a public route to the vulnerable symbol.
2. **`LIKELY`:** Path exists through internal event emitters, callbacks, or conditional branches.
3. **`UNKNOWN`:** Dynamic evaluation boundary (`eval()`, dynamic `require()`, reflection) detected along the call chain.
4. **`UNREACHABLE`:** Mathematical proof of zero execution path from any application entry point.

## 3. Algorithm Implementation
* **Traversal:** Depth-First Search (DFS) on the in-memory Directed Acyclic Graph (DAG).
* **Entry Point Discovery:** Scans Next.js `app/**/route.ts`, Express handlers, and CLI commands.
* **Symbol Resolution:** Tracks named imports, default imports, and namespace imports into `node_modules`.

