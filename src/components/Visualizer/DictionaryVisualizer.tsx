"use client";

import { useState } from "react";

type DictEntry = {
  key: string;
  value: string | number | boolean;
  highlight?: boolean;
};

type DictionaryVisualizerProps = {
  name?: string;
  entries: DictEntry[];
  highlightKey?: string;
};

export function DictionaryVisualizer({
  name = "my_dict",
  entries,
  highlightKey,
}: DictionaryVisualizerProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Dictionary Visualization
        </h3>
        <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
          {name}
        </span>
      </div>

      <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 space-y-2">
        {/* Opening brace */}
        <div className="text-sm font-mono text-zinc-600 dark:text-zinc-400">{`{`}</div>

        {/* Entries */}
        <div className="ml-4 space-y-1">
          {entries.map((entry, index) => {
            const isHighlighted = entry.highlight || entry.key === highlightKey || entry.key === hoveredKey;
            const valueDisplay = typeof entry.value === "string"
              ? `"${entry.value}"`
              : String(entry.value);

            return (
              <div
                key={entry.key}
                className={[
                  "flex flex-wrap items-center gap-2 px-2 py-1.5 rounded transition-all duration-200 cursor-pointer",
                  isHighlighted
                    ? "bg-indigo-100 dark:bg-indigo-900/40 ring-1 ring-indigo-300 dark:ring-indigo-700"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800",
                ].join(" ")}
                onMouseEnter={() => setHoveredKey(entry.key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                {/* Key */}
                <span className="text-sm font-mono text-rose-600 dark:text-rose-400">
                  "{entry.key}"
                </span>

                {/* Colon */}
                <span className="text-zinc-500">:</span>

                {/* Value */}
                <span className={[
                  "text-sm font-mono",
                  typeof entry.value === "number"
                    ? "text-blue-600 dark:text-blue-400"
                    : typeof entry.value === "boolean"
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-emerald-600 dark:text-emerald-400"
                ].join(" ")}>
                  {valueDisplay}
                </span>

                {/* Comma (except last) */}
                {index < entries.length - 1 && (
                  <span className="text-zinc-500">,</span>
                )}

                {/* Access hint on hover */}
                {isHighlighted && (
                  <span className="ml-auto text-[10px] text-indigo-500 dark:text-indigo-400">
                    {name}["{entry.key}"] → {valueDisplay}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Closing brace */}
        <div className="text-sm font-mono text-zinc-600 dark:text-zinc-400">{`}`}</div>
      </div>

      {/* Info box */}
      <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded text-[10px] text-rose-700 dark:text-rose-300">
        💡 Access values using <strong className="font-mono">{name}["key"]</strong> — hover over entries to see access syntax
      </div>
    </div>
  );
}

// Example demos
export const dictDemos = {
  studentMarks: {
    name: "marks",
    entries: [
      { key: "Alex", value: 85 },
      { key: "Sam", value: 92 },
      { key: "Taylor", value: 78 },
    ],
  },
  userProfile: {
    name: "user",
    entries: [
      { key: "name", value: "Alex" },
      { key: "age", value: 21 },
      { key: "is_active", value: true },
    ],
  },
};
