"use client";

import React, { useState, useRef } from "react";
import {
  CareerLevel,
  MarketPreference,
  LearningStyle,
  PREDEFINED_ROLES,
} from "@/types/career";
import { DEMO_PROFILES } from "@/lib/demo-data";
import {
  UploadCloud,
  FileText,
  Trash2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Building2,
} from "lucide-react";

interface AnalysisFormProps {
  onSubmit: (formData: FormData | object, isMultipart: boolean) => Promise<void>;
  isLoading: boolean;
  onLoadDemoProfile: (department: string) => void;
  serverError: string | null;
}

const POPULAR_CUSTOM_DEPTS = [
  "Mechanical Engineering",
  "Civil Engineering",
  "Economics",
  "Data Science",
  "Biotechnology",
  "English",
  "Architecture",
];

export function AnalysisForm({
  onSubmit,
  isLoading,
  onLoadDemoProfile,
  serverError,
}: AnalysisFormProps) {
  // Academic Profile
  const [selectedDeptKey, setSelectedDeptKey] = useState<string>("CSE");
  const [isCustomDept, setIsCustomDept] = useState<boolean>(false);
  const [customDeptText, setCustomDeptText] = useState<string>("");

  const [semester, setSemester] = useState<number>(5);
  const [graduationYear, setGraduationYear] = useState<string>("2026");
  const [careerLevel, setCareerLevel] = useState<CareerLevel>("Entry-level");

  // Career Goal
  const [selectedRole, setSelectedRole] = useState<string>(PREDEFINED_ROLES.CSE[2]); // Full-Stack Developer
  const [isCustomRole, setIsCustomRole] = useState<boolean>(false);
  const [customRoleText, setCustomRoleText] = useState<string>("");

  // Resume Input Mode
  const [inputMode, setInputMode] = useState<"upload" | "paste">("paste");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Preferences
  const [market, setMarket] = useState<MarketPreference>("Both");
  const [weeklyHours, setWeeklyHours] = useState<number>(15);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>("Projects");
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  // Local validation error
  const [validationError, setValidationError] = useState<string | null>(null);

  // When standard department changes, update default role
  const handleDepartmentChange = (dept: string) => {
    setSelectedDeptKey(dept);
    setIsCustomDept(false);
    setCustomDeptText("");
    const roles = PREDEFINED_ROLES[dept] || PREDEFINED_ROLES.Other;
    setSelectedRole(roles[0]);
    setIsCustomRole(false);
    setCustomRoleText("");
  };

  const handleSelectCustomDeptMode = () => {
    setSelectedDeptKey("Other");
    setIsCustomDept(true);
    const roles = PREDEFINED_ROLES.Other;
    setSelectedRole(roles[0]);
    setIsCustomRole(false);
  };

  // Handle PDF file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setValidationError("Please select a valid PDF file (.pdf)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setValidationError("File is larger than 5MB. Please upload a smaller PDF.");
      return;
    }

    setPdfFile(file);
    setValidationError(null);
  };

  const removeFile = () => {
    setPdfFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Quick fill with sample student resume
  const handleLoadSampleText = () => {
    const key = isCustomDept ? "Other" : selectedDeptKey;
    const sample = DEMO_PROFILES[key] || DEMO_PROFILES.CSE;
    if (sample) {
      setResumeText(sample.resumeText);
      setSemester(sample.semester);
      setGraduationYear(sample.graduationYear);
      setSelectedRole(sample.targetRole);
      setIsCustomRole(false);
      setWeeklyHours(sample.weeklyHours);
      setValidationError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const finalDepartment = isCustomDept
      ? customDeptText.trim()
      : selectedDeptKey;

    if (!finalDepartment) {
      setValidationError("Please select or specify your academic department.");
      return;
    }

    const finalTargetRole = isCustomRole ? customRoleText.trim() : selectedRole;
    if (!finalTargetRole) {
      setValidationError("Please specify a target role.");
      return;
    }

    if (inputMode === "upload") {
      if (!pdfFile) {
        setValidationError("Please select a PDF resume file to upload.");
        return;
      }

      const fd = new FormData();
      fd.append("department", finalDepartment);
      fd.append("semester", String(semester));
      if (graduationYear) fd.append("graduationYear", graduationYear);
      fd.append("careerLevel", careerLevel);
      fd.append("targetRole", finalTargetRole);
      fd.append("market", market);
      fd.append("weeklyHours", String(weeklyHours));
      fd.append("learningStyle", learningStyle);
      fd.append("resumeFile", pdfFile);
      if (isDemoMode) fd.append("isDemo", "true");

      await onSubmit(fd, true);
    } else {
      if (!resumeText.trim() || resumeText.trim().length < 50) {
        setValidationError(
          "Please paste at least 50 characters of your resume or academic background."
        );
        return;
      }

      const payload = {
        department: finalDepartment,
        semester,
        graduationYear: graduationYear || undefined,
        careerLevel,
        targetRole: finalTargetRole,
        market,
        weeklyHours,
        learningStyle,
        resumeText: resumeText.trim(),
        isDemo: isDemoMode,
      };

      await onSubmit(payload, false);
    }
  };

  const activeRoles = isCustomDept
    ? PREDEFINED_ROLES.Other
    : PREDEFINED_ROLES[selectedDeptKey] || PREDEFINED_ROLES.Other;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 1: Academic Profile */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-sm">
            1
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Academic Profile</h2>
            <p className="text-xs text-gray-500">Select your university faculty or specify a custom department</p>
          </div>
        </div>

        {/* Department Selection */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-700 mb-2.5">
            Department / Faculty <span className="text-indigo-600">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { id: "CSE", name: "CSE", sub: "Computer Science", activeBg: "bg-indigo-50 border-indigo-500 text-indigo-900" },
              { id: "EEE", name: "EEE", sub: "Electrical & Electronic", activeBg: "bg-orange-50 border-orange-500 text-orange-950" },
              { id: "BBA", name: "BBA", sub: "Business & Finance", activeBg: "bg-emerald-50 border-emerald-500 text-emerald-950" },
              { id: "Pharmacy", name: "Pharmacy", sub: "Pharmaceutical Sci", activeBg: "bg-pink-50 border-pink-500 text-pink-950" },
              { id: "Other", name: "+ Custom", sub: "Other Faculties", activeBg: "bg-indigo-50 border-indigo-500 text-indigo-900" },
            ].map((dept) => {
              const active = dept.id === "Other" ? isCustomDept : (!isCustomDept && selectedDeptKey === dept.id);
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => {
                    if (dept.id === "Other") {
                      handleSelectCustomDeptMode();
                    } else {
                      handleDepartmentChange(dept.id);
                    }
                  }}
                  className={`flex flex-col items-center justify-center py-3.5 px-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? `${dept.activeBg} ring-2 ring-indigo-500/20 shadow-xs`
                      : "border-gray-200 bg-gray-50/60 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-base font-bold tracking-tight">{dept.name}</span>
                  <span className="text-[11px] font-normal text-gray-500 mt-0.5 truncate w-full text-center">
                    {dept.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom Department Input Section */}
          {isCustomDept && (
            <div className="mt-4 p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-3 animate-fade-in">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <label className="text-xs font-semibold text-gray-800">
                  Specify Your Academic Department / Faculty <span className="text-rose-500">*</span>
                </label>
              </div>
              <input
                type="text"
                value={customDeptText}
                onChange={(e) => setCustomDeptText(e.target.value)}
                placeholder="e.g. Mechanical Engineering, Civil Engineering, Economics, Biotechnology, Law"
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-gray-500 mr-1 font-medium">Quick Select:</span>
                {POPULAR_CUSTOM_DEPTS.map((popDept) => (
                  <button
                    key={popDept}
                    type="button"
                    onClick={() => setCustomDeptText(popDept)}
                    className="px-2.5 py-0.5 rounded-md text-[11px] bg-white hover:bg-indigo-50 text-gray-700 hover:text-indigo-800 border border-gray-200 transition-colors cursor-pointer"
                  >
                    {popDept}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Semester & Graduation Year & Career Level */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Current Semester (1-8) <span className="text-indigo-600">*</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSemester(s)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    semester === s
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }`}
                >
                  S{s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Target Career Level
            </label>
            <select
              value={careerLevel}
              onChange={(e) => setCareerLevel(e.target.value as CareerLevel)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            >
              <option value="Internship">Internship (Undergraduate)</option>
              <option value="Entry-level">Entry-Level / Graduate Trainee</option>
              <option value="Career exploration">Career Exploration / Transition</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Graduation Year <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              placeholder="e.g. 2026"
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Step 2: Target Career Goal */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-sm">
            2
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Target Career Goal</h2>
            <p className="text-xs text-gray-500">Choose a recommended role or enter a custom ambition</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {activeRoles.map((role) => {
              const active = !isCustomRole && selectedRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setSelectedRole(role);
                    setIsCustomRole(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                    active
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs ring-1 ring-indigo-500/30"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {role}
                </button>
              );
            })}

            {/* Custom Role Option */}
            <button
              type="button"
              onClick={() => setIsCustomRole(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                isCustomRole
                  ? "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs ring-1 ring-indigo-500/30"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              + Other / Custom Role
            </button>
          </div>

          {isCustomRole && (
            <div className="pt-2 animate-fade-in">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Custom Target Role
              </label>
              <input
                type="text"
                value={customRoleText}
                onChange={(e) => setCustomRoleText(e.target.value)}
                placeholder="e.g. Mechanical Design Engineer, Environmental Consultant, Quantitative Analyst"
                className="w-full rounded-xl border border-indigo-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          )}
        </div>
      </div>

      {/* Step 3: Resume Input */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-sm">
              3
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Candidate Resume</h2>
              <p className="text-xs text-gray-500">Upload a PDF or paste your resume text for analysis</p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-gray-100 border border-gray-200">
            <button
              type="button"
              onClick={() => setInputMode("upload")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                inputMode === "upload"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload PDF</span>
            </button>
            <button
              type="button"
              onClick={() => setInputMode("paste")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                inputMode === "paste"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Paste Text</span>
            </button>
          </div>
        </div>

        {inputMode === "upload" ? (
          <div>
            {!pdfFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-gray-300 hover:border-indigo-500 rounded-2xl bg-gray-50/50 hover:bg-indigo-50/30 transition-all cursor-pointer text-center"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-105 transition-transform shadow-xs">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  Click to browse or drag & drop your resume PDF
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supported format: PDF up to 5MB
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{pdfFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(pdfFile.size / 1024).toFixed(1)} KB • PDF Document
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-2 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer"
                  title="Remove selected file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Paste your resume, skills, coursework, and projects:
              </span>
              <button
                type="button"
                onClick={handleLoadSampleText}
                className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Fill with {isCustomDept ? "Sample" : selectedDeptKey} Resume</span>
              </button>
            </div>
            <textarea
              rows={8}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content, technical skills, coursework, and project highlights here..."
              className="w-full rounded-xl border border-gray-300 bg-white p-3.5 text-xs text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 font-mono"
            />
            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <span>Minimum 50 characters</span>
              <span>{resumeText.length} characters</span>
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Resumes are processed securely in-memory solely for this analysis and are not retained or shared.
          </span>
        </div>
      </div>

      {/* Step 4: Preferences */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-sm">
            4
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Learning Preferences & Constraints</h2>
            <p className="text-xs text-gray-500">Fine-tune the roadmap to fit your weekly schedule and market focus</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Target Job Market */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Target Job Market
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-200">
              {(["Bangladesh", "Global", "Both"] as MarketPreference[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMarket(m)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    market === m
                      ? "bg-white text-indigo-700 shadow-xs border border-gray-200"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Study Hours */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-700">
                Available Study Bandwidth
              </label>
              <span className="text-xs font-bold text-indigo-600">
                {weeklyHours} hrs / week
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={35}
              step={1}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>5 hrs (Light)</span>
              <span>15 hrs (Balanced)</span>
              <span>35 hrs (Intensive)</span>
            </div>
          </div>

          {/* Learning Style */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Preferred Learning Style
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-200">
              {(["Projects", "Courses", "Mixed"] as LearningStyle[]).map((ls) => (
                <button
                  key={ls}
                  type="button"
                  onClick={() => setLearningStyle(ls)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    learningStyle === ls
                      ? "bg-white text-indigo-700 shadow-xs border border-gray-200"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {ls}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Error Displays */}
      {validationError && (
        <div className="flex items-center gap-2.5 p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{validationError}</span>
        </div>
      )}

      {serverError && (
        <div className="flex items-start gap-2.5 p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
          <div className="space-y-1">
            <span className="font-bold text-amber-900">Analysis Notice:</span>
            <p>{serverError}</p>
            <p className="text-[11px] text-amber-700">
              Tip: You can enable "Fast Demo Mode" below to preview the complete roadmap dashboard instantly.
            </p>
          </div>
        </div>
      )}

      {/* Submit Action & Demo Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isDemoMode}
            onChange={(e) => setIsDemoMode(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Fast Demo Mode (Instant evaluation without AI token)
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto min-w-[260px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          {isLoading ? (
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Analyzing your career profile...</span>
            </div>
          ) : (
            <>
              <span>Generate Career Intelligence</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
