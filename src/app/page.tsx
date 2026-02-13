import Link from "next/link";
import { getAllTopics } from "../data/topics";

// Animated Python Snake Logo Component
function PythonLogo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="snakeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="snakeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Blue Python half */}
      <path
        d="M32 4C18.7 4 16 10.3 16 14v6h16v2H14c-4.4 0-10 3.6-10 14s4.6 14 10 14h6v-8c0-4.4 3.6-8 8-8h16c4.4 0 8-3.6 8-8V14c0-4.4-5.6-10-20-10zm-8 6a3 3 0 110 6 3 3 0 010-6z"
        fill="url(#snakeGradient1)"
        className="drop-shadow-lg"
        style={{ filter: "url(#glow)" }}
      >
        <animate attributeName="opacity" values="1;0.9;1" dur="3s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-1; 0,0" dur="4s" repeatCount="indefinite" />
      </path>
      {/* Yellow Python half */}
      <path
        d="M32 60c13.3 0 16-6.3 16-10v-6H32v-2h18c4.4 0 10-3.6 10-14s-4.6-14-10-14h-6v8c0 4.4-3.6 8-8 8H20c-4.4 0-8 3.6-8 8v12c0 4.4 5.6 10 20 10zm8-6a3 3 0 110-6 3 3 0 010 6z"
        fill="url(#snakeGradient2)"
        className="drop-shadow-lg"
        style={{ filter: "url(#glow)" }}
      >
        <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,1; 0,0" dur="4s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

