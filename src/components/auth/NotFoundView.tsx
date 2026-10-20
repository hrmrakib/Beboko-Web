"use client";

import React from 'react';
import Link from 'next/link';
import { NotFoundGraphic } from './NotFoundGraphic';
import { DemoSwitcher } from './DemoSwitcher';

export function NotFoundView() {
  return (
    <div className="min-h-screen w-full bg-[#85A72C] flex flex-col justify-between items-center py-6 px-4 sm:px-6 md:px-8 pb-16 sm:pb-20 relative selection:bg-[#79A731] selection:text-white">
      {/* Top Brand Bar */}
      <header className="w-full max-w-[500px] flex items-center justify-between pt-2 pb-4 text-white/90">
        <Link
          href="/"
          className="inline-flex items-center gap-2 group transition-opacity hover:opacity-95"
          title="Return to Home"
        >
          <img
            src="/logo.png"
            alt="Dar Dar Logo"
            className="h-9 sm:h-10 w-auto object-contain bg-[#333333] rounded-lg px-2 py-1 shadow-sm"
          />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow-sm group-hover:underline">
            Dar Dar
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs sm:text-sm font-medium text-white/90 hover:text-white flex items-center gap-1.5 bg-black/10 hover:bg-black/20 px-3 py-1.5 rounded-full transition-all backdrop-blur-sm"
        >
          <span>Home</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </header>

      {/* Main 404 Card Container */}
      <main className="w-full max-w-[480px] sm:max-w-[500px] my-auto">
        <div className="bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] p-6 sm:p-10 md:p-12 transition-all text-center">
          {/* Stylized Browser 404 Graphic */}
          <div className="mb-6">
            <NotFoundGraphic />
          </div>

          {/* Subtitle */}
          <h1 className="text-stone-600 font-medium text-base sm:text-lg mb-7">
            Looks like you&apos;ve got lost....
          </h1>

          {/* Back to Dashboard / Home Button */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full h-12 sm:h-[50px] bg-[#79A731] hover:bg-[#689426] active:scale-[0.99] text-white font-medium text-sm sm:text-base rounded-xl shadow-md shadow-[#79A731]/25 transition-all duration-200"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-white/80 text-xs">
        <p>© {new Date().getFullYear()} Dar Dar by ETHOZ Group SARLU. All rights reserved.</p>
      </footer>

      {/* Demo Switcher */}
      <DemoSwitcher />
    </div>
  );
}
