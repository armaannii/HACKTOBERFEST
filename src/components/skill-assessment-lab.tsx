"use client";

import React, { useState } from "react";
import { QuizQuestion } from "@/types/career";
import { getQuizForDepartment } from "@/lib/assessment-data";
import { recordQuizCompleted } from "@/lib/gamification";
import {
  FlaskConical,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ExternalLink,
  BookOpen,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface SkillAssessmentLabProps {
  department: string;
  missingSkills?: string[];
}

export function SkillAssessmentLab({
  department,
  missingSkills = [],
}: SkillAssessmentLabProps) {
  const questions: QuizQuestion[] = getQuizForDepartment(department, missingSkills);

  // States
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[activeQuestionIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (submittedQuestions[questionId]) return; // already evaluated
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleSubmitQuestion = (questionId: string) => {
    if (selectedAnswers[questionId] === undefined) return;
    setSubmittedQuestions((prev) => ({
      ...prev,
      [questionId]: true,
    }));

    // Check if this was the last question to mark quiz completed
    const updatedSubmitted = { ...submittedQuestions, [questionId]: true };
    const allDone = questions.every((q) => updatedSubmitted[q.id]);
    if (allDone) {
      setQuizCompleted(true);
      recordQuizCompleted();
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuestions({});
    setActiveQuestionIndex(0);
    setQuizCompleted(false);
  };

  // Score calculations
  const answeredCount = Object.keys(submittedQuestions).length;
  const correctCount = questions.filter(
    (q) => submittedQuestions[q.id] && selectedAnswers[q.id] === q.correctAnswerIndex
  ).length;
  const scorePercent = answeredCount > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm print-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 font-semibold shadow-xs">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 print-text-dark">
                AI Skill Assessment Lab: {department}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                Interactive Quiz
              </span>
            </div>
            <p className="text-xs text-gray-500 print-text-muted mt-0.5">
              Scenario-based questions to validate practical competency before technical recruiter screening
            </p>
          </div>
        </div>

        {/* Score Pill / Reset */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <span>Score:</span>
            <span className="text-purple-600 font-bold">
              {correctCount}/{totalQuestions} ({scorePercent}%)
            </span>
          </div>

          <button
            type="button"
            onClick={handleResetQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Question Selector Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {questions.map((q, idx) => {
          const isSubmitted = submittedQuestions[q.id];
          const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctAnswerIndex;
          const isCurrent = idx === activeQuestionIndex;

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setActiveQuestionIndex(idx)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                isCurrent
                  ? "bg-indigo-600 text-white shadow-xs"
                  : isSubmitted
                  ? isCorrect
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>Q{idx + 1}</span>
              {isSubmitted && (
                <span>{isCorrect ? "✓" : "✗"}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Question Card */}
      <div className="p-6 rounded-2xl border border-gray-200 bg-[#F9FAFB] shadow-xs space-y-6">
        <div>
          {/* Skill Tag & Number */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
              {currentQ.skill}
            </span>
            <span className="text-xs font-semibold text-gray-500">
              Question {activeQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>

          {/* Scenario Context if present */}
          {currentQ.scenario && (
            <div className="p-3.5 mb-3 rounded-xl bg-white border border-gray-200/90 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <strong className="text-gray-900 block mb-1">Scenario:</strong>
              {currentQ.scenario}
            </div>
          )}

          {/* Question Prompt */}
          <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
            {currentQ.question}
          </h4>
        </div>

        {/* Options List */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentQ.id] === optIdx;
            const isSubmitted = submittedQuestions[currentQ.id];
            const isCorrectOption = currentQ.correctAnswerIndex === optIdx;

            let optionStyle = "border-gray-200 bg-white hover:border-indigo-300 text-gray-800";

            if (isSubmitted) {
              if (isCorrectOption) {
                optionStyle = "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold";
              } else if (isSelected && !isCorrectOption) {
                optionStyle = "border-rose-400 bg-rose-50 text-rose-950 line-through";
              } else {
                optionStyle = "border-gray-200 bg-gray-50 text-gray-400 opacity-60";
              }
            } else if (isSelected) {
              optionStyle = "border-indigo-600 bg-indigo-50/60 text-indigo-950 font-semibold shadow-xs ring-1 ring-indigo-600";
            }

            return (
              <label
                key={optIdx}
                onClick={() => handleSelectOption(currentQ.id, optIdx)}
                className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${optionStyle}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQ.id}`}
                  checked={isSelected}
                  disabled={isSubmitted}
                  onChange={() => handleSelectOption(currentQ.id, optIdx)}
                  className="mt-1 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="flex-1 leading-relaxed">{opt}</span>
                {isSubmitted && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isSubmitted && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </label>
            );
          })}
        </div>

        {/* Action Button: Submit or Next */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          {!submittedQuestions[currentQ.id] ? (
            <button
              type="button"
              onClick={() => handleSubmitQuestion(currentQ.id)}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
            >
              Submit Answer
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {activeQuestionIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xs cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Award className="w-4 h-4" /> All questions completed!
                </span>
              )}
            </div>
          )}
        </div>

        {/* Feedback / Explanation Box (Visible only after submission) */}
        {submittedQuestions[currentQ.id] && (
          <div
            className={`p-4 sm:p-5 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-3 ${
              selectedAnswers[currentQ.id] === currentQ.correctAnswerIndex
                ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                : "bg-rose-50 border-rose-200 text-rose-950"
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {selectedAnswers[currentQ.id] === currentQ.correctAnswerIndex ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Correct! Outstanding technical accuracy.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>Incorrect. Review the technical explanation below.</span>
                </>
              )}
            </div>

            <p className="text-gray-800 bg-white p-3.5 rounded-lg border border-gray-200/80">
              <strong className="block text-gray-900 mb-1">Explanation:</strong>
              {currentQ.explanation}
            </p>

            {/* Recommended Learning Resource for weak topic */}
            {currentQ.recommendedResource && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-white border border-indigo-100 text-xs">
                <div className="flex items-center gap-2 text-indigo-900">
                  <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    <strong>Recommended Study Link:</strong> {currentQ.recommendedResource.title}
                  </span>
                </div>
                <a
                  href={currentQ.recommendedResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 hover:underline shrink-0"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quiz Completion Celebration Banner */}
      {quizCompleted && (
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900">
                Assessment Complete! Earned +50 XP
              </h4>
              <p className="text-xs text-gray-600">
                You answered {correctCount} of {totalQuestions} correctly ({scorePercent}%). Your competency report is saved.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetQuiz}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-indigo-700 bg-white hover:bg-gray-50 border border-indigo-200 transition-colors shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
        </div>
      )}
    </div>
  );
}
