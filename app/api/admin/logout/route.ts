import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminCookieOptions } from "../../../lib/auth";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 },
  );

  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...getAdminCookieOptions(),
    maxAge: 0,
  });

  return response;
}
