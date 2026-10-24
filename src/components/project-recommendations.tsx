"use client";

import React from "react";
import { RecommendedProject } from "@/types/career";
import { FolderGit2, CheckCircle } from "lucide-react";

interface ProjectRecommendationsProps {
  projects: RecommendedProject[];
}

export function ProjectRecommendations({ projects }: ProjectRecommendationsProps) {
  if (!projects || projects.length === 0) return null;

  const getDifficultyBadge = (difficulty: RecommendedProject["difficulty"]) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Intermediate":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Advanced":
        return "bg-purple-50 text-purple-700 border-purple-200";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm print-card">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold shadow-xs">
          <FolderGit2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 print-text-dark">
            High-Impact Portfolio Projects
          </h3>
          <p className="text-xs text-gray-500 print-text-muted mt-0.5">
            End-to-end projects demonstrating your competencies to recruiters and hiring managers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border border-gray-200 bg-[#F9FAFB] hover:border-indigo-200 transition-all flex flex-col justify-between shadow-xs print-card"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getDifficultyBadge(
                    project.difficulty
                  )} print-badge`}
                >
                  {project.difficulty}
                </span>
                <span className="text-[11px] text-gray-400 font-mono">
                  Project #{idx + 1}
                </span>
              </div>

              <h4 className="text-base font-bold text-gray-900 mb-3 print-text-dark">
                {project.title}
              </h4>

              {/* Skills Demonstrated Chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.skills_demonstrated.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white text-indigo-900 border border-gray-200 shadow-2xs print-badge print-text-dark"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Expected Deliverables */}
            <div className="pt-4 border-t border-gray-200">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2 print-text-dark">
                Expected Portfolio Deliverables:
              </span>
              <ul className="space-y-1.5 text-xs text-gray-600 print-text-muted">
                {project.deliverables.map((item, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
