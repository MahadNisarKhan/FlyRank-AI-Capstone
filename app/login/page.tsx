"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "admin">("student");

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold text-brand-600">⭐ QuasarEdu</Link>
          <p className="mt-1 text-sm text-slate-500">Sign in to your account</p>
        </div>

        <div className="card">
          {/* Role toggle */}
          <div className="mb-6 flex rounded-card border border-surface-border overflow-hidden">
            {(["student", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm font-medium transition ${
                  role === r
                    ? "bg-brand-500 text-white"
                    : "bg-white text-slate-600 hover:bg-surface-muted"
                }`}
              >
                {r === "student" ? "🎓 Student" : "🛡️ Admin"}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="input"
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="btn-primary w-full py-2.5">
              Sign in as {role === "student" ? "Student" : "Admin"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-500">
            No account?{" "}
            <Link href="/register" className="font-medium text-brand-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
