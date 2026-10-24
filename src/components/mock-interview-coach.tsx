"use client";

import React, { useState } from "react";
import { InterviewQuestion, InterviewFeedback } from "@/types/career";
import {
  getInterviewQuestionsForRole,
  evaluateMockAnswer,
} from "@/lib/assessment-data";
import { recordInterviewCompleted } from "@/lib/gamification";
import {
  Mic,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  MessageSquare,
  Award,
} from "lucide-react";

interface MockInterviewCoachProps {
  targetRole: string;
  department: string;
}

export function MockInterviewCoach({
  targetRole,
  department,
}: MockInterviewCoachProps) {
  const [category, setCategory] = useState<"Technical" | "Behavioral" | "Role-specific">("Technical");
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const questions: InterviewQuestion[] = getInterviewQuestionsForRole(targetRole, category);
  const currentQ = questions[questionIndex] || questions[0];

  const handleCategoryChange = (newCat: "Technical" | "Behavioral" | "Role-specific") => {
    setCategory(newCat);
    setQuestionIndex(0);
    setUserAnswer("");
    setFeedback(null);
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setUserAnswer("");
      setFeedback(null);
    }
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim() || !currentQ) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const evaluation = evaluateMockAnswer(currentQ, userAnswer);
      setFeedback(evaluation);
      setIsSubmitting(false);
      recordInterviewCompleted();
    }, 400);
  };

  const wordCount = userAnswer.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm print-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold shadow-xs">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 print-text-dark">
                AI Mock Interview Coach
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                +35 XP per question
              </span>
            </div>
            <p className="text-xs text-gray-500 print-text-muted mt-0.5">
              Simulate high-stakes screening questions for <strong className="text-gray-700">{targetRole}</strong> with instant rubric feedback
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 border border-gray-200 print-hide">
          {(["Technical", "Behavioral", "Role-specific"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                category === cat
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Question Display & Answer Area */}
      {currentQ && (
        <div className="space-y-6">
          {/* Question Box */}
          <div className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-[#F9FAFB] shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {currentQ.type} Question
                </span>
                <span className="text-xs text-gray-500">
                  Question {questionIndex + 1} of {questions.length}
                </span>
              </div>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              &quot;{currentQ.question}&quot;
            </h4>

            {currentQ.context && (
              <p className="text-xs text-gray-600 bg-white p-2.5 rounded-lg border border-gray-200/80">
                <strong className="text-gray-800">Recruiter Context:</strong> {currentQ.context}
              </p>
            )}
          </div>

          {/* Answer Input Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
              <label htmlFor="interview-answer-input" className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Your Spoken or Written Answer:</span>
              </label>
              <span className={`text-[11px] ${wordCount < 15 ? "text-amber-600" : "text-emerald-600"}`}>
                {wordCount} words {wordCount < 15 && "(Recommend 30+ words for full evaluation)"}
              </span>
            </div>

            <textarea
              id="interview-answer-input"
              rows={5}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="State your answer clearly. For behavioral questions, structure with Situation, Task, Action, and Result (STAR)..."
              className="w-full rounded-xl border border-gray-300 p-4 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-y"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <span className="text-[11px] text-gray-500">
                💡 Tip: Use concrete numbers, real framework names, and lessons learned.
              </span>

              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim() || isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Evaluating...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Evaluate My Answer</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Feedback Card (Visible after evaluation) */}
          {feedback && (
            <div className="p-6 rounded-2xl border border-indigo-100 bg-[#EEF2FF]/40 shadow-xs space-y-5 animate-fade-in">
              {/* Score Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-lg text-white shadow-sm ${
                      feedback.score >= 80
                        ? "bg-emerald-600"
                        : feedback.score >= 60
                        ? "bg-indigo-600"
                        : "bg-amber-600"
                    }`}
                  >
                    {feedback.score}
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-gray-900">
                      Answer Score: {feedback.score}/100
                    </h5>
                    <p className="text-xs text-gray-600">
                      {feedback.score >= 80
                        ? "Strong competitive response — high recruiter readiness."
                        : feedback.score >= 60
                        ? "Good solid foundation — incorporate more metrics."
                        : "Needs more structural depth and concrete technical detail."}
                    </p>
                  </div>
                </div>

                {questionIndex < questions.length - 1 && (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Strengths & Weaknesses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="p-4 rounded-xl bg-white border border-gray-200">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Key Strengths Identified</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {feedback.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="p-4 rounded-xl bg-white border border-gray-200">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Growth Opportunities</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {feedback.weaknesses.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recruiter's Ideal Model Answer */}
              {feedback.improvedAnswer && (
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-indigo-100 text-xs sm:text-sm leading-relaxed space-y-2">
                  <div className="flex items-center gap-2 font-bold text-indigo-900">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Recruiter&apos;s Ideal Model Answer:</span>
                  </div>
                  <p className="text-gray-700 italic bg-indigo-50/50 p-3 rounded-lg border border-indigo-100/60">
                    &quot;{feedback.improvedAnswer}&quot;
                  </p>
                </div>
              )}

              {/* Key Concepts Evaluated */}
              {feedback.keyConcepts && feedback.keyConcepts.length > 0 && (
                <div className="p-3.5 rounded-xl bg-white border border-gray-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                    Key Evaluation Checkpoints:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {feedback.keyConcepts.map((kc, kIdx) => (
                      <span
                        key={kIdx}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                      >
                        ✓ {kc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Follow-Up Interview Question */}
              {feedback.followUpQuestion && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-900">Interviewer Follow-up Question:</strong>
                    <p className="text-amber-800 mt-0.5 italic">
                      &quot;{feedback.followUpQuestion}&quot;
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
