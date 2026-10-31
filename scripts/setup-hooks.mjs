import fs from "fs";
import path from "path";

const hookPath = path.join(process.cwd(), ".git", "hooks", "pre-push");

const hookContent = `#!/bin/sh
echo "[VibeLens Gate] 🛡️ Running local verification (Vitest tests + TypeScript typecheck)..."
npm run verify
STATUS=$?

if [ $STATUS -ne 0 ]; then
  echo ""
  echo "======================================================================"
  echo "[VibeLens Gate] ❌ VERIFICATION FAILED! PUSH ABORTED."
  echo "You cannot push broken tests or invalid TypeScript types to GitHub."
  echo "Run 'npm test' and 'npx tsc --noEmit' to inspect and fix the errors."
  echo "======================================================================"
  echo ""
  exit 1
fi

echo "[VibeLens Gate] ✅ 100% Tests & Types Green. Proceeding with push..."
exit 0
`;

try {
  const hooksDir = path.dirname(hookPath);
  if (fs.existsSync(hooksDir)) {
    fs.writeFileSync(hookPath, hookContent, { mode: 0o755 });
    console.log("[VibeLens] ✅ Git pre-push hook successfully installed at .git/hooks/pre-push");
  } else {
    console.log("[VibeLens] ⚠️ .git directory not found. Skipping hook installation.");
  }
} catch (err) {
  console.error("[VibeLens] ⚠️ Failed to install git hook:", err);
}
