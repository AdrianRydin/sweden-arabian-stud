import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_COOKIE_NAME = "sweden_arabian_admin_token";

function getJwtSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is not defined");
  }

  return new TextEncoder().encode(secret);
}

async function isAdmin(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  try {
    const verified = await jwtVerify(token, getJwtSecret());
    return verified.payload.role === "admin";
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin");

  if (!isAdminPage) {
    return NextResponse.next();
  }

  const authenticated = await isAdmin(req);

  if (!authenticated && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (authenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
