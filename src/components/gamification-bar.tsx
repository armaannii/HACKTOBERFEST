"use client";

import React from "react";
import { GamificationProfile, calculateLevel } from "@/lib/gamification";
import { Zap, Award, CheckCircle2, Trophy } from "lucide-react";

interface GamificationBarProps {
  profile: GamificationProfile;
  onOpenBadgesModal?: () => void;
}

export function GamificationBar({ profile, onOpenBadgesModal }: GamificationBarProps) {
  const { level, title, nextLevelXp } = calculateLevel(profile.xp);
  const progressPercent = Math.min(100, Math.round((profile.xp / nextLevelXp) * 100));
  const unlockedCount = profile.badges.filter((b) => b.unlocked).length;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm print-hide">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Level & XP Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm">
            <Trophy className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-sm sm:text-base">
                {title}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                Level {level}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Complete sprint tasks, test in the Skill Lab, or practice mock interviews to earn XP
            </p>
          </div>
        </div>

        {/* Progress & Badges */}
        <div className="flex items-center gap-6 sm:justify-end">
          {/* XP Progress Bar */}
          <div className="w-40 sm:w-48">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-gray-700 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                {profile.xp} XP
              </span>
              <span className="text-[11px] text-gray-400 font-medium">
                Goal: {nextLevelXp} XP
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Badges Pill */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-800 shrink-0">
            <Award className="w-4 h-4 text-amber-600" />
            <span>{unlockedCount}/{profile.badges.length} Badges</span>
          </div>
        </div>
      </div>

      {/* Badges Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-4 border-t border-gray-100">
        {profile.badges.map((badge) => (
          <div
            key={badge.id}
            title={badge.description}
            className={`flex items-center gap-2 p-2 rounded-xl text-xs transition-colors border ${
              badge.unlocked
                ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                : "bg-gray-50 border-gray-100 text-gray-400 opacity-60"
            }`}
          >
            <span className="text-base">{badge.icon}</span>
            <div className="truncate">
              <p className="font-semibold truncate">{badge.name}</p>
              <p className="text-[10px] text-gray-500 truncate">
                {badge.unlocked ? "Unlocked" : "Locked"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
