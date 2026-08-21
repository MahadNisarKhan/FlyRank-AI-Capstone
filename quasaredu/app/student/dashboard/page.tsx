import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

// Server Component — future: fetch real stats from API
const STATS = [
  { label: "Available Scholarships", value: "12", icon: "🏆", href: "/student/scholarships" },
  { label: "Applications Submitted", value: "3",  icon: "📋", href: "/student/applications" },
  { label: "Pending Review",         value: "2",  icon: "⏳", href: "/student/applications" },
  { label: "Approved",               value: "1",  icon: "✅", href: "/student/applications" },
];

export default function StudentDashboard() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Good morning, Student 👋</h1>
          <p className="mt-1 text-slate-500">Here's your scholarship summary.</p>
        </div>
        <Link href="/student/scholarships" className="btn-primary">
          Discover Scholarships
        </Link>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <Link href={s.href} key={s.label} className="card hover:shadow-card-hover transition group">
            <div className="mb-2 text-2xl">{s.icon}</div>
            <div className="text-3xl font-bold text-slate-900 group-hover:text-brand-600 transition">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-slate-500">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent activity placeholder */}
      <div className="mt-8 card">
        <h2 className="mb-4">Recent Activity</h2>
        <p className="text-sm text-slate-400">
          Your recent application activity will appear here once you submit applications.
        </p>
      </div>

      {/* Recommended scholarships placeholder */}
      <div className="mt-6 card">
        <div className="flex items-center justify-between mb-4">
          <h2>Recommended for You</h2>
          <Link href="/student/scholarships" className="text-sm text-brand-600 hover:underline">
            See all →
          </Link>
        </div>
        <p className="text-sm text-slate-400">
          AI-matched scholarships based on your profile will appear here.
        </p>
      </div>
    </>
  );
}
