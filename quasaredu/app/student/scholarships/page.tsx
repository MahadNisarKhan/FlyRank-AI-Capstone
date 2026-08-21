import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Discover Scholarships" };

// Placeholder data — replace with real DB fetch
const SCHOLARSHIPS = [
  { id: "1", title: "HEC Need-Based Scholarship", provider: "HEC Pakistan", amount: "PKR 50,000/yr", match: "High",   deadline: "2026-09-15", seats: 200 },
  { id: "2", title: "PEEF Merit Award",            provider: "PEEF",        amount: "PKR 80,000/yr", match: "High",   deadline: "2026-10-01", seats: 100 },
  { id: "3", title: "PTCL Scholarship",            provider: "PTCL",        amount: "PKR 30,000/yr", match: "Medium", deadline: "2026-08-30", seats: 50  },
  { id: "4", title: "Ehsaas Undergrad Stipend",    provider: "Government",  amount: "PKR 40,000/yr", match: "Low",    deadline: "2026-11-01", seats: 500 },
];

const MATCH_CLASS: Record<string, string> = {
  High: "badge-high",
  Medium: "badge-medium",
  Low: "badge-low",
};

export default function ScholarshipsPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Discover Scholarships</h1>
          <p className="mt-1 text-slate-500">Filtered by your profile eligibility.</p>
        </div>
      </div>

      {/* Filters — Client Component placeholder */}
      <div className="mb-6 flex flex-wrap gap-3">
        <input type="search" placeholder="Search scholarships…" className="input max-w-xs" />
        <select className="input w-auto">
          <option>All Matches</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className="input w-auto">
          <option>All Deadlines</option>
          <option>This month</option>
          <option>Next 3 months</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SCHOLARSHIPS.map((s) => (
          <div key={s.id} className="card hover:shadow-card-hover transition">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-900 leading-snug">{s.title}</h3>
              <span className={MATCH_CLASS[s.match]}>{s.match}</span>
            </div>
            <p className="text-sm text-slate-500">{s.provider}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span>💰 {s.amount}</span>
              <span>📅 Deadline: {s.deadline}</span>
              <span>🪑 {s.seats} seats</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Link href={`/student/scholarships/${s.id}`} className="btn-outline text-xs px-3 py-1.5">
                View Details
              </Link>
              <button className="btn-primary text-xs px-3 py-1.5">Apply Now</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
