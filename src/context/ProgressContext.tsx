"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ProgressContextType {
    completedTopics: Set<string>;
    markComplete: (slug: string) => void;
    markIncomplete: (slug: string) => void;
    isComplete: (slug: string) => boolean;
    totalTopics: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children, totalTopics }: { children: ReactNode; totalTopics: number }) {
    const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("pythonlearn_completed_topics");
            if (saved) {
                setCompletedTopics(new Set(JSON.parse(saved)));
            }
        } catch (e) {
            console.error("Failed to load progress", e);
        }
    }, []);

    // Save to localStorage whenever it changes
    useEffect(() => {
        if (completedTopics.size > 0) {
            localStorage.setItem("pythonlearn_completed_topics", JSON.stringify(Array.from(completedTopics)));
        }
    }, [completedTopics]);

    const markComplete = (slug: string) => {
        setCompletedTopics((prev) => {
            const newSet = new Set(prev);
            newSet.add(slug);
            return newSet;
        });
    };

    const markIncomplete = (slug: string) => {
        setCompletedTopics((prev) => {
            const newSet = new Set(prev);
            newSet.delete(slug);
            return newSet;
        });
    };

    const isComplete = (slug: string) => completedTopics.has(slug);

    return (
        <ProgressContext.Provider value={{ completedTopics, markComplete, markIncomplete, isComplete, totalTopics }}>
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
