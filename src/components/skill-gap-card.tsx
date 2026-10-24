"use client";

import React, { useState } from "react";
import { MissingSkill, LearningResource } from "@/types/career";
import {
  AlertTriangle,
  Clock,
  Globe2,
  MapPin,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Code,
  DollarSign,
  CheckCircle,
  Sparkles,
} from "lucide-react";

interface SkillGapCardProps {
  missingSkills: MissingSkill[];
  targetRole: string;
}

export function SkillGapCard({ missingSkills, targetRole }: SkillGapCardProps) {
  const [filter, setFilter] = useState<"All" | "High" | "Bangladesh" | "Global">("All");
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  if (!missingSkills || missingSkills.length === 0) return null;

  const filteredSkills = missingSkills.filter((item) => {
    if (filter === "High") return item.importance === "High";
    if (filter === "Bangladesh") return item.job_market === "Bangladesh";
    if (filter === "Global") return item.job_market === "Global";
    return true;
  });

  const getImportanceBadge = (importance: MissingSkill["importance"]) => {
    switch (importance) {
      case "High":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Low":
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getCostBadge = (cost: LearningResource["cost"]) => {
    switch (cost) {
      case "Free":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Freemium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Paid":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const getTypeBadge = (type: LearningResource["type"]) => {
    switch (type) {
      case "Course":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Documentation":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "Practice":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Certification":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Video":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const toggleExpand = (skillName: string) => {
    setExpandedSkill((prev) => (prev === skillName ? null : skillName));
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm print-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 font-semibold shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 print-text-dark">
                Prioritized Skill Gaps & Learning Resources
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {missingSkills.length} Identified
              </span>
            </div>
            <p className="text-xs text-gray-500 print-text-muted mt-0.5">
              Verified curricula, documentation, and exercises tailored for <strong className="text-gray-700">{targetRole}</strong> parity
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 border border-gray-200 print-hide">
          {(["All", "High", "Bangladesh", "Global"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === tab
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab === "High" ? "High Priority" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Gaps List */}
      <div className="space-y-5">
        {filteredSkills.map((gap, idx) => {
          const isExpanded = expandedSkill === gap.skill || filteredSkills.length <= 2;
          const resources = gap.learning_resources || [];

          return (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-[#F9FAFB] hover:border-indigo-200 transition-all shadow-xs print-card"
            >
              {/* Skill Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-base font-bold text-gray-900 print-text-dark">
                    {gap.skill}
                  </span>

                  {/* Priority Badge */}
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${getImportanceBadge(
                      gap.importance
                    )} print-badge`}
                  >
                    {gap.importance} Priority
                  </span>

                  {/* Market Focus Badge */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-semibold rounded-md border ${
                      gap.job_market === "Bangladesh"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    } print-badge`}
                  >
                    {gap.job_market === "Bangladesh" ? (
                      <MapPin className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Globe2 className="w-3 h-3 text-blue-600" />
                    )}
                    <span>{gap.job_market} Focus</span>
                  </span>
                </div>

                {/* Estimated Time Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-600 shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>Est. {gap.estimated_learning_hours} hrs of practice</span>
                </div>
              </div>

              {/* Rationale & Action Plan */}
              <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed mb-4">
                <div className="p-3.5 rounded-xl bg-white border border-gray-200/80">
                  <span className="font-semibold text-gray-900 mr-1.5">Why it matters:</span>
                  <span className="text-gray-700">{gap.reason}</span>
                </div>

                <div className="flex items-start gap-2 p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-indigo-900">
                  <ArrowRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-indigo-950 mr-1.5">Recommended Action:</span>
                    <span className="text-indigo-800">{gap.recommended_action}</span>
                  </div>
                </div>
              </div>

              {/* Verified Learning Resources Section */}
              {resources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                        Verified Curricula & Practical Exercises ({resources.length})
                      </span>
                    </div>

                    {filteredSkills.length > 2 && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(gap.skill)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer print-hide"
                      >
                        {isExpanded ? "Hide Resources ▲" : "View Resources ▼"}
                      </button>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="space-y-3.5">
                      {resources.map((res, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-4 rounded-xl bg-white border border-gray-200 hover:border-indigo-300 transition-all shadow-2xs"
                        >
                          {/* Resource Title & Direct Link */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-bold text-indigo-700 hover:text-indigo-900 hover:underline flex items-center gap-1.5 group"
                            >
                              <span>{res.title}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-indigo-400 group-hover:text-indigo-600 shrink-0" />
                            </a>

                            {/* Resource Metadata Pills */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-700 rounded-md border border-gray-200">
                                {res.provider}
                              </span>
                              <span
                                className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${getTypeBadge(
                                  res.type
                                )}`}
                              >
                                {res.type}
                              </span>
                              <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-50 text-slate-600 rounded-md border border-slate-200">
                                {res.difficulty}
                              </span>
                              <span
                                className={`inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold rounded-md border ${getCostBadge(
                                  res.cost
                                )}`}
                              >
                                <DollarSign className="w-2.5 h-2.5" />
                                {res.cost}
                              </span>
                              <span className="px-2 py-0.5 text-[10px] font-medium text-gray-500">
                                ⏱ {res.duration}
                              </span>
                            </div>
                          </div>

                          {/* Why Recommended */}
                          <p className="text-xs text-gray-600 mb-2.5">
                            <strong className="text-gray-800">Why this resource:</strong> {res.why_recommended}
                          </p>

                          {/* Hands-on Practical Exercise */}
                          {res.practical_exercise && (
                            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950 flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-emerald-900 mr-1">
                                  Practical Hands-on Challenge:
                                </span>
                                <span className="text-emerald-800">{res.practical_exercise}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredSkills.length === 0 && (
          <div className="p-8 text-center text-xs text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
            No skill gaps match the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
