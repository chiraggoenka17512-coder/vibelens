# Spec 05: VibeWatcher Real-Time CLI Sentinel

> **Module:** Background Terminal Daemon  
> **Command:** `npx vibelens watch`  
> **Engine:** Node.js + `chokidar` + `@babel/parser`

---

## 1. Overview
A lightweight on-device daemon that monitors project file changes in real time at 1Hz as developers prompt Cursor, VS Code, or Claude Code.

## 2. Real-Time Detection Loops
1. **Duplicate Helper Detection:**
   * On file save, extracts exported function AST identifiers.
   * Compares against existing utility signatures.
   * Prompts terminal warning if a duplicate function is detected.
2. **Package Ingestion Check:**
   * Watches `package.json` for new dependencies.
   * Immediately verifies if the imported package contains reachable CVEs in the active call-graph.
3. **Context Token Monitor:**
   * Tracks total repository token consumption using `cl100k` tokenizer.
   * Warns when context bloat exceeds predefined team thresholds.

