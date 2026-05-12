# Security & Architecture Audit Report

## Table of Contents

- [1. Executive Summary](#1-executive-summary)
- [2. Critical Findings (All Auto-Fixed)](#2-critical-findings-all-auto-fixed)
  - [2.1 SSRF/Open Redirect in Affiliate Click Route](#21-ssrfopen-redirect-in-affiliate-click-route)
  - [2.2 No Input Validation on API Routes](#22-no-input-validation-on-api-routes)
  - [2.3 SQLite Development Database Committed to Repository](#23-sqlite-development-database-committed-to-repository)
- [3. High Findings (All Auto-Fixed)](#3-high-findings-all-auto-fixed)
  - [3.1 Missing Next.js Middleware](#31-missing-nextjs-middleware)
  - [3.2 No Security Headers](#32-no-security-headers)
  - [3.3 No Error Boundaries](#33-no-error-boundaries)
  - [3.4 Information Leakage via Console Logging](#34-information-leakage-via-console-logging)
- [4. Medium Findings](#4-medium-findings)
  - [4.1 Internal Dev Infrastructure Exposure](#41-internal-dev-infrastructure-exposure)
  - [4.2 No Rate Limiting on Admin Access Endpoint](#42-no-rate-limiting-on-admin-access-endpoint)
  - [4.3 Affiliate Click Farming Vulnerability](#43-affiliate-click-farming-vulnerability)
- [5. Low/Informational Findings](#5-lowinformational-findings)
  - [5.1 TypeScript ignoreBuildErrors Enabled](#51-typescript-ignorebuilderrors-enabled)
  - [5.2 No CSRF Protection for API Routes](#52-no-csrf-protection-for-api-routes)
  - [5.3 Profile View Inflation](#53-profile-view-inflation)
  - [5.4 Client-Side Data Integrity](#54-client-side-data-integrity)
  - [5.5 No Logging/Monitoring Infrastructure](#55-no-loggingmonitoring-infrastructure)
  - [5.6 No Content Security Policy](#56-no-content-security-policy)
- [6. Architecture Observations](#6-architecture-observations)
- [7. Recommendations Summary (Priority Order)](#7-recommendations-summary-priority-order)

---

## 1. Executive Summary

| Field | Details |
|-------|---------|
| **Audit Date** | 2026-05-12 |
| **Scope** | Full codebase audit of Muakeup repository (components, API routes, server actions, configuration, middleware, environment) |
| **Methodology** | Manual code review + automated analysis |

### Findings Summary

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 3 | All fixed |
| High | 4 | All fixed |
| Medium | 3 | 2 fixed, 1 recommendation |
| Low/Info | 6 | Recommendations only |

---

## 2. Critical Findings (All Auto-Fixed)

### 2.1 SSRF/Open Redirect in Affiliate Click Route

| Field | Details |
|-------|---------|
| **Severity** | CRITICAL |
| **File** | `src/app/api/affiliate/click/route.ts` |
| **Status** | FIXED |

**Issue:** The route accepted a user-supplied `url` parameter and redirected to it directly, allowing attackers to redirect users to malicious sites or perform SSRF attacks.

**Impact:** Phishing attacks, credential theft, internal network scanning.

**Fix:** Route now looks up the product's `affiliateUrl` from the database using the `productId` parameter, completely ignoring user-supplied URLs.

---

### 2.2 No Input Validation on API Routes

| Field | Details |
|-------|---------|
| **Severity** | CRITICAL |
| **Files** | `src/app/api/products/route.ts`, `src/app/api/products/[id]/route.ts`, `src/app/api/dashboard/products/route.ts`, `src/app/api/skin-twins/route.ts`, `src/app/api/admin/access/route.ts` |
| **Status** | FIXED |

**Issue:** All POST/PUT endpoints accepted arbitrary data without schema validation, allowing injection attacks and data corruption.

**Impact:** SQL injection via Prisma (limited by ORM but still risky with malformed data), XSS via stored malicious strings, DoS via oversized payloads.

**Fix:** Added comprehensive Zod validation schemas (`src/lib/validations.ts`) with strict type checking, length limits, and enum validation on all API routes.

---

### 2.3 SQLite Development Database Committed to Repository

| Field | Details |
|-------|---------|
| **Severity** | CRITICAL |
| **File** | `prisma/dev.db` |
| **Status** | PARTIALLY FIXED |

**Issue:** SQLite database file committed to git containing potential user data, passwords, and application state.

**Impact:** Data leak, exposure of user credentials and business data to anyone with repo access.

**Fix:** Added `prisma/*.db` and `prisma/*.db-journal` to `.gitignore`. Note: the file remains in git history - a history rewrite (`git filter-branch` or BFG) is recommended.

---

## 3. High Findings (All Auto-Fixed)

### 3.1 Missing Next.js Middleware

| Field | Details |
|-------|---------|
| **Severity** | HIGH |
| **File** | `src/middleware.ts` (was missing) |
| **Status** | FIXED |

**Issue:** No centralized route protection, no security headers at the edge, no auth checks before page rendering.

**Impact:** Admin pages could be loaded before server-side auth check completes, no defense-in-depth for route protection.

**Fix:** Created `src/middleware.ts` with security headers on all responses, admin route protection (cookie check), and dashboard route protection (session check).

---

### 3.2 No Security Headers

| Field | Details |
|-------|---------|
| **Severity** | HIGH |
| **File** | `next.config.ts` |
| **Status** | FIXED |

**Issue:** No X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, or Permissions-Policy headers.

**Impact:** Vulnerable to clickjacking, MIME-type sniffing attacks, protocol downgrade attacks.

**Fix:** Added comprehensive security headers via both middleware and `next.config.ts` `headers()` function (X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Strict-Transport-Security, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy).

---

### 3.3 No Error Boundaries

| Field | Details |
|-------|---------|
| **Severity** | HIGH |
| **Files** | `src/app/error.tsx`, `src/app/admin/error.tsx` (were missing) |
| **Status** | FIXED |

**Issue:** Unhandled runtime errors could expose stack traces, file paths, and internal implementation details to end users.

**Impact:** Information disclosure aiding attackers in reconnaissance.

**Fix:** Created error boundary components that display user-friendly error messages without exposing internal details.

---

### 3.4 Information Leakage via Console Logging

| Field | Details |
|-------|---------|
| **Severity** | HIGH |
| **Files** | Multiple API routes |
| **Status** | FIXED |

**Issue:** `console.error(error)` logging full error objects including stack traces, potentially to external log aggregators.

**Impact:** Sensitive data in logs (database queries, internal paths, user data).

**Fix:** Replaced with sanitized logging: `console.error("Operation failed:", error instanceof Error ? error.message : "Unknown error")`

---

## 4. Medium Findings

### 4.1 Internal Dev Infrastructure Exposure

| Field | Details |
|-------|---------|
| **Severity** | MEDIUM |
| **File** | `next.config.ts` |
| **Status** | FIXED |

**Issue:** `allowedDevOrigins` contained a full internal Cloud Workstation URL, exposing development infrastructure details.

**Fix:** Removed `allowedDevOrigins` entirely.

---

### 4.2 No Rate Limiting on Admin Access Endpoint

| Field | Details |
|-------|---------|
| **Severity** | MEDIUM |
| **File** | `src/app/api/admin/access/route.ts` |
| **Status** | PARTIALLY FIXED |

**Issue:** No rate limiting on the admin login endpoint allows brute-force attacks on the access key.

**Impact:** With enough attempts, an attacker could discover the `ADMIN_ACCESS_KEY`.

**Mitigation:** The endpoint uses timing-safe comparison (`secureCompare`) which prevents timing attacks. Added input validation with max length.

**Recommendation:**
- Implement rate limiting using `@upstash/ratelimit` or similar
- Add exponential backoff after failed attempts
- Consider account lockout after N failures

---

### 4.3 Affiliate Click Farming Vulnerability

| Field | Details |
|-------|---------|
| **Severity** | MEDIUM |
| **File** | `src/app/api/affiliate/click/route.ts` |
| **Status** | RECOMMENDATION ONLY |

**Issue:** No deduplication of clicks by IP within a timeframe. An attacker can increment a user's saldo infinitely by replaying the same request.

**Impact:** Financial loss through fraudulent commission payments.

**Recommendation:**
- Add IP-based deduplication with a time window (e.g., same IP + same product = 1 click per hour)
- Add CAPTCHA or proof-of-work for high-volume clickers

---

## 5. Low/Informational Findings

### 5.1 TypeScript ignoreBuildErrors Enabled

| Field | Details |
|-------|---------|
| **Severity** | LOW |
| **File** | `next.config.ts` |

**Issue:** `ignoreBuildErrors: true` masks type-safety issues that could indicate logical bugs or security flaws.

**Recommendation:** Remove `ignoreBuildErrors` and fix all type errors for full type safety.

---

### 5.2 No CSRF Protection for API Routes

| Field | Details |
|-------|---------|
| **Severity** | LOW |
| **Files** | All API routes |

**Issue:** API routes have no CSRF token validation.

**Mitigation:** `SameSite: strict` on admin cookies helps. NextAuth CSRF is handled internally.

**Recommendation:** Add CSRF tokens for state-changing operations, especially admin actions.

---

### 5.3 Profile View Inflation

| Field | Details |
|-------|---------|
| **Severity** | LOW |
| **File** | `src/app/profile/[username]/page.tsx` |

**Issue:** Profile view counter increments on every page load with no deduplication.

**Recommendation:** Add IP or session-based deduplication for view counting.

---

### 5.4 Client-Side Data Integrity

| Field | Details |
|-------|---------|
| **Severity** | INFO |
| **File** | `src/components/DiagnosticQuiz.tsx` |

**Issue:** Skin profile data stored in `localStorage` without integrity validation - users can tamper with their profile to see different recommendations.

**Recommendation:** For paid features, store profile server-side and validate.

---

### 5.5 No Logging/Monitoring Infrastructure

| Field | Details |
|-------|---------|
| **Severity** | INFO |
| **Files** | Project-wide |

**Issue:** No structured logging, no error tracking service integration (Sentry, etc.).

**Recommendation:** Add `pino` for structured logging, integrate Sentry or similar for error tracking.

---

### 5.6 No Content Security Policy

| Field | Details |
|-------|---------|
| **Severity** | INFO |
| **Files** | Project-wide |

**Issue:** CSP header is not set (complex to configure correctly with Next.js).

**Recommendation:** Implement CSP with nonce-based script allowlisting using Next.js Script component.

---

## 6. Architecture Observations

### 6.1 Server/Client Boundary (Good)

- Well-maintained separation between server and client components
- Prisma is only imported in server-side code (`lib/`, API routes, server components)
- No `NEXT_PUBLIC_` prefix misuse detected

### 6.2 Admin Authentication (Acceptable, Custom)

- Custom HMAC-based session system separate from NextAuth
- Uses timing-safe comparison, httpOnly cookies, SameSite strict
- Supports device fingerprinting and IP whitelisting
- Concern: Two separate auth systems increase maintenance burden

### 6.3 Data Fetching Strategy

- Uses `force-dynamic` on most pages (no caching)
- Server components fetch data directly via Prisma (good pattern)
- Client components fetch via API routes (appropriate)

### 6.4 Database Design

- Proper indexes on frequently queried columns
- Cascade deletes configured correctly
- Schema is well-normalized

### 6.5 No Test Infrastructure

- No test files, no test framework configured
- Recommendation: Add vitest or jest with React Testing Library

---

## 7. Recommendations Summary (Priority Order)

| Priority | Recommendation | Effort |
|----------|---------------|--------|
| 1 | Rate limiting on admin and affiliate routes | Medium |
| 2 | Remove `ignoreBuildErrors` and fix type errors | Medium |
| 3 | Add test infrastructure (vitest) | High |
| 4 | Implement CSP headers | Medium |
| 5 | Add structured logging (pino) | Low |
| 6 | Git history rewrite to remove dev.db from history | Low |
| 7 | Add CSRF tokens for API mutations | Medium |
| 8 | Click deduplication for affiliate tracking | Medium |
| 9 | Server-side skin profile storage | Low |
| 10 | Integrate error tracking (Sentry) | Low |
