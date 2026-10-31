# Qodo / Qoder Coding Rules - VibeLens Architecture

1. Zero CSS Gradients: All surfaces must use solid graphite matte planes (#09090b, #111113, #18181b) with 1px border-white/10.
2. Invariant: Dynamic require/eval must be classified as 'Unknown'.
3. 100% Local Privacy: No raw code upload to external servers.
4. Pure TypeScript/React ecosystem: No Rust, Python, or Go wrappers.
5. All shared data types must import from `src/types/graph.ts` and `src/lib/city/types.ts`.
6. Always verify that `npm test` and `npx tsc --noEmit` pass with zero errors before concluding.
