import { useState, useEffect } from "react";

const DEPARTMENTS = [
  "Computer Science", "Electrical Engineering", "Mathematics",
  "Physics", "Biology", "Chemistry", "Business Administration",
  "Psychology", "Economics", "Literature & Humanities",
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"];

const initialForm = {
  firstName: "", lastName: "", email: "", phone: "",
  studentId: "", department: "", year: "", gpa: "",
  bio: "", linkedin: "", github: "",
  emailNotifs: true, smsNotifs: false, publicProfile: true,
};

const validators = {
  firstName: v => !v.trim() ? "First name is required" : v.trim().length < 2 ? "Must be at least 2 characters" : "",
  lastName: v => !v.trim() ? "Last name is required" : v.trim().length < 2 ? "Must be at least 2 characters" : "",
  email: v => !v.trim() ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email address" : "",
  phone: v => v && !/^\+?[\d\s\-().]{7,15}$/.test(v) ? "Enter a valid phone number" : "",
  studentId: v => !v.trim() ? "Student ID is required" : !/^[A-Z0-9\-]{4,12}$/i.test(v) ? "4–12 alphanumeric characters" : "",
  department: v => !v ? "Select a department" : "",
  year: v => !v ? "Select your year" : "",
  gpa: v => v && (isNaN(Number(v)) || Number(v) < 0 || Number(v) > 4.0) ? "GPA must be between 0.0 and 4.0" : "",
  bio: v => v.length > 300 ? "Bio must be 300 characters or fewer" : "",
  linkedin: v => v && !/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w\-]+\/?$/.test(v) ? "Enter a valid LinkedIn URL" : "",
  github: v => v && !/^(https?:\/\/)?(www\.)?github\.com\/[\w\-]+\/?$/.test(v) ? "Enter a valid GitHub URL" : "",
};

const REQUIRED = ["firstName", "lastName", "email", "studentId", "department", "year"];

function getInitials(f, l) {
  return `${f?.[0] || ""}${l?.[0] || ""}`.toUpperCase() || "SP";
}

function getCompletion(form) {
  const fields = ["firstName", "lastName", "email", "phone", "studentId", "department", "year", "gpa", "bio", "linkedin", "github"];
  const filled = fields.filter(f => form[f] && String(form[f]).trim()).length;
  return Math.round((filled / fields.length) * 100);
}

