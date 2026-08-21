import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // never cache — always live

export async function GET() {
  const checks: Record<string, unknown> = {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version ?? "0.1.0",
  };

  // ── External reachability check ────────────────────────────
  // Hits a public API to prove the server can make outbound requests.
  // Replace with an internal DB ping or Gemini health check once connected.
  try {
    const res = await fetch("https://worldtimeapi.org/api/timezone/Asia/Karachi", {
      next: { revalidate: 0 },
    });
    if (res.ok) {
      const data = (await res.json()) as { datetime: string; timezone: string };
      checks.externalFetch = {
        ok: true,
        timezone: data.timezone,
        serverTime: data.datetime,
      };
    } else {
      checks.externalFetch = { ok: false, httpStatus: res.status };
    }
  } catch (err) {
    checks.externalFetch = { ok: false, error: (err as Error).message };
  }

  // ── Env var presence check (no values, just presence) ──────
  const REQUIRED_ENV = [
    "NEXT_PUBLIC_APP_URL",
    "DATABASE_URL",
    "JWT_SECRET",
    "GEMINI_API_KEY",
    "EMAIL_USER",
  ];
  checks.envVars = Object.fromEntries(
    REQUIRED_ENV.map((k) => [k, !!process.env[k]])
  );

  const allEnvPresent = REQUIRED_ENV.every((k) => !!process.env[k]);
  checks.allEnvConfigured = allEnvPresent;

  const httpStatus = allEnvPresent ? 200 : 206; // 206 Partial if env missing (expected on preview)

  return NextResponse.json(checks, { status: httpStatus });
}
