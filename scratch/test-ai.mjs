import { extractAndParseJSON } from "../src/lib/huggingface.ts";
import { AnalysisResultSchema } from "../src/types/career.ts";
import fs from "fs";

async function testFull() {
  const systemPrompt = `You are SkillPath AI, an expert career intelligence engine for university students.
CRITICAL INSTRUCTIONS:
1. Return ONLY a single strict, valid JSON object matching the schema below. No commentary, no text outside JSON.
2. Be concise in your bullet points and notes so the complete JSON fits well within token limits and is never truncated.
3. Provide 3-5 high-priority missing skills, a focused roadmap starting from semester 6 to 8, 2 recommended projects, exactly 4 weeks for next_30_days, and market insights for Bangladesh and Global.

REQUIRED JSON SCHEMA:
{
  "overall_score": number (0 to 100),
  "score_breakdown": {
    "technical_skills": number (0 to 100),
    "projects": number (0 to 100),
    "experience": number (0 to 100),
    "role_alignment": number (0 to 100)
  },
  "score_explanation": string,
  "key_strengths": string[],
  "missing_skills": [
    {
      "skill": string,
      "importance": "High" | "Medium" | "Low",
      "job_market": "Bangladesh" | "Global",
      "reason": string,
      "recommended_action": string,
      "estimated_learning_hours": number
    }
  ],
  "semester_roadmap": [
    {
      "semester": string,
      "focus_area": string,
      "actionable_tasks": string[],
      "recommended_courses_or_certifications": string[],
      "portfolio_project": string,
      "milestones": string[]
    }
  ],
  "resume_formatting_tips": string[],
  "recommended_projects": [
    {
      "title": string,
      "difficulty": "Beginner" | "Intermediate" | "Advanced",
      "skills_demonstrated": string[],
      "deliverables": string[]
    }
  ],
  "next_30_days": [
    {
      "week": 1,
      "goal": string,
      "tasks": string[],
      "completion_criteria": string
    },
    {
      "week": 2,
      "goal": string,
      "tasks": string[],
      "completion_criteria": string
    },
    {
      "week": 3,
      "goal": string,
      "tasks": string[],
      "completion_criteria": string
    },
    {
      "week": 4,
      "goal": string,
      "tasks": string[],
      "completion_criteria": string
    }
  ],
  "market_insights": [
    {
      "market": "Bangladesh",
      "relevant_skills": string[],
      "notes": string
    },
    {
      "market": "Global",
      "relevant_skills": string[],
      "notes": string
    }
  ]
}`;

  const userPrompt = `CANDIDATE:
- Department: CSE
- Current Semester: 6 of 8
- Target Role: Frontend Developer
- Resume Text: "Proficient in JavaScript, HTML5, CSS3, React, Tailwind CSS, Git. Built a responsive e-commerce web app with product filtering and cart state management. Completed Data Structures & Algorithms coursework."`;

  console.log("Calling API...");
  const res = await fetch("https://text.pollinations.ai/openai/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2
    })
  });

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content;
  console.log("Got raw response length:", raw?.length);
  fs.writeFileSync("scratch/raw.txt", raw || "");
  const parsed = extractAndParseJSON(raw);
  const validated = AnalysisResultSchema.parse(parsed);
  console.log("SUCCESS! Validated overall_score:", validated.overall_score);
  console.log("Strengths:", validated.key_strengths);
  console.log("Missing skills count:", validated.missing_skills.length);
  console.log("Roadmap semesters:", validated.semester_roadmap.map(s => s.semester));
}

testFull().catch(console.error);
