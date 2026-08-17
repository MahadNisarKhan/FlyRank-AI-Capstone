import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QuasarEdu — Scholarship Management System",
  description: "Digitizing the end-to-end lifecycle of student scholarship applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <nav className="bg-blue-700 text-white px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              QuasarEdu
            </Link>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/scholarships" className="hover:underline">Scholarships</Link>
              <Link href="/applications" className="hover:underline">Applications</Link>
              <Link href="/saved" className="hover:underline">Saved</Link>
              <Link href="/notifications" className="hover:underline">Notifications</Link>
              <Link href="/assistant" className="hover:underline">Assistant</Link>
              <Link href="/profile" className="hover:underline">Profile</Link>
              <Link href="/admin" className="hover:underline font-semibold border border-white rounded px-2 py-0.5">Admin</Link>
              <Link href="/login" className="hover:underline">Login</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
