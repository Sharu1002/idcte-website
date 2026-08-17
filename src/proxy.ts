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

// The CMS is excluded from the preview gate on purpose: /admin has its own
// GitHub OAuth login, so only repo collaborators can get in either way. Leaving
// it gated breaks it — Decap fetches /admin/config.yml itself, and the gate
// answers that request with the login page instead of the config. api/auth and
// api/callback are excluded for the same reason: the OAuth round-trip can't
// survive being redirected.
export const config = {
  matcher: [
    "/((?!preview-login|api/preview-auth|api/auth|api/callback|admin|_next/static|_next/image|favicon.ico|images|documents).*)",
  ],
};
