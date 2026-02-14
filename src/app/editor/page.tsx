"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getProblemById, getProblemsByTopicId } from "../../data/problems";
import { PythonEditor } from "../../components/Editor/PythonEditor";
import { usePyodide } from "../../lib/pyodide/usePyodide";
import { formatOutput } from "../../lib/pyodide/pythonRunner";
import { getTestSuiteForProblem } from "../../data/testCases";
import { runTests, formatTestResults } from "../../lib/testing/testRunner";
import { useProgress } from "../../lib/useProgress";

function EditorContent() {
  const searchParams = useSearchParams();
  const problemId = searchParams.get("problem") ?? "hello_world";

  const problem = useMemo(() => getProblemById(problemId), [problemId]);
  const relatedProblems = useMemo(
    () => (problem ? getProblemsByTopicId(problem.topicId) : []),
    [problem]
  );

  const [code, setCode] = useState(problem?.starterCode ?? "");
  const [output, setOutput] = useState<string>("");
  const [testSummary, setTestSummary] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: number; total: number } | null>(null);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [solutionRevealed, setSolutionRevealed] = useState(false);

  const { runCode, isReady, isLoading, error: pyodideError } = usePyodide();
  const { updateProblemProgress, recordHintUsed, getProblemProgress, isProblemSolved, saveCode, getSavedCode, isLoaded } = useProgress();

  // Update code when problem changes or context loads
  useEffect(() => {
    if (problem && isLoaded) {
      const saved = getSavedCode(problem.id);
      setCode(saved || problem.starterCode);
      setOutput("");
      setTestSummary("");
      setHintsRevealed(0);
      setShowHints(false);
      setTestResults(null);
    }
  }, [problem, isLoaded, getSavedCode]);

  // Save code changes to local storage with debounce
  useEffect(() => {
    if (!problem || code === undefined || !isLoaded) return;

    const timeoutId = setTimeout(() => {
      saveCode(problem.id, code);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [code, problem?.id, isLoaded, saveCode]);

  const handleRunCode = async () => {
    if (!isReady) {
      setOutput("Python runtime is still loading. Please wait...");
      return;
    }

    setIsRunning(true);
    setOutput("Running...");

    try {
      const result = await runCode(code);
      setOutput(formatOutput(result));
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunTests = async () => {
    if (!problem) {
      setTestSummary("No problem selected.");
      return;
    }

    if (!isReady) {
      setTestSummary("Python runtime is still loading. Please wait...");
      return;
    }

    const testSuite = getTestSuiteForProblem(problem.id);
    if (!testSuite) {
      setTestSummary("No tests available for this problem yet.");
      return;
    }

    setIsRunning(true);
    setTestSummary("Running tests...");

    try {
      const runResult = await runTests(testSuite, code, runCode);
      setTestSummary(formatTestResults(runResult));

      if (!runResult || !Array.isArray(runResult.results)) {
        throw new Error("Invalid test results format");
      }

      // Track test results
      const results = runResult.results;
      const passed = results.filter((r) => r.passed).length;
      const total = results.length;
      setTestResults({ passed, total });

      // Update progress
      updateProblemProgress(problem.id, passed, total);
    } catch (err) {
      setTestSummary(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRevealHint = () => {
    if (problem && hintsRevealed < problem.hints.length) {
      setHintsRevealed((prev) => prev + 1);
      recordHintUsed(problem.id);
    }
  };

  const currentProblemIndex = relatedProblems.findIndex((p) => p.id === problemId);
  const prevProblem = currentProblemIndex > 0 ? relatedProblems[currentProblemIndex - 1] : null;
  const nextProblem = currentProblemIndex < relatedProblems.length - 1 ? relatedProblems[currentProblemIndex + 1] : null;

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] mt-16 lg:mt-16 lg:overflow-hidden">
      <div className="w-full lg:w-1/2 p-4 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black flex flex-col lg:overflow-y-auto">
        <h1 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
          Editor Workspace
        </h1>
        {problem ? (
          <>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">
              {problem.difficulty === "beginner" ? "Beginner problem" : "Intermediate problem"}
            </p>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {problem.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {problem.description}
            </p>
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Examples
              </h3>
              <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
                {problem.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </div>

            {/* Hints Section */}
            {problem.hints && problem.hints.length > 0 && (
              <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Hints ({hintsRevealed}/{problem.hints.length})
                  </h3>
                  {hintsRevealed < problem.hints.length && (
                    <button
                      onClick={handleRevealHint}
                      className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
                    >
                      Reveal Next Hint
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {problem.hints.slice(0, hintsRevealed).map((hint, idx) => (
                    <p key={idx} className="text-sm text-amber-900/80 dark:text-amber-200/80 animate-in fade-in slide-in-from-left-2 duration-300">
                      • {hint}
                    </p>
                  ))}
                  {hintsRevealed === 0 && (
                    <p className="text-xs text-amber-600/60 dark:text-amber-400/60 italic">
                      Need a nudge? Reveal a hint to help you along.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Solution Reveal Button */}
            <div className="mt-6">
              {!solutionRevealed ? (
                <button
                  onClick={() => setShowSolutionModal(true)}
                  className="w-full py-3 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-xl font-semibold text-sm transition-all border border-zinc-200 dark:border-zinc-700 flex items-center justify-center gap-2 group"
                >
                  <svg className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Stuck? Reveal Solution
                </button>
              ) : (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Solution Unlocked
                  </div>
                  <button
                    onClick={() => setShowSolutionModal(true)}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View detailed explanation again
                  </button>
                </div>
              )}
            </div>

            {/* Test Results Summary */}
            {testResults && (
              <div className={`mt-4 p-3 rounded-lg border ${testResults.passed === testResults.total ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${testResults.passed === testResults.total ? 'text-emerald-700 dark:text-emerald-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
                    {testResults.passed === testResults.total ? '✓ All tests passed!' : `${testResults.passed}/${testResults.total} tests passed`}
                  </span>
                  <div className="h-2 w-24 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${testResults.passed === testResults.total ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                      style={{ width: `${(testResults.passed / testResults.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Problem Navigation */}
            {relatedProblems.length > 1 && (
              <div className="mt-4 flex items-center justify-between text-xs">
                {prevProblem ? (
                  <Link
                    href={`/editor?problem=${prevProblem.id}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    ← {prevProblem.title}
                  </Link>
                ) : <span />}
                <span className="text-zinc-400">
                  {currentProblemIndex + 1} of {relatedProblems.length}
                </span>
                {nextProblem ? (
                  <Link
                    href={`/editor?problem=${nextProblem.id}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {nextProblem.title} →
                  </Link>
                ) : <span />}
              </div>
            )}
          </>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            No problem found. Select a topic first to open a practice task in the editor.
          </p>
        )}

        {/* Python Runtime Status */}
        {isLoading && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
                Loading Python runtime... (first load may take a few seconds)
              </span>
            </div>
          </div>
        )}

        {pyodideError && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <span className="text-xs font-medium text-red-800 dark:text-red-200">
              Failed to load Python: {pyodideError}
            </span>
          </div>
        )}

        {isReady && (
          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-md">
            <span className="text-xs font-medium text-emerald-800 dark:text-emerald-200">
              ✓ Python runtime ready
            </span>
          </div>
        )}

        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-md space-y-3">
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            Run Your Code
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Write your Python code in the editor on the right. Click &quot;Run Code&quot; to execute it,
            or &quot;Run Tests&quot; to check your solution against the test cases.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleRunCode}
              disabled={!isReady || isRunning}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? "Running..." : "Run Code"}
            </button>
            <button
              type="button"
              onClick={handleRunTests}
              disabled={!isReady || isRunning}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Run Tests
            </button>
          </div>
          {output && (
            <div className="mt-2">
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Output
              </h4>
              <pre className="mt-1 text-xs bg-black text-zinc-100 rounded-md p-2 max-h-40 overflow-auto whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          )}
          {testSummary && (
            <div className="mt-2">
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Tests
              </h4>
              <pre className="mt-1 text-xs bg-zinc-800 text-zinc-100 rounded-md p-2 max-h-60 overflow-auto whitespace-pre-wrap">
                {testSummary}
              </pre>
            </div>
          )}
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-[#1e1e1e] flex flex-col h-[600px] lg:h-auto lg:overflow-hidden">
        <div className="px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
          <p className="text-xs text-zinc-300">Python Editor</p>
          <span className="text-[10px] text-zinc-500">
            Powered by Monaco + Pyodide
          </span>
        </div>
        <div className="flex-1 min-h-0">
          <PythonEditor value={code} onChange={setCode} height="100%" />
        </div>
      </div>
      {/* Solution Modal Overlay */}
      {showSolutionModal && problem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowSolutionModal(false)}
          />
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 fade-in duration-300">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {solutionRevealed ? "Solution & Explanation" : "Reveal Solution?"}
                </h3>
                {!solutionRevealed && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Try solving it yourself once more before peeking!
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowSolutionModal(false)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {solutionRevealed ? (
                <div className="space-y-6">
                  {/* Explanation Section */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Understanding the Logic
                    </h4>
                    <div className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {problem.solutionOutline}
                    </div>
                  </div>

                  {/* Code Section */}
                  {(problem.solutionCode || problem.starterCode) && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Reference Implementation
                      </h4>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/10 transition-colors" />
                        <div className="relative p-4 bg-zinc-950 rounded-xl font-mono text-sm text-zinc-100 overflow-x-auto border border-white/5">
                          <pre>{problem.solutionCode || problem.starterCode.split('\n').filter(line => !line.trim().startsWith('# TODO:')).join('\n')}</pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">A small challenge builds big skills</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mb-8">
                    Revealing the solution will show you the idiomatic Python way to solve this, but we recommend checking the <b>hints</b> first!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <button
                      onClick={() => { setSolutionRevealed(true); }}
                      className="flex-1 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all"
                    >
                      Yes, reveal it
                    </button>
                    <button
                      onClick={() => setShowSolutionModal(false)}
                      className="flex-1 py-3 px-6 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-xl font-bold transition-all"
                    >
                      Wait, not yet
                    </button>
                  </div>
                </div>
              )}
            </div>

            {solutionRevealed && (
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => setShowSolutionModal(false)}
                  className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Loading Editor...</p>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}

