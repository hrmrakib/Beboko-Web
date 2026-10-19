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
 */
export function getCurrentLanguage(): 'en' | 'fr' {
  if (typeof document === 'undefined') return 'en';

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const trimmed = cookie.trim();
    if (trimmed.startsWith('googtrans=')) {
      const val = trimmed.split('=')[1];
      if (val && val.includes('/fr')) return 'fr';
      if (val && val.includes('/en')) return 'en';
    }
  }

  const stored = localStorage.getItem('preferred_language');
  if (stored === 'fr') return 'fr';

  return 'en';
}

/**
 * Helper to switch Google Translate language between 'en' and 'fr'
 */
export function setGoogleTranslateLanguage(targetLang: 'en' | 'fr') {
  if (typeof window === 'undefined') return;

  const cookieVal = `/en/${targetLang}`;

  // Set cookie for path=/ and current domain
  document.cookie = `googtrans=${cookieVal}; path=/;`;
  const domain = window.location.hostname;
  document.cookie = `googtrans=${cookieVal}; path=/; domain=${domain};`;

  try {
    localStorage.setItem('preferred_language', targetLang);
  } catch (e) {
    // ignore local storage error
  }

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
