# 🧪 VibeLens Test Fixture: Sample App

This fixture repository provides an immediate static test bed for **Rajveer** (ReachableSec SAST AST parser) and **Vihaan** (3D X-Ray Canvas) to test call-graph generation and vulnerability reachability.

---

## 🎯 Architecture & Expected Test Ground Truth

| Component | Path | Status / Classification | Reason |
| :--- | :--- | :--- | :--- |
| **HTTP Entry Point** | `app/api/checkout/route.ts` | 🟢 `ENTRYPOINT` | Public POST route |
| **Local Utility** | `utils/formatDate.ts` | 🟢 `REACHABLE` | Directly imported by `/api/checkout` |
| **AI Vibe Slop Duplicate** | `helpers/parseDate.ts` | 🟡 `VIBE_SLOP` | Redundant copy of `formatDate`, uncalled |
| **Reachable Package** | `jsonwebtoken` (`package.json`) | 🔴 / 🟠 `REACHABLE` | Statically called by `jwt.sign` in `/api/checkout` |
| **Dead Package** | `lodash` (`package.json`) | 🟢 `UNREACHABLE` (Silenced) | In `package.json`, but 0 AST references |

---

## 🚀 Instant Verification
Rajveer's AST parser in `src/lib/reachablesec/callgraph.ts` can run directly against `fixtures/sample-app` to output the Directed Acyclic Graph (DAG) in <10ms without cloning any external repositories.
