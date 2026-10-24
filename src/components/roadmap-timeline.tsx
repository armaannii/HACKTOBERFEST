"use client";

import React from "react";
import { SemesterPlan } from "@/types/career";
import {
  Calendar,
  CheckCircle2,
  BookOpen,
  FolderGit2,
  Flag,
  Sparkles,
} from "lucide-react";

interface RoadmapTimelineProps {
  roadmap: SemesterPlan[];
}

export function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  if (!roadmap || roadmap.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm print-card">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold shadow-xs">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 print-text-dark">
            Semester-by-Semester Career Roadmap
          </h3>
          <p className="text-xs text-gray-500 print-text-muted mt-0.5">
            Sequential milestones engineered from your current semester through graduation to achieve competitive parity
          </p>
        </div>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-indigo-600 before:via-blue-300 before:to-gray-200">
        {roadmap.map((plan, idx) => {
          const isFirst = idx === 0;

          return (
            <div key={idx} className="relative group print-break-inside-avoid">
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1.5 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  isFirst
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-md ring-4 ring-indigo-50"
                    : "border-indigo-300 bg-white text-indigo-700 font-bold group-hover:border-indigo-600"
                }`}
              >
                {isFirst ? (
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                ) : (
                  <span className="text-[11px] font-bold">{idx + 1}</span>
                )}
              </div>

              {/* Main Card */}
              <div className="p-6 rounded-2xl border border-gray-200 bg-[#F9FAFB] hover:border-indigo-200 transition-all space-y-5 shadow-xs print-card">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 print-text-muted">
                        {plan.semester}
                      </span>
                      {isFirst && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 border border-indigo-200 text-indigo-700 print-badge">
                          Immediate Academic Focus
                        </span>
                      )}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mt-1 print-text-dark">
                      {plan.focus_area}
                    </h4>
                  </div>
                </div>

                {/* Actionable Tasks */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-2 print-text-dark">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Actionable Tasks & Learning Milestones</span>
                  </h5>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {plan.actionable_tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5 print-text-dark">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Portfolio Project */}
                {plan.portfolio_project && (
                  <div className="p-4 rounded-xl border border-indigo-100 bg-white text-xs sm:text-sm text-indigo-950 flex items-start gap-3 shadow-2xs print-card">
                    <FolderGit2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900 print-text-dark">
                        Target Portfolio Artifact:{" "}
                      </span>
                      <span className="text-indigo-900 font-medium print-text-dark">
                        {plan.portfolio_project}
                      </span>
                    </div>
                  </div>
                )}

                {/* Grid: Recommended Courses & Observable Milestones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Courses */}
                  {plan.recommended_courses_or_certifications &&
                    plan.recommended_courses_or_certifications.length > 0 && (
                      <div className="p-4 rounded-xl border border-gray-200 bg-white print-card">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5 mb-2 print-text-dark">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                          Recommended Curricula / Certifications
                        </span>
                        <ul className="space-y-1.5 text-xs text-gray-600 print-text-muted">
                          {plan.recommended_courses_or_certifications.map((course, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-1.5">
                              <span className="text-blue-600 font-bold">•</span>
                              <span>{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Milestones */}
                  {plan.milestones && plan.milestones.length > 0 && (
                    <div className="p-4 rounded-xl border border-gray-200 bg-white print-card">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5 mb-2 print-text-dark">
                        <Flag className="w-3.5 h-3.5 text-amber-600" />
                        Observable Completion Criteria
                      </span>
                      <ul className="space-y-1.5 text-xs text-gray-600 print-text-muted">
                        {plan.milestones.map((m, mIdx) => (
                          <li key={mIdx} className="flex items-start gap-1.5">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
