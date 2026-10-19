"use client";

import React, { useState, useEffect } from 'react';
import { getCurrentLanguage, setGoogleTranslateLanguage } from './GoogleTranslate';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function LanguageSwitcher({
  variant = 'desktop',
  className = '',
}: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<'en' | 'fr'>('en');

  useEffect(() => {
    // Read initial language on client mount
    const initial = getCurrentLanguage();
    setCurrentLang(initial);

    const handleFocus = () => {
      const active = getCurrentLanguage();
      if (active !== currentLang) {
        setCurrentLang(active);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [currentLang]);

  const handleSelectLanguage = (lang: 'en' | 'fr') => {
    if (lang === currentLang) return;
    setCurrentLang(lang);
    setGoogleTranslateLanguage(lang);
  };

  // Mobile segmented control
  if (variant === 'mobile') {
    return (
      <div className={`w-full ${className}`}>
        <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-[#E96424]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <span>Language / Langue</span>
        </div>
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-stone-100 rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={() => handleSelectLanguage('en')}
            className={`py-2 px-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              currentLang === 'en'
                ? 'bg-white text-stone-900 shadow-sm border border-stone-200/60'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🇬🇧</span>
            <span>English</span>
            {currentLang === 'en' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#E96424]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleSelectLanguage('fr')}
            className={`py-2 px-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              currentLang === 'fr'
                ? 'bg-white text-stone-900 shadow-sm border border-stone-200/60'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🇫🇷</span>
            <span>Français</span>
            {currentLang === 'fr' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#E96424]" />
            )}
          </button>
        </div>
      </div>
    );
  }

  // Desktop segmented switcher: sleek, compact, fits easily in header
  return (
    <div
      className={`inline-flex items-center p-1 bg-stone-100/90 hover:bg-stone-100 rounded-xl border border-stone-200/80 transition-all select-none ${className}`}
      title="Switch Language / Changer de langue"
    >
      <button
        type="button"
        onClick={() => handleSelectLanguage('en')}
        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
          currentLang === 'en'
            ? 'bg-white text-stone-900 shadow-sm'
            : 'text-stone-500 hover:text-stone-900'
        }`}
      >
        <span>🇬🇧</span>
        <span>EN</span>
      </button>

      <button
        type="button"
        onClick={() => handleSelectLanguage('fr')}
        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
          currentLang === 'fr'
            ? 'bg-white text-stone-900 shadow-sm'
            : 'text-stone-500 hover:text-stone-900'
        }`}
      >
        <span>🇫🇷</span>
        <span>FR</span>
      </button>
    </div>
  );
}
