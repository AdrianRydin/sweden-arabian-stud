import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "../../../lib/auth";

export async function GET(req: NextRequest) {
  const isAdmin = await verifyAdminRequest(req);

  if (!isAdmin) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true }, { status: 200 });
}
