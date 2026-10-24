"use client";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface GamificationProfile {
  xp: number;
  level: number;
  levelTitle: string;
  completedTasks: string[];
  quizzesTaken: number;
  interviewsPracticed: number;
  badges: Badge[];
}

export const INITIAL_BADGES: Badge[] = [
  {
    id: "badge-analyzed",
    name: "Career Explorer",
    description: "Generated your first comprehensive AI career readiness analysis.",
    icon: "🧭",
    unlocked: true,
  },
  {
    id: "badge-resource",
    name: "Resource Seeker",
    description: "Explored curated courses and practical documentation links.",
    icon: "📚",
    unlocked: false,
  },
  {
    id: "badge-sprint",
    name: "Sprint Champion",
    description: "Completed your first actionable 30-day sprint task.",
    icon: "⚡",
    unlocked: false,
  },
  {
    id: "badge-quiz",
    name: "Lab Scholar",
    description: "Tested your technical competencies in the AI Skill Lab.",
    icon: "🧪",
    unlocked: false,
  },
  {
    id: "badge-interview",
    name: "Interview Ready",
    description: "Practiced role-specific questions with the AI Mock Coach.",
    icon: "🎙️",
    unlocked: false,
  },
];

const STORAGE_KEY = "skillpath_gamification_v1";

export function getGamificationState(): GamificationProfile {
  if (typeof window === "undefined") {
    return {
      xp: 120,
      level: 1,
      levelTitle: "Level 1 • Career Explorer",
      completedTasks: [],
      quizzesTaken: 0,
      interviewsPracticed: 0,
      badges: INITIAL_BADGES,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }

  return {
    xp: 120,
    level: 1,
    levelTitle: "Level 1 • Career Explorer",
    completedTasks: [],
    quizzesTaken: 0,
    interviewsPracticed: 0,
    badges: INITIAL_BADGES,
  };
}

export function saveGamificationState(state: GamificationProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function calculateLevel(xp: number): { level: number; title: string; nextLevelXp: number } {
  if (xp >= 700) {
    return { level: 4, title: "Level 4 • Industry Ready", nextLevelXp: 1200 };
  }
  if (xp >= 350) {
    return { level: 3, title: "Level 3 • Skill Specialist", nextLevelXp: 700 };
  }
  if (xp >= 150) {
    return { level: 2, title: "Level 2 • Ambitious Scholar", nextLevelXp: 350 };
  }
  return { level: 1, title: "Level 1 • Career Explorer", nextLevelXp: 150 };
}

export function notifyGamificationUpdated(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("skillpath_gamification_updated"));
  }
}

export function addXp(amount: number, badgeIdToUnlock?: string): GamificationProfile {
  const current = getGamificationState();
  const newXp = current.xp + amount;
  const levelInfo = calculateLevel(newXp);

  const updatedBadges = current.badges.map((b) => {
    if (badgeIdToUnlock && b.id === badgeIdToUnlock && !b.unlocked) {
      return { ...b, unlocked: true, unlockedAt: new Date().toISOString() };
    }
    return b;
  });

  const nextState: GamificationProfile = {
    ...current,
    xp: newXp,
    level: levelInfo.level,
    levelTitle: levelInfo.title,
    badges: updatedBadges,
  };

  saveGamificationState(nextState);
  notifyGamificationUpdated();
  return nextState;
}

export function recordTaskCompleted(taskId: string): GamificationProfile {
  const current = getGamificationState();
  if (current.completedTasks.includes(taskId)) return current;

  const newCompleted = [...current.completedTasks, taskId];
  const newXp = current.xp + 15;
  const levelInfo = calculateLevel(newXp);

  const updatedBadges = current.badges.map((b) => {
    if (b.id === "badge-sprint" && !b.unlocked) {
      return { ...b, unlocked: true, unlockedAt: new Date().toISOString() };
    }
    return b;
  });

  const nextState: GamificationProfile = {
    ...current,
    xp: newXp,
    level: levelInfo.level,
    levelTitle: levelInfo.title,
    completedTasks: newCompleted,
    badges: updatedBadges,
  };

  saveGamificationState(nextState);
  notifyGamificationUpdated();
  return nextState;
}

export function recordQuizCompleted(): GamificationProfile {
  const current = getGamificationState();
  const newXp = current.xp + 50;
  const levelInfo = calculateLevel(newXp);

  const updatedBadges = current.badges.map((b) => {
    if (b.id === "badge-quiz" && !b.unlocked) {
      return { ...b, unlocked: true, unlockedAt: new Date().toISOString() };
    }
    return b;
  });

  const nextState: GamificationProfile = {
    ...current,
    xp: newXp,
    level: levelInfo.level,
    levelTitle: levelInfo.title,
    quizzesTaken: current.quizzesTaken + 1,
    badges: updatedBadges,
  };

  saveGamificationState(nextState);
  notifyGamificationUpdated();
  return nextState;
}

export function recordInterviewCompleted(): GamificationProfile {
  const current = getGamificationState();
  const newXp = current.xp + 35;
  const levelInfo = calculateLevel(newXp);

  const updatedBadges = current.badges.map((b) => {
    if (b.id === "badge-interview" && !b.unlocked) {
      return { ...b, unlocked: true, unlockedAt: new Date().toISOString() };
    }
    return b;
  });

  const nextState: GamificationProfile = {
    ...current,
    xp: newXp,
    level: levelInfo.level,
    levelTitle: levelInfo.title,
    interviewsPracticed: current.interviewsPracticed + 1,
    badges: updatedBadges,
  };

  saveGamificationState(nextState);
  notifyGamificationUpdated();
  return nextState;
}
