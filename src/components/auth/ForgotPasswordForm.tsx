"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your email address');
      return;
    }

    // Basic email validation regex
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to verify-code with email query param
      router.push(`/verify-code?email=${encodeURIComponent(email)}`);
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Error Message */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Email Address Field */}
      <div>
        <label htmlFor="forgot-email" className="block text-xs sm:text-sm font-medium text-stone-600 mb-2">
          Email address
        </label>
        <div className="relative">
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="esteban_schiller@gmail.com"
            autoComplete="email"
            className="w-full h-12 sm:h-[50px] px-4 rounded-xl bg-[#EEF2F6] text-stone-900 placeholder:text-stone-400 text-sm sm:text-base border border-transparent focus:border-[#E05A27] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E05A27]/15 transition-all"
          />
        </div>
      </div>

      {/* Send a Code Button */}
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
              <span>Sending code...</span>
            </>
          ) : (
            <span>Send a code</span>
          )}
        </button>
      </div>

      {/* Back to Login Link */}
      <div className="text-center pt-2">
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