// Dynamic Feature Icons
function FeatureIcon({ type }: { type: "interactive" | "editor" | "practice" | "visual" }) {
  const containerClasses = "w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-white to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50";

  switch (type) {
    case "interactive":
      return (
        <div className={containerClasses}>
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-indigo-500 dark:text-indigo-400">
            <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case "editor":
      return (
        <div className={containerClasses}>
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-emerald-500 dark:text-emerald-400">
            <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case "practice":
      return (
        <div className={containerClasses}>
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-amber-500 dark:text-amber-400">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case "visual":
      return (
        <div className={containerClasses}>
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-rose-500 dark:text-rose-400">
            <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
  }
}

const features = [
  {
    iconType: "interactive" as const,
    title: "Interactive Lessons",
    description: "Learn Python concepts through visual explanations and step-by-step examples that make complex topics easy to grasp.",
  },
  {
    iconType: "editor" as const,
    title: "Live Code Editor",
    description: "Write and run Python code directly in your browser with instant feedback, syntax highlighting, and error detection.",
  },
  {
    iconType: "practice" as const,
    title: "Practice Problems",
    description: "Solve diverse coding challenges with automated tests to check your solutions and track your progress.",
  },
  {
    iconType: "visual" as const,
    title: "Visual Learning",
    description: "Understand arrays, loops, and data structures through beautiful, animated visualizations that show how code works.",
  },
];

const learningPath = [
  {
    level: "Beginner",
    description: "Start here if you're new to coding.",
    topics: ["Variables", "Data Types", "Conditionals", "Functions", "Lists", "Loops"]
  },
  {
    level: "Intermediate",
    description: "Deepen your knowledge.",
    topics: ["List Comprehensions", "Dictionaries", "File I/O", "OOP", "Error Handling"]
  },
];

export default function Home() {
  const topics = getAllTopics();
  const beginnerTopics = topics.filter((t) => t.level === "beginner").slice(0, 6);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-indigo-500/30">

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-emerald-500/10 blur-3xl animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-amber-500/5 blur-3xl animate-[float_12s_ease-in-out_infinite]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-32 sm:pt-32 sm:pb-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Interactive Python Course 2.0</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-400 dark:to-indigo-300">Python</span>
                <br />
                the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300">Visual</span> Way
              </h1>

              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 leading-relaxed">
                Forget boring lectures. Learn programming through interactive visualizations,
                instant-feedback coding exercises, and a curriculum designed for how your brain actually learns.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                <Link
                  href="/topics"
                  className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-full hover:bg-zinc-800 dark:hover:bg-white/90 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20"
                >
                  Start Learning Free
                  <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <Link
                  href="/editor?problem=hello_world"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold transition-all duration-200 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105"
                >
                  Try Code Editor
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="flex-1 relative w-full max-w-xl lg:max-w-none animate-in fade-in zoom-in-95 duration-1000 delay-200">
              <div className="relative">
                {/* Glow effect behind */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-emerald-500 opacity-20 blur-3xl rounded-[2rem]" />

                {/* Code Window */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800">
                  {/* Window Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="text-xs font-mono text-zinc-500">main.py</div>
                    <div className="w-12" /> {/* Spacer for balance */}
                  </div>

                  {/* Window Content */}
                  <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed overflow-x-auto">
                    <div className="text-zinc-400">
                      <span className="text-purple-400">def</span> <span className="text-blue-400">visualize_learning</span><span className="text-zinc-500">(</span><span className="text-orange-300">student</span><span className="text-zinc-500">):</span>
                    </div>
                    <div className="pl-4 text-zinc-400 mt-1">
                      <span className="text-zinc-500"># Learning made interactive</span>
                    </div>
                    <div className="pl-4 text-zinc-400">
                      <span className="text-purple-400">if</span> student.<span className="text-blue-400">wants_to_learn</span>:
                    </div>
                    <div className="pl-8 text-zinc-400">
                      <span className="text-emerald-400">print</span><span className="text-zinc-500">(</span><span className="text-green-300">"Welcome to the future!"</span><span className="text-zinc-500">)</span>
                    </div>
                    <div className="pl-8 text-zinc-400">
                      <span className="text-purple-400">return</span> <span className="text-green-300">"Success"</span>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center gap-3 text-emerald-400 text-xs md:text-sm">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Output: Welcome to the future!</span>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 animate-[float_6s_ease-in-out_infinite_reverse]">
                  <PythonLogo className="w-12 h-12" />
                </div>

                <div className="absolute -bottom-8 -left-8 p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 animate-[float_7s_ease-in-out_infinite] hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-bold z-${30 - i * 10}`}>
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs font-medium dark:text-zinc-200">
                      <span className="text-emerald-500 font-bold">10k+</span> Learners
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 font-primary">
              Why learn with us?
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              We've stripped away the fluff to focus on what actually helps you learn programming concepts and retain them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 shadow-none hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 transform transition-transform group-hover:scale-110 duration-300 origin-left">
                  <FeatureIcon type={feature.iconType} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-24 bg-zinc-100/50 dark:bg-zinc-900/30 relative border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">

            <div className="flex-1 sticky top-24">
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                Your Path to <span className="text-indigo-600 dark:text-indigo-400">Mastery</span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                A structured curriculum that takes you from writing your first "Hello World" to building complex applications with confidence.
              </p>
              <Link
                href="/topics"
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300"
              >
                View Full Curriculum <span className="text-xl ml-2">→</span>
              </Link>
            </div>

            <div className="flex-1 w-full space-y-8">
              {learningPath.map((stage, index) => (
                <div key={stage.level} className="relative pl-12 pb-8 border-l-2 border-zinc-200 dark:border-zinc-800 last:border-0 last:pb-0">
                  {/* Timeline Dot */}
                  <div className={`absolute top-0 left-[-9px] w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm ${index === 0 ? 'bg-emerald-500' : 'bg-indigo-500'}`} />

                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${index === 0
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                      : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
                      }`}>
                      Step 0{index + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                      {stage.level}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      {stage.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {stage.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Topics */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                Start Learning Now
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Jump straight into a topic and start coding in seconds.
              </p>
            </div>
            <Link
              href="/topics"
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-full text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              View All Topics
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className="group relative p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    #
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    <span className="text-indigo-600 dark:text-indigo-400">→</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 flex-grow">
                  {topic.summary}
                </p>

                <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-indigo-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/topics"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-full text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              View All Topics
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600 dark:bg-zinc-900" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-zinc-900 dark:to-zinc-950" />

        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Ready to become a developer?
          </h2>
          <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
            Join thousands of others starting their Python journey today. It's free, interactive, and fun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/editor?problem=hello_world"
              className="px-8 py-4 text-lg font-bold bg-white text-indigo-600 rounded-full hover:bg-indigo-50 shadow-xl transition-all hover:-translate-y-1"
            >
              Start Coding Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">Python Platform</span>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} Python Learning Platform. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a href="https://x.com/CypherHarley" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">Twitter</a>
              <a href="https://github.com/himesh220002/PyLearn" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
