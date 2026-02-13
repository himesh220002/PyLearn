"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

export type NestedDictionaryData = {
    [key: string]: string | number | boolean | NestedDictionaryData;
};

interface NestedDictionaryVisualizerProps {
    data: NestedDictionaryData;
    label?: string;
}

export default function NestedDictionaryVisualizer({
    data,
    label = "Nested Dictionary",
}: NestedDictionaryVisualizerProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!svgRef.current || !containerRef.current) return;

        const updateVisuals = () => {
            if (!svgRef.current || !containerRef.current) return;

            // Force dark mode
            const fontSize = 14;
            const lineHeight = 30;
            const indentSize = 20;

            // Flatten data into a list of lines for simple rendering
            // This avoids complex tree layouts and fits the vertical flow of a dictionary
            const lines: { text: string; indent: number; type: "key" | "value" | "bracket" }[] = [];

            function traverse(obj: NestedDictionaryData, indent: number = 0) {
                const keys = Object.keys(obj);
                keys.forEach((key, index) => {
                    const value = obj[key];
                    const isLast = index === keys.length - 1;
                    const comma = isLast ? "" : ",";

                    if (typeof value === "object" && value !== null) {
                        lines.push({ text: `"${key}": {`, indent, type: "key" });
                        traverse(value as NestedDictionaryData, indent + 1);
                        lines.push({ text: `}${comma}`, indent, type: "bracket" });
                    } else {
                        const valStr = typeof value === "string" ? `"${value}"` : String(value);
                        lines.push({ text: `"${key}": ${valStr}${comma}`, indent, type: "value" });
                    }
                });
            }

            lines.push({ text: "{", indent: 0, type: "bracket" });
            traverse(data, 1);
            lines.push({ text: "}", indent: 0, type: "bracket" });

            const containerWidth = containerRef.current.clientWidth || 400;
            const height = lines.length * lineHeight + 40;

            // Calculate max width needed for content
            const maxLineWidth = Math.max(...lines.map(l => (l.indent * indentSize + 20) + (l.text.length * 9)));
            const viewBoxWidth = Math.max(containerWidth, maxLineWidth + 40);

            const svg = d3
                .select(svgRef.current)
                .attr("width", "100%")
                .attr("height", height)
                .attr("viewBox", `0 0 ${viewBoxWidth} ${height}`)
                .attr("preserveAspectRatio", "xMidYMid meet")
                .style("overflow", "visible");

            svg.selectAll("*").remove();

            // Background
            svg.append("rect")
                .attr("width", viewBoxWidth)
                .attr("height", height)
                .attr("rx", 8)
                .attr("fill", "#18181b"); // zinc-900

            // Label
            if (label) {
                svg.append("text")
                    .attr("x", 10)
                    .attr("y", -10)
                    .attr("class", "fill-zinc-500 text-xs font-mono font-bold")
                    .text(label);
            }

            // Render lines
            lines.forEach((line, i) => {
                const y = i * lineHeight + 25;
                const x = line.indent * indentSize + 20;

                const textGroup = svg.append("g");

                // Highlight background on hover (optional enhancement later)

                textGroup.append("text")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("class", "font-mono text-sm")
                    .attr("fill", "#e4e4e7") // zinc-200
                    .text(line.text);
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
        <div ref={containerRef} className="w-full flex items-center justify-center p-4">
            <svg ref={svgRef} className="overflow-visible" />
        </div>
    );
}
