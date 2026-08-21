import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <>
      <div className="page-header">
        <h1>My Profile</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Avatar + summary */}
        <div className="card flex flex-col items-center gap-3 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-4xl">
            🧑‍🎓
          </div>
          <div>
            <p className="font-semibold text-slate-900">Muhammad Ali</p>
            <p className="text-sm text-slate-500">ali@example.com</p>
            <span className="badge-high mt-1">Profile Complete</span>
          </div>
          <button className="btn-outline w-full text-sm">Edit Profile</button>
        </div>

        {/* Detail sections */}
        <div className="lg:col-span-2 space-y-4">
          {[
            {
              title: "Personal Information",
              rows: [
                { label: "Full Name", value: "Muhammad Ali" },
                { label: "CNIC", value: "35202-XXXXXXX-X" },
                { label: "Date of Birth", value: "Jan 15, 2004" },
                { label: "Phone", value: "+92 311 1234567" },
              ],
            },
            {
              title: "Academic Information",
              rows: [
                { label: "University", value: "FAST-NUCES, Lahore" },
                { label: "Degree", value: "BS Computer Science" },
                { label: "CGPA", value: "3.60 / 4.00" },
                { label: "Semester", value: "3rd" },
              ],
            },
            {
              title: "Financial Information",
              rows: [
                { label: "Annual Family Income", value: "PKR 420,000" },
                { label: "Income Proof", value: "✅ Uploaded" },
              ],
            },
          ].map((section) => (
            <div key={section.title} className="card">
              <h3 className="mb-3 font-semibold">{section.title}</h3>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                {section.rows.map((r) => (
                  <div key={r.label}>
                    <dt className="text-xs text-slate-400">{r.label}</dt>
                    <dd className="mt-0.5 text-sm font-medium text-slate-800">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
