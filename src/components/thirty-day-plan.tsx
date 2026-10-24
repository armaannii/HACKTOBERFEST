"use client";

import React, { useState, useEffect } from "react";
import { ThirtyDayWeek } from "@/types/career";
import {
  Target,
  CheckCircle2,
  CheckSquare,
  Square,
  Sparkles,
  ExternalLink,
  BookOpen,
  Award,
} from "lucide-react";
import { recordTaskCompleted } from "@/lib/gamification";

interface ThirtyDayPlanProps {
  weeks: ThirtyDayWeek[];
}

const STORAGE_KEY = "skillpath_thirtyday_tasks";

export function ThirtyDayPlan({ weeks }: ThirtyDayPlanProps) {
  // Store user-checked task states locally for interactive satisfaction & persistence
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompletedTasks(JSON.parse(stored));
      }
    } catch {
      // fallback
    }
  }, []);

  if (!weeks || weeks.length === 0) return null;

  // Calculate overall task progress
  const allTaskKeys: string[] = [];
  weeks.forEach((w) => {
    w.tasks.forEach((_, tIdx) => {
      allTaskKeys.push(`w${w.week}-t${tIdx}`);
    });
  });

  const totalTasks = allTaskKeys.length;
  const finishedCount = allTaskKeys.filter((k) => completedTasks[k]).length;
  const progressPercent = totalTasks > 0 ? Math.round((finishedCount / totalTasks) * 100) : 0;

  const toggleTask = (key: string) => {
    const isNowDone = !completedTasks[key];
    const updated = {
      ...completedTasks,
      [key]: isNowDone,
    };
    setCompletedTasks(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (isNowDone) {
      recordTaskCompleted(key);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm print-card">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 font-semibold shadow-xs">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 print-text-dark">
                Interactive 30-Day Execution Sprint
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                +15 XP per task
              </span>
            </div>
            <p className="text-xs text-gray-500 print-text-muted mt-0.5">
              High-leverage weekly objectives, mini-projects, and verified study tasks to build immediate momentum
            </p>
          </div>
        </div>

        {/* Overall Sprint Progress Bar */}
        <div className="w-full sm:w-64 p-3 rounded-xl bg-gray-50 border border-gray-200 print-card">
          <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
            <span className="text-gray-700">Sprint Completion</span>
            <span className="text-indigo-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1">
            <span>{finishedCount} of {totalTasks} finished</span>
            {progressPercent === 100 && (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <Award className="w-3 h-3" /> Sprint Completed!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 4-Week Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {weeks.map((week) => {
          const weekTaskKeys = week.tasks.map((_, tIdx) => `w${week.week}-t${tIdx}`);
          const weekDoneCount = weekTaskKeys.filter((k) => completedTasks[k]).length;
          const weekPercent = weekTaskKeys.length > 0 ? Math.round((weekDoneCount / weekTaskKeys.length) * 100) : 0;

          return (
            <div
              key={week.week}
              className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-[#F9FAFB] hover:border-indigo-200 transition-all shadow-xs flex flex-col justify-between print-card"
            >
              <div>
                {/* Week Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100 print-badge">
                      Week {week.week}
                    </span>
                    {week.estimated_study_hours && (
                      <span className="text-[11px] text-gray-500 font-medium">
                        ~{week.estimated_study_hours} hrs study
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-semibold text-gray-500">
                    {weekDoneCount}/{week.tasks.length} done ({weekPercent}%)
                  </span>
                </div>

                {/* Week Goal */}
                <h4 className="text-base font-bold text-gray-900 mb-2 print-text-dark">
                  {week.goal}
                </h4>

                {/* Learning Objective if available */}
                {week.learning_objective && (
                  <p className="text-xs text-gray-600 mb-3 bg-white p-2.5 rounded-lg border border-gray-200/80">
                    <strong className="text-gray-800">Learning Objective:</strong> {week.learning_objective}
                  </p>
                )}

                {/* Tasks Checklist */}
                <div className="space-y-2 mb-4">
                  {week.tasks.map((task, tIdx) => {
                    const key = `w${week.week}-t${tIdx}`;
                    const isDone = mounted && Boolean(completedTasks[key]);

                    return (
                      <div
                        key={tIdx}
                        onClick={() => toggleTask(key)}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer text-xs select-none ${
                          isDone
                            ? "bg-emerald-50/60 border-emerald-200 text-gray-600"
                            : "bg-white border-gray-200/90 text-gray-800 hover:border-indigo-300 hover:bg-white"
                        }`}
                      >
                        <button
                          type="button"
                          aria-label={`Mark task ${tIdx + 1} as done`}
                          className="mt-0.5 text-gray-400 hover:text-indigo-600 transition-colors shrink-0 print-hide"
                        >
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <span
                          className={`leading-relaxed print-text-dark ${
                            isDone ? "line-through text-gray-400 font-normal" : "font-medium"
                          }`}
                        >
                          {task}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Recommended Week Resources if available */}
                {week.recommended_resources && week.recommended_resources.length > 0 && (
                  <div className="mb-4 p-3 rounded-xl bg-white border border-gray-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5 mb-2">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      Week Study Resource
                    </span>
                    <div className="space-y-1.5">
                      {week.recommended_resources.map((res, rIdx) => (
                        <a
                          key={rIdx}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                        >
                          <span>{res.title} ({res.provider})</span>
                          <ExternalLink className="w-3 h-3 text-indigo-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Completion Criteria / Mini Project */}
              <div className="pt-3 border-t border-gray-200/80 space-y-2 text-xs">
                {week.mini_project && (
                  <div className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-indigo-900 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-indigo-950">Mini-Project: </strong>
                      <span>{week.mini_project}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2 text-gray-600 print-text-muted">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-800 mr-1 print-text-dark">
                      Target Deliverable:
                    </span>
                    <span>{week.completion_criteria}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
