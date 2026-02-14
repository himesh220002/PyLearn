"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

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

export interface ProgressContextType {
    progress: ProgressData;
    isLoaded: boolean;
    markTopicComplete: (topicId: string) => void;
    markTopicIncomplete: (topicId: string) => void;
    markProblemSolved: (problemId: string) => void;
    updateProblemProgress: (problemId: string, testsPassed: number, totalTests: number) => void;
    recordHintUsed: (problemId: string) => void;
    getProblemProgress: (problemId: string) => ProblemProgress | null;
    getOverallStats: () => { totalSolved: number, totalTestsPassed: number, totalTests: number, totalAttempts: number };
    saveCode: (problemId: string, code: string) => void;
    getSavedCode: (problemId: string) => string | null;
    setLastVisitedTopic: (topicId: string) => void;
    isTopicComplete: (topicId: string) => boolean;
    isProblemSolved: (problemId: string) => boolean;
    resetProgress: () => void;
    getProgressPercent: () => number;
    totalTopics: number;
}

const DEFAULT_PROGRESS: ProgressData = {
    completedTopics: [],
    solvedProblems: [],
    problemProgress: {},
    savedCode: {},
    lastVisitedTopic: null,
};

const STORAGE_KEY = "pythonlearn_progress";

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children, totalTopics }: { children: ReactNode; totalTopics: number }) {
    const [progress, setProgress] = useState<ProgressData>(DEFAULT_PROGRESS);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load progress from localStorage on mount
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
            // Sync legacy keys if any components still use them directly
            localStorage.setItem("completedTopics", JSON.stringify(newProgress.completedTopics));
        } catch (err) {
            console.error("Failed to save progress to localStorage:", err);
        }
    }, []);

    const markTopicComplete = useCallback((topicId: string) => {
        setProgress((prev) => {
            if (prev.completedTopics.includes(topicId)) return prev;
            const updated = {
                ...prev,
                completedTopics: [...prev.completedTopics, topicId],
            };
            saveProgress(updated);
            return updated;
        });
    }, [saveProgress]);

    const markTopicIncomplete = useCallback((topicId: string) => {
        setProgress((prev) => {
            if (!prev.completedTopics.includes(topicId)) return prev;
            const updated = {
                ...prev,
                completedTopics: prev.completedTopics.filter(id => id !== topicId),
            };
            saveProgress(updated);
            return updated;
        });
    }, [saveProgress]);

    const markProblemSolved = useCallback((problemId: string) => {
        setProgress((prev) => {
            if (prev.solvedProblems.includes(problemId)) return prev;
            const updated = {
                ...prev,
                solvedProblems: [...prev.solvedProblems, problemId],
            };
            saveProgress(updated);
            return updated;
        });
    }, [saveProgress]);

    const updateProblemProgress = useCallback((problemId: string, testsPassed: number, totalTests: number) => {
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
                solvedProblems: solved && !prev.solvedProblems.includes(problemId)
                    ? [...prev.solvedProblems, problemId]
                    : prev.solvedProblems,
            };
            saveProgress(updated);
            return updated;
        });
    }, [saveProgress]);

    const recordHintUsed = useCallback((problemId: string) => {
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
    }, [saveProgress]);

    const getProblemProgress = useCallback((problemId: string) => {
        return progress.problemProgress[problemId] || null;
    }, [progress.problemProgress]);

    const getOverallStats = useCallback(() => {
        const entries = Object.values(progress.problemProgress);
        const totalSolved = entries.filter((p) => p.solved).length;
        const totalTestsPassed = entries.reduce((sum, p) => sum + p.testsPassed, 0);
        const totalTests = entries.reduce((sum, p) => sum + p.totalTests, 0);
        const totalAttempts = entries.reduce((sum, p) => sum + p.attempts, 0);
        return { totalSolved, totalTestsPassed, totalTests, totalAttempts };
    }, [progress.problemProgress]);

    const saveCode = useCallback((problemId: string, code: string) => {
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
    }, [saveProgress]);

    const getSavedCode = useCallback((problemId: string) => {
        return progress.savedCode[problemId] || null;
    }, [progress.savedCode]);

    const setLastVisitedTopic = useCallback((topicId: string) => {
        setProgress((prev) => {
            const updated = {
                ...prev,
                lastVisitedTopic: topicId,
            };
            saveProgress(updated);
            return updated;
        });
    }, [saveProgress]);

    const isTopicComplete = useCallback((topicId: string) => {
        return progress.completedTopics.includes(topicId);
    }, [progress.completedTopics]);

    const isProblemSolved = useCallback((problemId: string) => {
        const pp = progress.problemProgress[problemId];
        return pp?.solved || progress.solvedProblems.includes(problemId);
    }, [progress.solvedProblems, progress.problemProgress]);

    const resetProgress = useCallback(() => {
        setProgress(DEFAULT_PROGRESS);
        saveProgress(DEFAULT_PROGRESS);
    }, [saveProgress]);

    const getProgressPercent = useCallback(() => {
        if (totalTopics === 0) return 0;
        return Math.round((progress.completedTopics.length / totalTopics) * 100);
    }, [progress.completedTopics.length, totalTopics]);

    return (
        <ProgressContext.Provider value={{
            progress,
            isLoaded,
            markTopicComplete,
            markTopicIncomplete,
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
            totalTopics
        }}>
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress() {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }
    return context;
}
