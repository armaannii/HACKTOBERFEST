"use client";

import React, { useState, useEffect } from "react";
import { Navbar, BgVariant } from "@/components/navbar";
import { AnalysisForm } from "@/components/analysis-form";
import { ReadinessScore } from "@/components/readiness-score";
import { StrengthsCard } from "@/components/strengths-card";
import { SkillGapCard } from "@/components/skill-gap-card";
import { RoadmapTimeline } from "@/components/roadmap-timeline";
import { ThirtyDayPlan } from "@/components/thirty-day-plan";
import { SkillAssessmentLab } from "@/components/skill-assessment-lab";
import { MockInterviewCoach } from "@/components/mock-interview-coach";
import { PortfolioGenerator } from "@/components/portfolio-generator";
import { ResumeTips } from "@/components/resume-tips";
import { MarketInsights } from "@/components/market-insights";
import { PrintableReport } from "@/components/printable-report";
import { GamificationBar } from "@/components/gamification-bar";
import { AnalysisResult } from "@/types/career";
import { DEMO_PROFILES } from "@/lib/demo-data";
import {
  getGamificationState,
  GamificationProfile,
  addXp,
} from "@/lib/gamification";
import {
  Compass,
  Sparkles,
  RefreshCw,
  Target,
  FlaskConical,
  Mic,
  FolderGit2,
  Calendar,
  Globe2,
  LayoutGrid,
} from "lucide-react";

