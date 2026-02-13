"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface NestedListVisualizerProps {
    data: (number | string)[][];
    label?: string;
}

export default function NestedListVisualizer({
    data,
    label = "2D List",
}: NestedListVisualizerProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!svgRef.current || !containerRef.current) return;

        const updateVisuals = () => {
            if (!svgRef.current || !containerRef.current) return;

            // Force dark mode
            const containerWidth = containerRef.current.clientWidth || 800;
            const boxSize = 70;
            const gap = 15;
            const rows = data.length;
            const cols = data[0]?.length || 0;

            const totalWidth = cols * (boxSize + gap) - gap;
            const totalHeight = rows * (boxSize + gap) - gap;
            const height = Math.max(500, totalHeight + 200);

            const viewBoxWidth = Math.max(containerWidth, totalWidth + 160);
            const startX = (viewBoxWidth - totalWidth) / 2;
            const startY = 100;

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
                .attr("y", 40)
                .attr("text-anchor", "middle")
                .attr("class", "fill-white dark:fill-zinc-100 font-extrabold text-2xl tracking-tighter transition-colors duration-300")
                .text(label);

            const g = svg.append("g").attr("transform", `translate(${startX}, ${startY})`);

            // Stylized Matrix Brackets [ ]
            const bracketWidth = 15;
            const padding = 10;
            const bracketColor = "#6366f1";

            g.append("path")
                .attr("d", `M ${-padding} ${-padding} h ${-bracketWidth} v ${totalHeight + padding * 2} h ${bracketWidth}`)
                .attr("fill", "none")
                .attr("stroke", bracketColor)
                .attr("stroke-width", 3)
                .attr("opacity", 0.6)
                .attr("stroke-linecap", "round");

            g.append("path")
                .attr("d", `M ${totalWidth + padding} ${-padding} h ${bracketWidth} v ${totalHeight + padding * 2} h ${-bracketWidth}`)
                .attr("fill", "none")
                .attr("stroke", bracketColor)
                .attr("stroke-width", 3)
                .attr("opacity", 0.6)
                .attr("stroke-linecap", "round");

            // Column Indices
            for (let c = 0; c < cols; c++) {
                g.append("text")
                    .attr("x", c * (boxSize + gap) + boxSize / 2)
                    .attr("y", -25)
                    .attr("text-anchor", "middle")
                    .attr("class", "fill-zinc-500 text-sm font-black font-mono")
                    .text(`[${c}]`);
            }

            data.forEach((row, ri) => {
                // Row Index
                g.append("text")
                    .attr("x", -35)
                    .attr("y", ri * (boxSize + gap) + boxSize / 2)
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "middle")
                    .attr("class", "fill-zinc-500 text-sm font-black font-mono")
                    .text(`[${ri}]`);

                row.forEach((val, ci) => {
                    const cellG = g.append("g")
                        .attr("transform", `translate(${ci * (boxSize + gap)}, ${ri * (boxSize + gap)})`);

                    cellG.append("rect")
                        .attr("width", boxSize)
                        .attr("height", boxSize)
                        .attr("rx", 12)
                        .attr("class", "transition-colors duration-300")
                        .attr("fill", "#27272a")
                        .attr("stroke", "#3f3f46")
                        .attr("stroke-width", 2);

                    cellG.append("text")
                        .attr("x", boxSize / 2)
                        .attr("y", boxSize / 2)
                        .attr("dy", "0.35em")
                        .attr("text-anchor", "middle")
                        .attr("class", "fill-zinc-100 font-mono text-xl font-bold transition-colors duration-300")
                        .text(val);
                });
            });
        };

        updateVisuals();

        const observer = new MutationObserver(() => updateVisuals());
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        window.addEventListener("resize", updateVisuals);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateVisuals);
        };
    }, [data, label]);

    return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center min-h-[500px]">
            <div className="w-full">
                <svg ref={svgRef} className="overflow-visible w-full" />
            </div>
        </div>
    );
}
