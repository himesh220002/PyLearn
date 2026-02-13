"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface StringVisualizerProps {
  data: string[];
  highlightIndices?: number[];
  label?: string;
}

export default function StringVisualizer({
  data,
  highlightIndices = [],
  label = "String Indexing",
}: StringVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const updateVisuals = () => {
      if (!svgRef.current || !containerRef.current) return;

      // Force dark mode
      const containerWidth = containerRef.current.clientWidth || 800;
      const height = 180;
      const boxSize = 50;
      const gap = 12;
      const totalWidth = data.length * (boxSize + gap) - gap;

      const viewBoxWidth = Math.max(containerWidth, totalWidth + 80);
      const startX = (viewBoxWidth - totalWidth) / 2;
      const startY = 70; // Adjusted for new height and box size

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
        .attr("class", "fill-zinc-100 font-extrabold text-2xl tracking-tighter transition-colors duration-300")
        .text(label);

      const g = svg.append("g").attr("transform", `translate(${startX}, ${startY})`);

      // Quotes
      g.append("text")
        .attr("x", -15)
        .attr("y", boxSize / 2)
        .attr("dy", "0.35em")
        .attr("class", "fill-zinc-500 text-4xl font-serif font-bold")
        .text('"');

      g.append("text")
        .attr("x", totalWidth + 15)
        .attr("y", boxSize / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "end")
        .attr("class", "fill-zinc-500 text-4xl font-serif font-bold")
        .text('"');

      // Draw boxes
      g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (_, i) => i * (boxSize + gap))
        .attr("y", 0)
        .attr("width", boxSize)
        .attr("height", boxSize)
        .attr("rx", 12)
        .attr("fill", (_, i) => highlightIndices.includes(i) ? "#6366f1" : "#27272a")
        .attr("class", "transition-colors duration-300")
        .attr("stroke", (_, i) => highlightIndices.includes(i) ? "#818cf8" : "#3f3f46")
        .attr("stroke-width", 2.5);

      // Draw characters
      g.selectAll(".char")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (_, i) => i * (boxSize + gap) + boxSize / 2)
        .attr("y", boxSize / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("class", (_, i) => highlightIndices.includes(i)
          ? "fill-white font-mono text-xl font-black transition-colors duration-300"
          : "fill-zinc-900 dark:fill-zinc-100 font-mono text-xl font-bold transition-colors duration-300")
        .text((d) => d);

      // Positive Indices (Below)
      g.selectAll(".pos-index")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (_, i) => i * (boxSize + gap) + boxSize / 2)
        .attr("y", boxSize + 25)
        .attr("text-anchor", "middle")
        .attr("class", "fill-zinc-400 dark:fill-zinc-500 text-sm font-black font-mono")
        .text((_, i) => i);

      // Negative Indices (Above)
      g.selectAll(".neg-index")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (_, i) => i * (boxSize + gap) + boxSize / 2)
        .attr("y", -15)
        .attr("text-anchor", "middle")
        .attr("class", "fill-zinc-400 dark:fill-zinc-500 text-sm font-black font-mono italic opacity-60")
        .text((_, i) => i - data.length);
    };

    updateVisuals();

    const observer = new MutationObserver(() => updateVisuals());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("resize", updateVisuals);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateVisuals);
    };
  }, [data, highlightIndices, label]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center min-h-[220px]">
      <div className="w-full">
        <svg ref={svgRef} className="overflow-visible w-full" />
      </div>
    </div>
  );
}
