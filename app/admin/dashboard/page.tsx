import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard" };

const KPIS = [
  { label: "Total Scholarships", value: "8",   icon: "🏆", color: "brand" },
  { label: "Total Applications", value: "142", icon: "📋", color: "blue"  },
  { label: "Pending Review",     value: "38",  icon: "⏳", color: "amber" },
  { label: "Approval Rate",      value: "64%", icon: "✅", color: "green" },
];

// Pie chart is Client Component — placeholder here
export default function AdminDashboard() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="mt-1 text-slate-500">Live overview of QuasarEdu scholarship activity.</p>
        </div>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="card">
            <div className="mb-2 text-2xl">{k.icon}</div>
            <div className="text-3xl font-bold text-slate-900">{k.value}</div>
            <div className="mt-1 text-sm text-slate-500">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="mb-4">Application Status Distribution</h2>
          {/* Pie chart placeholder — wire in recharts or Chart.js */}
          <div className="flex h-48 items-center justify-center rounded-card bg-surface-muted text-slate-400 text-sm border border-dashed border-surface-border">
            📊 Pie chart renders here (recharts)
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {[
              { label: "Approved",  pct: "64%", color: "bg-green-400" },
              { label: "Pending",   pct: "27%", color: "bg-blue-400"  },
              { label: "Rejected",  pct: "9%",  color: "bg-red-400"   },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`h-2.5 w-2.5 rounded-full ${l.color}`} />
                {l.label} ({l.pct})
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="mb-4">Recent Admin Activity</h2>
          <ul className="space-y-3">
            {[
              { action: "Approved",  student: "Fatima K.",  scholarship: "HEC Need-Based", time: "2h ago" },
              { action: "Rejected",  student: "Usman T.",   scholarship: "PTCL Scholarship", time: "5h ago" },
              { action: "Created",   student: "—",           scholarship: "New PEEF slot", time: "1d ago" },
            ].map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className={`mt-0.5 rounded-badge px-2 py-0.5 text-xs font-medium ${
                  r.action === "Approved" ? "badge-approved" :
                  r.action === "Rejected" ? "badge-rejected" : "badge-pending"
                }`}>{r.action}</span>
                <span className="text-slate-600">
                  {r.student !== "—" ? `${r.student} — ` : ""}{r.scholarship}
                </span>
                <span className="ml-auto text-xs text-slate-400">{r.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
