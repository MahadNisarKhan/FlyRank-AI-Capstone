import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Edit Scholarship" };

export default function EditScholarshipPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="mb-4">
        <Link href="/admin/scholarships" className="text-sm text-brand-600 hover:underline">← Back</Link>
      </div>
      <h1 className="mb-6">Edit Scholarship #{params.id}</h1>

      <div className="card max-w-2xl space-y-5">
        {/* Same form shape as /new — pre-populated from DB */}
        {[
          { label: "Scholarship Title", type: "text",   value: "HEC Need-Based Scholarship" },
          { label: "Provider / Sponsor", type: "text",  value: "Higher Education Commission" },
          { label: "Award Amount (PKR)", type: "number", value: "50000" },
          { label: "Total Seats",        type: "number", value: "200" },
          { label: "Application Deadline", type: "date", value: "2026-09-15" },
        ].map((f) => (
          <div key={f.label}>
            <label className="label">{f.label}</label>
            <input type={f.type} defaultValue={f.value} className="input" />
          </div>
        ))}

        <div>
          <label className="label">Active</label>
          <select className="input w-auto">
            <option value="1">Active</option>
            <option value="0">Closed</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="btn-primary flex-1">Save Changes</button>
          <Link href="/admin/scholarships" className="btn-outline flex-1 text-center">Cancel</Link>
        </div>
      </div>
    </>
  );
}
