# WORKFLOW.md — Prompting Discipline Drill
**QuasarEdu · Student Profile Settings Form**

---

## What This Drill Proves

Typing a prompt is not a skill. Directing an AI with context, constraints, and a verification step is. This document records the difference between the two — in code, in review time, and in production risk.

---

## Round One — Vague Prompt

**Prompt used:**
> "Build a student profile settings form with validation in React and Tailwind."

**What came back:**

The model produced a 405-line component (`StudentProfileForm.jsx`) using raw `useState` for every field — 11 separate state variables for `firstName`, `lastName`, `email`, `phone`, `studentId`, `department`, `year`, `gpa`, `bio`, `linkedin`, and `github`. None of these extra fields were asked for. The model invented scope.

Validation was done through a hand-written `validators` object with custom regex functions for each field. There were no tests. There was no `aria-describedby` on any input. There was no `role="alert"` on any error message. The form was not screen-reader accessible in any meaningful way.

**The AI mistake I caught:**

Round one's GPA validator read:

```js
gpa: v => v && (isNaN(Number(v)) || Number(v) < 0 || Number(v) > 4.0)
  ? "GPA must be between 0.0 and 4.0"
  : "",
```

The leading `v &&` means an **empty string passes silently**. A student could submit the form with no GPA value and the validator would return `""` (no error). This is a silent data integrity bug — the kind that reaches production, corrupts the eligibility engine, and is never caught by a visual review because the UI looks fine.

---

## Round Two — Precise Prompt

**Prompt included:** file pattern reference, stack constraints (react-hook-form + zod), exact fields with types and ranges, validation behavior on blur and on submit, accessibility requirements (aria-describedby, role="alert", htmlFor), and an instruction to write Vitest tests then report failures.

**What came back:**

A 300-line component (`StudentProfileSettingsForm.jsx`) using `useForm()` with `zodResolver`. Zero manual state. The zod schema used `.pipe(z.coerce.number())` on CGPA, family income, and semester — meaning submitted data arrives correctly typed as numbers, not strings. Round one would have submitted `cgpa: "3.5"` as a string; round two submits `cgpa: 3.5` as a number.

Every input had `aria-describedby` linking to its error element, `aria-invalid` reflecting validation state, and every error had `role="alert"`. A reusable `<Field>` wrapper enforced this consistently across all six fields. A `FIELD_ORDER` array ensured the first invalid field received focus on submit.

The test file covered 20+ cases: required fields, CGPA boundary values (0.0 and 4.0 accepted, -0.5 and 4.1 rejected), email format (missing @, missing domain, missing local part), semester boundaries (1–8), type coercion on submit, and a success banner after valid submission.

---

## Specific Diffs — Not Vibes

| Concern | Round One | Round Two |
|---|---|---|
| Form state | 11 `useState` calls | `useForm()` — zero manual state |
| Validation | Hand-written regex functions | Zod schema with coercion |
| GPA empty value | Silent pass (bug) | `min(1, 'CGPA is required')` catches it |
| Submitted data types | Strings (`"3.5"`) | Numbers (`3.5`) via `z.coerce.number()` |
| `aria-describedby` | Absent on all inputs | Present on all inputs |
| `role="alert"` | Absent on all errors | Present on all errors |
| `aria-invalid` | Absent | Present on all inputs |
| Tests | None | 20+ Vitest cases |
| Fields added beyond spec | 5 (phone, bio, linkedin, github, studentId) | 0 |
| Lines of code | 405 | ~300 (more capable) |

---

## Time Comparison

Round one took about two minutes to prompt and thirty minutes to review — hunting for bugs, missing accessibility, and unwanted fields. Round two took about ten minutes to write the prompt carefully and five minutes to review because the tests had already done the hunting. Round two felt slower at the start and was faster end-to-end. That is the entire lesson.

---

## Conclusion

The vague prompt produced code that looked correct in a browser. The precise prompt produced code that *was* correct — accessible, typed, tested, and scoped to exactly what was asked. The difference is not the AI. The difference is the engineer operating it.

"Used AI to build it" is not on your resume. "Specified, verified, and reviewed AI output" is.
