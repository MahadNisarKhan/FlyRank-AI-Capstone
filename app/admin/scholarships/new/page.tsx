import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "New Scholarship" };

export default function NewScholarshipPage() {
  return (
    <>
      <div className="mb-4">
        <Link href="/admin/scholarships" className="text-sm text-brand-600 hover:underline">← Back</Link>
      </div>
      <h1 className="mb-6">Create Scholarship</h1>

      <div className="card max-w-2xl space-y-5">
        {[
          { label: "Scholarship Title", type: "text",   placeholder: "e.g. HEC Need-Based Scholarship" },
          { label: "Provider / Sponsor", type: "text",  placeholder: "e.g. Higher Education Commission" },
          { label: "Award Amount (PKR)", type: "number", placeholder: "50000" },
          { label: "Total Seats",        type: "number", placeholder: "200" },
          { label: "Application Deadline", type: "date", placeholder: "" },
        ].map((f) => (
          <div key={f.label}>
            <label className="label">{f.label}</label>
            <input type={f.type} placeholder={f.placeholder} className="input" />
          </div>
        ))}

        <div>
          <label className="label">Description</label>
          <textarea rows={4} placeholder="Describe the scholarship…" className="input resize-y" />
        </div>

        <fieldset className="card bg-surface-muted border-0 space-y-3">
          <legend className="label">Eligibility Rules</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label text-xs">Min CGPA</label>
              <input type="number" step="0.01" placeholder="2.50" className="input" />
            </div>
            <div>
              <label className="label text-xs">Max Annual Income (PKR)</label>
              <input type="number" placeholder="500000" className="input" />
            </div>
            <div>
              <label className="label text-xs">Degree Program (optional)</label>
              <input type="text" placeholder="Any / BS CS / BE" className="input" />
            </div>
            <div>
              <label className="label text-xs">Max Semester</label>
              <input type="number" min="1" max="8" placeholder="8" className="input" />
            </div>
          </div>
        </fieldset>

        <div className="flex gap-3 pt-2">
          <button className="btn-primary flex-1">Create Scholarship</button>
          <Link href="/admin/scholarships" className="btn-outline flex-1 text-center">Cancel</Link>
        </div>
      </div>
    </>
  );
}
