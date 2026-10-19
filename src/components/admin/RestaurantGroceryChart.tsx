"use client";

import React, { useState } from 'react';

const chartData = [
  { month: 'Jan', grocery: 410, restaurant: 950 },
  { month: 'Feb', grocery: 480, restaurant: 780 },
  { month: 'Mar', grocery: 350, restaurant: 620 },
  { month: 'Apr', grocery: 520, restaurant: 750 },
  { month: 'May', grocery: 460, restaurant: 600 },
  { month: 'Jun', grocery: 510, restaurant: 710 },
  { month: 'July', grocery: 590, restaurant: 820 },
  { month: 'Augt', grocery: 470, restaurant: 720 },
  { month: 'Sep', grocery: 480, restaurant: 710 },
  { month: 'Oct', grocery: 490, restaurant: 730 },
  { month: 'Nov', grocery: 480, restaurant: 720 },
  { month: 'Dec', grocery: 470, restaurant: 710 },
];

export function RestaurantGroceryChart() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG Chart Dimensions
  const svgWidth = 540;
  const svgHeight = 180;
  const plotHeight = 150;
  const paddingX = 15;
  const maxVal = 1000;

  const barGroupWidth = (svgWidth - 2 * paddingX) / chartData.length;
  const singleBarWidth = 9;

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-stone-800 text-base sm:text-lg">
              Restaurant &amp; Grocery Overview
            </h3>
            {/* Legend */}
            <div className="hidden sm:flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#85A72C]" />
                Grocery
              </span>
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DD5826]" />
                Restaurant
              </span>
            </div>
          </div>

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
            <span className="font-bold text-stone-800 text-sm">78.18%</span>
          </div>
          <div>
            <span className="block text-stone-400">Monthly</span>
            <span className="font-bold text-stone-800 text-sm">48.00%</span>
          </div>
          <div>
            <span className="block text-stone-400">Day</span>
            <span className="font-bold text-stone-800 text-sm">89.80%</span>
          </div>
        </div>
      </div>

      {/* SVG Dual Bar Chart */}
      <div className="relative w-full overflow-x-auto select-none pt-2">
        <div className="min-w-[480px]">
          <div className="relative h-[180px] flex">
            {/* Y-axis labels */}
            <div className="w-9 flex flex-col justify-between text-[11px] text-stone-400 text-right pr-2 pb-5 select-none">
              <span>1000</span>
              <span>800</span>
              <span>600</span>
              <span>400</span>
              <span>200</span>
              <span>0</span>
            </div>

            {/* SVG Bars */}
            <div className="flex-1 h-full relative">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
                {/* Gridlines */}
                {[0, 200, 400, 600, 800, 1000].map((v) => {
                  const y = plotHeight - (v / maxVal) * plotHeight;
                  return (
                    <line
                      key={v}
                      x1="0"
                      y1={y}
                      x2={svgWidth}
                      y2={y}
                      stroke="#F1F3F5"
                      strokeDasharray="3 3"
                    />
                  );
                })}

                {/* Bars */}
                {chartData.map((item, idx) => {
                  const groupX = paddingX + idx * barGroupWidth;
                  const centerX = groupX + barGroupWidth / 2;

                  const rHeight = (item.restaurant / maxVal) * plotHeight;
                  const gHeight = (item.grocery / maxVal) * plotHeight;

                  const rY = plotHeight - rHeight;
                  const gY = plotHeight - gHeight;

                  const isHovered = hoveredIdx === idx;

                  return (
                    <g
                      key={item.month}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className="cursor-pointer"
                    >
                      {/* Restaurant Bar (Orange-Red) */}
                      <rect
                        x={centerX - singleBarWidth - 1}
                        y={rY}
                        width={singleBarWidth}
                        height={rHeight}
                        rx={2}
                        fill="#DD5826"
                        className="transition-all duration-200"
                        opacity={isHovered ? 1 : 0.9}
                      />

                      {/* Grocery Bar (Green) */}
                      <rect
                        x={centerX + 1}
                        y={gY}
                        width={singleBarWidth}
                        height={gHeight}
                        rx={2}
                        fill="#85A72C"
                        className="transition-all duration-200"
                        opacity={isHovered ? 1 : 0.9}
                      />

                      {/* Month Label */}
                      <text
                        x={centerX}
                        y={svgHeight - 6}
                        textAnchor="middle"
                        fontSize="10"
                        fill={isHovered ? '#1F2937' : '#9CA3AF'}
                        fontWeight={isHovered ? 'bold' : 'normal'}
                      >
                        {item.month}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip */}
              {hoveredIdx !== null && (
                <div
                  className="absolute bg-stone-900 text-white text-[11px] px-2.5 py-1 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full z-20"
                  style={{
                    left: `${((paddingX + hoveredIdx * barGroupWidth + barGroupWidth / 2) / svgWidth) * 100}%`,
                    top: '25%',
                  }}
                >
                  <div className="font-bold">{chartData[hoveredIdx].month}</div>
                  <div className="text-lime-300">Grocery: {chartData[hoveredIdx].grocery}</div>
                  <div className="text-orange-300">Restaurant: {chartData[hoveredIdx].restaurant}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
