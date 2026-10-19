"use client";

import React, { useState } from 'react';

export function VendorSalesChart() {
  const [activeFilter, setActiveFilter] = useState<'Monthly' | 'Weekly' | 'Yearly'>('Monthly');

  // Chart data points representing the wave in Image 1
  // Jan, Feb, Mar, Apr, May, Jun
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const yAxisValues = [100, 80, 60, 40, 20, 0];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-100 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-base sm:text-lg font-bold text-stone-800 tracking-tight">
          Sales Overview
        </h2>
        <div className="flex items-center gap-1 bg-stone-50 p-1 rounded-lg border border-stone-200/60 text-xs font-semibold text-stone-600">
          {(['Monthly', 'Weekly', 'Yearly'] as const).map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setActiveFilter(period)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === period
                  ? 'bg-white text-stone-900 shadow-2xs font-bold'
                  : 'hover:text-stone-900'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative w-full h-[200px] sm:h-[220px] mt-2">
        {/* Y Axis Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-2">
          {yAxisValues.map((val) => (
            <div key={val} className="flex items-center gap-3 w-full">
              <span className="w-6 text-[10px] sm:text-xs text-stone-400 font-medium text-right select-none">
                {val}
              </span>
              <div className="flex-1 border-b border-stone-100 border-dashed" />
            </div>
          ))}
        </div>

        {/* SVG Wave */}
        <div className="absolute inset-0 pl-9 pr-2 pt-2 pb-5">
          <svg
            viewBox="0 0 600 200"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Lush Green Linear Gradient matching mockup */}
              <linearGradient id="vendorGreenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7DA42B" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#9BC73A" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#EAF7E9" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Area Path */}
            <path
              d="M 0 100 
                 C 50 110, 80 50, 120 40 
                 C 150 30, 180 80, 220 70 
                 C 260 60, 320 100, 380 90 
                 C 430 80, 480 50, 540 60 
                 C 570 65, 590 55, 600 50 
                 L 600 200 L 0 200 Z"
              fill="url(#vendorGreenGradient)"
            />

            {/* Stroke Line */}
            <path
              d="M 0 100 
                 C 50 110, 80 50, 120 40 
                 C 150 30, 180 80, 220 70 
                 C 260 60, 320 100, 380 90 
                 C 430 80, 480 50, 540 60 
                 C 570 65, 590 55, 600 50"
              fill="none"
              stroke="#85A72C"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* X Axis Months */}
        <div className="absolute bottom-0 left-9 right-2 flex justify-between select-none">
          {months.map((m) => (
            <span key={m} className="text-[11px] font-medium text-stone-400">
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
