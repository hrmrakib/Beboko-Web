"use client";

import React from 'react';

export function NotFoundGraphic() {
  return (
    <div className="w-full max-w-[340px] sm:max-w-[380px] mx-auto rounded-2xl overflow-hidden shadow-sm border border-stone-100 bg-[#E1F2F8]">
      {/* Top Browser Bar */}
      <div className="h-10 px-4 bg-[#E1F2F8] flex items-center gap-2">
        {/* 3 Window Dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A5F]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28CD41]" />
        </div>

        {/* Address Pill */}
        <div className="w-16 h-3 rounded-full bg-[#CFE9F3] ml-2" />
      </div>

      {/* Main Viewport Screen */}
      <div className="bg-[#85A72C] h-44 sm:h-48 p-4 flex flex-col justify-between relative select-none">
        {/* Central 404 Text */}
        <div className="my-auto text-center flex items-center justify-center">
          <span
            className="text-6xl sm:text-7xl font-extrabold text-[#FFA133] tracking-wider drop-shadow-sm font-sans"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          >
            404
          </span>
        </div>

        {/* Bottom Window UI Details */}
        <div className="flex items-end justify-between px-3 pb-1">
          {/* Two white rounded pill bars */}
          <div className="space-y-1.5">
            <div className="w-6 h-2 rounded-full bg-white/90" />
            <div className="w-9 h-2 rounded-full bg-white/90" />
          </div>

          {/* Three white dots */}
          <div className="flex items-center gap-1.5 pb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
          </div>
        </div>
      </div>
    </div>
  );
}
