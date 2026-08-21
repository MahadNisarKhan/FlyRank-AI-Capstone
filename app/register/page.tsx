"use client";

import Link from "next/link";
import { useState } from "react";

const STEPS = ["Account", "Personal", "Academic", "Financial"];

export default function RegisterPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold text-brand-600">⭐ QuasarEdu</Link>
          <p className="mt-1 text-sm text-slate-500">Create your student account</p>
        </div>

        {/* Step progress */}
        <div className="mb-6 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                  i <= step
                    ? "bg-brand-500 text-white"
                    : "bg-surface-border text-slate-400"
                }`}
              >
                {i + 1}
              </div>
              <span className="hidden text-xs text-slate-500 sm:block">{s}</span>
            </div>
          ))}
        </div>

        <div className="card space-y-4">
          {step === 0 && (
            <>
              <h2 className="text-lg font-semibold">Account Details</h2>
              <div>
                <label className="label">Full Name</label>
                <input type="text" placeholder="Muhammad Ali" className="input" />
              </div>
              <div>
                <label className="label">Email</label>
                <input type="email" placeholder="you@example.com" className="input" />
              </div>
              <div>
                <label className="label">Password</label>
                <input type="password" placeholder="Min 8 characters" className="input" />
              </div>
              <div>
                <label className="label">Confirm Password</label>
                <input type="password" placeholder="Repeat password" className="input" />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold">Personal Info</h2>
              <div>
                <label className="label">CNIC / B-Form</label>
                <input type="text" placeholder="XXXXX-XXXXXXX-X" className="input" />
              </div>
              <div>
                <label className="label">Date of Birth</label>
                <input type="date" className="input" />
              </div>
              <div>
                <label className="label">Phone</label>
                <input type="tel" placeholder="+92 3XX XXXXXXX" className="input" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold">Academic Info</h2>
              <div>
                <label className="label">University</label>
                <input type="text" placeholder="FAST-NUCES" className="input" />
              </div>
              <div>
                <label className="label">Degree Program</label>
                <input type="text" placeholder="BS Computer Science" className="input" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">CGPA</label>
                  <input type="number" step="0.01" min="0" max="4" placeholder="3.50" className="input" />
                </div>
                <div>
                  <label className="label">Semester</label>
                  <input type="number" min="1" max="8" placeholder="3" className="input" />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-semibold">Financial Info</h2>
              <div>
                <label className="label">Annual Family Income (PKR)</label>
                <input type="number" placeholder="600000" className="input" />
              </div>
              <div>
                <label className="label">Income Proof Document</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="input py-1.5" />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="btn-outline flex-1">
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep((s) => s + 1)} className="btn-primary flex-1">
                Next
              </button>
            ) : (
              <button className="btn-primary flex-1">Create Account</button>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-brand-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
