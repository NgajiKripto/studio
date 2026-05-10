import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionToken,
  getAdminPanelPath,
  isDeviceAllowed,
  secureCompare,
} from "@/lib/admin-security";

const ADMIN_SESSION_MAX_AGE_SECONDS = (() => {
  const parsed = Number.parseInt(process.env.ADMIN_SESSION_MAX_AGE_SECONDS ?? "", 10);
  const MIN_SESSION_DURATION_SECONDS = 60 * 5;
  const MAX_SESSION_DURATION_SECONDS = 60 * 60 * 24;

  if (
    Number.isFinite(parsed) &&
    parsed >= MIN_SESSION_DURATION_SECONDS &&
    parsed <= MAX_SESSION_DURATION_SECONDS
  ) {
    return parsed;
  }
  return 60 * 60 * 8;
})();

export async function POST(req: NextRequest) {
  if (!process.env.ADMIN_ACCESS_KEY || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { error: "Admin access is not configured on this server." },
      { status: 503 }
    );
  }

  if (!isDeviceAllowed(req.headers)) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const providedKey = body?.accessKey;

    const expectedKey = process.env.ADMIN_ACCESS_KEY;
    if (
      typeof providedKey !== "string" ||
      !expectedKey ||
      !secureCompare(providedKey, expectedKey)
    ) {
      return NextResponse.json({ error: "Akses ditolak." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, adminPath: getAdminPanelPath() });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE_NAME,
      value: createAdminSessionToken(req.headers),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Payload tidak valid." }, { status: 400 });
  }
}
