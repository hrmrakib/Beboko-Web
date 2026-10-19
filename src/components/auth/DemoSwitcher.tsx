"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DemoSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: '1. Login', href: '/login' },
    { label: '2. Forgot Password', href: '/forgot-password' },
    { label: '3. Check Email (OTP)', href: '/verify-code' },
    { label: '4. Set Password', href: '/reset-password' },
    { label: '5. 404 Page', href: '/404' },
    { label: '🏠 Home', href: '/' },
  ];

  return (
    <aside aria-label="Auth screens preview" className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 max-w-[94vw]">
      {/* Mobile-friendly toggle for clean screenshot taking */}
      <div className="bg-stone-900/90 backdrop-blur-md text-white rounded-full p-1.5 shadow-2xl border border-white/20 flex items-center gap-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1 text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5"
          title="Toggle Auth Screens Switcher"
        >
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
          <span>Screens ({links.length - 1})</span>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* Collapsible pill list on click */}
        <div className={`${isOpen ? 'flex' : 'hidden'} items-center gap-1 overflow-x-auto py-0.5 px-1 scrollbar-none`}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#E05A27] text-white shadow-sm font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
