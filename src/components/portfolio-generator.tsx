"use client";

import React, { useState } from "react";
import { RecommendedProject } from "@/types/career";
import { getDepartmentProjectBlueprints } from "@/lib/assessment-data";
import {
  FolderGit2,
  Copy,
  Check,
  CheckCircle2,
  Layers,
  Wrench,
  AlertCircle,
  FileCode,
  Sparkles,
} from "lucide-react";

interface PortfolioGeneratorProps {
  department: string;
  targetRole: string;
}

export function PortfolioGenerator({
  department,
  targetRole,
}: PortfolioGeneratorProps) {
  const blueprints: RecommendedProject[] = getDepartmentProjectBlueprints(department, targetRole);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  if (!blueprints || blueprints.length === 0) return null;

  const activeProject = blueprints[selectedIdx] || blueprints[0];

  const handleCopyReadme = () => {
    if (!activeProject.readme_template) return;
    navigator.clipboard.writeText(activeProject.readme_template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold shadow-xs">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 print-text-dark">
                AI Portfolio Project Generator
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {blueprints.length} Blueprints
              </span>
            </div>
            <p className="text-xs text-gray-500 print-text-muted mt-0.5">
              Recruiter-ready portfolio artifacts with 4-phase blueprints, testing checklists, and GitHub READMEs
            </p>
          </div>
        </div>

        {/* Project Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 border border-gray-200 print-hide">
          {blueprints.map((p, pIdx) => (
            <button
              key={pIdx}
              type="button"
              onClick={() => setSelectedIdx(pIdx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedIdx === pIdx
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Project {pIdx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Project Details */}
      <div className="p-6 rounded-2xl border border-gray-200 bg-[#F9FAFB] shadow-xs space-y-6">
        {/* Project Top Title & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getDifficultyBadge(
                  activeProject.difficulty
                )}`}
              >
                {activeProject.difficulty} Project
              </span>
              <span className="text-xs font-semibold text-gray-500">
                Target Role: {targetRole}
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900">
              {activeProject.title}
            </h4>
          </div>

          {activeProject.readme_template && (
            <button
              type="button"
              onClick={handleCopyReadme}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-white hover:bg-indigo-50 border border-indigo-200 transition-colors shadow-2xs shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>README Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy GitHub README</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Problem Statement Box */}
        {activeProject.problem_statement && (
          <div className="p-4 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900 block mb-1">
              Recruiter Problem Statement & Industry Motivation:
            </strong>
            {activeProject.problem_statement}
          </div>
        )}

        {/* Tools & Tech Stack */}
        {activeProject.tools && activeProject.tools.length > 0 && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5 mb-2">
              <Wrench className="w-3.5 h-3.5 text-indigo-600" />
              Recommended Tools & Technology Stack:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.tools.map((tool, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-indigo-900 border border-gray-200 shadow-2xs"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 4-Phase Step-by-Step Blueprint */}
        {activeProject.implementation_phases && activeProject.implementation_phases.length > 0 && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5 mb-3">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              4-Phase Implementation Blueprint:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeProject.implementation_phases.map((phase, pIdx) => (
                <div
                  key={pIdx}
                  className="p-3.5 rounded-xl bg-white border border-gray-200 text-xs leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px] inline-flex items-center justify-center mr-2">
                    {pIdx + 1}
                  </span>
                  <span className="text-gray-800">{phase}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testing & Validation Checklist */}
        {activeProject.testing_checklist && activeProject.testing_checklist.length > 0 && (
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5 mb-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Recruiter-Ready Testing & Validation Checklist:
            </span>
            <ul className="space-y-1.5 text-xs text-emerald-900">
              {activeProject.testing_checklist.map((chk, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">☑</span>
                  <span>{chk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Deliverables */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
            Target Portfolio Deliverables:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
            {activeProject.deliverables.map((del, dIdx) => (
              <div
                key={dIdx}
                className="p-2.5 rounded-lg bg-white border border-gray-200 flex items-start gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>{del}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
