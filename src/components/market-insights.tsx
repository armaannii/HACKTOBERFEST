"use client";

import React from "react";
import { MarketInsight } from "@/types/career";
import { Globe, MapPin } from "lucide-react";

interface MarketInsightsProps {
  insights: MarketInsight[];
}

export function MarketInsights({ insights }: MarketInsightsProps) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm print-card">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 font-semibold shadow-xs">
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 print-text-dark">
            Market Perspectives: Bangladesh vs. Global
          </h3>
          <p className="text-xs text-gray-500 print-text-muted mt-0.5">
            Comparative expectations and hiring dynamics across domestic industry and international remote ecosystems
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((item, idx) => {
          const isBD = item.market === "Bangladesh";

          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${
                isBD
                  ? "border-emerald-200 bg-emerald-50/40"
                  : "border-blue-200 bg-blue-50/40"
              } shadow-xs print-card`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                {isBD ? (
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    <Globe className="w-4 h-4" />
                  </div>
                )}
                <h4 className="text-base font-bold text-gray-900 print-text-dark">
                  {item.market} Career Market
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 print-text-dark">
                {item.notes}
              </p>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-2 print-text-muted">
                  High-Demand Skill Attributes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.relevant_skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                        isBD
                          ? "bg-white text-emerald-800 border-emerald-200"
                          : "bg-white text-blue-800 border-blue-200"
                      } shadow-2xs print-badge print-text-dark`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
