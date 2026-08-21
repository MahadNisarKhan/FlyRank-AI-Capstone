import type { Metadata } from "next";

export const metadata: Metadata = { title: "Broadcast Notifications" };

const SENT = [
  { title: "Deadline Reminder",     audience: "All Students",     sentAt: "2026-08-08" },
  { title: "New Scholarship Open",  audience: "Eligible Students", sentAt: "2026-07-30" },
  { title: "System Maintenance",    audience: "All Users",        sentAt: "2026-07-01" },
];

export default function AdminNotificationsPage() {
  return (
    <>
      <div className="page-header">
        <h1>Notifications</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Compose */}
        <div className="card space-y-4">
          <h2>Broadcast Message</h2>
          <div>
            <label className="label">Title</label>
            <input type="text" placeholder="e.g. Deadline Reminder" className="input" />
          </div>
          <div>
            <label className="label">Audience</label>
            <select className="input">
              <option>All Students</option>
              <option>Eligible Students</option>
              <option>All Users</option>
              <option>Specific Program</option>
            </select>
          </div>
          <div>
            <label className="label">Message</label>
            <textarea rows={4} placeholder="Write your notification…" className="input resize-y" />
          </div>
          <button className="btn-primary w-full">📢 Send Notification</button>
        </div>

        {/* History */}
        <div className="card">
          <h2 className="mb-4">Sent Notifications</h2>
          <div className="space-y-3">
            {SENT.map((n, i) => (
              <div key={i} className="rounded-card border border-surface-border bg-surface-muted px-4 py-3">
                <div className="flex justify-between gap-2">
                  <p className="font-medium text-sm text-slate-900">{n.title}</p>
                  <span className="text-xs text-slate-400">{n.sentAt}</span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">To: {n.audience}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
