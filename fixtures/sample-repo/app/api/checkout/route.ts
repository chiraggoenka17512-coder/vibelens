import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { formatDate } from "../../../utils/formatDate";

const JWT_SECRET = process.env.JWT_SECRET || "insecure-vibe-secret-key-12345";

/**
 * Public HTTP Entry Point: POST /api/checkout
 * 
 * AST Reachability Analysis:
 * 1. Reachable Dependency: `jsonwebtoken` (Imported and statically called in handler via `jwt.sign`)
 * 2. Reachable Local File: `utils/formatDate.ts` (Imported and invoked to timestamp orders)
 * 3. Dead Dependency: `lodash` (Declared in package.json but 0 call paths exist from entrypoints)
 * 4. Duplicate Helper: `helpers/parseDate.ts` (Never called by checkout; candidate for vibe slop deduplication)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, amount, currency } = body;

    if (!userId || !amount) {
      return NextResponse.json(
        { error: "Missing required checkout parameters: userId, amount" },
        { status: 400 }
      );
    }

    // Call to local reachable utility
    const orderDate = formatDate(new Date());

    // Call to reachable third-party dependency: jsonwebtoken
    const checkoutToken = jwt.sign(
      {
        sub: userId,
        amount,
        currency: currency || "USD",
        orderDate,
      },
      JWT_SECRET,
      { expiresIn: "1h", algorithm: "HS256" }
    );

    return NextResponse.json({
      status: "success",
      orderId: `ord_${Date.now()}`,
      orderDate,
      checkoutToken,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to initialize checkout session" },
      { status: 500 }
    );
  }
}
