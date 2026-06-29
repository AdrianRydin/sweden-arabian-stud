import { NextRequest, NextResponse } from "next/server";
import {
  createAdminToken,
  ADMIN_COOKIE_NAME,
  getAdminCookieOptions,
} from "../../../lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { message: "Admin credentials are not configured" },
        { status: 500 },
      );
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const token = await createAdminToken(email);

    const response = NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 },
    );

    response.cookies.set(ADMIN_COOKIE_NAME, token, getAdminCookieOptions());

    return response;
  } catch (error) {
    console.error("POST /api/admin/login error:", error);

    return NextResponse.json({ message: "Failed to log in" }, { status: 500 });
  }
}
