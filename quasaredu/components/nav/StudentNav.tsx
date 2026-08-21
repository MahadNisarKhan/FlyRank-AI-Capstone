"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/student/dashboard",     icon: "🏠", label: "Dashboard" },
  { href: "/student/scholarships",  icon: "🔍", label: "Discover" },
  { href: "/student/applications",  icon: "📋", label: "My Applications" },
  { href: "/student/profile",       icon: "👤", label: "Profile" },
  { href: "/student/notifications", icon: "🔔", label: "Notifications" },
  { href: "/student/chatbot",       icon: "💬", label: "AI Assistant" },
];

export function StudentNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-surface-border lg:bg-white">
        <div className="flex h-16 items-center border-b border-surface-border px-5">
          <Link href="/" className="text-lg font-bold text-brand-600">⭐ QuasarEdu</Link>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition ${
                path.startsWith(n.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-surface-muted"
              }`}
            >
              <span>{n.icon}</span> {n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-surface-border p-3">
          <Link href="/login" className="flex w-full items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-surface-muted transition">
            🚪 Sign out
          </Link>
        </div>
      </aside>

      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-surface-border bg-white px-4 lg:hidden">
        <Link href="/" className="font-bold text-brand-600">⭐ QuasarEdu</Link>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="rounded-card p-2 hover:bg-surface-muted">
          {open ? "✕" : "☰"}
        </button>
      </header>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)}>
          <nav className="absolute left-0 top-14 w-64 bg-white p-3 shadow-xl" onClick={(e) => e.stopPropagation()}>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition ${
                  path.startsWith(n.href) ? "bg-brand-50 text-brand-700" : "text-slate-600"
                }`}
              >
                {n.icon} {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