type DashboardTab =
  | "all"
  | "readiness"
  | "sprint"
  | "roadmap"
  | "lab"
  | "interview"
  | "portfolio"
  | "market";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const [targetRole, setTargetRole] = useState<string>("Full-Stack Developer");
  const [department, setDepartment] = useState<string>("CSE");
  const [semester, setSemester] = useState<number>(5);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>("all");
  const [bgVariant, setBgVariant] = useState<BgVariant>("grid");

  // Local Gamification Profile
  const [gamification, setGamification] = useState<GamificationProfile>(() => getGamificationState());

  useEffect(() => {
    const handleUpdate = () => {
      setGamification(getGamificationState());
    };
    window.addEventListener("skillpath_gamification_updated", handleUpdate);
    return () => {
      window.removeEventListener("skillpath_gamification_updated", handleUpdate);
    };
  }, []);

  // Quick demo profile loader from Navbar or buttons
  const handleSelectDemoProfile = (deptKey: string) => {
    const profile = DEMO_PROFILES[deptKey] || DEMO_PROFILES.CSE;
    if (profile) {
      setDepartment(profile.department);
      setSemester(profile.semester);
      setTargetRole(profile.targetRole);
      setAnalysisResult(profile.sampleResult);
      setIsDemo(true);
      setServerError(null);
      setActiveTab("all");

      // Award initial analysis badge & XP
      addXp(20, "badge-analyzed");

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById("results-dashboard")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setServerError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitAnalysis = async (
    data: FormData | object,
    isMultipart: boolean
  ) => {
    setIsLoading(true);
    setServerError(null);

    try {
      let response: Response;

      if (isMultipart) {
        const fd = data as FormData;
        const deptVal = (fd.get("department") as string) || "CSE";
        setDepartment(deptVal);
        setSemester(Number(fd.get("semester")) || 5);
        setTargetRole((fd.get("targetRole") as string) || "Full-Stack Developer");

        response = await fetch("/api/analyze", {
          method: "POST",
          body: fd,
        });
      } else {
        const json = data as {
          department: string;
          semester: number;
          targetRole: string;
        };
        setDepartment(json.department || "CSE");
        setSemester(json.semester || 5);
        setTargetRole(json.targetRole || "Full-Stack Developer");

        response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      const resJson = await response.json();

      if (!response.ok) {
        throw new Error(resJson.error || "Failed to analyze profile.");
      }

      if (resJson.success && resJson.data) {
        setAnalysisResult(resJson.data);
        setIsDemo(Boolean(resJson.isDemo));
        setActiveTab("all");

        // Award XP
        addXp(30, "badge-analyzed");

        // Smooth scroll down to the dashboard
        setTimeout(() => {
          document.getElementById("results-dashboard")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        throw new Error("Invalid response format received from server.");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An error occurred during analysis.";
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const missingSkillNames = (analysisResult?.missing_skills || []).map((s) => s.skill);

  const bgClass =
    bgVariant === "grid"
      ? "bg-mesh-grid"
      : bgVariant === "soft"
      ? "bg-mesh-soft"
      : "bg-mesh-contrast";

  return (
    <div className={`min-h-screen flex flex-col ${bgClass} text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300 relative`}>
      {/* Soft Ambient Hero Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-indigo-200/40 via-sky-100/20 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Navigation Bar */}
      <Navbar
        onSelectDemoProfile={handleSelectDemoProfile}
        onReset={handleReset}
        hasActiveReport={Boolean(analysisResult)}
        userXp={gamification.xp}
        bgVariant={bgVariant}
        onChangeBgVariant={setBgVariant}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-5 print-hide">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Career Intelligence for University Students in Bangladesh</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Know your gaps. Build your skills.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800">
              Own your future.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            SkillPath AI analyzes your university syllabus, resume, and career ambitions into an actionable, semester-by-semester readiness plan with verified learning resources, assessment labs, mock interviews, and portfolio blueprints.
          </p>

          {/* Department Faculty Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {[
              { code: "CSE", label: "Computer Science", bg: "bg-indigo-50 text-indigo-700 border-indigo-200" },
              { code: "EEE", label: "Electrical & Electronic", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
              { code: "BBA", label: "Finance & Analytics", bg: "bg-amber-50 text-amber-800 border-amber-200" },
              { code: "Pharmacy", label: "Regulatory & Quality", bg: "bg-rose-50 text-rose-700 border-rose-200" },
              { code: "Custom", label: "Any Other Department", bg: "bg-purple-50 text-purple-700 border-purple-200" },
            ].map((d) => (
              <span
                key={d.code}
                className={`px-3 py-1 rounded-xl text-xs font-semibold border shadow-2xs ${d.bg}`}
              >
                <strong className="mr-1">{d.code}:</strong> {d.label}
              </span>
            ))}
          </div>
        </section>

        {/* Guided Input Form Section */}
        <section id="analysis-form-section" className="print-hide">
          <AnalysisForm
            onSubmit={handleSubmitAnalysis}
            isLoading={isLoading}
            onLoadDemoProfile={handleSelectDemoProfile}
            serverError={serverError}
          />
        </section>

        {/* Loading Overlay State */}
        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-indigo-100 bg-white p-12 text-center shadow-md space-y-4 print-hide animate-pulse"
          >
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              <Compass className="w-7 h-7 text-indigo-600" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900">
                Evaluating candidate readiness & mapping gaps...
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Auditing curriculum, generating semester roadmaps, curating verified learning resources, and preparing assessment tests.
              </p>
            </div>
          </div>
        )}

        {/* Results Dashboard Section */}
        {analysisResult && !isLoading && (
          <section id="results-dashboard" className="space-y-8 animate-fade-in pt-4">
            {/* Gamification Bar at Top */}
            <GamificationBar profile={gamification} />

            {/* Dashboard Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200 bg-white shadow-sm print-card">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider print-text-muted">
                    Career Analysis Result
                  </span>
                  {isDemo ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 print-badge">
                      Sample Student Profile
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 print-badge">
                      Live AI Evaluated
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 print-text-dark">
                  {targetRole} <span className="text-gray-500 text-sm font-normal">({department} • Semester {semester})</span>
                </h2>
              </div>

              <div className="flex items-center gap-3 print-hide">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("analysis-form-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Edit Inputs
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Start Over</span>
                </button>
              </div>
            </div>

            {/* Printable Trigger Bar & Header */}
            <PrintableReport
              targetRole={targetRole}
              department={department}
              semester={semester}
              overallScore={analysisResult.overall_score}
              isDemo={isDemo}
            />

            {/* Navigation Tabs for Easy Deep Diving */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 print-hide">
              {[
                { id: "all", label: "All Insights", icon: LayoutGrid },
                { id: "readiness", label: "Readiness & Gaps", icon: Target },
                { id: "sprint", label: "30-Day Sprint", icon: Sparkles },
                { id: "roadmap", label: "Career Roadmap", icon: Calendar },
                { id: "lab", label: "Skill Lab Quiz", icon: FlaskConical },
                { id: "interview", label: "Mock Interview", icon: Mic },
                { id: "portfolio", label: "Portfolio Blueprints", icon: FolderGit2 },
                { id: "market", label: "Market Intelligence", icon: Globe2 },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as DashboardTab)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 shadow-2xs"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: READINESS & GAPS */}
            {(activeTab === "all" || activeTab === "readiness") && (
              <div className="space-y-8">
                {/* Career Readiness Score & Breakdown */}
                <ReadinessScore
                  overallScore={analysisResult.overall_score}
                  breakdown={analysisResult.score_breakdown}
                  explanation={analysisResult.score_explanation}
                  targetRole={targetRole}
                />

                {/* Evidence-Backed Strengths */}
                <StrengthsCard strengths={analysisResult.key_strengths} />

                {/* Prioritized Missing Skills + Verified Learning Resources */}
                <SkillGapCard
                  missingSkills={analysisResult.missing_skills}
                  targetRole={targetRole}
                />

                {/* Resume Formatting Tips */}
                <ResumeTips tips={analysisResult.resume_formatting_tips} />
              </div>
            )}

            {/* TAB CONTENT: 30-DAY SPRINT */}
            {(activeTab === "all" || activeTab === "sprint") && (
              <div className="space-y-8">
                {/* Next 30 Days Execution Plan with Checklist & XP */}
                <ThirtyDayPlan weeks={analysisResult.next_30_days} />
              </div>
            )}

            {/* TAB CONTENT: SEMESTER ROADMAP */}
            {(activeTab === "all" || activeTab === "roadmap") && (
              <div className="space-y-8">
                {/* Semester Roadmap Timeline */}
                <RoadmapTimeline roadmap={analysisResult.semester_roadmap} />
              </div>
            )}

            {/* TAB CONTENT: AI SKILL ASSESSMENT LAB */}
            {(activeTab === "all" || activeTab === "lab") && (
              <div className="space-y-8">
                {/* Interactive Quiz Component */}
                <SkillAssessmentLab
                  department={department}
                  missingSkills={missingSkillNames}
                />
              </div>
            )}

            {/* TAB CONTENT: AI MOCK INTERVIEW COACH */}
            {(activeTab === "all" || activeTab === "interview") && (
              <div className="space-y-8">
                {/* 1-by-1 Mock Interview Coach with Real-Time Feedback */}
                <MockInterviewCoach
                  targetRole={targetRole}
                  department={department}
                />
              </div>
            )}

            {/* TAB CONTENT: PORTFOLIO BLUEPRINTS */}
            {(activeTab === "all" || activeTab === "portfolio") && (
              <div className="space-y-8">
                {/* AI Portfolio Generator with Blueprints & Copyable README */}
                <PortfolioGenerator
                  department={department}
                  targetRole={targetRole}
                />
              </div>
            )}

            {/* TAB CONTENT: MARKET INTELLIGENCE */}
            {(activeTab === "all" || activeTab === "market") && (
              <div className="space-y-8">
                {/* Market Perspectives: Bangladesh vs Global */}
                <MarketInsights insights={analysisResult.market_insights} />
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6 print-hide">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Analyze Another Profile or Department</span>
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 mt-12 print-hide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-gray-800">SkillPath AI</span>
            <span>— University Career Intelligence Platform</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Powered by Qwen-2.5 on Hugging Face</span>
            <span>•</span>
            <span>Supports CSE, EEE, BBA, Pharmacy & Custom Faculties</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
