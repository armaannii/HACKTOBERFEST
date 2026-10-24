"use client";

import React from "react";
import { Printer } from "lucide-react";

interface PrintableReportProps {
  targetRole: string;
  department: string;
  semester: number;
  overallScore: number;
  isDemo?: boolean;
}

export function PrintableReport({
  targetRole,
  department,
  semester,
  overallScore,
  isDemo,
}: PrintableReportProps) {
  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Interactive Print Bar (Hidden during print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200 bg-white print-hide shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-semibold shadow-xs">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">
              Print / Save Verified Career Report
            </h4>
            <p className="text-xs text-gray-500">
              Export an ink-friendly, executive PDF roadmap for academic advisors and career mentors
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all cursor-pointer shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Print-Only Formal Header (Only visible when printing) */}
      <div className="hidden print-only mb-6 border-b border-gray-300 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              SkillPath AI — Career Readiness & Roadmap Report
            </h1>
            <p className="text-xs text-gray-600 mt-1">
              Know your gaps. Build your skills. Own your future.
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-indigo-600">
              {overallScore}/100
            </span>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              Readiness Score
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4 text-xs text-gray-700">
          <div>
            <strong>Department:</strong> {department}
          </div>
          <div>
            <strong>Current Stage:</strong> Semester {semester} of 8
          </div>
          <div>
            <strong>Target Ambition:</strong> {targetRole}
          </div>
          <div>
            <strong>Date Generated:</strong> {today}
          </div>
        </div>

        {isDemo && (
          <p className="text-[10px] text-gray-500 italic mt-2">
            * Sample demonstration assessment profile.
          </p>
        )}
      </div>
    </>
  );
}
