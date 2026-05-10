import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionToken,
  getAdminPanelPath,
  isDeviceAllowed,
} from "@/lib/admin-security";

export async function POST(req: NextRequest) {
  if (!process.env.ADMIN_ACCESS_KEY || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { error: "Admin access is not configured on this server." },
      { status: 503 }
    );
  }

  if (!isDeviceAllowed(req.headers)) {
    return NextResponse.json({ error: "Akses perangkat ditolak." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const providedKey = body?.accessKey;

    if (typeof providedKey !== "string" || providedKey !== process.env.ADMIN_ACCESS_KEY) {
      return NextResponse.json({ error: "Kunci akses admin tidak valid." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, adminPath: getAdminPanelPath() });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE_NAME,
      value: createAdminSessionToken(req.headers),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Payload tidak valid." }, { status: 400 });
  }
}
