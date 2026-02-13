"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface SlicingVisualizerProps {
    data: (number | string)[];
    sliceRange: [number, number];
    label?: string;
}

export default function SlicingVisualizer({
    data,
    sliceRange,
    label = "Slicing Operation",
}: SlicingVisualizerProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!svgRef.current || !containerRef.current) return;

        const updateVisuals = () => {
            if (!svgRef.current || !containerRef.current) return;

            // Force dark mode
            // Force dark mode
            const containerWidth = containerRef.current.clientWidth || 800;
            const height = 220;
            const boxSize = 50;
            const gap = 12;
            const totalWidth = data.length * (boxSize + gap) - gap;

            const viewBoxWidth = Math.max(containerWidth, totalWidth + 80);
            const startX = (viewBoxWidth - totalWidth) / 2;
            const startY = 80;

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
                .attr("y", 35)
                .attr("text-anchor", "middle")
                .attr("class", "fill-white dark:fill-zinc-100 font-extrabold text-xl tracking-tight transition-colors duration-300")
                .text(label);

            const g = svg.append("g").attr("transform", `translate(${startX}, ${startY})`);

            const [sliceStart, sliceEnd] = sliceRange;

            // Boxes
            g.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", (_, i) => i * (boxSize + gap))
                .attr("y", 0)
                .attr("width", boxSize)
                .attr("height", boxSize)
                .attr("rx", 12)
                .attr("fill", (_, i) => (i >= sliceStart && i < sliceEnd) ? "#6366f1" : "#27272a")
                .attr("class", "transition-colors duration-300")
                .attr("stroke", (_, i) => (i >= sliceStart && i < sliceEnd) ? "#818cf8" : "#3f3f46")
                .attr("stroke-width", 2.5)
                .attr("opacity", (_, i) => (i >= sliceStart && i < sliceEnd) ? 1 : 0.8);

            // Characters
            g.selectAll(".char")
                .data(data)
                .enter()
                .append("text")
                .attr("x", (_, i) => i * (boxSize + gap) + boxSize / 2)
                .attr("y", boxSize / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .attr("class", (_, i) => (i >= sliceStart && i < sliceEnd)
                    ? "fill-white font-mono font-black text-xl transition-colors duration-300"
                    : "fill-zinc-100 font-mono text-xl font-bold transition-colors duration-300")
                .text(d => d);

            // Boundary Labels
            const rangeData = [
                { pos: sliceStart, label: "start", color: "#6366f1" },
                { pos: sliceEnd, label: "end", color: "#f43f5e" }
            ];

            rangeData.forEach(rd => {
                const xPos = rd.pos * (boxSize + gap) - (gap / 2);

                // Marker Line
                g.append("line")
                    .attr("x1", xPos)
                    .attr("y1", -10)
                    .attr("x2", xPos)
                    .attr("y2", boxSize + 10)
                    .attr("stroke", rd.color)
                    .attr("stroke-width", 3)
                    .attr("stroke-dasharray", "6,3")
                    .attr("opacity", 0.8);

                // Marker Text
                g.append("text")
                    .attr("x", xPos)
                    .attr("y", boxSize + 30)
                    .attr("text-anchor", "middle")
                    .attr("fill", rd.color)
                    .attr("class", "text-sm uppercase font-black tracking-widest")
                    .text(rd.label);
            });

            // Indices
            for (let i = 0; i < data.length; i++) {
                // Positive
                g.append("text")
                    .attr("x", i * (boxSize + gap) + boxSize / 2)
                    .attr("y", -10)
                    .attr("text-anchor", "middle")
                    .attr("class", "fill-zinc-500 text-xs font-mono font-bold")
                    .text(i);

                // Negative
                g.append("text")
                    .attr("x", i * (boxSize + gap) + boxSize / 2)
                    .attr("y", boxSize + 25)
                    .attr("text-anchor", "middle")
                    .attr("class", "fill-zinc-600 text-xs font-mono")
                    .text(i - data.length);
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
    }, [data, sliceRange, label]);

    return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center min-h-[220px]">
            <svg ref={svgRef} className="overflow-visible" />
        </div>
    );
}
