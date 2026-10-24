"use client";

import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";

interface StrengthsCardProps {
  strengths: string[];
}

export function StrengthsCard({ strengths }: StrengthsCardProps) {
  if (!strengths || strengths.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm print-card">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 font-semibold shadow-xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 print-text-dark">
            Demonstrated Candidate Strengths
          </h3>
          <p className="text-xs text-gray-500 print-text-muted mt-0.5">
            Evidence-backed proficiencies and achievements extracted directly from your qualifications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {strengths.map((strength, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-xl border border-emerald-100 bg-emerald-50/40 hover:bg-emerald-50/70 transition-colors shadow-2xs print-card"
          >
            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium print-text-dark">
              {strength}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
