import type { Metadata } from "next";

export const metadata: Metadata = { title: "Review Applications" };

const APPS = [
  { id: "a1", student: "Fatima Khan",   cgpa: 3.8, income: "PKR 400k", scholarship: "HEC Need-Based",  status: "Pending"  },
  { id: "a2", student: "Ali Hassan",    cgpa: 3.1, income: "PKR 550k", scholarship: "PEEF Merit Award", status: "Pending"  },
  { id: "a3", student: "Sana Mirza",    cgpa: 3.6, income: "PKR 380k", scholarship: "HEC Need-Based",  status: "Approved" },
  { id: "a4", student: "Bilal Raza",    cgpa: 2.4, income: "PKR 700k", scholarship: "PTCL Scholarship", status: "Rejected" },
];

export default function AdminApplicationsPage() {
  return (
    <>
      <div className="page-header">
        <h1>Applications</h1>
        <div className="flex gap-2 text-sm">
          {["All", "Pending", "Approved", "Rejected"].map((f) => (
            <button key={f} className={`rounded-badge border border-surface-border px-3 py-1 text-xs font-medium transition hover:bg-surface-muted ${f === "All" ? "bg-brand-500 text-white border-brand-500" : "bg-white text-slate-600"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-surface-border bg-surface-muted text-xs text-slate-500 uppercase tracking-wide">
            <tr>
              {["Student", "Scholarship", "CGPA", "Income", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {APPS.map((a) => (
              <tr key={a.id} className="hover:bg-surface-muted transition">
                <td className="px-4 py-3 font-medium text-slate-900">{a.student}</td>
                <td className="px-4 py-3 text-slate-600">{a.scholarship}</td>
                <td className="px-4 py-3 text-slate-600">{a.cgpa}</td>
                <td className="px-4 py-3 text-slate-600">{a.income}</td>
                <td className="px-4 py-3">
                  <span className={
                    a.status === "Approved" ? "badge-approved" :
                    a.status === "Rejected" ? "badge-rejected" : "badge-pending"
                  }>{a.status}</span>
                </td>
                <td className="px-4 py-3">
                  {a.status === "Pending" ? (
                    <div className="flex gap-2">
                      <button className="rounded-badge bg-green-100 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-200 transition">Approve</button>
                      <button className="rounded-badge bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200 transition">Reject</button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">Reviewed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
