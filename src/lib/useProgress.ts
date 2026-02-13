"use client";

import { useState, useEffect, useCallback } from "react";

export interface ProblemProgress {
  solved: boolean;
  testsPassed: number;
  totalTests: number;
  attempts: number;
  hintsUsed: number;
  lastAttempt?: string; // ISO date string
}

export interface ProgressData {
  completedTopics: string[];
  solvedProblems: string[]; // Legacy: kept for backwards compatibility
  problemProgress: Record<string, ProblemProgress>; // Detailed tracking
  savedCode: Record<string, string>;
  lastVisitedTopic: string | null;
}

const DEFAULT_PROGRESS: ProgressData = {
  completedTopics: [],
  solvedProblems: [],
  problemProgress: {},
  savedCode: {},
  lastVisitedTopic: null,
};

const STORAGE_KEY = "pythonlearn_progress";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ProgressData;
        setProgress({
          completedTopics: parsed.completedTopics || [],
          solvedProblems: parsed.solvedProblems || [],
          problemProgress: parsed.problemProgress || {},
          savedCode: parsed.savedCode || {},
          lastVisitedTopic: parsed.lastVisitedTopic || null,
        });
      }
    } catch (err) {
      console.error("Failed to load progress from localStorage:", err);
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: ProgressData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      // Also update legacy keys for Navbar compatibility
      localStorage.setItem("completedTopics", JSON.stringify(newProgress.completedTopics));
    } catch (err) {
      console.error("Failed to save progress to localStorage:", err);
    }
  }, []);

  // Mark a topic as completed
  const markTopicComplete = useCallback(
    (topicId: string) => {
      setProgress((prev) => {
        if (prev.completedTopics.includes(topicId)) return prev;
        const updated = {
          ...prev,
          completedTopics: [...prev.completedTopics, topicId],
        };
        saveProgress(updated);
        return updated;
      });
    },
    [saveProgress]
  );

  // Mark a problem as solved
  const markProblemSolved = useCallback(
    (problemId: string) => {
      setProgress((prev) => {
        if (prev.solvedProblems.includes(problemId)) return prev;
        const updated = {
          ...prev,
          solvedProblems: [...prev.solvedProblems, problemId],
        };
        saveProgress(updated);
        return updated;
      });
    },
    [saveProgress]
  );

  // Save code for a problem
  const saveCode = useCallback(
    (problemId: string, code: string) => {
      setProgress((prev) => {
        const updated = {
          ...prev,
          savedCode: {
            ...prev.savedCode,
            [problemId]: code,
          },
        };
        saveProgress(updated);
        return updated;
      });
    },
    [saveProgress]
  );

  // Get saved code for a problem
  const getSavedCode = useCallback(
    (problemId: string): string | null => {
      return progress.savedCode[problemId] || null;
    },
    [progress.savedCode]
  );

  // Set last visited topic
  const setLastVisitedTopic = useCallback(
    (topicId: string) => {
      setProgress((prev) => {
        const updated = {
          ...prev,
          lastVisitedTopic: topicId,
        };
        saveProgress(updated);
        return updated;
      });
    },
    [saveProgress]
  );

  // Check if a topic is completed
  const isTopicComplete = useCallback(
    (topicId: string): boolean => {
      return progress.completedTopics.includes(topicId);
    },
    [progress.completedTopics]
  );

  // Check if a problem is solved
  const isProblemSolved = useCallback(
    (problemId: string): boolean => {
      const pp = progress.problemProgress[problemId];
      return pp?.solved || progress.solvedProblems.includes(problemId);
    },
    [progress.solvedProblems, progress.problemProgress]
  );

  // Update detailed problem progress
  const updateProblemProgress = useCallback(
    (problemId: string, testsPassed: number, totalTests: number) => {
      setProgress((prev) => {
        const existing = prev.problemProgress[problemId] || {
          solved: false,
          testsPassed: 0,
          totalTests: 0,
          attempts: 0,
          hintsUsed: 0,
        };
        const solved = testsPassed === totalTests && totalTests > 0;
        const updated: ProgressData = {
          ...prev,
          problemProgress: {
            ...prev.problemProgress,
            [problemId]: {
              ...existing,
              solved,
              testsPassed,
              totalTests,
              attempts: existing.attempts + 1,
              lastAttempt: new Date().toISOString(),
            },
          },
          // Also update legacy solvedProblems array
          solvedProblems: solved && !prev.solvedProblems.includes(problemId)
            ? [...prev.solvedProblems, problemId]
            : prev.solvedProblems,
        };
        saveProgress(updated);
        return updated;
      });
    },
    [saveProgress]
  );

  // Record hint usage
  const recordHintUsed = useCallback(
    (problemId: string) => {
      setProgress((prev) => {
        const existing = prev.problemProgress[problemId] || {
          solved: false,
          testsPassed: 0,
          totalTests: 0,
          attempts: 0,
          hintsUsed: 0,
        };
        const updated: ProgressData = {
          ...prev,
          problemProgress: {
            ...prev.problemProgress,
            [problemId]: {
              ...existing,
              hintsUsed: existing.hintsUsed + 1,
            },
          },
        };
        saveProgress(updated);
        return updated;
      });
    },
    [saveProgress]
  );

  // Get problem progress
  const getProblemProgress = useCallback(
    (problemId: string): ProblemProgress | null => {
      return progress.problemProgress[problemId] || null;
    },
    [progress.problemProgress]
  );

  // Get overall stats
  const getOverallStats = useCallback(() => {
    const entries = Object.values(progress.problemProgress);
    const totalSolved = entries.filter((p) => p.solved).length;
    const totalTestsPassed = entries.reduce((sum, p) => sum + p.testsPassed, 0);
    const totalTests = entries.reduce((sum, p) => sum + p.totalTests, 0);
    const totalAttempts = entries.reduce((sum, p) => sum + p.attempts, 0);
    return { totalSolved, totalTestsPassed, totalTests, totalAttempts };
  }, [progress.problemProgress]);

  // Reset all progress
  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    saveProgress(DEFAULT_PROGRESS);
  }, [saveProgress]);

  // Calculate overall progress percentage
  const getProgressPercent = useCallback(
    (totalTopics: number): number => {
      if (totalTopics === 0) return 0;
      return Math.round((progress.completedTopics.length / totalTopics) * 100);
    },
    [progress.completedTopics.length]
  );

  return {
    progress,
    isLoaded,
    markTopicComplete,
    markProblemSolved,
    updateProblemProgress,
    recordHintUsed,
    getProblemProgress,
    getOverallStats,
    saveCode,
    getSavedCode,
    setLastVisitedTopic,
    isTopicComplete,
    isProblemSolved,
    resetProgress,
    getProgressPercent,
  };
}
