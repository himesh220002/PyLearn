"use client";

import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

type OperationType = "append" | "insert" | "remove" | "pop" | "slice" | "reverse";

interface ListOperationVisualizerProps {
  operation: OperationType;
  before: (number | string)[];
  after: (number | string)[];
  highlightIndex?: number;
  operationLabel?: string;
}

export default function ListOperationVisualizer({
  operation,
  before,
  after,
  highlightIndex = -1,
  operationLabel = "",
}: ListOperationVisualizerProps) {
  const [showAfter, setShowAfter] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentData = showAfter ? after : before;

  const runAnimation = () => {
    setIsAnimating(true);
    setShowAfter(false);

    setTimeout(() => {
      setShowAfter(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }, 800);
  };

  const reset = () => {
    setShowAfter(false);
    setIsAnimating(false);
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const updateVisuals = () => {
      if (!svgRef.current || !containerRef.current) return;

      if (!svgRef.current || !containerRef.current) return;

      // Force dark mode
      const containerWidth = containerRef.current.clientWidth || 600;
      const height = 180;

      // Dynamic box sizing
      const maxLen = Math.max(...currentData.map(d => String(d).length));
      const boxWidth = Math.max(50, Math.min(80, maxLen * 10 + 20));
      const boxHeight = 45;
      const gap = 8;

      const totalWidth = currentData.length * (boxWidth + gap) - gap;

      const viewBoxWidth = Math.max(containerWidth, totalWidth + 60);
      const startX = (viewBoxWidth - totalWidth) / 2;

      const svg = d3
        .select(svgRef.current)
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", `0 0 ${viewBoxWidth} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("overflow", "visible");

      svg.selectAll("*").remove();

      // Operation label at top
      const opColors: Record<OperationType, string> = {
        append: "#10b981",
        insert: "#6366f1",
        remove: "#ef4444",
        pop: "#f59e0b",
        slice: "#8b5cf6",
        reverse: "#06b6d4",
      };

      svg
        .append("text")
        .attr("x", viewBoxWidth / 2)
        .attr("y", 22)
        .attr("text-anchor", "middle")
        .attr("fill", opColors[operation])
        .attr("class", "font-mono font-bold text-sm")
        .text(operationLabel || `list.${operation}()`);

      // State label
      svg
        .append("text")
        .attr("x", viewBoxWidth / 2)
        .attr("y", 42)
        .attr("text-anchor", "middle")
        .attr("class", "fill-zinc-500 text-xs font-semibold uppercase tracking-wider")
        .text(showAfter ? "After" : "Before");

      const g = svg.append("g").attr("transform", `translate(${startX}, 75)`); // Moved down from 60

      // Draw boxes with animation
      const boxes = g.selectAll("rect")
        .data(currentData)
        .enter()
        .append("rect")
        .attr("x", (_, i) => i * (boxWidth + gap))
        .attr("y", 0)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("rx", 8)
        .attr("fill", (_, i) => {
          if (showAfter && i === highlightIndex) return opColors[operation];
          if (!showAfter && operation === "remove" && i === highlightIndex) return "#ef4444";
          if (!showAfter && operation === "pop" && i === highlightIndex) return "#f59e0b";
          return "#27272a";
        })
        .attr("stroke", (_, i) => {
          if (showAfter && i === highlightIndex) return opColors[operation];
          if (!showAfter && (operation === "remove" || operation === "pop") && i === highlightIndex) return opColors[operation];
          return "#3f3f46";
        })
        .attr("stroke-width", 2)
        .attr("opacity", 0)
        .attr("class", "transition-all duration-300");

      // Animate boxes appearing
      boxes.transition()
        .duration(300)
        .delay((_, i) => i * 50)
        .attr("opacity", 1);

      // Values
      const fontSize = maxLen > 6 ? 11 : maxLen > 4 ? 13 : 15;

      g.selectAll(".value")
        .data(currentData)
        .enter()
        .append("text")
        .attr("x", (_, i) => i * (boxWidth + gap) + boxWidth / 2)
        .attr("y", boxHeight / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-size", fontSize)
        .attr("class", (_, i) => {
          const isHighlighted = (showAfter && i === highlightIndex) ||
            (!showAfter && (operation === "remove" || operation === "pop") && i === highlightIndex);
          return isHighlighted
            ? "fill-white font-mono font-bold"
            : "fill-zinc-100 font-mono font-semibold";
        })
        .attr("opacity", 0)
        .text(d => d)
        .transition()
        .duration(300)
        .delay((_, i) => i * 50 + 100)
        .attr("opacity", 1);

      // Index labels
      g.selectAll(".index")
        .data(currentData)
        .enter()
        .append("text")
        .attr("x", (_, i) => i * (boxWidth + gap) + boxWidth / 2)
        .attr("y", boxHeight + 18)
        .attr("text-anchor", "middle")
        .attr("font-size", 10)
        .attr("class", "fill-zinc-500 font-mono font-bold")
        .text((_, i) => i);

      // Arrow indicator for highlighted index
      if (highlightIndex >= 0 && highlightIndex < currentData.length) {
        const arrowX = highlightIndex * (boxWidth + gap) + boxWidth / 2;

        if (!showAfter && (operation === "remove" || operation === "pop")) {
          // Show "removing" indicator
          g.append("text")
            .attr("x", arrowX)
            .attr("y", -12)
            .attr("text-anchor", "middle")
            .attr("fill", opColors[operation])
            .attr("class", "text-lg")
            .text("✕");
        } else if (showAfter && (operation === "append" || operation === "insert")) {
          // Show "added" indicator
          g.append("text")
            .attr("x", arrowX)
            .attr("y", -12)
            .attr("text-anchor", "middle")
            .attr("fill", opColors[operation])
            .attr("class", "text-lg")
            .text("▼");
        }
      }

      // Length indicator
      svg
        .append("text")
        .attr("x", viewBoxWidth / 2)
        .attr("y", height - 8)
        .attr("text-anchor", "middle")
        .attr("class", "fill-zinc-500 text-xs font-mono")
        .text(`len = ${currentData.length}`);
    };

    updateVisuals();

    const observer = new MutationObserver(() => updateVisuals());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("resize", updateVisuals);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateVisuals);
    };
  }, [currentData, showAfter, operation, highlightIndex, operationLabel]);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4 w-full min-h-[220px]">
      <svg ref={svgRef} className="overflow-visible" />
      <div className="flex gap-3">
        <button
          onClick={runAnimation}
          disabled={isAnimating}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
        >
          {isAnimating ? "Running..." : "Run Operation"}
        </button>
        <button
          onClick={reset}
          className="px-5 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 rounded-lg text-sm font-bold hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-all active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
