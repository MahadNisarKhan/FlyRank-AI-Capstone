import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Applications" };

const APPS = [
  { id: "a1", title: "HEC Need-Based Scholarship", submittedAt: "2026-08-01", status: "Pending",  comment: null },
  { id: "a2", title: "PEEF Merit Award",            submittedAt: "2026-07-20", status: "Approved", comment: "Congratulations! Stipend will be credited monthly." },
  { id: "a3", title: "PTCL Scholarship",            submittedAt: "2026-07-10", status: "Rejected", comment: "CGPA requirement not met at time of application." },
];

const STATUS_CLASS: Record<string, string> = {
  Pending:  "badge-pending",
  Approved: "badge-approved",
  Rejected: "badge-rejected",
};

export default function ApplicationsPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>My Applications</h1>
          <p className="mt-1 text-slate-500">Track the status of all your scholarship applications.</p>
        </div>
      </div>

      <div className="space-y-4">
        {APPS.map((a) => (
          <div key={a.id} className="card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-0.5 text-xs text-slate-400">Submitted: {a.submittedAt}</p>
              </div>
              <span className={STATUS_CLASS[a.status]}>{a.status}</span>
            </div>
            {a.comment && (
              <p className="mt-3 rounded-card bg-surface-muted px-3 py-2 text-sm text-slate-600 border border-surface-border">
                💬 {a.comment}
              </p>
            )}
            <div className="mt-4 flex gap-2">
              <button className="btn-outline text-xs px-3 py-1.5">📄 Download Receipt</button>
              {a.status === "Pending" && (
                <button className="text-xs text-red-500 hover:underline">Withdraw</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
