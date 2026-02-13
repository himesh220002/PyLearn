"use client";

import { useState, useEffect } from "react";

type Variable = {
  name: string;
  value: string | number | boolean | null;
  type: "int" | "float" | "str" | "bool" | "None" | "list" | "dict";
  highlight?: boolean;
};

type VariableVisualizerProps = {
  variables: Variable[];
  title?: string;
  animate?: boolean;
};

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  int: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  float: { bg: "bg-cyan-50 dark:bg-cyan-900/20", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800" },
  str: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800" },
  bool: { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800" },
  None: { bg: "bg-zinc-50 dark:bg-zinc-800", text: "text-zinc-500 dark:text-zinc-400", border: "border-zinc-200 dark:border-zinc-700" },
  list: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800" },
  dict: { bg: "bg-rose-50 dark:bg-rose-900/20", text: "text-rose-700 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800" },
};

function formatValue(value: string | number | boolean | null, type: string): string {
  if (value === null) return "None";
  if (type === "str") return `"${value}"`;
  if (type === "bool") return value ? "True" : "False";
  return String(value);
}

export function VariableVisualizer({
  variables,
  title = "Variables in Memory",
  animate = true,
}: VariableVisualizerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {variables.map((variable, index) => {
          const colors = typeColors[variable.type] || typeColors.int;
          return (
            <div
              key={variable.name}
              className={[
                "flex flex-col rounded-lg border overflow-hidden",
                colors.border,
                animate && mounted ? "animate-fade-in" : "",
                variable.highlight ? "ring-2 ring-indigo-500 ring-offset-2" : "",
              ].join(" ")}
              style={animate ? { animationDelay: `${index * 100}ms` } : {}}
            >
              {/* Variable name header */}
              <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                  {variable.name}
                </span>
              </div>

              {/* Value box */}
              <div className={["px-4 py-3", colors.bg].join(" ")}>
                <span className={["text-sm font-mono font-medium", colors.text].join(" ")}>
                  {formatValue(variable.value, variable.type)}
                </span>
              </div>

              {/* Type label */}
              <div className="px-3 py-1 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                  {variable.type}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Memory pointer visualization */}
      <div className="mt-2 p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] text-zinc-500 dark:text-zinc-400">
        💡 Each variable is a <strong>name</strong> that points to a <strong>value</strong> stored in memory
      </div>
    </div>
  );
}

// Example demos
export const variableDemos = {
  basicTypes: [
    { name: "age", value: 21, type: "int" as const },
    { name: "price", value: 19.99, type: "float" as const },
    { name: "name", value: "Alex", type: "str" as const },
    { name: "is_student", value: true, type: "bool" as const },
  ],
  assignment: [
    { name: "x", value: 10, type: "int" as const, highlight: true },
    { name: "y", value: 10, type: "int" as const },
    { name: "message", value: "Hello", type: "str" as const },
  ],
};
