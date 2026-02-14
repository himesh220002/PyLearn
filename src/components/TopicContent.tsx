"use client";


import Link from 'next/link';
import { Topic } from '../data/topics';
import ArrayVisualizer from './Visualizer/ArrayVisualizer';
import LoopVisualizer from './Visualizer/LoopVisualizer';
import StringVisualizer from './Visualizer/StringVisualizer';
import NestedListVisualizer from './Visualizer/NestedListVisualizer';
import SlicingVisualizer from './Visualizer/SlicingVisualizer';
import ListOperationVisualizer from './Visualizer/ListOperationVisualizer';
import { DictionaryVisualizer } from './Visualizer/DictionaryVisualizer';
import NestedDictionaryVisualizer, { NestedDictionaryData } from './Visualizer/NestedDictionaryVisualizer';
import { FlowchartVisualizer } from './Visualizer/FlowchartVisualizer';
import { useProgress } from '@/context/ProgressContext';

interface TopicContentProps {
    topic: Topic;
    prevTopic?: { slug: string; title: string } | null;
    nextTopic?: { slug: string; title: string } | null;
}

export default function TopicContent({ topic, prevTopic, nextTopic }: TopicContentProps) {
    const { isTopicComplete, markTopicComplete, markTopicIncomplete } = useProgress();

    const renderVisualizer = (topic: Topic) => {
        return topic.visualType === 'array' ? (
            <ArrayVisualizer
                data={topic.visualData?.data || []}
                highlightIndices={topic.visualData?.highlightIndices}
                label={topic.visualData?.label || "Array Trace"}
            />
        ) : topic.visualType === 'loop' ? (
            <LoopVisualizer
                data={topic.visualData?.data || []}
                label={topic.visualData?.label || "Execution Flow"}
            />
        ) : topic.visualType === 'string' ? (
            <StringVisualizer
                data={topic.visualData?.data as string[] || []}
                highlightIndices={topic.visualData?.highlightIndices}
                label={topic.visualData?.label || "Character Memory"}
            />
        ) : topic.visualType === 'slicing' ? (
            <SlicingVisualizer
                data={topic.visualData?.data || []}
                sliceRange={topic.visualData?.highlightIndices as [number, number] || [0, 0]}
                label={topic.visualData?.label || "Slice Operation"}
            />
        ) : topic.visualType === 'dictionary' ? (
            <DictionaryVisualizer
                entries={topic.visualData?.data || []}
                name={topic.visualData?.label || "my_dict"}
            />
        ) : topic.visualType === 'flowchart' && topic.visualData ? (
            <FlowchartVisualizer
                nodes={topic.visualData.data.nodes}
                edges={topic.visualData.data.edges}
                title={topic.visualData.label}
            />
        ) : topic.visualType === 'nested_dict' ? (
            <NestedDictionaryVisualizer
                data={(topic.visualData?.data as unknown) as NestedDictionaryData}
                label={topic.visualData?.label || "Nested Dictionary Visualization"}
            />
        ) : topic.visualType === 'nested' ? (
            <NestedListVisualizer
                data={(topic.visualData?.data as unknown) as any[][]}
                label={topic.visualData?.label || "Matrix Visualization"}
            />
        ) : (
            <ArrayVisualizer
                data={topic.visualData?.data || []}
                highlightIndices={topic.visualData?.highlightIndices}
                label={topic.visualData?.label || "Visualization"}
            />
        );
    };

    return (
        <div className="max-w-[1600px] mx-auto py-12 px-4 sm:px-6 lg:px-12 bg-zinc-50/50 dark:bg-zinc-950/20 min-h-screen">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800">
                            {topic.level}
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-500 text-sm">Python Framework • Core Concepts</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                        {topic.title}
                    </h1>
                </div>

                <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex -space-x-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900" />
                        ))}
                    </div>
                    <span>Join 1.2k+ learners</span>
                </div>
            </div>

            {/* Wide Visualizer Layout */}
            {topic.layout === "wide" && (
                <div className="mb-12">
                    <div className="bg-zinc-900 dark:bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <div>
                                <h3 className="text-sm font-black text-indigo-500 uppercase tracking-[0.2em] mb-2">
                                    Interactive Visual Lab
                                </h3>
                                <p className="text-zinc-400 max-w-lg">
                                    Visualize the concepts in real-time. Watch how data transforms and flows.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold border border-zinc-700">Live Demo</span>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center bg-black/20 rounded-2xl border border-white/5 p-8 min-h-[300px]">
                            {/* Reusing the visualizer switch logic */}
                            {renderVisualizer(topic)}
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Concept Explanation */}
                    <div className="space-y-10">
                        {topic.sections.map((section, index) => (
                            <section key={index} className="group animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="mt-1.5 h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                    <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
                                        {section.heading}
                                    </h3>
                                </div>
                                <div className="pl-6 border-l-2 border-zinc-100 dark:border-zinc-900">
                                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-medium">
                                        {section.body}
                                    </p>

                                    {section.codeExample && (
                                        <div className="relative group/code mb-6">
                                            <div className="absolute inset-0 bg-indigo-500/5 blur-xl group-hover/code:bg-indigo-500/10 transition-colors duration-500" />
                                            <pre className="relative bg-[#0d0d0d] border border-white/5 shadow-2xl rounded-xl overflow-x-auto text-sm font-mono p-6">
                                                <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2">
                                                    <div className="flex gap-1.5">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                                                    </div>
                                                    <span className="text-[10px] text-zinc-600 font-bold  tracking-widest">Python</span>
                                                </div>
                                                <code className="text-indigo-300">
                                                    {section.codeExample}
                                                </code>
                                            </pre>
                                        </div>
                                    )}

                                    {section.visualData && (
                                        <div className="my-12 p-8 bg-zinc-900 rounded-[2.5rem] border-2 border-zinc-800 shadow-2xl shadow-black/50 overflow-hidden">
                                            <div className={`${section.visualData.type === 'nested' ? 'min-h-[520px]' : 'min-h-[280px]'} w-full flex items-center justify-center`}>
                                                {section.visualData.type === 'array' ? (
                                                    <ArrayVisualizer
                                                        data={section.visualData.data}
                                                        highlightIndices={section.visualData.highlightIndices}
                                                        label={section.visualData.label}
                                                    />
                                                ) : section.visualData.type === 'loop' ? (
                                                    <LoopVisualizer
                                                        data={section.visualData.data}
                                                        label={section.visualData.label}
                                                    />
                                                ) : section.visualData.type === 'string' ? (
                                                    <StringVisualizer
                                                        data={section.visualData.data}
                                                        highlightIndices={section.visualData.highlightIndices}
                                                        label={section.visualData.label}
                                                    />
                                                ) : section.visualData.type === 'slicing' ? (
                                                    <SlicingVisualizer
                                                        data={section.visualData.data}
                                                        sliceRange={section.visualData.highlightIndices as [number, number]}
                                                        label={section.visualData.label}
                                                    />
                                                ) : section.visualData.type === 'dictionary' ? (
                                                    <DictionaryVisualizer
                                                        entries={section.visualData.data}
                                                        name={section.visualData.label}
                                                    />
                                                ) : section.visualData.type === 'nested_dict' ? (
                                                    <NestedDictionaryVisualizer
                                                        data={section.visualData.data as NestedDictionaryData}
                                                        label={section.visualData.label}
                                                    />
                                                ) : section.visualData.type === 'flowchart' ? (
                                                    <FlowchartVisualizer
                                                        nodes={section.visualData.data.nodes}
                                                        edges={section.visualData.data.edges}
                                                        title={section.visualData.label}
                                                    />
                                                ) : section.visualData.type === 'nested' ? (
                                                    <NestedListVisualizer
                                                        data={(section.visualData.data as unknown) as any[][]}
                                                        label={section.visualData.label}
                                                    />
                                                ) : section.visualData.type === 'operation' ? (
                                                    <ListOperationVisualizer
                                                        operation={section.visualData.operation as any}
                                                        before={section.visualData.before as any[]}
                                                        after={section.visualData.after as any[]}
                                                        highlightIndex={section.visualData.highlightIndex}
                                                        operationLabel={section.visualData.label}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Practice Problem */}
                    {topic.practiceId && (
                        <section className="relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-xl shadow-indigo-500/20 group">
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl group-hover:bg-white/20 transition-all duration-700" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="max-w-xl">
                                    <h3 className="text-2xl font-bold mb-3">Master this concept</h3>
                                    <p className="text-indigo-100 text-lg font-medium">
                                        Hands-on practice is the fastest way to learn. Head over to our interactive workspace to solve this topic's challenge.
                                    </p>
                                </div>
                                <Link
                                    href={`/editor?problem=${topic.practiceId}`}
                                    className="whitespace-nowrap inline-flex items-center px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-indigo-50 hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                                >
                                    Launch Editor
                                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </section>
                    )}

                    {/* Completion Checkbox */}
                    <div className="mt-12 flex justify-center">
                        <label className="group flex items-center gap-4 cursor-pointer p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300">
                            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${isTopicComplete(topic.id) ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-400 group-hover:border-emerald-500'}`}>
                                {isTopicComplete(topic.id) && (
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isTopicComplete(topic.id)}
                                onChange={(e) => e.target.checked ? markTopicComplete(topic.id) : markTopicIncomplete(topic.id)}
                            />
                            <span className={`text-lg font-semibold transition-colors ${isTopicComplete(topic.id) ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200'}`}>
                                {isTopicComplete(topic.id) ? 'Topic Completed!' : 'Mark as Completed'}
                            </span>
                        </label>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-12 border-t border-zinc-200 dark:border-zinc-800">
                        {prevTopic ? (
                            <Link
                                href={`/topics/${prevTopic.slug}`}
                                className="group flex flex-col items-start gap-1"
                            >
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Previous Topic</span>
                                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    ← {prevTopic.title}
                                </span>
                            </Link>
                        ) : <div />}

                        {nextTopic && (
                            <Link
                                href={`/topics/${nextTopic.slug}`}
                                className="group flex flex-col items-end gap-1 text-right"
                            >
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Next Topic</span>
                                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {nextTopic.title} →
                                </span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Sidebar / Visualization Area */}
                <div className="lg:col-span-4">
                    <div className="sticky top-12 space-y-8">
                        {/* Only show sidebar visualizer if NOT wide layout */}
                        {topic.layout !== "wide" && (
                            <div className="bg-zinc-900 dark:bg-zinc-900 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em]">
                                        Visual Lab
                                    </h3>
                                    <div className="flex gap-1">
                                        <div className="h-1 w-4 rounded-full bg-indigo-500" />
                                        <div className="h-1 w-1 rounded-full bg-indigo-200 dark:bg-zinc-800" />
                                    </div>
                                </div>

                                <div className="min-h-[250px] flex items-center justify-center">
                                    {renderVisualizer(topic)}
                                </div>
                            </div>
                        )}

                        {topic.practiceId ? (
                            <Link
                                href={`/editor?problem=${topic.practiceId}`}
                                className="group/challenge p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-white flex items-center gap-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-800/80 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
                            >
                                <div className="h-12 w-12 shrink-0 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover/challenge:bg-indigo-500 group-hover/challenge:text-white transition-colors duration-300">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold group-hover/challenge:text-indigo-300 transition-colors">New Challenge available!</h4>
                                    <p className="text-xs text-zinc-500 group-hover/challenge:text-zinc-400 transition-colors">Master {topic.title} with a hands-on task.</p>
                                </div>
                                <div className="opacity-0 -translate-x-2 group-hover/challenge:opacity-100 group-hover/challenge:translate-x-0 transition-all duration-300">
                                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        ) : (
                            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 text-zinc-500 flex items-center gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-600">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold">Concept Overview</h4>
                                    <p className="text-xs text-zinc-600">Explore the visualization above.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
