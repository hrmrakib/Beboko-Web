"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function TermsConditionsPage() {
  const [fontSize, setFontSize] = useState('14');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [indent, setIndent] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [paragraphs, setParagraphs] = useState<string[]>([
    "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly Believable. If You Are Going To Use A Passage Of Lorem Ipsum, You Need To Be Sure There Isn't Anything Embarrassing Hidden In The Middle Of Text. All The Lorem Ipsum Generators On The Internet Tend To Repeat Predefined Chunks As Necessary, Making This The First True Generator On The Internet. It Uses A Dictionary Of Over 200 Latin Words, Combined With A Handful Of Model Sentence Structures, To Generate Lorem Ipsum Which Looks Reasonable. The Generated Lorem Ipsum Is Therefore Always Free From Repetition, Injected Humour, Or Non-Characteristic Words Etc.",
    "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly Believable. If You Are Going To Use A Passage Of Lorem Ipsum, You Need To Be Sure There Isn't Anything Embarrassing Hidden In The Middle Of Text. All The Lorem Ipsum Generators On The Internet Tend To Repeat Predefined Chunks As Necessary, Making This The First True Generator On The Internet. It Uses A Dictionary Of Over 200 Latin Words, Combined With A Handful Of Model Sentence Structures, To Generate Lorem Ipsum Which Looks Reasonable. The Generated Lorem Ipsum Is Therefore Always Free From Repetition, Injected Humour, Or Non-Characteristic Words Etc.",
    "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly Believable. If You Are Going To Use A Passage Of Lorem Ipsum, You Need To Be Sure There Isn't Anything Embarrassing Hidden In The Middle Of Text. All The Lorem Ipsum Generators On The Internet Tend To Repeat Predefined Chunks As Necessary, Making This The First True Generator On The Internet. It Uses A Dictionary Of Over 200 Latin Words, Combined With A Handful Of Model Sentence Structures, To Generate Lorem Ipsum Which Looks Reasonable. The Generated Lorem Ipsum Is Therefore Always Free From Repetition, Injected Humour, Or Non-Characteristic Words Etc.",
    "There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don't Look Even Slightly Believable."
  ]);

  const handleParagraphChange = (index: number, newText: string) => {
    const updated = [...paragraphs];
    updated[index] = newText;
    setParagraphs(updated);
  };

  const handleSave = () => {
    setToastMsg("Terms & Conditions changes saved successfully.");
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-stone-900/95 text-white text-sm font-semibold shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-[#85A72C] animate-ping" />
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="ml-2 text-stone-400 hover:text-white p-1">
            ✕
          </button>
        </div>
      )}

      {/* Header Bar with Rich Text Controls (Matches Image 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        {/* Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/settings"
            className="p-1 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title="Back to Settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
            Terms &amp; Conditions
          </h1>
        </div>

        {/* Toolbar Controls (Matches Image 2 top right) */}
        <div className="flex items-center flex-wrap gap-1.5 p-1 rounded-xl bg-white border border-stone-200/90 shadow-2xs">
          {/* Font Size Selector */}
          <div className="relative">
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="appearance-none h-8 pl-2.5 pr-6 rounded-md bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-100 focus:outline-none cursor-pointer"
            >
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
            </select>
            <svg className="w-3 h-3 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="h-4 w-px bg-stone-200 mx-0.5" />

          {/* Bold */}
          <button
            type="button"
            onClick={() => setIsBold(!isBold)}
            className={`w-7 h-7 rounded-md font-serif font-bold text-xs flex items-center justify-center transition-colors ${
              isBold ? 'bg-stone-200 text-stone-900 font-extrabold' : 'text-stone-600 hover:bg-stone-100'
            }`}
            title="Bold"
          >
            B
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => setIsItalic(!isItalic)}
            className={`w-7 h-7 rounded-md font-serif italic text-xs flex items-center justify-center transition-colors ${
              isItalic ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-100'
            }`}
            title="Italic"
          >
            I
          </button>

          {/* Underline */}
          <button
            type="button"
            onClick={() => setIsUnderline(!isUnderline)}
            className={`w-7 h-7 rounded-md text-xs underline underline-offset-2 flex items-center justify-center transition-colors ${
              isUnderline ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-100'
            }`}
            title="Underline"
          >
            U
          </button>

          <div className="h-4 w-px bg-stone-200 mx-0.5" />

          {/* Align Left */}
          <button
            type="button"
            onClick={() => setTextAlign('left')}
            className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
              textAlign === 'left' ? 'bg-stone-200 text-stone-900' : 'text-stone-500 hover:bg-stone-100'
            }`}
            title="Align Left"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="15" y2="12" />
              <line x1="3" y1="18" x2="19" y2="18" />
            </svg>
          </button>

          {/* Align Center */}
          <button
            type="button"
            onClick={() => setTextAlign('center')}
            className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
              textAlign === 'center' ? 'bg-stone-200 text-stone-900' : 'text-stone-500 hover:bg-stone-100'
            }`}
            title="Align Center"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="6" y1="12" x2="18" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>

          {/* Align Right */}
          <button
            type="button"
            onClick={() => setTextAlign('right')}
            className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
              textAlign === 'right' ? 'bg-stone-200 text-stone-900' : 'text-stone-500 hover:bg-stone-100'
            }`}
            title="Align Right"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="9" y1="12" x2="21" y2="12" />
              <line x1="5" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Align Justify */}
          <button
            type="button"
            onClick={() => setTextAlign('justify')}
            className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
              textAlign === 'justify' ? 'bg-stone-200 text-stone-900' : 'text-stone-500 hover:bg-stone-100'
            }`}
            title="Justify"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="h-4 w-px bg-stone-200 mx-0.5" />

          {/* Decrease Indent */}
          <button
            type="button"
            onClick={() => setIndent((prev) => Math.max(0, prev - 16))}
            className="w-7 h-7 rounded-md text-stone-500 hover:bg-stone-100 flex items-center justify-center"
            title="Decrease Indent"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="21" y1="6" x2="11" y2="6" />
              <line x1="21" y1="12" x2="11" y2="12" />
              <line x1="21" y1="18" x2="11" y2="18" />
              <polyline points="7 8 3 12 7 16" />
            </svg>
          </button>

          {/* Increase Indent */}
          <button
            type="button"
            onClick={() => setIndent((prev) => Math.min(64, prev + 16))}
            className="w-7 h-7 rounded-md text-stone-500 hover:bg-stone-100 flex items-center justify-center"
            title="Increase Indent"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="21" y1="6" x2="11" y2="6" />
              <line x1="21" y1="12" x2="11" y2="12" />
              <line x1="21" y1="18" x2="11" y2="18" />
              <polyline points="3 8 7 12 3 16" />
            </svg>
          </button>

          <div className="h-4 w-px bg-stone-200 mx-0.5" />

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            className="px-2.5 py-1 rounded-md bg-[#85A72C] hover:bg-[#729124] text-white font-bold text-xs transition-colors ml-1"
          >
            Save
          </button>
        </div>
      </div>

      {/* Document Content (Exact typography and paragraphs matching Image 2) */}
      <div
        className="space-y-6 pt-2 transition-all leading-relaxed"
        style={{
          fontSize: `${fontSize}px`,
          fontWeight: isBold ? '700' : '400',
          fontStyle: isItalic ? 'italic' : 'normal',
          textDecoration: isUnderline ? 'underline' : 'none',
          textAlign: textAlign,
          paddingLeft: `${indent}px`,
        }}
      >
        {paragraphs.map((p, idx) => (
          <p
            key={idx}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleParagraphChange(idx, e.currentTarget.textContent || '')}
            className="text-stone-700 leading-[1.8] outline-none focus:bg-amber-50/30 rounded p-1 transition-colors selection:bg-[#BFE369]/60"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
