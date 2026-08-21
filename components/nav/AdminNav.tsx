"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/admin/dashboard",     icon: "📊", label: "Dashboard" },
  { href: "/admin/scholarships",  icon: "🏆", label: "Scholarships" },
  { href: "/admin/applications",  icon: "📋", label: "Applications" },
  { href: "/admin/students",      icon: "🎓", label: "Students" },
  { href: "/admin/notifications", icon: "📢", label: "Notifications" },
];

export function AdminNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-slate-700 lg:bg-slate-900">
        <div className="flex h-16 items-center border-b border-slate-700 px-5">
          <Link href="/" className="text-lg font-bold text-white">⭐ QuasarEdu</Link>
          <span className="ml-2 rounded-badge bg-brand-500 px-2 py-0.5 text-xs text-white">Admin</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition ${
                path.startsWith(n.href)
                  ? "bg-brand-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {n.icon} {n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-700 p-3">
          <Link href="/login" className="flex items-center gap-3 rounded-card px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 transition">
            🚪 Sign out
          </Link>
        </div>
      </aside>

      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-700 bg-slate-900 px-4 lg:hidden">
        <Link href="/" className="font-bold text-white">⭐ QuasarEdu <span className="text-xs text-brand-300">Admin</span></Link>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="rounded-card p-2 text-white hover:bg-slate-800">
          {open ? "✕" : "☰"}
        </button>
      </header>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)}>
          <nav className="absolute left-0 top-14 w-64 bg-slate-900 p-3 shadow-xl" onClick={(e) => e.stopPropagation()}>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition ${
                  path.startsWith(n.href) ? "bg-brand-500 text-white" : "text-slate-300"
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
