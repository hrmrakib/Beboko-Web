"use client";

import React, { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export function GoogleTranslate() {
  useEffect(() => {
    // 0. Ensure default French cookie on first visit
    try {
      const stored = localStorage.getItem('preferred_language');
      if (!stored) {
        localStorage.setItem('preferred_language', 'fr');
        document.cookie = 'googtrans=/en/fr; path=/;';
        document.cookie = 'googtrans=/auto/fr; path=/;';
      }
    } catch (e) {}

    // 1. Define translation init callback
    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,fr',
              autoDisplay: false,
              layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE,
            },
            'google_translate_element'
          );

          // Once initialized, ensure active language is selected
          const activeLang = getCurrentLanguage();
          const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
          if (combo && combo.value !== activeLang) {
            combo.value = activeLang;
            combo.dispatchEvent(new Event('change'));
          }
        }
      } catch (err) {
        console.error('Google Translate init error:', err);
      }
    };

    // 2. Inject Google Translate script if not present
    const scriptId = 'google-translate-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate && window.googleTranslateElementInit) {
      window.googleTranslateElementInit();
    }

    // 3. Periodic check to ensure target language is applied to combo once mounted
    const intervalId = setInterval(() => {
      const activeLang = getCurrentLanguage();
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        if (combo.value !== activeLang) {
          combo.value = activeLang;
          combo.dispatchEvent(new Event('change'));
        }
      }
    }, 300);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 3500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
}

/**
 * Helper to get current active language ('en' | 'fr')
 * Defaults to 'fr' on first visit
 */
export function getCurrentLanguage(): 'en' | 'fr' {
  if (typeof window === 'undefined') return 'fr';

  try {
    const stored = localStorage.getItem('preferred_language');
    if (stored === 'en') return 'en';
    if (stored === 'fr') return 'fr';
  } catch (e) {}

  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const trimmed = cookie.trim();
      if (trimmed.startsWith('googtrans=')) {
        const val = trimmed.split('=')[1];
        if (val) {
          const parts = val.split('/');
          const target = parts[parts.length - 1];
          if (target === 'en') return 'en';
          if (target === 'fr') return 'fr';
        }
      }
    }
  }

  // DEFAULT IS FRENCH ON FIRST VISIT
  return 'fr';
}

/**
 * Helper to switch Google Translate language between 'en' and 'fr'
 */
export function setGoogleTranslateLanguage(targetLang: 'en' | 'fr') {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('preferred_language', targetLang);
  } catch (e) {
    // ignore local storage error
  }

  const cookieVal = `/en/${targetLang}`;

  // Set cookie for path=/ and current domain
  document.cookie = `googtrans=${cookieVal}; path=/;`;
  const domain = window.location.hostname;
  if (domain && domain !== 'localhost' && !domain.match(/^(\d{1,3}\.){3}\d{1,3}$/)) {
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${domain};`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=.${domain};`;
  }

  // Broadcast custom event so LanguageSwitcher components update immediately
  window.dispatchEvent(new CustomEvent('app_language_change', { detail: targetLang }));

  // Trigger change on Google's combo select box if mounted
  const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (combo) {
    combo.value = targetLang;
    combo.dispatchEvent(new Event('change'));
  } else {
    // If not mounted yet, reload so the new cookie triggers translation
    window.location.reload();
  }
}
