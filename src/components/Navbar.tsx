"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getAllTopics } from "../data/topics";
import { useProgress } from "@/context/ProgressContext";

// Compact animated Python logo for navbar
function NavPythonLogo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="navSnake1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3776AB" />
          <stop offset="100%" stopColor="#4B8BBE" />
        </linearGradient>
        <linearGradient id="navSnake2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD43B" />
          <stop offset="100%" stopColor="#FFE873" />
        </linearGradient>
      </defs>
      <path
        d="M32 4C18.7 4 16 10.3 16 14v6h16v2H14c-4.4 0-10 3.6-10 14s4.6 14 10 14h6v-8c0-4.4 3.6-8 8-8h16c4.4 0 8-3.6 8-8V14c0-4.4-5.6-10-20-10zm-8 6a3 3 0 110 6 3 3 0 010-6z"
        fill="url(#navSnake1)"
      />
      <path
        d="M32 60c13.3 0 16-6.3 16-10v-6H32v-2h18c4.4 0 10-3.6 10-14s-4.6-14-10-14h-6v8c0 4.4-3.6 8-8 8H20c-4.4 0-8 3.6-8 8v12c0 4.4 5.6 10 20 10zm8-6a3 3 0 110-6 3 3 0 010 6z"
        fill="url(#navSnake2)"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");


  // Use global progress context
  const { completedTopics, totalTopics } = useProgress();

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };



  // Navigation Logic
  const topics = getAllTopics();
  const isTopicPage = pathname?.startsWith("/topics/") && pathname !== "/topics";
  const currentSlug = isTopicPage ? pathname.split("/").pop() : null;
  const currentIndex = topics.findIndex(t => t.slug === currentSlug);

  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic = currentIndex !== -1 && currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <NavPythonLogo />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400 bg-clip-text text-transparent">
                PyLearn
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-1">
              <Link
                href="/topics"
                className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Topics
              </Link>
              <Link
                href="/problems"
                className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Problems
              </Link>
              <Link
                href="/editor?problem=hello_world"
                className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Editor
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Progress indicator */}
            <div className="hidden sm:flex items-center gap-4 mr-4">
              <div className="flex flex-col items-end">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {completedTopics.size}
                  </span>
                  <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                    / {totalTopics} Chapters
                  </span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-32 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-700 ease-out"
                    style={{ width: `${(completedTopics.size / totalTopics) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Chapter Navigation (Desktop) */}
            {isTopicPage && (
              <div className="hidden md:flex items-center gap-2 mr-4 border-r border-zinc-200 dark:border-zinc-700 pr-4">
                <Link
                  href={prevTopic ? `/topics/${prevTopic.slug}` : "#"}
                  className={`p-1.5 rounded-full transition-colors ${prevTopic
                    ? "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                    : "text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
                    }`}
                  aria-disabled={!prevTopic}
                  title={prevTopic ? `Previous: ${prevTopic.title}` : "No previous topic"}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                <Link
                  href={nextTopic ? `/topics/${nextTopic.slug}` : "#"}
                  className={`p-1.5 rounded-full transition-colors ${nextTopic
                    ? "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                    : "text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
                    }`}
                  aria-disabled={!nextTopic}
                  title={nextTopic ? `Next: ${nextTopic.title}` : "No next topic"}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
          <div className="px-4 py-3 space-y-2">
            <Link
              href="/topics"
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Topics
            </Link>
            <Link
              href="/problems"
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Problems
            </Link>
            <Link
              href="/editor?problem=hello_world"
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Editor
            </Link>
            <div className="px-3 py-2 flex items-center gap-4">
              {/* <span className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">{progress.problemsSolved} solved</span> */}
              {/* <span className="text-sm text-indigo-600 dark:text-indigo-400 font-bold">{progress.testsPassed} tests</span> */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
