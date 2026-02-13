"use client";

import { useState } from "react";

type FlowNode = {
  id: string;
  type: "start" | "condition" | "action" | "end";
  label: string;
  code?: string;
};

type FlowEdge = {
  from: string;
  to: string;
  label?: string; // "True", "False", etc.
};

type FlowchartVisualizerProps = {
  nodes: FlowNode[];
  edges: FlowEdge[];
  activeNodeId?: string;
  title?: string;
};

const nodeStyles: Record<FlowNode["type"], string> = {
  start: "rounded-full bg-emerald-500 text-white",
  condition: "rounded-lg bg-amber-900/30 text-amber-200 border-2 border-amber-600 transform rotate-0",
  action: "rounded-md bg-indigo-900/30 text-indigo-200 border border-indigo-700",
  end: "rounded-full bg-zinc-600 text-white",
};

export function FlowchartVisualizer({
  nodes,
  edges,
  activeNodeId,
  title = "Decision Flowchart",
}: FlowchartVisualizerProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodeById = (id: string) => nodes.find((n) => n.id === id);
  const getOutgoingEdges = (id: string) => edges.filter((e) => e.from === id);

  // Simple vertical layout with cycle detection
  const renderNode = (node: FlowNode, depth: number = 0, path: Set<string> = new Set()) => {
    const isActive = node.id === activeNodeId;
    const isHovered = node.id === hoveredNode;
    const outgoing = getOutgoingEdges(node.id);

    // Cycle detection
    if (path.has(node.id)) {
      return (
        <div className="flex flex-col items-center mt-2 opacity-50">
          <div className="w-px h-4 bg-zinc-600 border-dashed" />
          <div className="px-2 py-1 rounded bg-zinc-800 text-zinc-500 text-[10px] border border-zinc-700">
            ⟳ Repeat
          </div>
        </div>
      );
    }

    const newPath = new Set(path).add(node.id);

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Node */}
        <div
          className={[
            "px-4 py-2 text-xs font-medium text-center min-w-[100px] cursor-pointer transition-all duration-200",
            nodeStyles[node.type],
            isActive ? "ring-2 ring-emerald-500 ring-offset-2 scale-105" : "",
            isHovered && !isActive ? "scale-105 shadow-md" : "",
          ].join(" ")}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          {node.type === "condition" ? (
            <div className="transform">
              <span className="text-[10px] text-amber-400">if</span>
              <br />
              {node.label}
            </div>
          ) : (
            node.label
          )}
        </div>

        {/* Code preview on hover */}
        {(isHovered || isActive) && node.code && (
          <div className="mt-1 px-2 py-1 bg-zinc-800 text-zinc-200 rounded text-[10px] font-mono">
            {node.code}
          </div>
        )}

        {/* Outgoing edges */}
        {outgoing.length > 0 && (
          <div className="flex flex-col items-center mt-2">
            {/* Arrow down */}
            <div className="w-px h-4 bg-zinc-600" />

            {outgoing.length === 1 ? (
              // Single path
              <>
                <div className="text-zinc-400">↓</div>
                {renderNode(getNodeById(outgoing[0].to)!, depth + 1, newPath)}
              </>
            ) : (
              // Branch (True/False)
              <div className="flex gap-8">
                {outgoing.map((edge) => {
                  const targetNode = getNodeById(edge.to);
                  if (!targetNode) return null;

                  return (
                    <div key={edge.to} className="flex flex-col items-center">
                      <span className={[
                        "text-[10px] font-medium px-2 py-0.5 rounded-full",
                        edge.label === "True"
                          ? "bg-emerald-900/30 text-emerald-300"
                          : "bg-red-900/30 text-red-300",
                      ].join(" ")}>
                        {edge.label}
                      </span>
                      <div className="w-px h-4 bg-zinc-600" />
                      <div className="text-zinc-400">↓</div>
                      {renderNode(targetNode, depth + 1, newPath)}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const startNode = nodes.find((n) => n.type === "start");

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        {title}
      </h3>

      <div className="p-4 bg-zinc-900 rounded-lg overflow-x-auto">
        <div className="flex justify-center min-w-max">
          {startNode && renderNode(startNode)}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-[10px] text-zinc-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>Start/End</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-amber-700" />
          <span>Condition</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-indigo-700" />
          <span>Action</span>
        </div>
      </div>
    </div>
  );
}

// Example demos
export const flowchartDemos = {
  gradeClassifier: {
    title: "Grade Classification",
    nodes: [
      { id: "start", type: "start" as const, label: "Start" },
      { id: "check90", type: "condition" as const, label: "score >= 90", code: "if score >= 90:" },
      { id: "gradeA", type: "action" as const, label: "Grade = A", code: 'print("A")' },
      { id: "check75", type: "condition" as const, label: "score >= 75", code: "elif score >= 75:" },
      { id: "gradeB", type: "action" as const, label: "Grade = B", code: 'print("B")' },
      { id: "gradeC", type: "action" as const, label: "Grade = C/D", code: "else: ..." },
      { id: "end", type: "end" as const, label: "End" },
    ],
    edges: [
      { from: "start", to: "check90" },
      { from: "check90", to: "gradeA", label: "True" },
      { from: "check90", to: "check75", label: "False" },
      { from: "check75", to: "gradeB", label: "True" },
      { from: "check75", to: "gradeC", label: "False" },
      { from: "gradeA", to: "end" },
      { from: "gradeB", to: "end" },
      { from: "gradeC", to: "end" },
    ],
  },
  passFailCheck: {
    title: "Pass/Fail Check",
    nodes: [
      { id: "start", type: "start" as const, label: "Start" },
      { id: "check", type: "condition" as const, label: "marks >= 40", code: "if marks >= 40:" },
      { id: "pass", type: "action" as const, label: "Print 'Pass'", code: 'print("Pass")' },
      { id: "fail", type: "action" as const, label: "Print 'Fail'", code: 'print("Fail")' },
      { id: "end", type: "end" as const, label: "End" },
    ],
    edges: [
      { from: "start", to: "check" },
      { from: "check", to: "pass", label: "True" },
      { from: "check", to: "fail", label: "False" },
      { from: "pass", to: "end" },
      { from: "fail", to: "end" },
    ],
  },
};
