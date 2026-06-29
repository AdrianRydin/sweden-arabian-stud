import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "sweden_arabian_admin_token";

const getJwtSecret = () => {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is not defined");
  }

  return new TextEncoder().encode(secret);
};

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export async function createAdminToken(email: string) {
  return new SignJWT({
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifyAdminRequest(req: NextRequest) {
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

export async function requireAdmin(req: NextRequest) {
  const isAdmin = await verifyAdminRequest(req);

  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return null;
}
