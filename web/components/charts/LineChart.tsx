"use client";

import React from "react";
import useMeasure from "react-use-measure";

type Series = {
  name: string;
  color: string;
  points: { x: number; y: number }[];
};

type Props = {
  width?: number;
  height?: number;
  padding?: { top: number; right: number; bottom: number; left: number };
  series: Series[];
  xTicks?: number;
  yTicks?: number;
  xLabels?: string[]; // optional labels for x-axis positions (index-based)
};

function getExtent(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { min, max: max === min ? min + 1 : max };
}

export default function LineChart({
  width = 800,
  height = 260,
  padding = { top: 16, right: 16, bottom: 28, left: 44 },
  series,
  xTicks = 5,
  yTicks = 4,
  xLabels,
}: Props) {
  const [ref, bounds] = useMeasure();
  const measuredWidth = Math.max(0, Math.floor(bounds.width));
  const renderWidth = measuredWidth > 0 ? measuredWidth : width;

  const innerW = renderWidth - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const allX = series.flatMap((s) => s.points.map((p) => p.x));
  const allY = series.flatMap((s) => s.points.map((p) => p.y));
  const xExt = getExtent(allX);
  const yExt = getExtent(allY);

  const xScale = (x: number) =>
    padding.left + ((x - xExt.min) / (xExt.max - xExt.min)) * innerW;
  const yScale = (y: number) =>
    padding.top + innerH - ((y - yExt.min) / (yExt.max - yExt.min)) * innerH;

  const buildPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return "";
    const d = pts
      .map((p, i) => `${i === 0 ? "M" : "L"}${xScale(p.x)},${yScale(p.y)}`)
      .join(" ");
    return d;
  };

  const xTickVals = xLabels && xLabels.length > 0
    ? Array.from({ length: xLabels.length }, (_, i) => i + xExt.min)
    : Array.from({ length: xTicks + 1 }, (_, i) => xExt.min + (i * (xExt.max - xExt.min)) / xTicks);
  const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) =>
    yExt.min + (i * (yExt.max - yExt.min)) / yTicks
  );

  return (
    <div ref={ref} className="w-full">
      <svg width={renderWidth} height={height} className="block">
        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + innerH}
          stroke="#E5E7EB"
        />
        <line
          x1={padding.left}
          y1={padding.top + innerH}
          x2={padding.left + innerW}
          y2={padding.top + innerH}
          stroke="#E5E7EB"
        />

        {/* Y grid + labels */}
        {yTickVals.map((v, idx) => {
          const y = yScale(v);
          return (
            <g key={`y-${idx}`}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + innerW}
                y2={y}
                stroke="#F3F4F6"
              />
              <text
                x={padding.left - 8}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={10}
                fill="#6B7280"
              >
                {Math.round(v)}
              </text>
            </g>
          );
        })}

        {/* X ticks + labels */}
        {xTickVals.map((v, idx) => {
          const x = xScale(v);
          return (
            <g key={`x-${idx}`}>
              <line
                x1={x}
                y1={padding.top + innerH}
                x2={x}
                y2={padding.top + innerH + 4}
                stroke="#9CA3AF"
              />
              {xLabels && xLabels[idx] !== undefined && (
                <text
                  x={x}
                  y={padding.top + innerH + 16}
                  fontSize={10}
                  textAnchor="middle"
                  fill="#6B7280"
                >
                  {xLabels[idx]}
                </text>
              )}
            </g>
          );
        })}

        {/* Series lines */}
        {series.map((s) => (
          <path
            key={s.name}
            d={buildPath(s.points)}
            fill="none"
            stroke={s.color}
            strokeWidth={2.5}
          />
        ))}
      </svg>
    </div>
  );
}


