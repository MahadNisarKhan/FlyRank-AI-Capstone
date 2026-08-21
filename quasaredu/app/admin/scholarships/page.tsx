import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Manage Scholarships" };

const SCHOLARSHIPS = [
  { id: "1", title: "HEC Need-Based Scholarship", seats: 200, deadline: "2026-09-15", active: true },
  { id: "2", title: "PEEF Merit Award",            seats: 100, deadline: "2026-10-01", active: true },
  { id: "3", title: "PTCL Scholarship",            seats: 50,  deadline: "2026-08-30", active: false },
];

export default function AdminScholarshipsPage() {
  return (
    <>
      <div className="page-header">
        <h1>Scholarships</h1>
        <Link href="/admin/scholarships/new" className="btn-primary">+ New Scholarship</Link>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-surface-border bg-surface-muted text-xs text-slate-500 uppercase tracking-wide">
            <tr>
              {["Title", "Seats", "Deadline", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {SCHOLARSHIPS.map((s) => (
              <tr key={s.id} className="hover:bg-surface-muted transition">
                <td className="px-4 py-3 font-medium text-slate-900">{s.title}</td>
                <td className="px-4 py-3 text-slate-600">{s.seats}</td>
                <td className="px-4 py-3 text-slate-600">{s.deadline}</td>
                <td className="px-4 py-3">
                  <span className={s.active ? "badge-approved" : "badge-rejected"}>
                    {s.active ? "Active" : "Closed"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/admin/scholarships/${s.id}/edit`} className="btn-outline px-2 py-1 text-xs">Edit</Link>
                    <button className="text-xs text-red-500 hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
