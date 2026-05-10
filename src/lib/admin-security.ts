import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";
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
  if (aBuffer.length !== bBuffer.length) return false;
  return timingSafeEqual(aBuffer, bBuffer);
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

function getClientIp(headers: Headers) {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwardedFor = headers.get("x-forwarded-for") ?? "";
  return forwardedFor.split(",")[0]?.trim() ?? "";
}

export function isClientIpAllowed(headers: Headers) {
  const raw = process.env.ADMIN_ALLOWED_IPS ?? "";
  const allowedIps = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (allowedIps.length === 0) {
    return true;
  }

  const clientIp = getClientIp(headers);
  return Boolean(clientIp) && allowedIps.includes(clientIp);
}

function hasRequiredAdminSecrets() {
  return Boolean(process.env.ADMIN_ACCESS_KEY && process.env.ADMIN_SESSION_SECRET);
}

export function getAdminSessionTtlSeconds() {
  const parsedTtl = Number.parseInt(process.env.ADMIN_SESSION_MAX_AGE_SECONDS ?? "", 10);
  const minAllowedSessionDuration = 60 * 5;
  const maxAllowedSessionDuration = 60 * 60 * 24;

  if (
    Number.isFinite(parsedTtl) &&
    parsedTtl >= minAllowedSessionDuration &&
    parsedTtl <= maxAllowedSessionDuration
  ) {
    return parsedTtl;
  }

  return 60 * 60 * 8;
}

function signSessionPayload(
  headers: Headers,
  expiresAtEpochSeconds: number,
  nonce: string
) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;

  const fingerprint = getDeviceFingerprint(headers);
  return hmac(`${fingerprint}.${expiresAtEpochSeconds}.${nonce}`, secret);
}

export function createAdminSessionToken(headers: Headers) {
  if (!process.env.ADMIN_SESSION_SECRET) return "";

  const ttlSeconds = getAdminSessionTtlSeconds();
  const expiresAt = Math.floor(Date.now() / 1000) + ttlSeconds;
  const nonce = randomBytes(16).toString("hex");
  const signature = signSessionPayload(headers, expiresAt, nonce);

  if (!signature) return "";
  return `${expiresAt}.${nonce}.${signature}`;
}

export function isAdminAuthorizedRequest(
  headers: Headers,
  sessionToken: string | null | undefined
) {
  if (!hasRequiredAdminSecrets()) return false;
  if (!sessionToken) return false;
  if (!isDeviceAllowed(headers)) return false;
  if (!isClientIpAllowed(headers)) return false;

  const [expiresAtRaw, nonce, signature] = sessionToken.split(".");
  const expiresAt = Number.parseInt(expiresAtRaw ?? "", 10);

  if (!expiresAtRaw || !nonce || !signature) return false;
  if (!Number.isFinite(expiresAt)) return false;
  if (expiresAt < Math.floor(Date.now() / 1000)) return false;

  const expectedSignature = signSessionPayload(headers, expiresAt, nonce);
  if (!expectedSignature) return false;

  return secureCompare(signature, expectedSignature);
}

export function getAdminSessionTokenFromRequest(req: NextRequest) {
  return req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
}
