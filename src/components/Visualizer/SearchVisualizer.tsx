"use client";

import { useState, useEffect, useMemo } from "react";

interface SearchStep {
    low: number;
    high: number;
    mid: number;
    found: boolean;
    comparison: "less" | "greater" | "equal" | "start";
}

interface SearchVisualizerProps {
    data: number[];
    target: number;
    label?: string;
}

export default function SearchVisualizer({ data, target, label = "Binary Search Visualizer" }: SearchVisualizerProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Generate steps for binary search
    const steps = useMemo(() => {
        const searchSteps: SearchStep[] = [];
        let low = 0;
        let high = data.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const val = data[mid];

            if (val === target) {
                searchSteps.push({ low, high, mid, found: true, comparison: "equal" });
                break;
            } else if (val < target) {
                searchSteps.push({ low, high, mid, found: false, comparison: "greater" });
                low = mid + 1;
            } else {
                searchSteps.push({ low, high, mid, found: false, comparison: "less" });
                high = mid - 1;
            }
        }

        if (searchSteps.length === 0 || searchSteps[searchSteps.length - 1].comparison !== "equal") {
            // Not found step if loop finished
            // Add a dummy last step to show it wasn't found if we want, 
            // but let's just stick to the actual search steps.
        }

        return searchSteps;
    }, [data, target]);

    const currentStep = steps[currentStepIndex];

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && currentStepIndex < steps.length - 1) {
            timer = setTimeout(() => {
                setCurrentStepIndex(prev => prev + 1);
            }, 1000);
        } else if (currentStepIndex === steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentStepIndex, steps.length]);

    const handleRestart = () => {
        setCurrentStepIndex(0);
        setIsPlaying(false);
    };

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    return (
        <div className="w-full flex flex-col items-center bg-zinc-900/50 p-2 lg:p-6 rounded-2xl border border-zinc-800 shadow-inner">
            <div className="w-full flex justify-between items-center mb-6">
                <h4 className="text-zinc-400 font-bold text-xs uppercase tracking-widest">{label}</h4>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono">Target: {target}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Step: {currentStepIndex + 1}/{steps.length}</span>
                </div>
            </div>

            {/* Large Array View */}
            <div className="relative w-full h-32 flex items-center justify-center gap-1 overflow-x-auto pb-8 pt-4">
                {data.map((val, idx) => {
                    const isMid = currentStep?.mid === idx;
                    const isLow = currentStep?.low === idx;
                    const isHigh = currentStep?.high === idx;
                    const isInRange = idx >= currentStep?.low && idx <= currentStep?.high;

                    let bgColor = "bg-zinc-800 text-zinc-500 opacity-30";
                    let borderColor = "border-transparent";

                    if (isInRange) {
                        bgColor = "bg-zinc-700 text-zinc-300";
                    }
                    if (isMid) {
                        bgColor = currentStep.found ? "bg-emerald-500 text-white" : "bg-indigo-500 text-white";
                        borderColor = "border-white shadow-[0_0_15px_rgba(99,102,241,0.5)]";
                    }

                    return (
                        <div key={idx} className="flex flex-col items-center shrink-0">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 font-mono text-sm transition-all duration-300 ${bgColor} ${borderColor}`}>
                                {val}
                            </div>

                            {/* Markers */}
                            <div className="h-6 flex items-start gap-1 mt-1">
                                {isLow && <span className="text-[8px] font-bold text-emerald-400 uppercase">L</span>}
                                {isMid && <span className="text-[8px] font-bold text-white uppercase">M</span>}
                                {isHigh && <span className="text-[8px] font-bold text-rose-400 uppercase">H</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Explanation Area */}
            <div className="w-full bg-black/30 rounded-xl p-4 mb-6 border border-white/5">
                <p className="text-sm text-zinc-300">
                    {currentStep?.comparison === "start" && "Starting binary search..."}
                    {currentStep?.comparison === "greater" && (
                        <span>
                            <strong className="text-indigo-400">{data[currentStep.mid]}</strong> is less than <strong className="text-zinc-100">{target}</strong>.
                            Searching the <strong className="text-emerald-400">right half</strong>.
                        </span>
                    )}
                    {currentStep?.comparison === "less" && (
                        <span>
                            <strong className="text-indigo-400">{data[currentStep.mid]}</strong> is greater than <strong className="text-zinc-100">{target}</strong>.
                            Searching the <strong className="text-rose-400">left half</strong>.
                        </span>
                    )}
                    {currentStep?.comparison === "equal" && (
                        <span className="text-emerald-400 font-bold">
                            Target {target} found at index {currentStep.mid}!
                        </span>
                    )}
                    {!currentStep && "Click 'Start' or 'Next' to begin search."}
                </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                <button
                    onClick={handlePrev}
                    disabled={currentStepIndex === 0}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all flex items-center gap-2"
                >
                    {isPlaying ? (
                        <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg> Pause</>
                    ) : (
                        <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg> {currentStepIndex === steps.length - 1 ? "Replay" : "Play"}</>
                    )}
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentStepIndex === steps.length - 1}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <button
                    onClick={handleRestart}
                    className="text-xs text-zinc-500 hover:text-zinc-300 font-bold uppercase tracking-tighter ml-4"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
