# Spec 01: Model Context Protocol (MCP) Server

> **Module:** Pre-Prompt Prevention Engine  
> **Protocol:** Model Context Protocol (JSON-RPC over stdio)  
> **Package:** `@modelcontextprotocol/sdk`

---

## 1. Overview
The MCP server intercepts code generation *before* the AI agent writes code. Running locally as a background process, it registers two native tools with Cursor and Claude Code.

## 2. Tool Definitions

### 2.1 `find_existing_utility`
* **Input Schema:**
  ```json
  {
    "type": "object",
    "properties": {
      "purpose": { "type": "string", "description": "What the proposed helper function does (e.g. format dates, parse query params)" },
      "keywords": { "type": "array", "items": { "type": "string" }, "description": "Key identifier words" }
    },
    "required": ["purpose"]
  }
  ```
* **Behavior:**
  1. Searches the local AST index (`.vibelens/ast-index.json`).
  2. If a function with >85% vector similarity exists (e.g., `src/utils/date.ts::formatDate`), returns:
     ```json
     {
       "action": "REUSE_EXISTING",
       "canonicalPath": "@/utils/date",
       "functionName": "formatDate",
       "signature": "(date: string | Date, mask?: string) => string"
     }
     ```
  3. If no matching function exists, returns `action: "ALLOW_NEW"`.

### 2.2 `check_package`
* **Input Schema:**
  ```json
  {
    "type": "object",
    "properties": {
      "packageName": { "type": "string", "description": "The npm package name proposed for installation" },
      "intendedFunction": { "type": "string", "description": "The specific function or method to be imported" }
    },
    "required": ["packageName"]
  }
  ```
* **Behavior:**
  1. Queries the local/cached OSV CVE database via Upstash Redis.
  2. If the package has critical vulnerabilities in the requested function, advises the agent:
     `"WARNING: Package has CVE-XXXX in method. Recommended alternative: ..."`

