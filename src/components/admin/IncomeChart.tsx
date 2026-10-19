"use client";

import React, { useState } from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Augt', 'Sept', 'Oct', 'Nov', 'Dec'];
// Normalized values (0 to 100) matching the wave shape in design Image 1
const dataPoints = [42, 68, 48, 62, 54, 45, 60, 78, 52, 65, 80, 70];

export function IncomeChart() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG dimensions
  const width = 560;
  const height = 180;
  const paddingX = 20;
  const paddingY = 20;

  // Generate smooth cubic bezier SVG path
  const pts = dataPoints.map((val, i) => {
    const x = paddingX + (i / (dataPoints.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - (val / 100) * (height - 2 * paddingY);
    return { x, y, val };
  });

  const generateSmoothPath = () => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePath = generateSmoothPath();
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${height - paddingY} L ${pts[0].x} ${height - paddingY} Z`;

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-stone-800 text-base sm:text-lg">
            Income Overview
          </h3>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="text-xs font-semibold text-stone-600 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-[#85A72C]/20 cursor-pointer"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Sub metrics */}
        <div className="flex items-center gap-6 text-xs text-stone-500 mb-4">
          <div>
            <span className="block text-stone-400">Overly Growth</span>
            <span className="font-bold text-stone-800 text-sm">35.80%</span>
          </div>
          <div>
            <span className="block text-stone-400">Monthly</span>
            <span className="font-bold text-stone-800 text-sm">15.36%</span>
          </div>
          <div>
            <span className="block text-stone-400">Day</span>
            <span className="font-bold text-stone-800 text-sm">58.36%</span>
          </div>
        </div>
      </div>

      {/* Wave Chart Container */}
      <div className="relative w-full overflow-x-auto select-none pt-2">
        <div className="min-w-[480px]">
          {/* Y-axis labels & gridlines */}
          <div className="relative h-[180px]">
            <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[11px] text-stone-400 text-right pr-2 select-none">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            {/* SVG Wave */}
            <div className="ml-8 h-full">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="incomeWaveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#85A72C" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#85A72C" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#85A72C" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio, idx) => (
                  <line
                    key={idx}
                    x1="0"
                    y1={paddingY + ratio * (height - 2 * paddingY)}
                    x2={width}
                    y2={paddingY + ratio * (height - 2 * paddingY)}
                    stroke="#F1F3F5"
                    strokeDasharray="3 3"
                  />
                ))}

                {/* Filled Gradient Area */}
                <path d={areaPath} fill="url(#incomeWaveGrad)" />

                {/* Glowing Wave Stroke Line */}
                <path d={linePath} fill="none" stroke="#85A72C" strokeWidth="2.5" />

                {/* Interactive Points */}
                {pts.map((pt, i) => (
                  <g key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredIdx === i ? 5 : 3}
                      fill={hoveredIdx === i ? '#85A72C' : '#FFFFFF'}
                      stroke="#85A72C"
                      strokeWidth="2"
                      className="cursor-pointer transition-all"
                    />
                  </g>
                ))}
              </svg>

              {/* Tooltip */}
              {hoveredIdx !== null && (
                <div
                  className="absolute bg-stone-900 text-white text-xs px-2.5 py-1 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
                  style={{
                    left: `${(pts[hoveredIdx].x / width) * 100}%`,
                    top: `${(pts[hoveredIdx].y / height) * 100}%`,
                  }}
                >
                  <span className="font-bold">{months[hoveredIdx]}</span>: {pts[hoveredIdx].val}% ($
                  {(pts[hoveredIdx].val * 240).toLocaleString()})
                </div>
              )}
            </div>
          </div>

          {/* X-axis Month Labels */}
          <div className="ml-8 grid grid-cols-12 text-[10px] text-stone-400 text-center mt-1">
            {months.map((m, idx) => (
              <span
                key={m}
                className={hoveredIdx === idx ? 'text-[#85A72C] font-bold' : ''}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
