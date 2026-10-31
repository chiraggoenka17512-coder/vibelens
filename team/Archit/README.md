# 🛡️ Archit

> **Assigned Focus:** VibeWatcher CLI Sentinel (`npx vibelens watch`)  
> **Relevant Specs:** `docs/specs/05-vibewatcher-cli.md`, `docs/specs/01-mcp-prevention.md`  
> **Target Branch:** `feat/cli-archit`  
> **Target Test Suite:** `tests/reachability.test.ts` & CLI tests

---

## 🤖 1-Click Prompt for Antigravity & Qoder
> **Instructions for Archit:** When you open Antigravity or Qoder, copy-paste this prompt into the chat window:

```text
I am Archit working on feature branch feat/cli-archit.
1. Read team/Archit/README.md, AGENTS.md, and GEMINI.md for my strict scope.
2. My mission is building the VibeWatcher 1Hz CLI sentinel daemon in src/cli/ using commander and chokidar.
3. Invariants: 100% pure TypeScript/Node.js. No native Python/Rust wrappers. Zero cloud uploads.
4. Data Contract: Consume canonical_utilities from .vibelens/handover.json.
5. Definition of Done: Your work is done ONLY when 'npm run verify' exits with 0 errors.
```

---

## 🎯 Your Mission
You build the developer's background guardian: the **VibeWatcher CLI Sentinel**. While developers vibe code in Cursor, Claude Code, or VS Code, VibeWatcher runs as a lightweight 1Hz daemon in their terminal. The moment an AI hallucinates a duplicate helper or adds an insecure package, your terminal sentinel catches it on file save and offers instant one-key resolution.

---

## 📂 Your Files & Directories
You own `src/cli/`:
* `src/cli/index.ts`: The main CLI entry point registered as `npx vibelens` via `commander`.
* `src/cli/watch.ts`: The 1Hz background file watcher powered by `chokidar`.
* `src/cli/ast-diff.ts`: Compares saved file AST diffs against the local canonical utility catalog.
* `src/cli/reporter.ts`: Terminal UI formatted in CrashLens style with ASCII badges:
  ```bash
  [VibeLens Sentinel] ⚠️ SLOP DETECTED in src/components/Card.tsx
  -> Cursor just hallucinated a duplicate 'formatDate' helper.
  -> Found existing canonical utility in src/utils/date.ts.
  -> Press [Y] to auto-link existing function and cancel duplication.
  ```
* `src/cli/auto-resolver.ts`: Interactively rewrites the file import to use the canonical utility upon pressing `Y`.

---

## 🔗 Who You Coordinate With
* **Rajveer:** You consume Rajveer's AST parser to inspect saved file diffs and his canonical utilities registry to detect duplicate helpers.
* **Chirag:** Chirag references your CLI terminal commands (`npx vibelens watch`) and telemetry metrics directly on the storytelling landing page.
