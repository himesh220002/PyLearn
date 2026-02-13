"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ArrayVisualizerProps {
  data: (number | string)[];
  highlightIndices?: number[];
  label?: string;
}

export default function ArrayVisualizer({
  data,
  highlightIndices = [],
  label = "Array",
}: ArrayVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const updateVisuals = () => {
      if (!svgRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth || 800;

      // Calculate dynamic box width based on max content length
      const maxContentLength = Math.max(...data.map(d => String(d).length));
      const baseBoxSize = 60;
      // Estimate width: base size + approx 8px per extra char over 3 chars
      const boxWidth = Math.max(baseBoxSize, baseBoxSize + (maxContentLength - 3) * 10);
      const boxHeight = 60;
      const gap = 12;
      const totalWidth = data.length * (boxWidth + gap) - gap;

      const viewBoxWidth = Math.max(containerWidth, totalWidth + 80);
      const startX = (viewBoxWidth - totalWidth) / 2;
      const startY = 80;

      // Hardcoded high-contrast colors (Fixed Theme)
      const bgColor = "#27272a"; // zinc-800
      const strokeColor = "#3f3f46"; // zinc-700
      const textColor = "#f4f4f5"; // zinc-100
      const highlightColor = "#6366f1"; // indigo-500
      const highlightStroke = "#818cf8"; // indigo-400

      const svg = d3
        .select(svgRef.current)
        .attr("width", "100%")
        .attr("height", 180) // Keep fixed height
        .attr("viewBox", `0 0 ${viewBoxWidth} 180`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("overflow", "visible");

      // Label
      svg.selectAll(".array-label").remove();
      svg
        .append("text")
        .attr("class", "array-label fill-zinc-100 font-extrabold text-2xl tracking-tighter transition-colors duration-300")
        .attr("x", viewBoxWidth / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text(label);

      const g = svg.selectAll("g.array-group").data([null]).join("g").attr("class", "array-group")
        .attr("transform", `translate(${startX}, ${startY})`);

      // Brackets
      g.selectAll(".bracket").remove();
      g.append("text")
        .attr("class", "bracket fill-zinc-500 text-4xl font-light font-mono")
        .attr("x", -15)
        .attr("y", boxHeight / 2)
        .attr("dy", "0.35em")
        .text("[");

      g.append("text")
        .attr("class", "bracket fill-zinc-500 text-4xl font-light font-mono")
        .attr("x", totalWidth + 15)
        .attr("y", boxHeight / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "end")
        .text("]");

      // DRAW BOXES
      g.selectAll("rect")
        .data(data, (d, i) => `${d}-${i}`)
        .join(
          (enter) =>
            enter.append("rect")
              .attr("x", (_, i) => i * (boxWidth + gap))
              .attr("y", -20)
              .attr("width", boxWidth)
              .attr("height", boxHeight)
              .attr("rx", 12)
              .attr("opacity", 0)
              .call((enter) =>
                enter.transition().duration(500)
                  .attr("y", 0)
                  .attr("opacity", 1)
              ),
          (update) =>
            update.transition().duration(500)
              .attr("x", (_, i) => i * (boxWidth + gap))
              .attr("width", boxWidth) // Update width just in case
              .attr("fill", (_, i) => highlightIndices.includes(i) ? highlightColor : bgColor)
              .attr("stroke", (_, i) => highlightIndices.includes(i) ? highlightStroke : strokeColor),
          (exit) =>
            exit.transition().duration(300)
              .attr("opacity", 0)
              .attr("y", 20)
              .remove()
        )
        .attr("stroke-width", 2.5);

      // DRAW VALUES
      g.selectAll(".value")
        .data(data, (d, i) => `${d}-${i}`)
        .join(
          (enter) =>
            enter.append("text")
              .attr("class", "value")
              .attr("x", (_, i) => i * (boxWidth + gap) + boxWidth / 2)
              .attr("y", boxHeight / 2)
              .attr("dy", "0.35em")
              .attr("text-anchor", "middle")
              .attr("opacity", 0)
              .attr("fill", textColor)
              .text(d => d)
              .call(enter => enter.transition().duration(500).attr("opacity", 1)),
          (update) =>
            update.transition().duration(500)
              .attr("x", (_, i) => i * (boxWidth + gap) + boxWidth / 2)
              .attr("fill", (_, i) => highlightIndices.includes(i) ? "white" : textColor)
              .attr("class", (_, i) => highlightIndices.includes(i)
                ? "value font-mono font-black" // Dynamic size removed here, handled below if needed, but safer to let CSS or fixed size handle it for now, or adapt size.
                : "value font-mono font-bold"
              )
              .style("font-size", maxContentLength > 10 ? "12px" : "18px") // Adapt font size slightly
              .text(d => d),
          (exit) => exit.transition().duration(300).attr("opacity", 0).remove()
        );

      // DRAW INDICES
      g.selectAll(".index")
        .data(data, (_, i) => i)
        .join(
          (enter) =>
            enter.append("text")
              .attr("class", "index font-black font-mono uppercase tracking-widest")
              .attr("fill", "#71717a") // zinc-500
              .attr("style", "font-size: 10px")
              .attr("x", (_, i) => i * (boxWidth + gap) + boxWidth / 2)
              .attr("y", boxHeight + 25)
              .attr("text-anchor", "middle")
              .attr("opacity", 0)
              .text((_, i) => `idx ${i}`)
              .call(enter => enter.transition().duration(500).attr("opacity", 1)),
          (update) =>
            update.transition().duration(500)
              .attr("x", (_, i) => i * (boxWidth + gap) + boxWidth / 2)
              .text((_, i) => `idx ${i}`),
          (exit) => exit.remove()
        );
    };

    // Use a small timeout to ensure container dimensions are ready
    const timer = setTimeout(updateVisuals, 50);
    // No need for MutationObserver as theme is fixed to dark
    window.addEventListener("resize", updateVisuals);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateVisuals);
    };

  }, [data, highlightIndices, label]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center min-h-[160px]">
      <div className="w-full">
        <svg ref={svgRef} className="overflow-visible w-full" />
      </div>
    </div>
  );
}
