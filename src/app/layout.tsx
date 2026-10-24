import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillPath AI — University Career Readiness & Learning Intelligence",
  description:
    "Know your gaps. Build your skills. Own your future. SkillPath AI transforms your university profile and target role into personalized learning resources, 30-day sprint plans, mock interviews, and semester roadmaps for CSE, EEE, BBA, Pharmacy & more.",
  keywords: [
    "SkillPath AI",
    "career roadmap",
    "learning resources",
    "mock interview",
    "skill assessment",
    "university students Bangladesh",
    "CSE career path",
    "EEE career path",
    "BBA finance analyst",
    "pharmacy regulatory affairs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F0F7FF] text-[#111827] selection:bg-indigo-100 selection:text-indigo-900 bg-ambient-light">
        {children}
      </body>
    </html>
  );
}
