"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

interface GraphData {
    nodes: { id: string }[];
    edges: { source: string; target: string; weight: number }[];
}

interface GraphStep {
    visitedNodes: Set<string>;
    visitedEdges: Set<string>;
    frontierNodes: Set<string>;
    currentNodes: Set<string>;
    distances: Record<string, number>;
    explanation: string;
}

interface GraphVisualizerProps {
    data: GraphData;
    algorithm: "bfs" | "dfs" | "dijkstra" | "bellman-ford";
    startNode: string;
    endNode?: string;
    label?: string;
}

export default function GraphVisualizer({ data: inputData, algorithm, startNode, label }: GraphVisualizerProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // 1. Generate Algorithm Steps
    const steps = useMemo(() => {
        const algSteps: GraphStep[] = [];
        const { nodes, edges } = inputData;

        if (algorithm === "bfs") {
            const visited = new Set<string>();
            const queue: string[] = [startNode];
            const distances: Record<string, number> = {};
            nodes.forEach(n => distances[n.id] = Infinity);
            distances[startNode] = 0;
            visited.add(startNode);

            algSteps.push({
                visitedNodes: new Set([startNode]), visitedEdges: new Set(), frontierNodes: new Set(),
                currentNodes: new Set([startNode]), distances: { ...distances },
                explanation: `Starting BFS at ${startNode}. Distance set to 0.`
            });

            while (queue.length > 0) {
                const node = queue.shift()!;
                const neighbors = edges.filter(e => e.source === node || e.target === node)
                    .map(e => ({ id: e.source === node ? e.target : e.source, idx: edges.indexOf(e) }));

                algSteps.push({
                    visitedNodes: new Set(visited), visitedEdges: new Set(algSteps[algSteps.length - 1].visitedEdges),
                    frontierNodes: new Set(queue), currentNodes: new Set([node]), distances: { ...distances },
                    explanation: `Visiting ${node}. Checking its ${neighbors.length} neighbors.`
                });

                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor.id)) {
                        const currentEdges = new Set(algSteps[algSteps.length - 1].visitedEdges);
                        currentEdges.add(neighbor.idx.toString());

                        algSteps.push({
                            visitedNodes: new Set(visited), visitedEdges: currentEdges,
                            frontierNodes: new Set(queue), currentNodes: new Set([node]), distances: { ...distances },
                            explanation: `Exploring path ${node} → ${neighbor.id}...`
                        });

                        visited.add(neighbor.id); queue.push(neighbor.id);
                        distances[neighbor.id] = distances[node] + 1;

                        algSteps.push({
                            visitedNodes: new Set(visited), visitedEdges: currentEdges,
                            frontierNodes: new Set(queue), currentNodes: new Set([node]), distances: { ...distances },
                            explanation: `Discovered unvisited node ${neighbor.id}! Level: ${distances[node]} + 1 = ${distances[neighbor.id]}.`
                        });
                    }
                }
            }
        } else if (algorithm === "dfs") {
            const visited = new Set<string>();
            const stack: { node: string; edge?: string }[] = [{ node: startNode }];
            algSteps.push({ visitedNodes: new Set(), visitedEdges: new Set(), frontierNodes: new Set([startNode]), currentNodes: new Set(), distances: {}, explanation: "Init DFS stack." });

            while (stack.length > 0) {
                const { node, edge } = stack.pop()!;
                if (visited.has(node)) continue;
                visited.add(node);
                const currentEdges = new Set(algSteps.length > 0 ? Array.from(algSteps[algSteps.length - 1].visitedEdges) : []);
                if (edge) currentEdges.add(edge);

                algSteps.push({
                    visitedNodes: new Set(visited), visitedEdges: currentEdges,
                    frontierNodes: new Set(stack.map(s => s.node)), currentNodes: new Set([node]), distances: {},
                    explanation: `Visiting ${node}. Depth-first search moves as deep as possible.`
                });

                edges.filter(e => e.source === node || e.target === node).reverse().forEach(e => {
                    const n = e.source === node ? e.target : e.source;
                    if (!visited.has(n)) {
                        stack.push({ node: n, edge: edges.indexOf(e).toString() });
                        algSteps.push({
                            visitedNodes: new Set(visited), visitedEdges: currentEdges,
                            frontierNodes: new Set(stack.map(s => s.node)), currentNodes: new Set([node]), distances: {},
                            explanation: `Found unvisited neighbor ${n}. Adding to stack for later depth exploration.`
                        });
                    }
                });
            }
        } else if (algorithm === "dijkstra") {
            const dist: Record<string, number> = {};
            nodes.forEach(n => dist[n.id] = Infinity);
            dist[startNode] = 0;
            const visited = new Set<string>(), pq = [startNode];

            while (pq.length > 0) {
                pq.sort((a, b) => dist[a] - dist[b]);
                const node = pq.shift()!;
                if (visited.has(node)) continue;
                visited.add(node);
                algSteps.push({ visitedNodes: new Set(visited), visitedEdges: new Set(algSteps.length > 0 ? algSteps[algSteps.length - 1].visitedEdges : []), frontierNodes: new Set(pq), currentNodes: new Set([node]), distances: { ...dist }, explanation: `Selected ${node} from priority queue (min distance ${dist[node]}).` });

                edges.filter(e => e.source === node || e.target === node).forEach(e => {
                    const n = e.source === node ? e.target : e.source;
                    if (visited.has(n)) return;
                    const newD = dist[node] + e.weight;
                    const relaxed = newD < dist[n];
                    if (relaxed) { dist[n] = newD; if (!pq.includes(n)) pq.push(n); }
                    const curEdges = new Set(algSteps[algSteps.length - 1].visitedEdges);
                    curEdges.add(edges.indexOf(e).toString());
                    algSteps.push({ visitedNodes: new Set(visited), visitedEdges: curEdges, frontierNodes: new Set(pq), currentNodes: new Set([node]), distances: { ...dist }, explanation: relaxed ? `Relaxing edge to ${n}. Distance improved to ${newD}.` : `Checking edge to ${n}. Existing path ${dist[n]} is already optimal.` });
                });
            }
        } else if (algorithm === "bellman-ford") {
            const dist: Record<string, number> = {};
            nodes.forEach(n => dist[n.id] = Infinity);
            dist[startNode] = 0;
            algSteps.push({ visitedNodes: new Set(), visitedEdges: new Set(), frontierNodes: new Set(), currentNodes: new Set(), distances: { ...dist }, explanation: "Initializing distances to ∞." });

            for (let i = 0; i < nodes.length - 1; i++) {
                algSteps.push({ visitedNodes: new Set(), visitedEdges: new Set(), frontierNodes: new Set(), currentNodes: new Set(), distances: { ...dist }, explanation: `Iteration ${i + 1}: Relaxing all edges.` });
                edges.forEach((e, idx) => {
                    const u = e.source, v = e.target, w = e.weight;
                    let relaxed = false;
                    if (dist[u] !== Infinity && dist[u] + w < dist[v]) { dist[v] = dist[u] + w; relaxed = true; }
                    algSteps.push({ visitedNodes: new Set([u, v]), visitedEdges: new Set([idx.toString()]), frontierNodes: new Set(), currentNodes: new Set([u]), distances: { ...dist }, explanation: relaxed ? `Relaxed ${u}→${v}. Distance to ${v} is now ${dist[v]}.` : `Checked ${u}→${v}, no relaxation needed.` });
                });
            }
        }

        return algSteps.length ? algSteps : [{ visitedNodes: new Set(), visitedEdges: new Set(), frontierNodes: new Set(), currentNodes: new Set(), distances: {}, explanation: "Ready." }];
    }, [inputData, algorithm, startNode]);

    const currentStep = steps[currentStepIndex];
    const latestStep = useRef(currentStep);

    useEffect(() => { setCurrentStepIndex(0); setIsPlaying(false); }, [algorithm, inputData]);

    // 2. D3 Simulation Setup
    useEffect(() => {
        if (!svgRef.current) return;
        const width = 600, height = 400; // Fixed simulation area
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const data = JSON.parse(JSON.stringify(inputData)) as GraphData;

        svg.append("defs").append("marker").attr("id", "arrow").attr("viewBox", "0 -5 10 10").attr("refX", 20).attr("refY", 0).attr("markerWidth", 5).attr("markerHeight", 5).attr("orient", "auto").append("path").attr("d", "M0,-5L10,0L0,5").attr("fill", "#71717a");

        const simulation = d3.forceSimulation(data.nodes as any)
            .force("link", d3.forceLink(data.edges as any).id((d: any) => d.id).distance(65))
            .force("charge", d3.forceManyBody().strength(-150))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(25));

        const links = svg.append("g").selectAll("line").data(data.edges).enter().append("line").attr("stroke", "#3f3f46").attr("stroke-width", 2).attr("marker-end", "url(#arrow)");
        const nodes = svg.append("g").selectAll("circle").data(data.nodes).enter().append("circle").attr("r", 15).attr("fill", "#27272a").attr("stroke", "#52525b").attr("stroke-width", 2);
        const labels = svg.append("g").selectAll("text").data(data.nodes).enter().append("text").attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", "#fafafa").attr("font-size", "10px").attr("font-weight", "bold").text(d => d.id);
        const weights = svg.append("g").selectAll("text").data(data.edges).enter().append("text").attr("text-anchor", "middle").attr("fill", "#52525b").attr("font-size", "9px").text(d => d.weight);

        simulation.on("tick", () => {
            // Keep within bounds
            data.nodes.forEach((d: any) => {
                d.x = Math.max(30, Math.min(width - 30, d.x));
                d.y = Math.max(30, Math.min(height - 30, d.y));
            });

            links.attr("x1", (d: any) => d.source.x).attr("y1", (d: any) => d.source.y).attr("x2", (d: any) => d.target.x).attr("y2", (d: any) => d.target.y);
            nodes.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
            labels.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
            weights.attr("x", (d: any) => (d.source.x + d.target.x) / 2).attr("y", (d: any) => (d.source.y + d.target.y) / 2 - 5);
        });

        (svgRef.current as any).update = () => {
            const step = latestStep.current;
            if (!step) return;
            nodes.attr("fill", (d: any) => {
                if (step.currentNodes.has(d.id)) return "#6366f1";
                if (step.visitedNodes.has(d.id)) return "#10b981";
                if (step.frontierNodes.has(d.id)) return "#f59e0b";
                return "#27272a";
            }).attr("stroke", (d: any) => step.currentNodes.has(d.id) ? "#fff" : "#52525b").attr("stroke-width", (d: any) => step.currentNodes.has(d.id) ? 3 : 2);
            links.attr("stroke", (d: any, i) => step.visitedEdges.has(i.toString()) ? "#10b981" : "#3f3f46").attr("stroke-width", (d: any, i) => step.visitedEdges.has(i.toString()) ? 3 : 2);
        };

        (svgRef.current as any).update();
        return () => { simulation.stop(); };
    }, [inputData, startNode]);

    // 3. Highlight Update Logic
    useEffect(() => {
        latestStep.current = currentStep;
        if ((svgRef.current as any)?.update) (svgRef.current as any).update();
    }, [currentStep]);

    // 4. Playback Timer
    useEffect(() => {
        let timer: any;
        if (isPlaying && currentStepIndex < steps.length - 1) {
            timer = setTimeout(() => setCurrentStepIndex(prev => prev + 1), 1000);
        } else { setIsPlaying(false); }
        return () => clearTimeout(timer);
    }, [isPlaying, currentStepIndex]);

    return (
        <div className="w-full h-full flex flex-col bg-zinc-950 rounded-2xl border border-zinc-800 p-2 lg:p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h4 className="text-zinc-400 font-bold text-sm uppercase tracking-wider mb-1">{label || algorithm.toUpperCase() + " VISUALIZER"}</h4>
                    <p className="text-[10px] text-zinc-600 font-mono tracking-tighter">STEP {currentStepIndex + 1} / {steps.length}</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" /> <span className="text-[9px] text-zinc-500 font-medium tracking-tight">Visited</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm" /> <span className="text-[9px] text-zinc-500 font-medium tracking-tight">Active</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" /> <span className="text-[9px] text-zinc-500 font-medium tracking-tight">Frontier</span></div>
                </div>
            </div>

            <div className="flex-1 relative min-h-[350px] bg-zinc-900/40 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm pt-[20px]">
                <svg ref={svgRef} className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet" />
                {(algorithm === "bfs" || algorithm === "dijkstra" || algorithm === "bellman-ford") && currentStep?.distances && (
                    <div className="absolute top-[20px] left-4 p-3 bg-black/85 backdrop-blur-xl rounded-xl border border-white/10 max-h-[220px] overflow-y-auto shadow-2xl z-20 transition-all duration-300">
                        <table className="text-[10px] font-mono text-zinc-400">
                            <thead><tr className="border-b border-zinc-800/50"><th className="pr-6 pb-2 text-left">NODE</th><th className="pb-2 text-right">{algorithm === "bfs" ? "LEVEL" : "COST"}</th></tr></thead>
                            <tbody>{Object.entries(currentStep.distances).sort().map(([n, d]) => (
                                <tr key={n} className={`${currentStep.currentNodes.has(n) ? "text-indigo-400 font-bold" : ""} transition-colors`}>
                                    <td className="pr-6 py-1.5">{n}</td><td className="py-1.5 text-right">{d === Infinity ? "∞" : d}</td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="mt-6 bg-indigo-600/5 border border-indigo-500/10 p-4 rounded-xl min-h-[70px] flex items-center shadow-inner">
                <p className="text-xs text-zinc-300 leading-relaxed font-medium"><span className="text-indigo-400 mr-2 font-black">LOG:</span>{currentStep?.explanation}</p>
            </div>

            <div className="mt-6 flex justify-center items-center gap-2 sm:gap-4 lg:gap-6">
                <button onClick={() => { setCurrentStepIndex(Math.max(0, currentStepIndex - 1)); setIsPlaying(false); }} disabled={currentStepIndex === 0} className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-white transition-all disabled:opacity-20 active:scale-90"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5} /></svg></button>
                <button onClick={() => setIsPlaying(!isPlaying)} className={`px-2 sm:px-6 lg:px-10 py-2 sm:py-3.5 ${isPlaying ? 'bg-zinc-800' : 'bg-indigo-600 hover:bg-indigo-500'} rounded-2xl text-[11px] font-black text-white shadow-2xl transition-all active:scale-95 uppercase tracking-widest`}>
                    {isPlaying ? "PAUSE" : currentStepIndex === steps.length - 1 ? "REPLAY" : "START VISUALIZATION"}
                </button>
                <button onClick={() => { setCurrentStepIndex(Math.min(steps.length - 1, currentStepIndex + 1)); setIsPlaying(false); }} disabled={currentStepIndex === steps.length - 1} className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-white transition-all disabled:opacity-20 active:scale-90"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={2.5} /></svg></button>
                <button onClick={() => { setCurrentStepIndex(0); setIsPlaying(false); }} className="text-[10px] tracking-[0.2em] text-zinc-600 hover:text-zinc-300 border border-zinc-800 rounded-xl p-3 font-black uppercase transition-all hover:scale-105 active:scale-95 ml-4">Reset</button>
            </div>
        </div>
    );
}
