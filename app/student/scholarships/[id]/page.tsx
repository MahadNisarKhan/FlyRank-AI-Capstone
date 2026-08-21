import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Scholarship Details" };

export default function ScholarshipDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="mb-4">
        <Link href="/student/scholarships" className="text-sm text-brand-600 hover:underline">
          ← Back to Scholarships
        </Link>
      </div>

      <div className="card mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="badge-high mb-2">High Match</span>
            <h1 className="mt-1">HEC Need-Based Scholarship</h1>
            <p className="mt-1 text-slate-500">Higher Education Commission of Pakistan</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-brand-600">PKR 50,000</div>
            <div className="text-sm text-slate-400">per year</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
          {[
            { label: "Deadline",  value: "Sep 15, 2026" },
            { label: "Seats",     value: "200" },
            { label: "Duration",  value: "4 years" },
            { label: "Renewable", value: "Yes (CGPA ≥ 3.0)" },
          ].map((d) => (
            <div key={d.label}>
              <div className="text-slate-400">{d.label}</div>
              <div className="font-medium text-slate-800">{d.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="mb-3">Description</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              The HEC Need-Based Scholarship Program aims to provide financial assistance to talented
              students from low-income families pursuing undergraduate degrees at HEC-recognized universities.
              Scholars receive a full tuition waiver plus a monthly stipend.
            </p>
          </div>
          <div className="card">
            <h2 className="mb-3">Eligibility Criteria</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✅ Enrolled in an HEC-recognized university</li>
              <li>✅ CGPA ≥ 2.5 / 4.0</li>
              <li>✅ Annual family income ≤ PKR 500,000</li>
              <li>✅ Semester 1–8 (BS/BE programs)</li>
              <li>❌ Not receiving any other full scholarship</li>
            </ul>
          </div>
          <div className="card">
            <h2 className="mb-3">Required Documents</h2>
            <ul className="space-y-1 text-sm text-slate-600">
              {["CNIC / B-Form copy", "University enrollment letter", "Official transcripts", "Family income certificate", "Recent utility bill"].map((d) => (
                <li key={d}>📄 {d}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card bg-brand-50 border-brand-200">
            <h3 className="mb-1 font-semibold text-brand-800">Your Eligibility</h3>
            <div className="badge-high mb-3">High Match</div>
            <ul className="space-y-1 text-xs text-slate-600">
              <li>✅ CGPA: 3.6 (meets ≥ 2.5)</li>
              <li>✅ Income: PKR 420,000 (meets ≤ 500k)</li>
              <li>✅ Semester 3</li>
            </ul>
          </div>
          <button className="btn-primary w-full py-3">Apply Now 🚀</button>
          <button className="btn-outline w-full py-2.5">🔖 Save for Later</button>
        </div>
      </div>
    </>
  );
}
