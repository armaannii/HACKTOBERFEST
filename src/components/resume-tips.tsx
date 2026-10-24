"use client";

import React from "react";
import { FileEdit, CheckCircle2 } from "lucide-react";

interface ResumeTipsProps {
  tips: string[];
}

export function ResumeTips({ tips }: ResumeTipsProps) {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm print-card">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 font-semibold shadow-xs">
          <FileEdit className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 print-text-dark">
            Resume & Presentation Optimization Tips
          </h3>
          <p className="text-xs text-gray-500 print-text-muted mt-0.5">
            High-impact structural and ATS recommendations tailored for domestic and global screening systems
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-4 rounded-xl border border-blue-100 bg-blue-50/40 hover:bg-blue-50/70 transition-colors shadow-2xs print-card"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium print-text-dark">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
