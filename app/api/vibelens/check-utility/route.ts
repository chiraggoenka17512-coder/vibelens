import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    const canonicalRegistry: Record<string, { path: string; line: number; purpose: string }> = {
      formatdate: { path: "utils/formatDate.ts", line: 8, purpose: "Format Date to YYYY-MM-DD" },
      parsedate: { path: "utils/formatDate.ts", line: 8, purpose: "Date parsing canonical utility" },
      getisotimestamp: { path: "utils/formatDate.ts", line: 18, purpose: "ISO timestamp generator" },
    };

    const key = (name || "").toLowerCase().replace(/[^a-z]/g, "");
    const match = canonicalRegistry[key];

    if (match) {
      return NextResponse.json(
        {
          duplicateDetected: true,
          canonicalPath: match.path,
          canonicalLine: match.line,
          purpose: match.purpose,
          message: `[VIBELENS MCP] ⚠️ Slop detected! Function '${name}' is already canonical in '${match.path}#L${match.line}'. Import it directly instead of creating a duplicate.`,
        },
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    return NextResponse.json(
      {
        duplicateDetected: false,
        message: `[VIBELENS MCP] ✔ No duplicate found for '${name}'. Clean to implement.`,
      },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request format" },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
