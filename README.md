# QuasarEdu — Scholarship Management System

A full-stack web application that digitizes the end-to-end lifecycle of student scholarship applications — from registration and profile building, to eligibility discovery, application submission, admin review, and PDF receipt generation.

## Overview

QuasarEdu replaces manual, error-prone scholarship workflows with a complete digital system. Students discover eligible scholarships, apply in one click, track status in real time, and download PDF receipts. Admins manage scholarships, review applications, and broadcast notifications from a single dashboard.

## Features

### Student Portal
- Register with email OTP verification (6-digit, 5-min expiry, max 3 attempts)
- Brute-force protection: 15-minute lockout after 5 failed login attempts
- Comprehensive profile builder: personal, academic (SSC/HSSC/university), and financial data
- Smart scholarship discovery — eligibility engine filters by CGPA, family income, degree program, and semester
- Color-coded eligibility ratings (High / Medium / Low match)
- One-click scholarship application with optional personal statement
- Save/bookmark scholarships for later
- Withdraw pending applications and reapply after rejection or withdrawal
- AI-powered document Auto Fill using Google Gemini Vision
- PDF application receipt with embedded QR code
- Real-time status tracking: Pending / Approved / Rejected / Withdrawn
- In-app notifications and toast alerts
- QuasarEdu Assistant chatbot (Gemini-powered, scholarship topics only, supports Urdu)
- Identity verification via face selfie + fingerprint/biometric/PIN before applying

### Admin Portal
- Dashboard with live KPI tiles: total scholarships, total applications, pending reviews, approval rate
- Pie chart for application status distribution
- Full CRUD for scholarship programs with dynamic eligibility rules
- Application review: approve or reject with mandatory comments
- Filterable student list with popup profile view
- Document viewer for uploaded transcripts and proofs
- System-wide notification broadcasting
- Audit trail for all admin decisions

### Security
- Role-based access control (Student / Admin)
- BCrypt password hashing
- JWT session tokens
- Parameterized queries (SQL injection prevention)
- File upload whitelist: `.pdf`, `.jpg`, `.jpeg`, `.png`
- 64-char hex tokens, single-use, 1-hour expiry for verification links
- OTP: 5-minute expiry, max 3 attempts

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Tailwind CSS |
| Backend | Node.js 20 LTS, Express.js |
| Database | MySQL 8 (raw SQL, no ORM) |
| AI / OCR | Google Gemini 2.5 Flash API |
| PDF | Puppeteer |
| QR Code | qrcode (npm) |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Email | Nodemailer (Gmail SMTP) |
| File Uploads | Multer |

## Database Entities

10 entities in 3NF:

`Users` · `Students` · `Scholarships` · `Applications` · `Documents` · `Notifications` · `SavedScholarships` · `IdentityVerificationTokens` · `FingerprintVerificationTokens` · `ApplicationDocuments`

## Project Structure
FlyRank-AI-Capstone/
├── client/               # React frontend
│   ├── src/
│   │   ├── pages/        # Student and Admin pages
│   │   ├── components/   # Reusable UI components
│   │   └── services/     # API call functions
├── server/               # Express backend
│   ├── routes/           # auth, students, scholarships, applications, admin
│   ├── controllers/      # Business logic
│   ├── middleware/        # auth.js, upload.js, rateLimiter.js
│   └── db/               # MySQL connection pool
├── database/             # SQL schema, stored procedures, seed data
└── docs/                 # Documentation and assets

## Getting Started

```bash
# Clone the repo
git clone https://github.com/MahadNisarKhan/FlyRank-AI-Capstone.git
cd FlyRank-AI-Capstone

# Backend setup
cd server
npm install
cp .env.example .env
npm run dev

# Frontend setup (new terminal)
cd client
npm install
npm run dev
```

## Environment Variables
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=quasaredu
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_key
EMAIL_USER=your_gmail
EMAIL_PASS=your_app_password

## License

MIT © 2026 Project QuasarX