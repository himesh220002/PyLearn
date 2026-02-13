"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface LoopVisualizerProps {
  data: (number | string)[];
  label?: string;
}

export default function LoopVisualizer({
  data,
  label = "For Loop Iteration",
}: LoopVisualizerProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= data.length - 1) {
            setIsPlaying(false);
            return -1;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, data.length]);

  // D3 Rendering
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const updateVisuals = () => {
      if (!svgRef.current || !containerRef.current) return;

      // Force dark mode
      const containerWidth = containerRef.current.clientWidth || 800;
      const height = 220;

      // Calculate dynamic box width based on longest string
      const maxLen = Math.max(...data.map(d => String(d).length));
      const boxWidth = Math.max(60, Math.min(120, maxLen * 12 + 20));
      const boxHeight = 50;
      const gap = 10;

      // Calculate font size based on content length
      const fontSize = maxLen > 8 ? 11 : maxLen > 5 ? 13 : 16;

      const totalWidth = data.length * (boxWidth + gap) - gap;

      // Calculate viewBox width to ensure content fits
      // If content is smaller than container, use container width (centers it)
      // If content is larger, use content width + padding (scales it down)
      const viewBoxWidth = Math.max(containerWidth, totalWidth + 80);
      const startX = (viewBoxWidth - totalWidth) / 2;

      const svg = d3
        .select(svgRef.current)
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", `0 0 ${viewBoxWidth} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("overflow", "visible");

      svg.selectAll("*").remove();

      // Label
      svg
        .append("text")
        .attr("x", viewBoxWidth / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("class", "fill-zinc-100 font-extrabold text-xl tracking-tight")
        .text(label);

      const g = svg.append("g").attr("transform", `translate(${startX}, 85)`); // Moved group down to 85

      // Title / Code Representation
      const codeText = currentIndex === -1
        ? "for item in items:"
        : `item = ${data[currentIndex]}`;

      svg
        .append("text")
        .attr("x", viewBoxWidth / 2)
        .attr("y", 60) // Moved down from 28 to avoid collision with label at 30
        .attr("text-anchor", "middle")
        .attr("class", "fill-zinc-300 font-mono text-sm font-bold transition-colors duration-300")
        .text(codeText);

      // Draw Array Boxes
      g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (_, i) => i * (boxWidth + gap))
        .attr("y", 0)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("rx", 10)
        .attr("fill", (_, i) =>
          i === currentIndex ? "#6366f1" : "#27272a"
        )
        .attr("stroke", (_, i) =>
          i === currentIndex ? "#818cf8" : "#3f3f46"
        )
        .attr("stroke-width", 2)
        .attr("class", "transition-colors duration-300");

      // Values inside boxes
      g.selectAll(".value")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (_, i) => i * (boxWidth + gap) + boxWidth / 2)
        .attr("y", boxHeight / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-size", fontSize)
        .attr("class", (_, i) =>
          i === currentIndex
            ? "fill-white font-mono font-bold transition-colors duration-300"
            : "fill-zinc-100 font-mono font-semibold transition-colors duration-300"
        )
        .text((d) => d);

      // Index labels below boxes
      g.selectAll(".index")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (_, i) => i * (boxWidth + gap) + boxWidth / 2)
        .attr("y", boxHeight + 18)
        .attr("text-anchor", "middle")
        .attr("font-size", 10)
        .attr("class", "fill-zinc-500 font-mono font-bold")
        .text((_, i) => `[${i}]`);

      // Pointer / Arrow for current item
      if (currentIndex >= 0) {
        const arrowX = currentIndex * (boxWidth + gap) + boxWidth / 2;

        g.append("text")
          .attr("x", arrowX)
          .attr("y", boxHeight + 42)
          .attr("text-anchor", "middle")
          .attr("class", "fill-indigo-400 text-2xl")
          .text("▲");

        g.append("text")
          .attr("x", arrowX)
          .attr("y", boxHeight + 58)
          .attr("text-anchor", "middle")
          .attr("font-size", 9)
          .attr("class", "fill-indigo-400 font-bold uppercase tracking-wider")
          .text("current");
      }
    };

    updateVisuals();

    const observer = new MutationObserver(() => updateVisuals());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("resize", updateVisuals);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateVisuals);
    };

  }, [data, currentIndex, label]);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-6 w-full h-full min-h-[260px]">
      <div className="w-full flex flex-col items-center">
        <svg ref={svgRef} className="overflow-visible w-full" />
      </div>
      <div className="flex gap-3"> {/* sticky buttons if needed, or just let them scroll */}
        <button
          onClick={() => {
            setIsPlaying(!isPlaying);
            if (currentIndex === data.length - 1) setCurrentIndex(-1);
          }}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all active:scale-95"
        >
          {isPlaying ? "Pause" : currentIndex === -1 ? "Start Animation" : "Resume"}
        </button>
        <button
          onClick={() => {
            setIsPlaying(false);
            setCurrentIndex(-1);
          }}
          className="px-6 py-2.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl text-sm font-bold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
