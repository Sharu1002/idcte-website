import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "idcte_preview";

export async function POST(request: NextRequest) {
  const expected = process.env.PREVIEW_PASSWORD;
  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
