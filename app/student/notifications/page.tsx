import type { Metadata } from "next";

export const metadata: Metadata = { title: "Notifications" };

const NOTIFS = [
  { id: "1", title: "Application Approved 🎉",          body: "Your PEEF Merit Award application has been approved.", date: "2026-08-15", read: false },
  { id: "2", title: "Deadline Reminder",                 body: "HEC Need-Based Scholarship closes in 7 days.", date: "2026-08-08", read: false },
  { id: "3", title: "New Scholarship Available",         body: "Ehsaas Undergrad Stipend is now open for applications.", date: "2026-07-30", read: true  },
  { id: "4", title: "Application Status Update",         body: "Your PTCL Scholarship application was reviewed.", date: "2026-07-25", read: true  },
];

export default function NotificationsPage() {
  return (
    <>
      <div className="page-header">
        <h1>Notifications</h1>
      </div>

      <div className="space-y-3">
        {NOTIFS.map((n) => (
          <div
            key={n.id}
            className={`card flex gap-4 ${!n.read ? "border-l-4 border-l-brand-500" : ""}`}
          >
            <div className="mt-0.5 shrink-0 text-lg">{n.read ? "📭" : "📬"}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`text-sm font-medium ${n.read ? "text-slate-600" : "text-slate-900"}`}>
                  {n.title}
                </p>
                <span className="shrink-0 text-xs text-slate-400">{n.date}</span>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">{n.body}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
