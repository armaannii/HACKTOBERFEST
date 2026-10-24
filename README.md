# SkillPath AI

An AI-powered career intelligence platform that helps university students in Bangladesh discover their skill gaps, get personalized roadmaps, and prepare for their dream jobs — all in one place.

---

## The Problem

University students in Bangladesh (CSE, EEE, BBA, Pharmacy, and beyond) often graduate without knowing exactly what skills industry expects from them. They rely on word-of-mouth, generic YouTube playlists, or expensive coaching — with no structured, personalized plan tied to their own academic progress and resume.

---

## The Solution

SkillPath AI analyzes a student's resume or academic background against their target role and generates a full career readiness plan. It scores their profile, highlights skill gaps with curated free learning resources, produces a semester-by-semester roadmap through graduation, creates a 30-day action sprint, and offers interactive tools like a skill quiz lab, AI mock interview coach, and portfolio blueprint generator — all powered by a free AI backend with no signup needed.

---

## How It Works

- **Model used:** OpenAI-compatible model via [Pollinations.ai](https://text.pollinations.ai) — free, no API key required
- **Tech stack:**
  - **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4
  - **Backend:** Next.js API Route (`/api/analyze`) — server-side AI inference
  - **AI parsing:** Zod schema validation on AI JSON output
  - **PDF parsing:** `pdf-parse` for resume upload support
  - **Icons:** Lucide React
- **Datasets:** No external datasets — AI generates tailored advice from resume text and student profile inputs

---

## How to Run

1. **Clone the repo**
   ```bash
   git clone https://github.com/armaannii/HACKTOBERFEST.git
   cd HACKTOBERFEST
   ```

2. **Install requirements**
   ```bash
   npm install
   ```

3. **Run the app**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

> **No API key needed.** The app uses [Pollinations.ai](https://text.pollinations.ai) as a free AI backend — just run and go.

---

## Screenshots / Demo

> _Add 2–3 screenshots of the app here (form, readiness score, roadmap dashboard)._

---

## What's Not Done Yet

- **AI response can be slow** (~15–30s) depending on Pollinations.ai server load
- **No user authentication** — analysis results are not saved between sessions
- **Mock Interview Coach** uses locally-generated questions, not live AI per answer
- **PDF parsing** may lose formatting on complex multi-column resumes
- No mobile-optimized layout polish for the results dashboard tabs

---

## Credits

- [Pollinations.ai](https://text.pollinations.ai) — Free OpenAI-compatible text API
- [Next.js](https://nextjs.org/) — Full-stack React framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Lucide React](https://lucide.dev/) — Icon library
- [Zod](https://zod.dev/) — TypeScript schema validation
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) — PDF text extraction
- [Hugging Face Inference SDK](https://github.com/huggingface/huggingface.js) — Originally used (replaced by Pollinations.ai for free access)
