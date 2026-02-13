"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllProblems, Problem } from "../../data/problems";
import { useProgress } from "../../lib/useProgress";

type FilterDifficulty = "all" | "beginner" | "intermediate";
type FilterStatus = "all" | "solved" | "unsolved";

export default function ProblemsPage() {
  const problems = getAllProblems();
  const { isProblemSolved, getProblemProgress, getOverallStats, isLoaded } = useProgress();
  
  const [difficultyFilter, setDifficultyFilter] = useState<FilterDifficulty>("all");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique topics from problems
  const topics = useMemo(() => {
    const topicSet = new Set(problems.map((p) => p.topicId));
    return Array.from(topicSet);
  }, [problems]);

  const [topicFilter, setTopicFilter] = useState<string>("all");

  // Filter problems
  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      // Difficulty filter
      if (difficultyFilter !== "all" && problem.difficulty !== difficultyFilter) {
        return false;
      }
      // Topic filter
      if (topicFilter !== "all" && problem.topicId !== topicFilter) {
        return false;
      }
      // Status filter
      if (statusFilter !== "all") {
        const solved = isProblemSolved(problem.id);
        if (statusFilter === "solved" && !solved) return false;
        if (statusFilter === "unsolved" && solved) return false;
      }
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          problem.title.toLowerCase().includes(query) ||
          problem.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [problems, difficultyFilter, topicFilter, statusFilter, searchQuery, isProblemSolved]);

  // Group problems by topic
  const groupedProblems = useMemo(() => {
    const groups: Record<string, Problem[]> = {};
    filteredProblems.forEach((problem) => {
      if (!groups[problem.topicId]) {
        groups[problem.topicId] = [];
      }
      groups[problem.topicId].push(problem);
    });
    // Sort problems within each group by order
    Object.keys(groups).forEach((topicId) => {
      groups[topicId].sort((a, b) => a.order - b.order);
    });
    return groups;
  }, [filteredProblems]);

  const stats = isLoaded ? getOverallStats() : { totalSolved: 0, totalTestsPassed: 0, totalTests: 0, totalAttempts: 0 };

  const formatTopicName = (topicId: string) => {
    return topicId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Practice Problems
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Sharpen your Python skills with {problems.length} coding challenges
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {stats.totalSolved}
            </div>
            <div className="text-sm text-zinc-500">Problems Solved</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {stats.totalTestsPassed}
            </div>
            <div className="text-sm text-zinc-500">Tests Passed</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {stats.totalAttempts}
            </div>
            <div className="text-sm text-zinc-500">Total Attempts</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {problems.length}
            </div>
            <div className="text-sm text-zinc-500">Total Problems</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as FilterDifficulty)}
              className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>

            {/* Topic Filter */}
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Topics</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {formatTopicName(topic)}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
              className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
            </select>
          </div>
        </div>

        {/* Problems Grid by Topic */}
        {Object.keys(groupedProblems).length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            No problems found matching your filters.
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(groupedProblems).map(([topicId, topicProblems]) => (
              <div key={topicId}>
                <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  {formatTopicName(topicId)}
                  <span className="text-sm font-normal text-zinc-500">
                    ({topicProblems.length} problem{topicProblems.length !== 1 ? "s" : ""})
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topicProblems.map((problem) => {
                    const solved = isProblemSolved(problem.id);
                    const progress = getProblemProgress(problem.id);
                    
                    return (
                      <Link
                        key={problem.id}
                        href={`/editor?problem=${problem.id}`}
                        className={`group relative bg-white dark:bg-zinc-900 rounded-xl p-5 border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                          solved
                            ? "border-emerald-300 dark:border-emerald-700"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700"
                        }`}
                      >
                        {/* Solved Badge */}
                        {solved && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                              ✓ Solved
                            </span>
                          </div>
                        )}

                        {/* Problem Title */}
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pr-16 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {problem.title}
                        </h3>

                        {/* Difficulty Badge */}
                        <span
                          className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${
                            problem.difficulty === "beginner"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                          }`}
                        >
                          {problem.difficulty}
                        </span>

                        {/* Description */}
                        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                          {problem.description}
                        </p>

                        {/* Progress Bar */}
                        {progress && progress.totalTests > 0 && (
                          <div className="mt-4">
                            <div className="flex justify-between text-xs text-zinc-500 mb-1">
                              <span>Tests: {progress.testsPassed}/{progress.totalTests}</span>
                              <span>{progress.attempts} attempt{progress.attempts !== 1 ? "s" : ""}</span>
                            </div>
                            <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  progress.testsPassed === progress.totalTests
                                    ? "bg-emerald-500"
                                    : "bg-indigo-500"
                                }`}
                                style={{
                                  width: `${(progress.testsPassed / progress.totalTests) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Hints indicator */}
                        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <span>{problem.hints.length} hints available</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
