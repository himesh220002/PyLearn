"use client";

import { useState } from "react";
import Link from "next/link";
import { Topic } from "../data/topics";
import { useProgress } from "../lib/useProgress";

interface TopicExplorerProps {
    initialTopics: Topic[];
}

const FeatureIcon = ({ type }: { type: string }) => {
    const containerClasses = "w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-white to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 text-indigo-500 dark:text-indigo-400";

    // Default icon
    let icon = (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    );

    if (type === "loop") {
        icon = (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        );
    } else if (type === "array" || type === "list-operations") {
        icon = (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        );
    } else if (type === "string") {
        icon = (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
        );
    } else if (type === "slicing") {
        icon = (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
            </svg>
        );
    } else if (type === "nested") {
        icon = (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        );
    }

    return (
        <div className={containerClasses}>
            {icon}
        </div>
    );
};

export default function TopicExplorer({ initialTopics }: TopicExplorerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterLevel, setFilterLevel] = useState<"all" | "beginner" | "intermediate">("all");
    const { isTopicComplete } = useProgress();

    const filteredTopics = initialTopics.filter((topic) => {
        const matchesSearch =
            topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.summary.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = filterLevel === "all" || topic.level === filterLevel;
        return matchesSearch && matchesLevel;
    });

    return (
        <div>
            {/* Search and Filter Controls */}
            <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl leading-5 bg-white dark:bg-zinc-900 placeholder-zinc-500 focus:outline-none focus:placeholder-zinc-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition-shadow duration-200 hover:shadow-md"
                        placeholder="Search topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {(["all", "beginner", "intermediate"] as const).map((level) => (
                        <button
                            key={level}
                            onClick={() => setFilterLevel(level)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 whitespace-nowrap ${filterLevel === level
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
                                }`}
                        >
                            {level === "all" ? "All Levels" : level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Topics Grid */}
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredTopics.length > 0 ? (
                    filteredTopics.map((topic, index) => {
                        const completed = isTopicComplete(topic.id);
                        return (
                            <Link
                                href={`/topics/${topic.slug}`}
                                key={topic.id}
                                className={`group relative flex flex-col h-full bg-white dark:bg-zinc-900 rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] overflow-hidden ${completed
                                    ? "border-emerald-500/30 dark:border-emerald-500/30 bg-emerald-50/5 dark:bg-emerald-500/5"
                                    : "border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30"
                                    }`}
                            >
                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent pointer-events-none" />

                                <div className="p-8 flex flex-col h-full relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="relative">
                                            <FeatureIcon type={topic.visualType || topic.id} />
                                            {completed && (
                                                <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-lg border-2 border-white dark:border-zinc-900 animate-in zoom-in duration-300">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${topic.level === "beginner"
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800"
                                            : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
                                            }`}>
                                            {topic.level === "beginner" ? "Beginner" : "Intermediate"}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {topic.title}
                                    </h3>

                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex-grow line-clamp-3">
                                        {topic.summary}
                                    </p>

                                    <div className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-auto group-hover:translate-x-1 transition-transform duration-200">
                                        Start Learning
                                        <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                            <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No topics found</h3>
                        <p className="mt-1 text-zinc-500 dark:text-zinc-400">Try adjusting your search or filters.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setFilterLevel("all"); }}
                            className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