function Field({ label, error, touched, children, hint, required }) {
  const hasError = touched && error;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-indigo-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !hasError && <p className="text-xs text-gray-400">{hint}</p>}
      {hasError && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (touched, error) =>
  `w-full px-3 py-2 rounded-lg border text-sm text-gray-900 bg-white transition-all outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 placeholder:text-gray-300 ${
    touched && error
      ? "border-red-400 bg-red-50 focus:ring-red-400 focus:border-red-400"
      : "border-gray-200 hover:border-gray-300"
  }`;

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative shrink-0 w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${checked ? "bg-indigo-500" : "bg-gray-200"}`}
      >
        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-4" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

export default function StudentProfileForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);

  const completion = getCompletion(form);
  const initials = getInitials(form.firstName, form.lastName);

  function validate(fields = form) {
    const errs = {};
    Object.keys(validators).forEach(k => {
      const msg = validators[k](fields[k] ?? "");
      if (msg) errs[k] = msg;
    });
    return errs;
  }

  function handleChange(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      const msg = validators[field]?.(value) || "";
      setErrors(e => ({ ...e, [field]: msg }));
    }
    setSaved(false);
  }

  function handleBlur(field) {
    setTouched(t => ({ ...t, [field]: true }));
    const msg = validators[field]?.(form[field]) || "";
    setErrors(e => ({ ...e, [field]: msg }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const allTouched = Object.keys(validators).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    setSubmitted(true);
    if (Object.keys(errs).length === 0) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  const hasErrors = submitted && Object.keys(errors).some(k => errors[k]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-500 mb-1">Profile Settings</p>
          <h1 className="text-2xl font-semibold text-gray-900">Your student profile</h1>
          <p className="text-sm text-gray-400 mt-1">Manage how you appear to instructors and peers.</p>
        </div>

        {/* Completion bar */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 flex items-center gap-4">
          <div className="relative w-12 h-12 shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="#E5E7EB" strokeWidth="4" />
              <circle cx="24" cy="24" r="20" fill="none" stroke="#6366F1" strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - completion / 100)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-indigo-600">{completion}%</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800">Profile {completion < 50 ? "just started" : completion < 80 ? "looking good" : completion < 100 ? "almost complete" : "complete"}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {completion === 100 ? "All fields filled in — great work." : "Fill in more fields to strengthen your profile."}
            </p>
          </div>
          {completion === 100 && (
            <span className="shrink-0 text-xs font-medium bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100">Complete</span>
          )}
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Avatar + name preview */}
          <section className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Photo & display</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-semibold shrink-0 border-2 border-indigo-200 select-none">
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{form.firstName || form.lastName ? `${form.firstName} ${form.lastName}`.trim() : "Your Name"}</p>
                <p className="text-xs text-gray-400">{form.department || "Department"} · {form.year || "Year"}</p>
                <button type="button" className="mt-2 text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors">
                  Upload photo →
                </button>
              </div>
            </div>
          </section>

          {/* Personal info */}
          <section className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">Personal information</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name" error={errors.firstName} touched={touched.firstName} required>
                <input
                  type="text" placeholder="Jane"
                  value={form.firstName}
                  onChange={e => handleChange("firstName", e.target.value)}
                  onBlur={() => handleBlur("firstName")}
                  className={inputCls(touched.firstName, errors.firstName)}
                />
              </Field>
              <Field label="Last name" error={errors.lastName} touched={touched.lastName} required>
                <input
                  type="text" placeholder="Smith"
                  value={form.lastName}
                  onChange={e => handleChange("lastName", e.target.value)}
                  onBlur={() => handleBlur("lastName")}
                  className={inputCls(touched.lastName, errors.lastName)}
                />
              </Field>
            </div>
            <Field label="Email address" error={errors.email} touched={touched.email} required>
              <input
                type="email" placeholder="jane.smith@university.edu"
                value={form.email}
                onChange={e => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={inputCls(touched.email, errors.email)}
              />
            </Field>
            <Field label="Phone number" error={errors.phone} touched={touched.phone} hint="Optional — used for SMS alerts only">
              <input
                type="tel" placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={e => handleChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                className={inputCls(touched.phone, errors.phone)}
              />
            </Field>
          </section>

          {/* Academic info */}
          <section className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">Academic information</h2>
            <Field label="Student ID" error={errors.studentId} touched={touched.studentId} required hint="4–12 alphanumeric characters">
              <input
                type="text" placeholder="CS-20241234"
                value={form.studentId}
                onChange={e => handleChange("studentId", e.target.value.toUpperCase())}
                onBlur={() => handleBlur("studentId")}
                className={`${inputCls(touched.studentId, errors.studentId)} font-mono tracking-wide`}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Department" error={errors.department} touched={touched.department} required>
                <select
                  value={form.department}
                  onChange={e => handleChange("department", e.target.value)}
                  onBlur={() => handleBlur("department")}
                  className={`${inputCls(touched.department, errors.department)} appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.2em]`}
                >
                  <option value="">Select department</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Year of study" error={errors.year} touched={touched.year} required>
                <select
                  value={form.year}
                  onChange={e => handleChange("year", e.target.value)}
                  onBlur={() => handleBlur("year")}
                  className={`${inputCls(touched.year, errors.year)} appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.2em]`}
                >
                  <option value="">Select year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </Field>
            </div>
            <Field label="GPA" error={errors.gpa} touched={touched.gpa} hint="Optional — visible to advisors only">
              <input
                type="number" min="0" max="4.0" step="0.01" placeholder="3.75"
                value={form.gpa}
                onChange={e => handleChange("gpa", e.target.value)}
                onBlur={() => handleBlur("gpa")}
                className={`${inputCls(touched.gpa, errors.gpa)} max-w-[120px]`}
              />
            </Field>
          </section>

          {/* Bio & links */}
          <section className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">Bio & links</h2>
            <Field label="Bio" error={errors.bio} touched={touched.bio}>
              <div className="relative">
                <textarea
                  placeholder="A short intro — your interests, goals, or current projects."
                  value={form.bio}
                  onChange={e => handleChange("bio", e.target.value)}
                  onBlur={() => handleBlur("bio")}
                  rows={3}
                  className={`${inputCls(touched.bio, errors.bio)} resize-none`}
                />
                <span className={`absolute bottom-2 right-3 text-xs ${form.bio.length > 270 ? form.bio.length > 300 ? "text-red-500" : "text-amber-500" : "text-gray-300"}`}>
                  {form.bio.length}/300
                </span>
              </div>
            </Field>
            <Field label="LinkedIn" error={errors.linkedin} touched={touched.linkedin} hint="Optional">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-300 font-medium select-none">in/</span>
                <input
                  type="url" placeholder="linkedin.com/in/jane-smith"
                  value={form.linkedin}
                  onChange={e => handleChange("linkedin", e.target.value)}
                  onBlur={() => handleBlur("linkedin")}
                  className={`${inputCls(touched.linkedin, errors.linkedin)} pl-8`}
                />
              </div>
            </Field>
            <Field label="GitHub" error={errors.github} touched={touched.github} hint="Optional">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-300 font-medium select-none">gh/</span>
                <input
                  type="url" placeholder="github.com/janesmith"
                  value={form.github}
                  onChange={e => handleChange("github", e.target.value)}
                  onBlur={() => handleBlur("github")}
                  className={`${inputCls(touched.github, errors.github)} pl-8`}
                />
              </div>
            </Field>
          </section>

          {/* Preferences */}
          <section className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">Preferences</h2>
            <Toggle
              checked={form.emailNotifs}
              onChange={v => handleChange("emailNotifs", v)}
              label="Email notifications"
              description="Course updates, deadlines, and messages."
            />
            <div className="border-t border-gray-50" />
            <Toggle
              checked={form.smsNotifs}
              onChange={v => handleChange("smsNotifs", v)}
              label="SMS alerts"
              description="Urgent notifications only. Requires a phone number."
            />
            <div className="border-t border-gray-50" />
            <Toggle
              checked={form.publicProfile}
              onChange={v => handleChange("publicProfile", v)}
              label="Public profile"
              description="Let other students find and view your profile."
            />
          </section>

          {/* Error summary */}
          {hasErrors && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 items-start">
              <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-700">Fix the errors above to save your profile.</p>
                <ul className="text-xs text-red-500 mt-1 space-y-0.5 list-disc list-inside">
                  {Object.entries(errors).filter(([, v]) => v).map(([k, v]) => (
                    <li key={k}>{v}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-between gap-4 pb-2">
            <button
              type="button"
              onClick={() => { setForm(initialForm); setErrors({}); setTouched({}); setSubmitted(false); setSaved(false); }}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm active:scale-[0.98]"
              }`}
            >
              {saved ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved
                </span>
              ) : "Save changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
