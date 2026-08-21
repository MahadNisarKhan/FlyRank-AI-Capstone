import type { Metadata } from "next";

export const metadata: Metadata = { title: "Students" };

const STUDENTS = [
  { id: "s1", name: "Fatima Khan",  email: "fatima@example.com", program: "BS CS",    cgpa: 3.8, applications: 2 },
  { id: "s2", name: "Ali Hassan",   email: "ali@example.com",    program: "BE EE",    cgpa: 3.1, applications: 1 },
  { id: "s3", name: "Sana Mirza",   email: "sana@example.com",   program: "BS Math",  cgpa: 3.6, applications: 3 },
  { id: "s4", name: "Bilal Raza",   email: "bilal@example.com",  program: "BS BBA",   cgpa: 2.4, applications: 1 },
];

export default function AdminStudentsPage() {
  return (
    <>
      <div className="page-header">
        <h1>Students</h1>
        <input type="search" placeholder="Search students…" className="input max-w-xs" />
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-surface-border bg-surface-muted text-xs text-slate-500 uppercase tracking-wide">
            <tr>
              {["Name", "Email", "Program", "CGPA", "Applications", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {STUDENTS.map((s) => (
              <tr key={s.id} className="hover:bg-surface-muted transition">
                <td className="px-4 py-3 font-medium text-slate-900">{s.name}</td>
                <td className="px-4 py-3 text-slate-500">{s.email}</td>
                <td className="px-4 py-3 text-slate-600">{s.program}</td>
                <td className="px-4 py-3">
                  <span className={s.cgpa >= 3.0 ? "badge-high" : "badge-low"}>{s.cgpa}</span>
                </td>
                <td className="px-4 py-3 text-slate-600">{s.applications}</td>
                <td className="px-4 py-3">
                  <button className="btn-outline px-2 py-1 text-xs">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
