# VibeLens: Prasunex Innovathon 2026 Pitch Strategy & Script

> **Target Competition:** Prasunex Innovathon 2026 (Unstop)  
> **Format:** 3-Minute Live Presentation & Prototype Demonstration  
> **Core Theme:** Curing the Vibe Coding Hangover & Enterprise Alert Fatigue

---

## 🎤 The 3-Minute Live Pitch Script

| Timestamp | Spoken Pitch to Jury | Live On-Screen Visual Action |
| :--- | :--- | :--- |
| **0:00 - 0:40**<br>*(The Hook & Pain)* | *"Snyk tells you what's vulnerable. VibeLens tells you what's actually reachable, and uses native MCP tools to stop your AI from creating the mess in the first place. Millions of developers are vibe-coding with Cursor, but after 48 hours, codebases turn into toxic spaghetti: duplicate functions, 40% bloated token bills, ugly generic UIs, and 40 false-alarm CVE alerts that paralyze deployment."* | Paste a messy Next.js repository into VibeLens. Conventional scanner alert counter flashes: **`35 CRITICAL CVEs // 48,200 CONTEXT TOKENS`**. |
| **0:40 - 1:20**<br>*(The Counter Drop)* | *"Watch our 3D X-Ray. Out of 35 scary alerts, 31 are in dead code our application never calls. Watch the live counter: 35 alerts drops to 1 REAL reachable exploit. The fake alerts dissolve into green shields, while the true exploit illuminates in a red laser vector."* | Click **Run Reachability Audit**. Counter drops live on screen: **`35 ➔ 1 Real CVE`**. 3D red laser illuminates the exact call path to `lodash.template`. |
| **1:20 - 2:00**<br>*(Blast Radius & MCP)* | *"What if you want to delete a file? Click any node: our Blast Radius HUD shows exactly which 4 files break. And Cursor calls our MCP server before writing, preventing duplicate slop before code is even generated."* | Click `auth.ts`: Blast Radius glows in orange showing 4 upstream callers. Show terminal MCP tool executing `find_existing_utility` to block duplication. |
| **2:00 - 3:00**<br>*(Safe Test & PR)* | *"Finally, we don't break code. We preview the diff, run the repository's native unit tests, and only then open a clean Pull Request. Token counter drops: 48k ➔ 29k tokens saved. Zero chaos, verified code."* | Click **De-Slop & Secure**. Automated test runner outputs green checkmarks, and GitHub PR #14 opens live on screen. |

---

## 🏆 Prasunex Innovathon 2026 Track Alignment

* **AI & ML Track:** Model Context Protocol (MCP) intelligent prevention tools and AST vector semantic fingerprinting.
* **Automation Track:** Test-gated autonomous Pull Request generation and automated reachability CVE filtering.
* **Web & Cloud Development Track:** Modern full-stack TypeScript stack: Next.js 15, React 19, Supabase PostgreSQL, Drizzle ORM, Clerk auth, and Upstash Redis.
* **Digital Transformation & Business ROI:** Slashing enterprise LLM token costs by 39.6% and saving engineering teams hundreds of wasted DevSecOps false-positive triage hours.

---

## 🎯 The Winning Closing Line

> *"Prasunex challenges us to build practical solutions for real-world digital transformation. VibeLens takes the single biggest engineering bottleneck of the generative AI coding revolution—codebase slop and cybersecurity alert paralysis—and solves it with verified compiler science."*

---

## 🛡️ Prepared Jury Q&A Cheat Sheet

* **Q: Why not just use Snyk or Dependabot?**  
  * **A:** *"Snyk inspects package manifests, not execution paths. It alerts on package presence, causing 85% false-positive fatigue. VibeLens operates on the AST call-graph, proving whether an exploit path is mathematically reachable, while actively preventing slop via MCP before code is written."*

* **Q: What if reachability misses a dynamic call?**  
  * **A:** *"That is why we built our 4-tier confidence model. Dynamic `require()` and `eval()` are never falsely marked Unreachable; they are classified as 'Unknown', maintaining 100% security integrity."*

* **Q: Why is your tech stack Next.js, Supabase, Clerk, Drizzle, and Upstash?**  
  * **A:** *"This is the gold-standard modern TypeScript stack: Clerk provides instant developer auth and dev keys; Supabase PostgreSQL with Drizzle ORM provides type-safe persistence for audit histories; Upstash Redis caches global CVE lookups for sub-5ms latency; and Three.js renders the 3D topology radar in real time."*

