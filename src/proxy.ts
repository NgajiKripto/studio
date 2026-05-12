import { NextRequest, NextResponse } from "next/server";

const ADMIN_SESSION_COOKIE_NAME = "muakeup_admin_session";

const securityHeaders = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check /admin/* routes: require admin session cookie.
  // NOTE: This is a UX-level redirect only (presence check, not signature verification).
  // Full HMAC signature verification happens server-side in the admin layout.tsx before
  // any content is rendered, so a forged cookie cannot access actual admin data.
  if (pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get(ADMIN_SESSION_COOKIE_NAME);
    if (!adminSession?.value) {
      const url = request.nextUrl.clone();
      url.pathname = "/akses-admin";
      return NextResponse.redirect(url);
    }
  }

  // Check /dashboard route: require NextAuth session cookie
  if (pathname.startsWith("/dashboard")) {
    const sessionToken =
      request.cookies.get("next-auth.session-token") ||
      request.cookies.get("__Secure-next-auth.session-token");
    if (!sessionToken?.value) {
      const url = request.nextUrl.clone();
      url.pathname = "/api/auth/signin";
      return NextResponse.redirect(url);
    }
  }

  const response = NextResponse.next();

  // Set security headers on all responses
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
