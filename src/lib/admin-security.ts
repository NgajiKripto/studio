import { createHash, createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE_NAME = "muakeup_admin_session";

const DEFAULT_ADMIN_ENTRY_PATH = "/akses-admin";
const DEFAULT_ADMIN_PANEL_PATH = "/admin";

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function hmac(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function secureCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a, "utf8");
  const bBuffer = Buffer.from(b, "utf8");
  const maxLength = Math.max(aBuffer.length, bBuffer.length);

  const aPadded = Buffer.alloc(maxLength);
  const bPadded = Buffer.alloc(maxLength);
  aBuffer.copy(aPadded);
  bBuffer.copy(bPadded);

  const isEqual = timingSafeEqual(aPadded, bPadded);
  return isEqual && aBuffer.length === bBuffer.length;
}

function normalizePath(value: string | undefined, fallback: string) {
  const raw = value?.trim();
  if (!raw) return fallback;
  return raw.startsWith("/") ? raw : `/${raw}`;
}

export function getAdminEntryPath() {
  return normalizePath(process.env.ADMIN_ENTRY_PATH, DEFAULT_ADMIN_ENTRY_PATH);
}

export function getAdminPanelPath() {
  return normalizePath(process.env.ADMIN_PANEL_PATH, DEFAULT_ADMIN_PANEL_PATH);
}

export function getDeviceFingerprint(headers: Headers) {
  const userAgent = headers.get("user-agent") ?? "";
  const strictDeviceFingerprint = process.env.ADMIN_STRICT_DEVICE_FINGERPRINT === "true";

  if (!strictDeviceFingerprint) {
    return sha256(userAgent);
  }

  const acceptLanguage = headers.get("accept-language") ?? "";
  return sha256(`${userAgent}|${acceptLanguage}`);
}

export function isDeviceAllowed(headers: Headers) {
  const raw = process.env.ADMIN_ALLOWED_DEVICE_FINGERPRINTS ?? "";
  const allowedFingerprints = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (allowedFingerprints.length === 0) {
    return true;
  }

  const currentFingerprint = getDeviceFingerprint(headers);
  return allowedFingerprints.includes(currentFingerprint);
}

function hasRequiredAdminSecrets() {
  return Boolean(process.env.ADMIN_ACCESS_KEY && process.env.ADMIN_SESSION_SECRET);
}

function getSessionSignature(headers: Headers) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  return hmac(getDeviceFingerprint(headers), secret);
}

export function createAdminSessionToken(headers: Headers) {
  const signature = getSessionSignature(headers);
  return signature ?? "";
}

export function isAdminAuthorizedRequest(
  headers: Headers,
  sessionToken: string | null | undefined
) {
  if (!hasRequiredAdminSecrets()) return false;
  if (!sessionToken) return false;
  if (!isDeviceAllowed(headers)) return false;

  const expectedSignature = getSessionSignature(headers);
  if (!expectedSignature) return false;

  return secureCompare(sessionToken, expectedSignature);
}

export function getAdminSessionTokenFromRequest(req: NextRequest) {
  return req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
}
