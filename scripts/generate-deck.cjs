const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

function buildPitchDeck() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
  pres.title = "VibeLens Pitch Deck";
  pres.author = "VibeLens Team (Prasunex 2026)";

  // Design Tokens (CrashLens Industrial Telemetry + Zephium)
  // Strictly adhering to: Obsidian Canvas, Zero CSS Gradients, 1px Hairline Borders, Monospace Hardware Telemetry
  const COLOR = {
    BG: "09090B",
    BG_CARD: "111115",
    BG_CARD_LIGHT: "18181B",
    BG_ELEVATED: "212125",
    BORDER: "27272A",
    BORDER_HAIRLINE: "3F3F46",
    TEXT_MAIN: "F4F4F5",
    TEXT_MUTED: "A1A1AA",
    TEXT_DIM: "71717A",
    RED: "EF4444",
    ORANGE: "F97316",
    AMBER: "F59E0B",
    EMERALD: "10B981",
    CYAN: "06B6D4",
    BLUE: "3B82F6",
    WHITE: "FFFFFF",
  };

  const FONT = {
    HEADING: "Arial",
    BODY: "Calibri",
    MONO: "Consolas",
  };

  // Helper to add standard slide header & footer with 100% EDITABLE text runs
  function applyChrome(slide, categoryTag, title, subtitle, slideNum) {
    slide.background = { color: COLOR.BG };

    // Top Category / Telemetry Tag (Fully editable)
    slide.addText(
      [
        { text: `[${categoryTag}]`, options: { color: COLOR.CYAN, fontFace: FONT.MONO, fontSize: 10, bold: true } },
        { text: " // PRASUNEX 2026 TELEMETRY", options: { color: COLOR.TEXT_DIM, fontFace: FONT.MONO, fontSize: 10 } },
      ],
      { x: 0.8, y: 0.45, w: 11.7, h: 0.3, margin: 0 }
    );

    // Title (Fully editable)
    slide.addText(title, {
      x: 0.8,
      y: 0.8,
      w: 11.7,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: COLOR.WHITE,
      fontFace: FONT.HEADING,
      margin: 0,
    });

    // Subtitle (Fully editable)
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.8,
        y: 1.42,
        w: 11.7,
        h: 0.35,
        fontSize: 13,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      });
    }

    // Bottom Telemetry Footer (Fully editable)
    slide.addText(
      [
        { text: "VIBELENS // INDUSTRIAL SECURITY TELEMETRY", options: { color: COLOR.TEXT_DIM, fontFace: FONT.MONO, fontSize: 9 } },
        { text: "   •   100% LOCAL PRIVACY   •   ZERO CLOUD CODE UPLOADS   •   PURE NATIVE EDITABLE TEXT", options: { color: COLOR.TEXT_DIM, fontFace: FONT.MONO, fontSize: 9 } },
      ],
      { x: 0.8, y: 7.0, w: 9.5, h: 0.3, margin: 0 }
    );

    slide.addText(`SLIDE ${String(slideNum).padStart(2, "0")} / 12`, {
      x: 10.5,
      y: 7.0,
      w: 2.0,
      h: 0.3,
      fontSize: 9,
      color: COLOR.CYAN,
      fontFace: FONT.MONO,
      align: "right",
      margin: 0,
    });
  }

  // -------------------------------------------------------------
  // SLIDE 1: TITLE (100% EDITABLE TEXT & SHAPES)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    slide.background = { color: COLOR.BG };

    // Top Tag
    slide.addText("[PRASUNEX INNOVATHON 2026 // IDEA SUBMISSION // INDUSTRIAL TELEMETRY]", {
      x: 0.8,
      y: 0.9,
      w: 11.7,
      h: 0.35,
      fontSize: 11,
      color: COLOR.CYAN,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    // Main Title
    slide.addText("VIBELENS", {
      x: 0.8,
      y: 1.35,
      w: 11.7,
      h: 1.1,
      fontSize: 64,
      bold: true,
      color: COLOR.WHITE,
      fontFace: FONT.HEADING,
      margin: 0,
    });

    // One-liner
    slide.addText('"Only fix the vulnerabilities your code can actually reach."', {
      x: 0.8,
      y: 2.6,
      w: 11.7,
      h: 0.5,
      fontSize: 20,
      color: COLOR.EMERALD,
      fontFace: FONT.HEADING,
      bold: true,
      margin: 0,
    });

    // Subtitle
    slide.addText(
      "A local-first codebase hygiene, vulnerability reachability, and 3D architecture visualization system for the generative AI era.",
      {
        x: 0.8,
        y: 3.15,
        w: 11.0,
        h: 0.55,
        fontSize: 14,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      }
    );

    // Team Roster Card (Native shape + editable text)
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 4.1,
      w: 11.7,
      h: 1.9,
      fill: { color: COLOR.BG_CARD },
      line: { color: COLOR.BORDER, width: 1 },
    });

    slide.addText("TEAM CONTRIBUTORS & ARCHITECTURAL ROLES", {
      x: 1.1,
      y: 4.3,
      w: 11.0,
      h: 0.25,
      fontSize: 10,
      color: COLOR.TEXT_DIM,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    const members = [
      { name: "Chirag Goenka", role: "UI & Product Architecture" },
      { name: "Rajveer Singh", role: "ReachableSec SAST Engine" },
      { name: "Vihaan Verma", role: "3D Spatial Treemap & Wiring" },
      { name: "Aaryan Sharma", role: "Blast Radius HUD & MCP" },
      { name: "Archit Agrawal", role: "1Hz CLI Sentinel & Daemon" },
    ];

    members.forEach((m, i) => {
      const colX = 1.1 + i * 2.25;
      slide.addText(m.name, {
        x: colX,
        y: 4.7,
        w: 2.1,
        h: 0.35,
        fontSize: 13,
        bold: true,
        color: COLOR.WHITE,
        fontFace: FONT.HEADING,
        margin: 0,
      });
      slide.addText(m.role, {
        x: colX,
        y: 5.05,
        w: 2.1,
        h: 0.6,
        fontSize: 10,
        color: COLOR.CYAN,
        fontFace: FONT.MONO,
        margin: 0,
      });
    });

    // Invariant Chips
    slide.addText(
      "[INVARIANTS: 100% LOCAL PRIVACY // ZERO CLOUD CODE UPLOADS // 88.6% NOISE FILTERED]",
      {
        x: 0.8,
        y: 6.65,
        w: 11.7,
        h: 0.3,
        fontSize: 10,
        color: COLOR.TEXT_DIM,
        fontFace: FONT.MONO,
        margin: 0,
      }
    );

    slide.addNotes(
      "Good morning, judges. We are Team VibeLens, presenting for the Prasunex Innovathon 2026. Today, AI assistants help developers generate thousands of lines of code in hours. But that speed creates a catastrophic downstream problem: phantom vulnerability alert overload. VibeLens solves this with one uncompromising premise: Only fix the vulnerabilities your code can actually reach."
    );
  }

  // -------------------------------------------------------------
  // SLIDE 2: THE PROBLEM (100% EDITABLE TEXT & CARDS)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    applyChrome(
      slide,
      "THE PROBLEM // DEPENDENCY REALITY",
      "Dependency Scanners Are Drowning Developers in Phantom Noise",
      "Traditional static tools inspect package manifests rather than executable runtime call-chains.",
      2
    );

    const cards = [
      {
        badge: "01 // NOISE TSUNAMI",
        title: "Hundreds of Phantom CVEs",
        desc: "Standard scanners (npm audit, Snyk, Trivy) report hundreds of CVEs by simply matching package.json versions. Over 85% of flagged vulnerabilities sit in unused functions, dead sub-dependencies, or dev fixtures that are never called in production.",
        stat: "85%+",
        statLabel: "CVEs are never called",
        color: COLOR.AMBER,
      },
      {
        badge: "02 // FATIGUE & PARALYSIS",
        title: "Ignored Alerts or Lost Days",
        desc: "Engineering teams face a toxic dilemma: spend dozens of hours manually tracing whether an obscure CVE is exploitable, or ignore security alerts entirely with blanket '--audit-level=critical' flags, allowing real zero-days to slip into production unnoticed.",
        stat: "140min",
        statLabel: "Wasted per triage cycle",
        color: COLOR.RED,
      },
      {
        badge: "03 // THE AI VELOCITY TRAP",
        title: "AI Ships Transitive Slop",
        desc: "Coding agents (Cursor, Claude, Copilot) install packages rapidly to solve instant tasks. The velocity is exhilarating, but transitive dependency bloat accumulates 10x faster than human review capacity. The morning spark becomes a 2 AM crisis.",
        stat: "10x",
        statLabel: "Dependency growth rate",
        color: COLOR.ORANGE,
      },
    ];

    cards.forEach((c, idx) => {
      const cardX = 0.8 + idx * 4.0;
      slide.addShape(pres.ShapeType.rect, {
        x: cardX,
        y: 2.05,
        w: 3.75,
        h: 4.65,
        fill: { color: COLOR.BG_CARD },
        line: { color: COLOR.BORDER, width: 1 },
      });

      slide.addText(c.badge, {
        x: cardX + 0.3,
        y: 2.3,
        w: 3.15,
        h: 0.25,
        fontSize: 10,
        color: c.color,
        fontFace: FONT.MONO,
        bold: true,
        margin: 0,
      });

      slide.addText(c.title, {
        x: cardX + 0.3,
        y: 2.6,
        w: 3.15,
        h: 0.6,
        fontSize: 16,
        bold: true,
        color: COLOR.WHITE,
        fontFace: FONT.HEADING,
        margin: 0,
      });

      slide.addText(c.desc, {
        x: cardX + 0.3,
        y: 3.3,
        w: 3.15,
        h: 1.9,
        fontSize: 12,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      });

      slide.addText(c.stat, {
        x: cardX + 0.3,
        y: 5.35,
        w: 3.15,
        h: 0.6,
        fontSize: 32,
        bold: true,
        color: c.color,
        fontFace: FONT.HEADING,
        margin: 0,
      });

      slide.addText(c.statLabel, {
        x: cardX + 0.3,
        y: 6.0,
        w: 3.15,
        h: 0.3,
        fontSize: 10,
        color: COLOR.TEXT_DIM,
        fontFace: FONT.MONO,
        margin: 0,
      });
    });

    slide.addNotes(
      "Look at any modern repository running npm audit or Snyk today. You see 30, 40, or 100 vulnerability alarms. But here is the dirty secret of AppSec: the vast majority of those functions are NEVER called. If a library has a prototype pollution flaw in function B, but your code only calls function A, you are not exploitable. Yet developers spend days triaging, or worse, ignore the scanner completely. With AI coding agents pulling in dependencies at breakneck speed, this problem is exploding."
    );
  }

  // -------------------------------------------------------------
  // SLIDE 3: THE INSIGHT (100% EDITABLE TEXT & BOXES)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    applyChrome(
      slide,
      "THE INSIGHT // COMPILER SCIENCE PRINCIPLE",
      "A Vulnerability Only Matters If A Path Exists To Reach It",
      "Replacing blind manifest scanning with deterministic Abstract Syntax Tree (AST) reachability traversal.",
      3
    );

    // Left Column: Theoretical Principle Card
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 2.05,
      w: 5.65,
      h: 4.65,
      fill: { color: COLOR.BG_CARD },
      line: { color: COLOR.BORDER, width: 1 },
    });

    slide.addText("THE REACHABILITY THEOREM", {
      x: 1.1,
      y: 2.3,
      w: 5.0,
      h: 0.25,
      fontSize: 11,
      color: COLOR.CYAN,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    slide.addText("Static Lists Are Meaningless Without Execution Flow", {
      x: 1.1,
      y: 2.6,
      w: 5.0,
      h: 0.6,
      fontSize: 18,
      bold: true,
      color: COLOR.WHITE,
      fontFace: FONT.HEADING,
      margin: 0,
    });

    slide.addText(
      "In software security, an attack surface requires three elements:\n\n1. An untrusted input entry point (HTTP route, RPC handler, CLI arg).\n2. A deterministic propagation path through local application code.\n3. An execution sink into the vulnerable library function.\n\nIf step 2 does not exist, the vulnerability is dormant phantom noise. VibeLens checks that exact path across the codebase AST call-graph and separates 'Reachable' from 'No Static Path Found'.",
      {
        x: 1.1,
        y: 3.3,
        w: 5.0,
        h: 3.0,
        fontSize: 13,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      }
    );

    // Right Column: Comparison Card
    slide.addShape(pres.ShapeType.rect, {
      x: 6.85,
      y: 2.05,
      w: 5.65,
      h: 4.65,
      fill: { color: COLOR.BG_CARD },
      line: { color: COLOR.BORDER, width: 1 },
    });

    slide.addText("CONVENTIONAL SCANNER VS. VIBELENS REACHABLESEC", {
      x: 7.15,
      y: 2.3,
      w: 5.0,
      h: 0.25,
      fontSize: 11,
      color: COLOR.EMERALD,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    // Box 1: Conventional Scanner
    slide.addShape(pres.ShapeType.rect, {
      x: 7.15,
      y: 2.7,
      w: 5.05,
      h: 1.6,
      fill: { color: "18181B" },
      line: { color: COLOR.RED, width: 1 },
    });
    slide.addText("CONVENTIONAL SCANNER (MANIFEST LEVEL)", {
      x: 7.35,
      y: 2.85,
      w: 4.65,
      h: 0.25,
      fontSize: 10,
      color: COLOR.RED,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });
    slide.addText(
      "package.json imports 'lodash@4.17.15'\n➔ 🚨 CRITICAL ALARM: CVE-2020-8203\n➔ Status: Blinds developers with 36 alarms regardless of code.",
      {
        x: 7.35,
        y: 3.15,
        w: 4.65,
        h: 0.9,
        fontSize: 11,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.MONO,
        margin: 0,
      }
    );

    // Box 2: VibeLens ReachableSec
    slide.addShape(pres.ShapeType.rect, {
      x: 7.15,
      y: 4.6,
      w: 5.05,
      h: 1.8,
      fill: { color: "18181B" },
      line: { color: COLOR.EMERALD, width: 1 },
    });
    slide.addText("VIBELENS REACHABLESEC (CALL-GRAPH AST LEVEL)", {
      x: 7.35,
      y: 4.75,
      w: 4.65,
      h: 0.25,
      fontSize: 10,
      color: COLOR.EMERALD,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });
    slide.addText(
      "Traverse AST: route.ts ➔ parseInput() ➔ lodash.pick()\n➔ Sink check: lodash.merge() is NEVER invoked.\n➔ 🛡️ PHANTOM ALARM SILENCED (88.6% noise reduction).",
      {
        x: 7.35,
        y: 5.05,
        w: 4.65,
        h: 1.1,
        fontSize: 11,
        color: COLOR.TEXT_MAIN,
        fontFace: FONT.MONO,
        margin: 0,
      }
    );

    slide.addNotes(
      "The insight is simple compiler science: A vulnerability only exists if a path exists from an entry point—a Next.js route, an API endpoint, a CLI flag—to the vulnerable code. If lodash.merge has a CVE, but your entire application only ever calls lodash.pick, that CVE is dead weight. It cannot be exploited through your code. VibeLens deterministically traces that path."
    );
  }

  // -------------------------------------------------------------
  // SLIDE 4: HOW IT WORKS (100% EDITABLE 4-STEP PIPELINE)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    applyChrome(
      slide,
      "SYSTEM PIPELINE // 4-STEP FLOW",
      "The 4-Step Deterministic Reachability Engine",
      "How VibeLens ingests repository code and scanner outputs to produce verified exploit paths in <15ms.",
      4
    );

    const steps = [
      {
        num: "01",
        name: "SCAN REPO & SARIF",
        desc: "Ingests standard scanner output (npm audit JSON or SARIF) to extract target vulnerable symbol fingerprints.",
        metric: "Standard Inputs",
        color: COLOR.CYAN,
      },
      {
        num: "02",
        name: "BUILD AST IMPORT GRAPH",
        desc: "Local Babel parser & es-module-lexer parses local code on-device, mapping exact imports, exports, and call-sites.",
        metric: "<15ms Deterministic",
        color: COLOR.BLUE,
      },
      {
        num: "03",
        name: "TRACE ENTRY POINTS",
        desc: "Depth-First Search (DFS) traces paths originating from public entry points (routes, controllers, server actions).",
        metric: "DFS Call-Graph",
        color: COLOR.ORANGE,
      },
      {
        num: "04",
        name: "LABEL & PRIORITIZE",
        desc: "Classifies each CVE into Reachable (red), Unknown/Dynamic (yellow), or Silenced Phantom (green shield).",
        metric: "88.6% Filtered",
        color: COLOR.EMERALD,
      },
    ];

    steps.forEach((s, idx) => {
      const stepX = 0.8 + idx * 3.0;
      slide.addShape(pres.ShapeType.rect, {
        x: stepX,
        y: 2.05,
        w: 2.8,
        h: 3.25,
        fill: { color: COLOR.BG_CARD },
        line: { color: COLOR.BORDER, width: 1 },
      });

      slide.addText(`STEP ${s.num}`, {
        x: stepX + 0.25,
        y: 2.25,
        w: 2.3,
        h: 0.25,
        fontSize: 10,
        color: s.color,
        fontFace: FONT.MONO,
        bold: true,
        margin: 0,
      });

      slide.addText(s.name, {
        x: stepX + 0.25,
        y: 2.5,
        w: 2.3,
        h: 0.55,
        fontSize: 13,
        bold: true,
        color: COLOR.WHITE,
        fontFace: FONT.HEADING,
        margin: 0,
      });

      slide.addText(s.desc, {
        x: stepX + 0.25,
        y: 3.1,
        w: 2.3,
        h: 1.45,
        fontSize: 11,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      });

      slide.addText(s.metric, {
        x: stepX + 0.25,
        y: 4.85,
        w: 2.3,
        h: 0.3,
        fontSize: 10,
        color: s.color,
        fontFace: FONT.MONO,
        bold: true,
        margin: 0,
      });
    });

    // Input / Output Summary Card (100% editable)
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 5.5,
      w: 11.7,
      h: 1.25,
      fill: { color: "111115" },
      line: { color: COLOR.CYAN, width: 1 },
    });

    slide.addText("INPUT / OUTPUT CONTRACT // 100% OFFLINE EXECUTION", {
      x: 1.1,
      y: 5.65,
      w: 11.0,
      h: 0.2,
      fontSize: 10,
      color: COLOR.CYAN,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    slide.addText(
      "INPUTS:  Local Git working tree + standard npm audit / SARIF vulnerability reports.\nOUTPUTS: Prioritized actionable queue of truly reachable CVEs + illuminated 3D WebGL laser graph + automated zero-slop PR patches.",
      {
        x: 1.1,
        y: 5.95,
        w: 11.0,
        h: 0.65,
        fontSize: 12,
        color: COLOR.TEXT_MAIN,
        fontFace: FONT.MONO,
        margin: 0,
      }
    );

    slide.addNotes(
      "Here is the four-step pipeline. Step 1: Ingest standard scanner results from npm audit or SARIF. Step 2: Parse local TypeScript and JavaScript on-device with Babel and es-module-lexer. Step 3: Run Depth-First Search from every public route and entry point. Step 4: Output ranked, honest findings. Total execution time on a 200-file codebase: less than 15 milliseconds. And zero bytes of code ever leave the machine."
    );
  }

  // -------------------------------------------------------------
  // SLIDE 5: LIVE EXAMPLE (100% EDITABLE TRACE NODES & METRICS)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    applyChrome(
      slide,
      "LIVE VERIFICATION // REAL-WORLD CASE STUDY",
      "Real Vulnerability Traced: Prototype Pollution in 12ms",
      "How VibeLens proves an actual exploit path and distinguishes it from dormant packages.",
      5
    );

    // Left Box: Visual Call-Chain Trace (Native editable text blocks)
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 2.05,
      w: 5.7,
      h: 4.65,
      fill: { color: COLOR.BG_CARD },
      line: { color: COLOR.RED, width: 1 },
    });

    slide.addText("VERIFIED EXPLOIT PATH [CVE-2020-8203]", {
      x: 1.1,
      y: 2.3,
      w: 5.1,
      h: 0.25,
      fontSize: 11,
      color: COLOR.RED,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    const pathNodes = [
      { tag: "[PUBLIC ENTRY POINT]", label: "app/api/checkout/route.ts:L14", sub: "HTTP POST /api/checkout accepts untrusted JSON payload" },
      { tag: "[APPLICATION CALLER]", label: "src/lib/order/processor.ts:L38", sub: "processOrder() forwards user payload to deep helper" },
      { tag: "[INTERNAL HELPER]", label: "src/utils/sanitize-merge.ts:L12", sub: "Invokes lodash.merge() to combine user settings" },
      { tag: "[VULNERABLE SINK]", label: "node_modules/lodash/merge.js", sub: "🚨 CVE-2020-8203: Object Prototype Pollution Exploitable" },
    ];

    pathNodes.forEach((node, i) => {
      const nodeY = 2.7 + i * 0.95;
      slide.addText(`${node.tag}  ${node.label}`, {
        x: 1.1,
        y: nodeY,
        w: 5.1,
        h: 0.25,
        fontSize: 11,
        bold: true,
        color: i === 3 ? COLOR.RED : i === 0 ? COLOR.CYAN : COLOR.WHITE,
        fontFace: FONT.MONO,
        margin: 0,
      });
      slide.addText(node.sub, {
        x: 1.1,
        y: nodeY + 0.25,
        w: 5.1,
        h: 0.35,
        fontSize: 10,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      });
      if (i < 3) {
        slide.addText("↓", {
          x: 1.1,
          y: nodeY + 0.62,
          w: 0.5,
          h: 0.25,
          fontSize: 12,
          bold: true,
          color: COLOR.RED,
          fontFace: FONT.MONO,
          margin: 0,
        });
      }
    });

    // Right Box: Blast Radius & Instant Remediation (Native editable text blocks)
    slide.addShape(pres.ShapeType.rect, {
      x: 6.8,
      y: 2.05,
      w: 5.7,
      h: 4.65,
      fill: { color: COLOR.BG_CARD },
      line: { color: COLOR.BORDER, width: 1 },
    });

    slide.addText("BLAST RADIUS & SAFE REMEDIATION", {
      x: 7.1,
      y: 2.3,
      w: 5.1,
      h: 0.25,
      fontSize: 11,
      color: COLOR.ORANGE,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    slide.addText("Downstream Impact Analysis", {
      x: 7.1,
      y: 2.6,
      w: 5.1,
      h: 0.35,
      fontSize: 16,
      bold: true,
      color: COLOR.WHITE,
      fontFace: FONT.HEADING,
      margin: 0,
    });

    slide.addText(
      "Fixing or updating a vulnerable dependency often breaks callers.\nVibeLens computes the exact Blast Radius before you touch code:",
      {
        x: 7.1,
        y: 3.0,
        w: 5.1,
        h: 0.6,
        fontSize: 12,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      }
    );

    // Blast Radius Metric Grid
    const blastMetrics = [
      { label: "DIRECT CALLERS", val: "3 Files", col: COLOR.ORANGE },
      { label: "TRANSITIVE NODES", val: "7 Files", col: COLOR.WHITE },
      { label: "BREAKING RISK", val: "MODERATE", col: COLOR.AMBER },
      { label: "LOCAL TEST GATE", val: "18/18 PASS", col: COLOR.EMERALD },
    ];

    blastMetrics.forEach((bm, idx) => {
      const bx = 7.1 + (idx % 2) * 2.6;
      const by = 3.7 + Math.floor(idx / 2) * 0.95;
      slide.addShape(pres.ShapeType.rect, {
        x: bx,
        y: by,
        w: 2.45,
        h: 0.8,
        fill: { color: "18181B" },
        line: { color: COLOR.BORDER, width: 1 },
      });
      slide.addText(bm.label, {
        x: bx + 0.15,
        y: by + 0.1,
        w: 2.15,
        h: 0.2,
        fontSize: 9,
        color: COLOR.TEXT_DIM,
        fontFace: FONT.MONO,
        margin: 0,
      });
      slide.addText(bm.val, {
        x: bx + 0.15,
        y: by + 0.35,
        w: 2.15,
        h: 0.35,
        fontSize: 14,
        bold: true,
        color: bm.col,
        fontFace: FONT.MONO,
        margin: 0,
      });
    });

    // Zero-Slop Patch Banner
    slide.addShape(pres.ShapeType.rect, {
      x: 7.1,
      y: 5.8,
      w: 5.1,
      h: 0.75,
      fill: { color: "111115" },
      line: { color: COLOR.EMERALD, width: 1 },
    });
    slide.addText("1-CLICK AUTOMATED FIX: Replace lodash.merge with structuredClone()", {
      x: 7.25,
      y: 5.9,
      w: 4.8,
      h: 0.2,
      fontSize: 10,
      color: COLOR.EMERALD,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });
    slide.addText("Removes vulnerable package entirely with 0 breaking API changes.", {
      x: 7.25,
      y: 6.15,
      w: 4.8,
      h: 0.3,
      fontSize: 10,
      color: COLOR.TEXT_MUTED,
      fontFace: FONT.BODY,
      margin: 0,
    });

    slide.addNotes(
      "This is what judges remember: a concrete trace. Look at the left column: VibeLens maps the attack surface from route.ts through processOrder down to lodash.merge. It identifies CVE-2020-8203 as genuinely reachable. On the right, it computes the blast radius: 3 callers depend on this function. Instead of breaking production, VibeLens provides a surgical 1-click replacement with native structuredClone."
    );
  }

  // -------------------------------------------------------------
  // SLIDE 6: THE 3D X-RAY (100% NATIVE EDITABLE SHAPES & NODES)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    applyChrome(
      slide,
      "SPATIAL TELEMETRY // 3D COCKPIT",
      "The 3D Codebase X-Ray: Spatial Architecture at 120 FPS",
      "Replacing dead tabular spreadsheets with a living, interactive WebGL software city.",
      6
    );

    // Left Column: Native PowerPoint 3D Spatial Architecture Diagram
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 2.05,
      w: 6.8,
      h: 4.65,
      fill: { color: "060608" },
      line: { color: COLOR.BORDER, width: 1 },
    });

    // CAD coordinate markings on diagram (Editable text)
    slide.addText("[+000, +000] // SECTOR-00 // 3D WEBGL GRAPH HUD", {
      x: 1.0,
      y: 2.2,
      w: 4.5,
      h: 0.2,
      fontSize: 9,
      color: COLOR.TEXT_DIM,
      fontFace: FONT.MONO,
      margin: 0,
    });

    slide.addText("[GRID: BLR // 12.9716° N, 77.5946° E]", {
      x: 4.6,
      y: 2.2,
      w: 2.8,
      h: 0.2,
      fontSize: 9,
      color: COLOR.CYAN,
      fontFace: FONT.MONO,
      align: "right",
      margin: 0,
    });

    // Diagram Nodes (Constructed as native editable shapes with text!)
    const graphNodes = [
      {
        x: 1.2,
        y: 2.7,
        w: 2.6,
        h: 0.85,
        type: "ENTRY ROUTE",
        name: "app/api/checkout/route.ts",
        loc: "LOC: 142 • STATUS: REACHABLE SINK",
        color: COLOR.CYAN,
        fill: "111115",
      },
      {
        x: 4.4,
        y: 2.7,
        w: 2.8,
        h: 0.85,
        type: "CALLER HELPER",
        name: "src/lib/order/processor.ts",
        loc: "LOC: 88 • CALLERS: 3 DIRECT",
        color: COLOR.ORANGE,
        fill: "111115",
      },
      {
        x: 4.4,
        y: 4.0,
        w: 2.8,
        h: 0.85,
        type: "TARGET SINK (REACHABLE)",
        name: "lodash.merge [CVE-2020-8203]",
        loc: "🚨 EXPLOIT PATH CONFIRMED",
        color: COLOR.RED,
        fill: "1F1215",
      },
      {
        x: 1.2,
        y: 4.0,
        w: 2.6,
        h: 0.85,
        type: "PHANTOM SHIELD",
        name: "node_modules/jsonwebtoken",
        loc: "🛡️ UNCALLED // 88.6% SILENCED",
        color: COLOR.EMERALD,
        fill: "0F1914",
      },
      {
        x: 1.2,
        y: 5.3,
        w: 2.6,
        h: 0.85,
        type: "DYNAMIC REFLECTION",
        name: "src/lib/dynamic-loader.ts",
        loc: "require(variable) ➔ UNKNOWN",
        color: COLOR.AMBER,
        fill: "1C170E",
      },
      {
        x: 4.4,
        y: 5.3,
        w: 2.8,
        h: 0.85,
        type: "CLEAN PASSED SPEC",
        name: "tests/reachability.test.ts",
        loc: "✓ 18/18 TESTS GREEN (0 ERR)",
        color: COLOR.EMERALD,
        fill: "0F1914",
      },
    ];

    graphNodes.forEach((gn) => {
      slide.addShape(pres.ShapeType.rect, {
        x: gn.x,
        y: gn.y,
        w: gn.w,
        h: gn.h,
        fill: { color: gn.fill },
        line: { color: gn.color, width: 1.5 },
      });

      slide.addText(gn.type, {
        x: gn.x + 0.15,
        y: gn.y + 0.08,
        w: gn.w - 0.3,
        h: 0.18,
        fontSize: 8,
        bold: true,
        color: gn.color,
        fontFace: FONT.MONO,
        margin: 0,
      });

      slide.addText(gn.name, {
        x: gn.x + 0.15,
        y: gn.y + 0.28,
        w: gn.w - 0.3,
        h: 0.28,
        fontSize: 10,
        bold: true,
        color: COLOR.WHITE,
        fontFace: FONT.MONO,
        margin: 0,
      });

      slide.addText(gn.loc, {
        x: gn.x + 0.15,
        y: gn.y + 0.56,
        w: gn.w - 0.3,
        h: 0.2,
        fontSize: 8,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.MONO,
        margin: 0,
      });
    });

    // Connector Callout: Laser Arc Telemetry Banner inside diagram
    slide.addText("➔ ➔ ON-DEMAND RED LASER ARC (CALL CHAIN ACTIVE) ➔ ➔", {
      x: 1.2,
      y: 3.65,
      w: 6.0,
      h: 0.25,
      fontSize: 9,
      bold: true,
      color: COLOR.RED,
      fontFace: FONT.MONO,
      align: "center",
      margin: 0,
    });

    slide.addText("● 0 LASER ARCS BY DEFAULT (ZERO CLUTTER)  •  LIGHTS UP ONLY ON INFECTED NODE SELECTION", {
      x: 1.0,
      y: 6.4,
      w: 6.4,
      h: 0.2,
      fontSize: 8,
      color: COLOR.TEXT_DIM,
      fontFace: FONT.MONO,
      margin: 0,
    });

    // Right Column: Spatial Interaction Details (Editable text)
    slide.addShape(pres.ShapeType.rect, {
      x: 7.8,
      y: 2.05,
      w: 4.7,
      h: 4.65,
      fill: { color: COLOR.BG_CARD },
      line: { color: COLOR.BORDER, width: 1 },
    });

    slide.addText("TACTILE SPATIAL CONTROLS", {
      x: 8.1,
      y: 2.3,
      w: 4.1,
      h: 0.25,
      fontSize: 11,
      color: COLOR.CYAN,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    slide.addText('"Click a finding to light up its path through the codebase."', {
      x: 8.1,
      y: 2.6,
      w: 4.1,
      h: 0.7,
      fontSize: 16,
      bold: true,
      color: COLOR.WHITE,
      fontFace: FONT.HEADING,
      margin: 0,
    });

    const features = [
      {
        title: "City View Treemap",
        desc: "Deterministic squarified treemap. Building heights derive from Lines of Code (LOC) clamped via sqrt scaling.",
      },
      {
        title: "On-Demand Laser Arcs",
        desc: "Zero laser clutter by default. Clicking an infected node ignites a red laser beam tracing back to entry points.",
      },
      {
        title: "Metropolitan Grid Calibration",
        desc: "Calibrates district topology and telemetry to the developer's home city (BLR, SFO, NYC, LHR) at onboarding.",
      },
      {
        title: "Orbital Wiring Graph",
        desc: "Toggle between folder treemap and 3D force-directed dependency graph sharing identical node selection state.",
      },
    ];

    features.forEach((f, i) => {
      const fy = 3.4 + i * 0.76;
      slide.addText(`●  ${f.title}`, {
        x: 8.1,
        y: fy,
        w: 4.1,
        h: 0.25,
        fontSize: 11,
        bold: true,
        color: COLOR.EMERALD,
        fontFace: FONT.HEADING,
        margin: 0,
      });
      slide.addText(f.desc, {
        x: 8.3,
        y: fy + 0.22,
        w: 3.9,
        h: 0.5,
        fontSize: 10,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      });
    });

    slide.addNotes(
      "Here is the 3D X-Ray. Instead of scrolling through an Excel spreadsheet of CVEs, the developer sees their codebase as a living city. Files are buildings, imports are bridges. By default, there are zero lasers—clean, pitch-black silence. But the moment you click a vulnerability, a red laser arc ignites, cutting across the city to trace the exact route that reaches it. It gives developers instant architectural intuition."
    );
  }

  // -------------------------------------------------------------
  // SLIDE 7: HONEST LABELS (100% EDITABLE 3-TIER LABELS)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    applyChrome(
      slide,
      "TECHNICAL CREDIBILITY // INVARIANT #1",
      "Honest Reachability: Why VibeLens Never Says \"Safe\"",
      "Rigorous compiler honesty signals deep technical credibility to security engineers.",
      7
    );

    const labels = [
      {
        tier: "TIER 01",
        label: "REACHABLE",
        color: COLOR.RED,
        sub: "VERIFIED ZERO-DAY EXPLOIT PATH",
        desc: "A deterministic static execution path exists from a public route or main entry point directly to the vulnerable function sink.",
        action: "ACTION: Fix immediately via 1-click test-gated pull request.",
      },
      {
        tier: "TIER 02",
        label: "UNKNOWN / DYNAMIC",
        color: COLOR.AMBER,
        sub: "DYNAMIC CODE DETECTED",
        desc: "Dynamic require(variable), eval(), or runtime reflection detected in the call chain. Static analysis cannot mathematically guarantee safety.",
        action: "ACTION: Flagged honestly for manual review. Never falsely claimed safe.",
      },
      {
        tier: "TIER 03",
        label: "NOT FOUND (SILENCED)",
        color: COLOR.EMERALD,
        sub: "NO STATIC PATH FOUND",
        desc: "No static execution path leads from any public entry point to this vulnerability. Filtered from triage backlog to preserve developer focus.",
        action: "ACTION: Phantom shield enabled; silenced from noise queue.",
      },
    ];

    labels.forEach((l, idx) => {
      const cardX = 0.8 + idx * 4.0;
      slide.addShape(pres.ShapeType.rect, {
        x: cardX,
        y: 2.05,
        w: 3.75,
        h: 3.55,
        fill: { color: COLOR.BG_CARD },
        line: { color: l.color, width: 1 },
      });

      slide.addText(`${l.tier} // ${l.label}`, {
        x: cardX + 0.3,
        y: 2.3,
        w: 3.15,
        h: 0.3,
        fontSize: 14,
        bold: true,
        color: l.color,
        fontFace: FONT.MONO,
        margin: 0,
      });

      slide.addText(l.sub, {
        x: cardX + 0.3,
        y: 2.6,
        w: 3.15,
        h: 0.25,
        fontSize: 9,
        color: COLOR.TEXT_DIM,
        fontFace: FONT.MONO,
        bold: true,
        margin: 0,
      });

      slide.addText(l.desc, {
        x: cardX + 0.3,
        y: 3.0,
        w: 3.15,
        h: 1.5,
        fontSize: 12,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      });

      slide.addText(l.action, {
        x: cardX + 0.3,
        y: 4.65,
        w: 3.15,
        h: 0.6,
        fontSize: 10,
        color: COLOR.WHITE,
        fontFace: FONT.MONO,
        bold: true,
        margin: 0,
      });
    });

    // Credibility Guarantee Banner (Editable)
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 5.8,
      w: 11.7,
      h: 0.95,
      fill: { color: "111115" },
      line: { color: COLOR.BORDER, width: 1 },
    });

    slide.addText("THE SCIENTIFIC HONESTY PACT", {
      x: 1.1,
      y: 5.95,
      w: 11.0,
      h: 0.2,
      fontSize: 10,
      color: COLOR.CYAN,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    slide.addText(
      "Any security tool that claims 100% safety on dynamic JavaScript is misleading you. VibeLens maintains strict compiler credibility: deterministic static paths are proven; dynamic code is honestly classified as 'Unknown'.",
      {
        x: 1.1,
        y: 6.2,
        w: 11.0,
        h: 0.45,
        fontSize: 12,
        color: COLOR.TEXT_MAIN,
        fontFace: FONT.BODY,
        margin: 0,
      }
    );

    slide.addNotes(
      "Judges with security backgrounds respect this slide most. We never claim a codebase is '100% safe.' That is mathematically impossible in dynamic languages with eval and runtime reflection. Instead, we provide honest labels: Reachable, Unknown, and No Static Path Found. If code is dynamic, we classify it honestly as Unknown. This scientific rigor separates VibeLens from generic marketing hype."
    );
  }

  // -------------------------------------------------------------
  // SLIDE 8: RESULTS & BENCHMARKS (100% EDITABLE NUMBERS & TABLE)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    applyChrome(
      slide,
      "EMPIRICAL RESULTS // BENCHMARK VERIFICATION",
      "Benchmark: 88.6% - 94.4% Alert Noise Silenced",
      "Tested on real-world open-source repositories and deliberately vulnerable testbeds.",
      8
    );

    const stats = [
      { num: "88.6%", label: "NOISE REDUCTION", sub: "31 of 35 alerts silenced", col: COLOR.EMERALD },
      { num: "0", label: "FALSE NEGATIVES", sub: "On static execution paths", col: COLOR.CYAN },
      { num: "12ms", label: "ANALYSIS LATENCY", sub: "AST traversal on-device", col: COLOR.WHITE },
      { num: "100%", label: "LOCAL PRIVACY", sub: "0 source code bytes uploaded", col: COLOR.EMERALD },
    ];

    stats.forEach((st, idx) => {
      const cardX = 0.8 + idx * 3.0;
      slide.addShape(pres.ShapeType.rect, {
        x: cardX,
        y: 2.05,
        w: 2.8,
        h: 1.6,
        fill: { color: COLOR.BG_CARD },
        line: { color: COLOR.BORDER, width: 1 },
      });

      slide.addText(st.num, {
        x: cardX + 0.2,
        y: 2.2,
        w: 2.4,
        h: 0.65,
        fontSize: 34,
        bold: true,
        color: st.col,
        fontFace: FONT.HEADING,
        margin: 0,
      });

      slide.addText(st.label, {
        x: cardX + 0.2,
        y: 2.9,
        w: 2.4,
        h: 0.25,
        fontSize: 10,
        bold: true,
        color: COLOR.TEXT_MAIN,
        fontFace: FONT.MONO,
        margin: 0,
      });

      slide.addText(st.sub, {
        x: cardX + 0.2,
        y: 3.15,
        w: 2.4,
        h: 0.35,
        fontSize: 9,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      });
    });

    // Comparison Table Card (100% editable cells)
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 3.85,
      w: 11.7,
      h: 2.85,
      fill: { color: COLOR.BG_CARD },
      line: { color: COLOR.BORDER, width: 1 },
    });

    slide.addText("CONTROLLED BENCHMARK COMPARISON", {
      x: 1.1,
      y: 4.05,
      w: 11.0,
      h: 0.25,
      fontSize: 11,
      color: COLOR.CYAN,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    const headers = ["BENCHMARK DIMENSION", "STANDARD NPM AUDIT", "VIBELENS REACHABLESEC", "DEVELOPER IMPACT"];
    headers.forEach((h, i) => {
      slide.addText(h, {
        x: 1.1 + i * 2.8,
        y: 4.4,
        w: 2.6,
        h: 0.25,
        fontSize: 9,
        color: COLOR.TEXT_DIM,
        fontFace: FONT.MONO,
        bold: true,
        margin: 0,
      });
    });

    const rows = [
      ["Reported CVE Count", "36 Security Alerts", "2 Reachable Exploits", "94.4% Triage Drop"],
      ["Triage Investigation Time", "~140 Minutes Manual", "< 2 Minutes Automated", "70x Faster Resolution"],
      ["Developer Behavior", "Ignored / audit --audit-level", "1-Click PR Remediation", "True Security Hygiene"],
      ["Local Test Verification Gate", "None (Blind merge)", "18/18 Tests Green", "Zero Broken Production"],
    ];

    rows.forEach((r, rowIdx) => {
      const ry = 4.75 + rowIdx * 0.45;
      r.forEach((cell, colIdx) => {
        slide.addText(cell, {
          x: 1.1 + colIdx * 2.8,
          y: ry,
          w: 2.6,
          h: 0.35,
          fontSize: 11,
          color: colIdx === 2 ? COLOR.EMERALD : colIdx === 1 ? COLOR.RED : colIdx === 3 ? COLOR.CYAN : COLOR.TEXT_MAIN,
          fontFace: colIdx === 0 ? FONT.BODY : FONT.MONO,
          bold: colIdx === 2 || colIdx === 3,
          margin: 0,
        });
      });
    });

    slide.addNotes(
      "Here are the real benchmark numbers: On our test repository, npm audit flagged 36 CVEs. VibeLens traversed the call-graph and proved that 34 of them were completely uncalled phantom code. Only 2 were reachable. Instead of wasting 140 minutes inspecting 36 false alarms, the developer fixes the 2 real risks in under two minutes."
    );
  }

  // -------------------------------------------------------------
  // SLIDE 9: WHO IT'S FOR (100% EDITABLE PERSONA CARDS)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    applyChrome(
      slide,
      "TARGET AUDIENCE // MARKET FIT",
      "Built for the Generative Era: Vibe Coders & Lean Teams",
      "Protecting the fastest builders from the unintended consequences of AI velocity.",
      9
    );

    const personas = [
      {
        badge: "PRIMARY PERSONA",
        title: "AI Vibe Coders & Solo Hackers",
        quote: '"I want to ship my full-stack app today, not spend 3 hours reading CVE disclosures."',
        points: [
          "Building rapid prototypes with Cursor, Claude Code, v0.dev, and Bolt.new.",
          "Installs npm packages quickly without reading deep transitive dependencies.",
          "Needs non-blocking security guardrails that highlight only fatal zero-day bugs.",
        ],
        color: COLOR.CYAN,
      },
      {
        badge: "EXPANSION PERSONA",
        title: "Lean Startups & Small Dev Teams",
        quote: '"We have 8 engineers and zero full-time AppSec staff. Our Dependabot queue is out of control."',
        points: [
          "Engineering teams with 3–20 developers shipping daily customer features.",
          "Paralyzed by hundreds of Dependabot PRs that break build tests.",
          "Needs high-confidence automated PRs gated by local vitest passes.",
        ],
        color: COLOR.EMERALD,
      },
    ];

    personas.forEach((p, idx) => {
      const cardX = 0.8 + idx * 5.95;
      slide.addShape(pres.ShapeType.rect, {
        x: cardX,
        y: 2.05,
        w: 5.75,
        h: 4.65,
        fill: { color: COLOR.BG_CARD },
        line: { color: COLOR.BORDER, width: 1 },
      });

      slide.addText(p.badge, {
        x: cardX + 0.3,
        y: 2.3,
        w: 5.15,
        h: 0.25,
        fontSize: 10,
        color: p.color,
        fontFace: FONT.MONO,
        bold: true,
        margin: 0,
      });

      slide.addText(p.title, {
        x: cardX + 0.3,
        y: 2.6,
        w: 5.15,
        h: 0.45,
        fontSize: 18,
        bold: true,
        color: COLOR.WHITE,
        fontFace: FONT.HEADING,
        margin: 0,
      });

      slide.addText(p.quote, {
        x: cardX + 0.3,
        y: 3.1,
        w: 5.15,
        h: 0.6,
        fontSize: 12,
        color: p.color,
        fontFace: FONT.BODY,
        margin: 0,
      });

      p.points.forEach((pt, ptIdx) => {
        const pty = 3.85 + ptIdx * 0.7;
        slide.addText(`✓  ${pt}`, {
          x: cardX + 0.3,
          y: pty,
          w: 5.15,
          h: 0.55,
          fontSize: 12,
          color: COLOR.TEXT_MUTED,
          fontFace: FONT.BODY,
          margin: 0,
        });
      });
    });

    slide.addNotes(
      "Who is VibeLens for? First, the exploding demographic of AI Vibe Coders—developers building apps in an afternoon with Cursor, Claude, or v0. They don't have time to audit dependencies. Second, lean startups with 3 to 20 engineers and no dedicated security team. They're drowning in Dependabot PRs. VibeLens filters the noise from the tools they already use."
    );
  }

  // -------------------------------------------------------------
  // SLIDE 10: TECH STACK & ARCHITECTURE (EXPLODED OPTICAL ENGINE)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    applyChrome(
      slide,
      "UNDER THE HOOD // INDUSTRIAL ARCHITECTURE",
      "The Exploded Optical Engine: 5-Layer Stack Architecture",
      "A pure JavaScript/TypeScript stack running 100% locally on-device in <15ms.",
      10
    );

    const stackLayers = [
      { ring: "RING 01", name: "Front Collector", stack: "@babel/parser + es-module-lexer", role: "100% offline local AST parsing & export lexing", col: COLOR.CYAN },
      { ring: "RING 02", name: "Focus Helicoid", stack: "Transformers.js (all-MiniLM-L6-v2 WASM)", role: "384-dimensional on-device semantic embeddings", col: COLOR.AMBER },
      { ring: "RING 03", name: "Aperture Iris", stack: "Deterministic DFS Call-Graph Gate", role: "Filters phantom CVEs; isolates reachable exploit sinks", col: COLOR.RED },
      { ring: "RING 04", name: "Bayonet Flange", stack: "Universal Tri-Bridge (MCP + Handover)", role: "Connects Cursor, Claude Code, and web builders", col: COLOR.EMERALD },
      { ring: "RING 05", name: "Sensor Plane", stack: "Three.js + React Three Fiber WebGL", role: "Deterministic 3D squarified treemap & wiring graph", col: COLOR.BLUE },
    ];

    stackLayers.forEach((sl, idx) => {
      const rowY = 2.05 + idx * 0.92;
      slide.addShape(pres.ShapeType.rect, {
        x: 0.8,
        y: rowY,
        w: 11.7,
        h: 0.8,
        fill: { color: COLOR.BG_CARD },
        line: { color: sl.col, width: 1.5 },
      });

      slide.addText(`${sl.ring} // ${sl.name.toUpperCase()}`, {
        x: 1.1,
        y: rowY + 0.12,
        w: 2.6,
        h: 0.25,
        fontSize: 11,
        bold: true,
        color: sl.col,
        fontFace: FONT.MONO,
        margin: 0,
      });

      slide.addText(sl.stack, {
        x: 3.8,
        y: rowY + 0.12,
        w: 4.0,
        h: 0.25,
        fontSize: 12,
        bold: true,
        color: COLOR.WHITE,
        fontFace: FONT.HEADING,
        margin: 0,
      });

      slide.addText(sl.role, {
        x: 3.8,
        y: rowY + 0.42,
        w: 8.4,
        h: 0.3,
        fontSize: 11,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      });

      slide.addText(`[OK // 0ms LEAK]`, {
        x: 10.3,
        y: rowY + 0.12,
        w: 2.0,
        h: 0.25,
        fontSize: 10,
        color: COLOR.EMERALD,
        fontFace: FONT.MONO,
        align: "right",
        margin: 0,
      });
    });

    slide.addNotes(
      "Here is our stack, modeled as our exploded optical engine. Layer 1: Babel and es-module-lexer parse code on disk. Layer 2: Transformers.js computes on-device embeddings with zero cloud API keys. Layer 3: Our DFS call-graph filters phantom CVEs. Layer 4: Our Universal Tri-Bridge connects to Cursor, Claude, and v0 via MCP and handover files. Layer 5: Three.js renders the 3D software city. It's 100% TypeScript, runs in <15ms, and complies with strict local privacy."
    );
  }

  // -------------------------------------------------------------
  // SLIDE 11: ROADMAP (100% EDITABLE ROADMAP ITEMS)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    applyChrome(
      slide,
      "EXECUTION TIMELINE // 2026 ROADMAP",
      "What We Built for the Hackathon & What Comes Next",
      "A complete, working core today with a focused trajectory for tomorrow.",
      11
    );

    // Left Column: Built for Hackathon
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 2.05,
      w: 5.75,
      h: 4.65,
      fill: { color: COLOR.BG_CARD },
      line: { color: COLOR.EMERALD, width: 1.5 },
    });

    slide.addText("BUILT FOR HACKATHON // WORKING TODAY", {
      x: 1.1,
      y: 2.3,
      w: 5.15,
      h: 0.25,
      fontSize: 11,
      color: COLOR.EMERALD,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    const shipped = [
      { title: "ReachableSec SAST Engine", desc: "Deterministic DFS call-graph reachability traversal with 3-tier honest classification." },
      { title: "3D Spatial Treemap & Wiring Cockpit", desc: "Three.js WebGL canvas with on-demand reachability red laser arcs." },
      { title: "Exploded Optical Engine Telemetry", desc: "Anime.js-style hardware caliper scrubber and 5 compound stack layers." },
      { title: "Personalized Metro Grid Calibration", desc: "User city calibration (BLR, SFO, NYC, LHR) with aerospace coordinates." },
      { title: "Local Verification Gate", desc: "18/18 unit tests green; pre-push git hook preventing regression." },
    ];

    shipped.forEach((item, idx) => {
      const iy = 2.7 + idx * 0.74;
      slide.addText(`✓  ${item.title}`, {
        x: 1.1,
        y: iy,
        w: 5.15,
        h: 0.25,
        fontSize: 12,
        bold: true,
        color: COLOR.WHITE,
        fontFace: FONT.HEADING,
        margin: 0,
      });
      slide.addText(item.desc, {
        x: 1.35,
        y: iy + 0.22,
        w: 4.9,
        h: 0.45,
        fontSize: 10,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      });
    });

    // Right Column: Future Roadmap
    slide.addShape(pres.ShapeType.rect, {
      x: 6.75,
      y: 2.05,
      w: 5.75,
      h: 4.65,
      fill: { color: COLOR.BG_CARD },
      line: { color: COLOR.BORDER, width: 1 },
    });

    slide.addText("PRODUCT ROADMAP // PHASE 2 & 3", {
      x: 7.05,
      y: 2.3,
      w: 5.15,
      h: 0.25,
      fontSize: 11,
      color: COLOR.CYAN,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    const next = [
      { title: "AST De-Duplication Engine", desc: "On-device vector clustering to detect and consolidate AI-generated duplicate helpers." },
      { title: "Zero-Slop Prompt Compiler", desc: "Compresses handover AST context to ~140 tokens for v0.dev and Bolt.new." },
      { title: "1-Click Test-Gated Pull Requests", desc: "Automated patch generation that executes 'npm test' locally before creating PRs." },
      { title: "Multi-Language Expansion", desc: "Extending reachability graphs to Python AST (FastAPI) and Go dependencies." },
    ];

    next.forEach((item, idx) => {
      const iy = 2.7 + idx * 0.92;
      slide.addText(`➔  ${item.title}`, {
        x: 7.05,
        y: iy,
        w: 5.15,
        h: 0.25,
        fontSize: 12,
        bold: true,
        color: COLOR.CYAN,
        fontFace: FONT.HEADING,
        margin: 0,
      });
      slide.addText(item.desc, {
        x: 7.3,
        y: iy + 0.22,
        w: 4.9,
        h: 0.55,
        fontSize: 10,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      });
    });

    slide.addNotes(
      "Notice our discipline here. For the hackathon, we built and verified ReachableSec and the 3D X-Ray. They are 100% working today. On the right, we present our post-hackathon roadmap: AST de-duplication, context shrinking for prompt compilers, and multi-language support. We present these clearly on the roadmap without pretending they are already finished."
    );
  }

  // -------------------------------------------------------------
  // SLIDE 12: THE ASK & CLOSING (100% EDITABLE CARDS & BANNER)
  // -------------------------------------------------------------
  {
    const slide = pres.addSlide();
    applyChrome(
      slide,
      "CALL TO ACTION // CLOSING VISION",
      "Build with the Velocity of AI. Keep the Clarity of a Master Craftsman.",
      "The future of software belongs to builders who pair AI generation with mathematical verification.",
      12
    );

    // Left Box: What We Are Asking For
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 2.05,
      w: 5.75,
      h: 3.55,
      fill: { color: COLOR.BG_CARD },
      line: { color: COLOR.CYAN, width: 1.5 },
    });

    slide.addText("WHAT WE ARE ASKING FROM THE JUDGES", {
      x: 1.1,
      y: 2.3,
      w: 5.15,
      h: 0.25,
      fontSize: 11,
      color: COLOR.CYAN,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    const asks = [
      { bold: "Feedback on Static Heuristics:", text: "Insights from security architects on handling complex dynamic import edges." },
      { bold: "Ecosystem Mentorship:", text: "Guidance on integrating directly into GitHub Actions and npm package publishing pipelines." },
      { bold: "Design Partner Pilots:", text: "3 fast-moving engineering teams to run VibeLens in active CI/CD development." },
    ];

    asks.forEach((a, i) => {
      const ay = 2.7 + i * 0.76;
      slide.addText(`●  ${a.bold}`, {
        x: 1.1,
        y: ay,
        w: 5.15,
        h: 0.25,
        fontSize: 12,
        bold: true,
        color: COLOR.WHITE,
        fontFace: FONT.HEADING,
        margin: 0,
      });
      slide.addText(a.text, {
        x: 1.35,
        y: ay + 0.22,
        w: 4.9,
        h: 0.45,
        fontSize: 11,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      });
    });

    // Right Box: 100% Local Privacy Pledge
    slide.addShape(pres.ShapeType.rect, {
      x: 6.75,
      y: 2.05,
      w: 5.75,
      h: 3.55,
      fill: { color: COLOR.BG_CARD },
      line: { color: COLOR.EMERALD, width: 1.5 },
    });

    slide.addText("OUR COMMITMENT: 100% LOCAL PRIVACY", {
      x: 7.05,
      y: 2.3,
      w: 5.15,
      h: 0.25,
      fontSize: 11,
      color: COLOR.EMERALD,
      fontFace: FONT.MONO,
      bold: true,
      margin: 0,
    });

    const pledges = [
      { bold: "Zero Cloud Code Uploads:", text: "All AST parsing, call-graphs, and embeddings execute 100% locally on your machine." },
      { bold: "Zero API Key Tax:", text: "Powered by on-device sentence transformers in WebAssembly. No OpenAI tokens consumed." },
      { bold: "Open Source & Local First:", text: "Built for developers who value autonomy, privacy, and speed." },
    ];

    pledges.forEach((p, i) => {
      const py = 2.7 + i * 0.76;
      slide.addText(`●  ${p.bold}`, {
        x: 7.05,
        y: py,
        w: 5.15,
        h: 0.25,
        fontSize: 12,
        bold: true,
        color: COLOR.WHITE,
        fontFace: FONT.HEADING,
        margin: 0,
      });
      slide.addText(p.text, {
        x: 7.3,
        y: py + 0.22,
        w: 4.9,
        h: 0.45,
        fontSize: 11,
        color: COLOR.TEXT_MUTED,
        fontFace: FONT.BODY,
        margin: 0,
      });
    });

    // Bottom Closing Banner
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 5.8,
      w: 11.7,
      h: 0.95,
      fill: { color: "111115" },
      line: { color: COLOR.CYAN, width: 1 },
    });

    slide.addText('"Build with the velocity of AI. Keep the clarity of a master craftsman."', {
      x: 1.1,
      y: 5.95,
      w: 11.0,
      h: 0.35,
      fontSize: 17,
      bold: true,
      color: COLOR.WHITE,
      fontFace: FONT.HEADING,
      align: "center",
      margin: 0,
    });

    slide.addText("github.com/chiraggoenka17512-coder/vibelens  •  Prasunex Innovathon 2026", {
      x: 1.1,
      y: 6.35,
      w: 11.0,
      h: 0.25,
      fontSize: 10,
      color: COLOR.CYAN,
      fontFace: FONT.MONO,
      align: "center",
      margin: 0,
    });

    slide.addNotes(
      "To conclude: We are asking for feedback, mentorship from security architects, and 3 pilot design partner teams to run VibeLens in their daily workflows. In the generative era, developers don't have to choose between AI speed and security integrity. You can build with the velocity of AI, and keep the clarity of a master craftsman. Thank you."
    );
  }

  // Output presentation directory
  const outDir = path.join(__dirname, "../presentation");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, "vibelens-pitch-deck.pptx");
  return pres.writeFile({ fileName: outPath }).then(() => {
    console.log(`Presentation written successfully to: ${outPath}`);
    return outPath;
  });
}

buildPitchDeck().catch((err) => {
  console.error("Error generating presentation:", err);
  process.exit(1);
});
