import { z } from "zod";

export const StandardDepartmentEnum = z.enum(["CSE", "EEE", "BBA", "Pharmacy", "Other"]);
export type StandardDepartment = z.infer<typeof StandardDepartmentEnum>;
export type Department = string;

export const CareerLevelEnum = z.enum(["Internship", "Entry-level", "Career exploration"]);
export type CareerLevel = z.infer<typeof CareerLevelEnum>;

export const MarketPreferenceEnum = z.enum(["Bangladesh", "Global", "Both"]);
export type MarketPreference = z.infer<typeof MarketPreferenceEnum>;

export const LearningStyleEnum = z.enum(["Projects", "Courses", "Mixed"]);
export type LearningStyle = z.infer<typeof LearningStyleEnum>;

// Input validation schema for analysis request
export const AnalysisRequestSchema = z.object({
  department: z.string().min(2, "Department must be at least 2 characters").max(100),
  semester: z.coerce.number().int().min(1).max(8),
  graduationYear: z.string().optional(),
  careerLevel: CareerLevelEnum.default("Entry-level"),
  targetRole: z.string().min(2, "Target role must be at least 2 characters").max(100),
  resumeText: z.string().min(50, "Resume content must have at least 50 characters").max(50000, "Resume content too long"),
  market: MarketPreferenceEnum.default("Both"),
  weeklyHours: z.coerce.number().min(1).max(80).default(15),
  learningStyle: LearningStyleEnum.default("Mixed"),
  isDemo: z.boolean().optional(),
});

export type AnalysisRequest = z.infer<typeof AnalysisRequestSchema>;

// Learning Resource Schema
export const LearningResourceSchema = z.object({
  title: z.string(),
  provider: z.string(),
  url: z.string().url(),
  type: z.enum(["Course", "Video", "Documentation", "Practice", "Certification"]),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  duration: z.string(),
  cost: z.enum(["Free", "Freemium", "Paid", "Unknown"]),
  why_recommended: z.string(),
  practical_exercise: z.string(),
});

export type LearningResource = z.infer<typeof LearningResourceSchema>;

// Detailed AI Output Schemas
export const MissingSkillSchema = z.object({
  skill: z.string(),
  importance: z.enum(["High", "Medium", "Low"]),
  job_market: z.enum(["Bangladesh", "Global"]),
  reason: z.string(),
  recommended_action: z.string(),
  estimated_learning_hours: z.number().int().nonnegative(),
  learning_resources: z.array(LearningResourceSchema).optional(),
});

export const SemesterPlanSchema = z.object({
  semester: z.string(),
  focus_area: z.string(),
  actionable_tasks: z.array(z.string()).min(1),
  recommended_courses_or_certifications: z.array(z.string()),
  portfolio_project: z.string(),
  milestones: z.array(z.string()).min(1),
  linked_skills: z.array(z.string()).optional(),
});

export const RecommendedProjectSchema = z.object({
  title: z.string(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  skills_demonstrated: z.array(z.string()).min(1),
  deliverables: z.array(z.string()).min(1),
  problem_statement: z.string().optional(),
  tools: z.array(z.string()).optional(),
  implementation_phases: z.array(z.string()).optional(),
  testing_checklist: z.array(z.string()).optional(),
  readme_template: z.string().optional(),
});

export const ThirtyDayWeekSchema = z.object({
  week: z.number().int().min(1).max(4),
  goal: z.string(),
  learning_objective: z.string().optional(),
  tasks: z.array(z.string()).min(1),
  completion_criteria: z.string(),
  mini_project: z.string().optional(),
  estimated_study_hours: z.number().optional(),
  recommended_resources: z.array(LearningResourceSchema).optional(),
});

export const MarketInsightSchema = z.object({
  market: z.enum(["Bangladesh", "Global"]),
  relevant_skills: z.array(z.string()),
  notes: z.string(),
});

export const AnalysisResultSchema = z.object({
  overall_score: z.number().min(0).max(100),
  score_breakdown: z.object({
    technical_skills: z.number().min(0).max(100),
    projects: z.number().min(0).max(100),
    experience: z.number().min(0).max(100),
    role_alignment: z.number().min(0).max(100),
  }),
  score_explanation: z.string(),
  key_strengths: z.array(z.string()).min(1),
  missing_skills: z.array(MissingSkillSchema),
  semester_roadmap: z.array(SemesterPlanSchema).min(1),
  resume_formatting_tips: z.array(z.string()).min(1),
  recommended_projects: z.array(RecommendedProjectSchema).min(1),
  next_30_days: z.array(ThirtyDayWeekSchema).length(4),
  market_insights: z.array(MarketInsightSchema).min(1),
});

export type MissingSkill = z.infer<typeof MissingSkillSchema>;
export type SemesterPlan = z.infer<typeof SemesterPlanSchema>;
export type RecommendedProject = z.infer<typeof RecommendedProjectSchema>;
export type ThirtyDayWeek = z.infer<typeof ThirtyDayWeekSchema>;
export type MarketInsight = z.infer<typeof MarketInsightSchema>;
export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

// Skill Assessment Lab Types
export interface QuizQuestion {
  id: string;
  skill: string;
  question: string;
  scenario?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  recommendedResource?: {
    title: string;
    url: string;
  };
}

// Mock Interview Coach Types
export interface InterviewQuestion {
  id: string;
  role: string;
  type: "Technical" | "Behavioral" | "Role-specific";
  question: string;
  context: string;
  evaluationCriteria: string[];
  sampleAnswer: string;
  recommendedResourceUrl?: string;
  followUpQuestion?: string;
}

export interface InterviewFeedback {
  score: number;
  strengths: string[];
  weaknesses: string[];
  improvedAnswer: string;
  keyConcepts: string[];
  followUpQuestion?: string;
}

// Predefined roles per department with extensible custom support
export const PREDEFINED_ROLES: Record<string, string[]> = {
  CSE: [
    "Frontend Developer",
    "Backend Developer",
    "Full-Stack Developer",
    "Data Analyst",
    "Data Scientist",
    "AI/ML Engineer",
    "Cybersecurity Analyst",
    "DevOps Engineer",
    "QA Engineer",
  ],
  EEE: [
    "Electrical Engineer",
    "Power Systems Engineer",
    "Electronics Engineer",
    "Embedded Systems Engineer",
    "Renewable Energy Engineer",
    "Automation Engineer",
  ],
  BBA: [
    "Business Analyst",
    "Marketing Executive",
    "Financial Analyst",
    "HR Executive",
    "Operations Analyst",
    "Management Trainee",
  ],
  Pharmacy: [
    "Pharmacist",
    "Regulatory Affairs Associate",
    "Quality Assurance Associate",
    "Quality Control Analyst",
    "Pharmacovigilance Associate",
    "Pharmaceutical Research Associate",
  ],
  Other: [
    "Product Manager",
    "Data Analyst",
    "Operations Specialist",
    "UX/UI Designer",
    "Technical Consultant",
    "Research Assistant",
  ],
};
