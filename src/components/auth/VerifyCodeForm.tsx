"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export function VerifyCodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');
  const displayEmail = emailParam || 'contact@dscode...com';

  // 5 digit code state (matching Image 3 which displays 5 boxes)
  const [digits, setDigits] = useState<string[]>(['2', '8', '4', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(45);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    // Only accept numeric digit
    const cleaned = value.replace(/[^0-9]/g, '');
    if (!cleaned) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    const lastChar = cleaned.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = lastChar;
    setDigits(newDigits);
    setErrorMsg(null);

    // Auto-advance to next box if available
    if (index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 5);
    if (!pastedData) return;

    const newDigits = [...digits];
    for (let i = 0; i < 5; i++) {
      newDigits[i] = pastedData[i] || '';
    }
    setDigits(newDigits);
    setErrorMsg(null);

    const nextIndex = Math.min(pastedData.length, 4);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const fullCode = digits.join('');
    if (fullCode.length < 5) {
      setErrorMsg('Please enter the complete 5-digit verification code');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to reset-password
      router.push(`/reset-password?email=${encodeURIComponent(displayEmail)}`);
    }, 700);
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
    setResendMessage(`A fresh 5-digit code has been sent to ${displayEmail}`);
    setTimeout(() => setResendMessage(null), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
      {/* Dynamic Subtitle banner or notifications */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      {resendMessage && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{resendMessage}</span>
        </div>
      )}

      {/* 5 Digit Input Boxes */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 my-2">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            aria-label={`Digit ${index + 1}`}
            className="w-11 h-13 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl bg-[#EEF2F6] text-stone-900 border border-transparent focus:border-[#E05A27] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E05A27]/15 transition-all shadow-sm"
          />
        ))}
      </div>

      {/* Verify Code Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 sm:h-[50px] bg-[#E05A27] hover:bg-[#c94b1b] active:scale-[0.99] text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg shadow-[#E05A27]/25 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Verifying code...</span>
            </>
          ) : (
            <span>Verify Code</span>
          )}
        </button>
      </div>

      {/* Resend Action */}
      <div className="text-center text-xs sm:text-sm text-stone-500 font-medium">
        <span>You have not received the email? </span>
        {resendCooldown > 0 ? (
          <span className="text-stone-400">
            Resend in <span className="font-semibold text-stone-600">{resendCooldown}s</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-[#E05A27] hover:underline font-semibold transition-colors cursor-pointer"
          >
            Resend
          </button>
        )}
      </div>

      {/* Back to Login Link */}
      <div className="text-center pt-1 border-t border-stone-100">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-500 hover:text-[#E05A27] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Login</span>
        </Link>
      </div>
    </form>
  );
}
