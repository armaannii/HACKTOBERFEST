"use client";

import React from "react";
import { Award, Code2, FolderGit2, Briefcase, Target, Info } from "lucide-react";

interface ReadinessScoreProps {
  overallScore: number;
  breakdown: {
    technical_skills: number;
    projects: number;
    experience: number;
    role_alignment: number;
  };
  explanation: string;
  targetRole: string;
}

export function ReadinessScore({
  overallScore,
  breakdown,
  explanation,
  targetRole,
}: ReadinessScoreProps) {
  const getTier = (score: number) => {
    if (score >= 85) {
      return {
        label: "Target Ready",
        color: "text-emerald-700",
        badgeBg: "bg-emerald-50 border-emerald-200 text-emerald-800",
        description: "Competitive for entry-level and internship screenings.",
      };
    }
    if (score >= 70) {
      return {
        label: "Strong Baseline",
        color: "text-indigo-700",
        badgeBg: "bg-indigo-50 border-indigo-200 text-indigo-800",
        description: "Solid foundational alignment; targeted skill bridging needed.",
      };
    }
    if (score >= 50) {
      return {
        label: "Developing Candidate",
        color: "text-amber-700",
        badgeBg: "bg-amber-50 border-amber-200 text-amber-800",
        description: "Active skill building and portfolio projects strongly advised.",
      };
    }
    return {
      label: "Foundational Stage",
      color: "text-rose-700",
      badgeBg: "bg-rose-50 border-rose-200 text-rose-800",
      description: "Early academic exploration; requires core technical coursework.",
    };
  };

  const tier = getTier(overallScore);

  // SVG circular gauge math
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const breakdownMetrics = [
    {
      label: "Technical Skills",
      score: breakdown.technical_skills,
      icon: Code2,
      desc: "Coursework & stack depth",
      color: "bg-indigo-600",
      bgPill: "bg-indigo-50 border-indigo-100",
      textColor: "text-indigo-600",
    },
    {
      label: "Portfolio & Projects",
      score: breakdown.projects,
      icon: FolderGit2,
      desc: "Demonstrated deliverables",
      color: "bg-emerald-600",
      bgPill: "bg-emerald-50 border-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      label: "Experience & Leadership",
      score: breakdown.experience,
      icon: Briefcase,
      desc: "Internships, clubs & tutoring",
      color: "bg-orange-500",
      bgPill: "bg-orange-50 border-orange-100",
      textColor: "text-orange-600",
    },
    {
      label: "Target Role Alignment",
      score: breakdown.role_alignment,
      icon: Target,
      desc: `Fit for ${targetRole}`,
      color: "bg-pink-600",
      bgPill: "bg-pink-50 border-pink-100",
      textColor: "text-pink-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs print-card">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Circular Progress Gauge */}
        <div className="relative flex flex-col items-center justify-center shrink-0">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background track circle */}
              <circle
                cx="88"
                cy="88"
                r={radius}
                className="stroke-gray-100 fill-none"
                strokeWidth="12"
              />
              {/* Animated Progress circle */}
              <circle
                cx="88"
                cy="88"
                r={radius}
                className="stroke-indigo-600 fill-none transition-all duration-1000 ease-out"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Centered Score Number */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 print-text-dark">
                {overallScore}
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                out of 100
              </span>
            </div>
          </div>

          <div className="mt-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${tier.badgeBg}`}
            >
              {tier.label}
            </span>
          </div>
        </div>

        {/* Score Context & Explanation */}
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Career Readiness Index: {targetRole}
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {tier.description}
            </p>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            {explanation}
          </p>

          <div className="flex items-start gap-2 p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600">
            <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> This readiness score evaluates alignment against industry junior competency benchmarks. It serves as an action-oriented development plan rather than a hiring guarantee.
            </span>
          </div>
        </div>
      </div>

      {/* 4 Score Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
        {breakdownMetrics.map((item) => (
          <div
            key={item.label}
            className={`p-4 rounded-xl border ${item.bgPill} flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700">
                  {item.label}
                </span>
                <item.icon className={`w-4 h-4 ${item.textColor}`} />
              </div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-2xl font-bold text-gray-900">
                  {item.score}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">/ 100</span>
              </div>
            </div>

            <div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-700`}
                  style={{ width: `${Math.min(100, Math.max(0, item.score))}%` }}
                />
              </div>
              <span className="text-[11px] text-gray-500 truncate block">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
