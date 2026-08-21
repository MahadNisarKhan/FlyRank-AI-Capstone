# QuasarEdu — Scholarship Management System

> **Status:** Next.js scaffold live. API integrations (MySQL, Gemini, Nodemailer) coming in subsequent milestones.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MahadNisarKhan/FlyRank-AI-Capstone-Intership)

## Live URLs
| Environment | URL |
|---|---|
| Preview (latest `main`) | _add after first deploy_ |
| Health check | `<preview-url>/health` |
| Health JSON | `<preview-url>/api/health` |

## Screens (all routed)

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Student + Admin login |
| `/register` | Multi-step student registration |
| `/student/dashboard` | Student home & KPIs |
| `/student/scholarships` | Scholarship discovery + eligibility filter |
| `/student/scholarships/[id]` | Scholarship detail + eligibility check |
| `/student/applications` | Application tracker |
| `/student/profile` | Profile viewer |
| `/student/notifications` | Inbox |
| `/student/chatbot` | Gemini AI assistant |
| `/admin/dashboard` | Admin KPIs + charts |
| `/admin/scholarships` | Scholarship CRUD list |
| `/admin/scholarships/new` | Create scholarship |
| `/admin/scholarships/[id]/edit` | Edit scholarship |
| `/admin/applications` | Review & approve/reject |
| `/admin/students` | Student directory |
| `/admin/notifications` | Broadcast notifications |
| `/health` | Health check page (Server Component, fetches live data) |
| `/api/health` | Health check JSON API |

## Tech Stack (this scaffold)

| Layer | Technology |
|---|---|
| Framework | Next.js 14, App Router, TypeScript |
| Styling | Tailwind CSS 3 + custom design tokens |
| Server | Node.js (Vercel serverless) |
| Deployment | Vercel (preview on every push) |

## Quick Start

```bash
git clone https://github.com/MahadNisarKhan/FlyRank-AI-Capstone-Intership.git
cd FlyRank-AI-Capstone-Intership
npm install
cp .env.example .env.local   # fill in values — NEVER commit .env.local
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

1. Push this code to `main` on GitHub (instructions below).
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** your GitHub repo.
3. Vercel auto-detects Next.js — click **Deploy**. Done.
4. Every subsequent push to any branch gets a preview URL automatically.

### Environment Variables on Vercel

In **Vercel Dashboard → Your Project → Settings → Environment Variables**, add:

| Key | Example Value |
|---|---|
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` |
| `DATABASE_URL` | `mysql://...` |
| `JWT_SECRET` | _(64-char hex)_ |
| `GEMINI_API_KEY` | `AIza...` |
| `EMAIL_USER` | `you@gmail.com` |
| `EMAIL_PASS` | _(Gmail App Password)_ |

> ⚠️ Never put real secrets in `.env.example` or commit a `.env` / `.env.local` file.

## Push this scaffold to your existing repo

```bash
# If starting fresh inside the repo:
git add .
git commit -m "feat: Next.js scaffold — all routes, Tailwind tokens, health check, Vercel config"
git push origin main
```

## Design Tokens (tailwind.config.ts)

| Token | Value |
|---|---|
| Primary | `brand-500` → `#6366f1` (indigo) |
| Accent / Approved | `accent.green` → `#10b981` |
| Accent / High match | `accent` → `#f59e0b` |
| Rejected / Error | `accent.red` → `#ef4444` |
| Card shadow | `shadow-card` |
| Breakpoints | `xs: 375px`, `xl: 1280px` |

## License

MIT © 2026 QuasarEdu / FlyRank AI Capstone
