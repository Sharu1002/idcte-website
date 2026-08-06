import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "idcte_preview";

export function proxy(request: NextRequest) {
  const password = process.env.PREVIEW_PASSWORD;

  // If no password is configured, the gate is off (e.g. local dev).
  if (!password) return NextResponse.next();

  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (cookie === password) return NextResponse.next();

  const url = new URL("/preview-login", request.url);
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!preview-login|api/preview-auth|_next/static|_next/image|favicon.ico|images|documents).*)",
  ],
};
