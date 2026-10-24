"use client";

import React, { useState } from "react";
import { Compass, ShieldCheck, Sparkles, RefreshCw, ChevronDown, Palette } from "lucide-react";
import { PrivacyModal } from "./privacy-modal";

export type BgVariant = "grid" | "soft" | "contrast";

interface NavbarProps {
  onReset: () => void;
  hasActiveReport: boolean;
  userXp?: number;
  bgVariant?: BgVariant;
  onChangeBgVariant?: (variant: BgVariant) => void;
}

export function Navbar({
  onReset,
  hasActiveReport,
  userXp,
  bgVariant = "grid",
  onChangeBgVariant,
}: NavbarProps) {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isBgMenuOpen, setIsBgMenuOpen] = useState(false);

  const bgLabels: Record<BgVariant, string> = {
    grid: "Dot Grid & Glow",
    soft: "Soft Gradient",
    contrast: "High Contrast Grid",
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 p-[1px] shadow-sm">
              <div className="w-full h-full bg-indigo-600 rounded-[11px] flex items-center justify-center text-white">
                <Compass className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  SkillPath<span className="text-indigo-600">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  EdTech Intelligence
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-500 font-medium">
                Know your gaps. Build your skills. Own your future.
              </p>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* XP Pill if active */}
            {userXp !== undefined && (
              <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{userXp} XP</span>
              </div>
            )}

            {/* Background Style Switcher */}
            {onChangeBgVariant && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsBgMenuOpen(!isBgMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                  title="Switch background visual style for optimal contrast"
                >
                  <Palette className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden lg:inline text-[11px]">BG: {bgLabels[bgVariant]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isBgMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-xl p-2 z-50 animate-fade-in"
                    onMouseLeave={() => setIsBgMenuOpen(false)}
                  >
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Background Appearance
                    </div>
                    {(["grid", "soft", "contrast"] as BgVariant[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => {
                          onChangeBgVariant(mode);
                          setIsBgMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                          bgVariant === mode
                            ? "bg-indigo-50 text-indigo-900 border border-indigo-200"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{bgLabels[mode]}</span>
                        {bgVariant === mode && <span className="text-indigo-600 font-bold">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Privacy Modal trigger */}
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Read our data privacy commitment"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">Privacy</span>
            </button>

            {/* New Analysis Button if report active */}
            {hasActiveReport && (
              <button
                type="button"
                onClick={onReset}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Analysis</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
}
