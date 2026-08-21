import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100">
      {/* ── Nav ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-surface-border bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="text-lg font-bold text-brand-600">⭐ QuasarEdu</span>
          <nav className="flex items-center gap-3">
            <Link href="/login" className="btn-outline text-sm">Log in</Link>
            <Link href="/register" className="btn-primary text-sm">Get started</Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="mb-4 inline-block rounded-badge bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 uppercase tracking-wide">
          Scholarship Management System
        </span>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Your scholarship journey,{" "}
          <span className="text-brand-500">simplified.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600">
          QuasarEdu digitizes the full scholarship lifecycle — from AI-powered
          eligibility matching to one-click applications, real-time status
          tracking, and PDF receipt generation.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/register" className="btn-primary px-8 py-3 text-base">
            Apply for Scholarships
          </Link>
          <Link href="/login?role=admin" className="btn-outline px-8 py-3 text-base">
            Admin Portal
          </Link>
        </div>
      </section>

      {/* ── Feature tiles ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="card">
              <div className="mb-3 text-2xl">{f.icon}</div>
              <h3 className="mb-1 font-semibold text-slate-900">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-surface-border py-8 text-center text-sm text-slate-400">
        © 2026 QuasarEdu · Built for FlyRank AI Capstone
      </footer>
    </main>
  );
}

const FEATURES = [
  {
    icon: "🎯",
    title: "Smart Eligibility Matching",
    desc: "Color-coded High / Medium / Low match scores filtered by CGPA, income, degree, and semester.",
  },
  {
    icon: "🤖",
    title: "AI Auto-Fill",
    desc: "Google Gemini Vision reads your uploaded documents and pre-fills application fields.",
  },
  {
    icon: "📄",
    title: "PDF Receipts + QR",
    desc: "Download a verifiable PDF receipt with embedded QR code after every submission.",
  },
  {
    icon: "💬",
    title: "QuasarEdu Assistant",
    desc: "Gemini-powered chatbot that answers scholarship questions — even in Urdu.",
  },
  {
    icon: "🔒",
    title: "Secure by Default",
    desc: "OTP email verification, biometric check before applying, JWT sessions, BCrypt hashes.",
  },
  {
    icon: "📊",
    title: "Admin Dashboard",
    desc: "Live KPIs, approval rate pie chart, bulk review, and system-wide notifications.",
  },
];
