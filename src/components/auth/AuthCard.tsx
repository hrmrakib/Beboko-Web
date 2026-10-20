"use client";

import React from 'react';
import Link from 'next/link';
import { DemoSwitcher } from './DemoSwitcher';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string | React.ReactNode;
  showBackToHome?: boolean;
}

export function AuthCard({
  children,
  title,
  subtitle,
  showBackToHome = true,
}: AuthCardProps) {
  return (
    <div className="min-h-screen w-full bg-[#85A72C] flex flex-col justify-between items-center py-6 px-4 sm:px-6 md:px-8 pb-16 sm:pb-20 relative selection:bg-[#E05A27] selection:text-white">
      {/* Subtle top branding / return link */}
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

        {showBackToHome && (
          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-white/90 hover:text-white flex items-center gap-1.5 bg-black/10 hover:bg-black/20 px-3 py-1.5 rounded-full transition-all backdrop-blur-sm"
          >
            <span>Back to home</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </header>

      {/* Main Auth Card Container */}
      <main className="w-full max-w-[480px] sm:max-w-[500px] my-auto">
        <div className="bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] p-6 sm:p-10 md:p-12 transition-all">
          {/* Card Title & Subtitle */}
          <div className="text-center mb-7 sm:mb-8">
            <h1 className="text-2xl sm:text-[28px] font-bold text-stone-800 tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <div className="text-xs sm:text-sm text-stone-500 font-medium mt-2 leading-relaxed max-w-sm mx-auto">
                {subtitle}
              </div>
            )}
          </div>

          {/* Form / Card Content */}
          {children}
        </div>
      </main>

      {/* Footer / Copyright notice */}
      <footer className="w-full text-center py-4 text-white/80 text-xs">
        <p>© {new Date().getFullYear()} Dar Dar by ETHOZ Group SARLU. All rights reserved.</p>
      </footer>

      {/* Demo Switcher for fast navigation between the 5 auth views */}
      <DemoSwitcher />
    </div>
  );
}
