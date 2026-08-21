import type { Metadata } from "next";

export const metadata: Metadata = { title: "Health Check" };
export const dynamic = "force-dynamic";

async function getHealth() {
  try {
    const res = await fetch("https://worldtimeapi.org/api/timezone/Asia/Karachi", {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return { status: "ok", externalFetch: { ok: true, timezone: data.timezone, serverTime: data.datetime } };
    }
    return { status: "ok", externalFetch: { ok: false } };
  } catch {
    return { status: "ok", externalFetch: { ok: false, error: "fetch failed" } };
  }
}

export default async function HealthPage() {
  const data = await getHealth();

  const REQUIRED_ENV = ["NEXT_PUBLIC_APP_URL", "DATABASE_URL", "JWT_SECRET", "GEMINI_API_KEY", "EMAIL_USER"];
  const envVars = Object.fromEntries(REQUIRED_ENV.map((k) => [k, !!process.env[k]]));

  return (
    <main className="min-h-screen bg-surface-muted flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <span className="text-4xl">✅</span>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">System Health</h1>
          <p className="text-sm text-slate-500">QuasarEdu · {new Date().toISOString()}</p>
        </div>

        <div className="card space-y-4">
          <Section title="General">
            <Row k="Status" v={data.status} />
            <Row k="Environment" v={process.env.NODE_ENV ?? "production"} />
          </Section>

          <Section title="External Fetch (worldtimeapi.org)">
            <Row k="Reachable" v={String(data.externalFetch?.ok)} />
            <Row k="Timezone" v={data.externalFetch?.timezone ?? "—"} />
            <Row k="Server Time" v={data.externalFetch?.serverTime ?? "—"} />
          </Section>

          <Section title="Env Vars Present">
            {Object.entries(envVars).map(([k, present]) => (
              <Row key={k} k={k} v={present ? "✅ set" : "❌ missing"} />
            ))}
          </Section>

          <div className="rounded-card border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
            💡 Add env vars in Vercel Dashboard → Settings → Environment Variables.
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Raw JSON: <a href="/api/health" className="underline">/api/health</a>
        </p>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h2>
      <div className="divide-y divide-surface-border rounded-card border border-surface-border overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string | boolean | undefined }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 text-sm">
      <span className="font-mono text-slate-500">{k}</span>
      <span className="font-medium text-slate-900">{String(v ?? "—")}</span>
    </div>
  );
}
