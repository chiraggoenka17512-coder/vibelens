# VibeLens Contracts v0.1 (source of truth)

Team: ALT F4. Product: VibeLens, a 3D "city" view of a codebase with reachability,
blast-radius analysis, and a CLI watcher. Positioning: vibe coders first, then people who have never coded.

## Repo layout
vibelens/
  CONTRACTS.md          (read-only for everyone except Chirag)
  CHANGE_REQUESTS.md    (append-only log of requested contract changes)
  fixtures/             graph.sample.json, handover.sample.json, state.sample.json
  examples/sample-app/  small Express app used for testing
  scripts/validate-contracts.ts
  packages/core/        Rajveer
  packages/cli/         Archit
  packages/blast/       Aaryan
  packages/mcp/         Vihaan
  packages/galaxy/      Vihaan
  apps/web/             Chirag

## Files VibeLens writes into the analyzed repo: .vibelens/
- graph.json     written by core (Rajveer)
- handover.json  written by core (Rajveer)
- state.json     written by cli (Archit), about once per second

## graph.json
{
  "schemaVersion": "0.1",
  "repo": "string",
  "generatedAt": "ISO-8601",
  "nodes": [{ "id": "string", "name": "string", "file": "string", "line": 0,
              "kind": "route" | "function" | "sink", "reachable": true, "cves": ["CVE-..."] }],
  "edges": [{ "from": "nodeId", "to": "nodeId", "kind": "calls" | "imports" }]
}
Node id = `${relativeFilePath}#${qualifiedName}`. Never include line numbers in ids. Ids must be identical across runs.

## handover.json
{
  "schemaVersion": "0.1",
  "repo": "string",
  "generatedAt": "ISO-8601",
  "summary": "string",
  "entryRoutes": ["nodeId"],
  "reachableCves": [{ "cve": "string", "sinkId": "nodeId", "path": ["nodeId"] }],
  "dedupeClusters": [{ "ids": ["nodeId"], "reason": "string" }],
  "graphFile": ".vibelens/graph.json"
}

## state.json
{
  "schemaVersion": "0.1",
  "updatedAt": "ISO-8601",
  "status": "watching" | "idle" | "error",
  "filesWatched": 0,
  "lastChanged": [{ "file": "string", "at": "ISO-8601" }],
  "linkedUtils": [{ "from": "nodeId", "to": "nodeId" }]
}

## Local API (served by blast, port 4317, CORS allowed for localhost)
GET  /api/graph                 -> contents of graph.json
GET  /api/blast/:nodeId?depth=3 -> { "callers": ["nodeId"], "dependencies": ["nodeId"] }
POST /api/pr/safe               -> body { "nodeId", "patch" }; returns { "status", "testsPassed", "prUrl" }
GET  /api/stats                 -> contents of state.json

## MCP tools (served by mcp)
get_handover()  -> contents of handover.json
get_node(id)    -> the node from graph.json plus its direct edges

## Rules for everyone
1. Use only these shapes. If you need a new field, add an entry to CHANGE_REQUESTS.md and wait for Chirag to approve it.
2. Only edit files in your own package. Everything else is read-only for you.
3. Until upstream output exists, develop against fixtures/. Never hardcode data inside a component.
4. Breaking change = bump schemaVersion and notify the team.
5. Run `npx tsx scripts/validate-contracts.ts` before every PR. It must pass.
