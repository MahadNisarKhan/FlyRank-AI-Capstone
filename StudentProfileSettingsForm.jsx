import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// ─── Zod schema ──────────────────────────────────────────────────────────────

const schema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .min(1, 'Full name is required')
    .min(3, 'Full name must be at least 3 characters'),

  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  cgpa: z
    .string({ required_error: 'CGPA is required' })
    .min(1, 'CGPA is required')
    .pipe(
      z.coerce
        .number({ invalid_type_error: 'CGPA must be a number' })
        .min(0.0, 'CGPA must be at least 0.0')
        .max(4.0, 'CGPA must not exceed 4.0'),
    ),

  familyIncome: z
    .string({ required_error: 'Family income is required' })
    .min(1, 'Family income is required')
    .pipe(
      z.coerce
        .number({ invalid_type_error: 'Family income must be a number' })
        .positive('Family income must be a positive number'),
    ),

  degreeProgram: z
    .string({ required_error: 'Please select a degree program' })
    .refine((v) => ['BS', 'MS', 'PhD'].includes(v), {
      message: 'Please select a degree program',
    }),

  semester: z
    .string({ required_error: 'Semester is required' })
    .min(1, 'Semester is required')
    .pipe(
      z.coerce
        .number({ invalid_type_error: 'Semester must be a number' })
        .int('Semester must be a whole number')
        .min(1, 'Semester must be between 1 and 8')
        .max(8, 'Semester must be between 1 and 8'),
    ),
});

// ─── Field order (determines first-error focus) ───────────────────────────────

const FIELD_ORDER = ['fullName', 'email', 'cgpa', 'familyIncome', 'degreeProgram', 'semester'];

// ─── Re-usable field wrapper ──────────────────────────────────────────────────

function Field({ id, label, error, required, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-widest text-slate-500"
      >
        {label}
        {required && (
          <span className="ml-1 text-violet-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs font-medium text-red-600"
        >
          {/* inline SVG exclamation — no external dep, no inline style */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Shared input className builder ──────────────────────────────────────────

function inputClass(hasError) {
  return [
    'w-full rounded-lg border bg-slate-50 px-4 py-2.5 text-sm text-slate-800',
    'placeholder:text-slate-400',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
      : 'border-slate-200 focus:border-violet-500 focus:ring-violet-200',
  ].join(' ');
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function StudentProfileSettingsForm({ onSubmit: onSubmitProp }) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onValid = (data) => {
    onSubmitProp?.(data);
  };

  const onError = (formErrors) => {
    const first = FIELD_ORDER.find((f) => formErrors[f]);
    if (first) setFocus(first);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12">
      {/* Card */}
      <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-violet-950/30">

        {/* Header band */}
        <div className="relative bg-gradient-to-r from-violet-700 to-violet-500 px-8 py-7">
          {/* Decorative circles */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-6 right-16 h-24 w-24 rounded-full bg-white/5"
            aria-hidden="true"
          />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
                QuasarEdu
              </p>
              <h1 className="mt-1 text-2xl font-bold text-white">
                Student Profile
              </h1>
              <p className="mt-1 text-sm text-violet-200/80">
                Keep your details accurate to stay eligible for scholarship matching.
              </p>
            </div>
            {/* Degree badge icon */}
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Form body */}
        <form
          onSubmit={handleSubmit(onValid, onError)}
          noValidate
          className="px-8 py-8"
          aria-label="Student profile settings"
        >
          {/* ── Row 1: Full Name + Email ── */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="fullName" label="Full Name" error={errors.fullName?.message} required>
              <input
                id="fullName"
                type="text"
                placeholder="e.g. Ayesha Khan"
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                aria-invalid={!!errors.fullName}
                className={inputClass(!!errors.fullName)}
                {...register('fullName')}
              />
            </Field>

            <Field id="email" label="Email Address" error={errors.email?.message} required>
              <input
                id="email"
                type="email"
                placeholder="you@university.edu"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
                className={inputClass(!!errors.email)}
                {...register('email')}
              />
            </Field>
          </div>

          {/* ── Row 2: CGPA + Family Income ── */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field id="cgpa" label="CGPA" error={errors.cgpa?.message} required>
              <input
                id="cgpa"
                type="number"
                step="0.01"
                min="0"
                max="4"
                placeholder="0.00 – 4.00"
                aria-describedby={errors.cgpa ? 'cgpa-error' : undefined}
                aria-invalid={!!errors.cgpa}
                className={inputClass(!!errors.cgpa)}
                {...register('cgpa')}
              />
            </Field>

            <Field
              id="familyIncome"
              label="Annual Family Income (PKR)"
              error={errors.familyIncome?.message}
              required
            >
              <input
                id="familyIncome"
                type="number"
                min="1"
                placeholder="e.g. 600000"
                aria-describedby={errors.familyIncome ? 'familyIncome-error' : undefined}
                aria-invalid={!!errors.familyIncome}
                className={inputClass(!!errors.familyIncome)}
                {...register('familyIncome')}
              />
            </Field>
          </div>

          {/* ── Row 3: Degree Program + Semester ── */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field
              id="degreeProgram"
              label="Degree Program"
              error={errors.degreeProgram?.message}
              required
            >
              <select
                id="degreeProgram"
                aria-describedby={errors.degreeProgram ? 'degreeProgram-error' : undefined}
                aria-invalid={!!errors.degreeProgram}
                className={[
                  inputClass(!!errors.degreeProgram),
                  'cursor-pointer appearance-none',
                ].join(' ')}
                {...register('degreeProgram')}
              >
                <option value="">Select program…</option>
                <option value="BS">BS — Bachelor of Science</option>
                <option value="MS">MS — Master of Science</option>
                <option value="PhD">PhD — Doctor of Philosophy</option>
              </select>
            </Field>

            <Field id="semester" label="Current Semester" error={errors.semester?.message} required>
              <input
                id="semester"
                type="number"
                min="1"
                max="8"
                step="1"
                placeholder="1 – 8"
                aria-describedby={errors.semester ? 'semester-error' : undefined}
                aria-invalid={!!errors.semester}
                className={inputClass(!!errors.semester)}
                {...register('semester')}
              />
            </Field>
          </div>

          {/* ── Divider ── */}
          <div className="my-8 border-t border-slate-100" />

          {/* ── Actions ── */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              <span className="text-violet-500">*</span> Required fields
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-400/30 transition-all duration-150 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Saving…
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>

          {/* ── Success banner ── */}
          {isSubmitSuccessful && (
            <div
              role="status"
              className="mt-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Profile saved — your scholarship eligibility is up to date.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
