"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your email address');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password');
      return;
    }

    setIsLoading(true);
    // Simulate brief network auth
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Signed in successfully! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 1200);
    }, 800);
  };

  const handleFillDemo = () => {
    setEmail('esteban_schiller@gmail.com');
    setPassword('DarDar@2026!');
    setErrorMsg(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Notifications */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label htmlFor="login-email" className="block text-xs sm:text-sm font-medium text-stone-600 mb-2">
          Email address:
        </label>
        <div className="relative">
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="esteban_schiller@gmail.com"
            autoComplete="email"
            className="w-full h-12 sm:h-[50px] px-4 rounded-xl bg-[#EEF2F6] text-stone-900 placeholder:text-stone-400 text-sm sm:text-base border border-transparent focus:border-[#E05A27] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E05A27]/15 transition-all"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="login-password" className="block text-xs sm:text-sm font-medium text-stone-600 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            className="w-full h-12 sm:h-[50px] pl-4 pr-11 rounded-xl bg-[#EEF2F6] text-stone-900 placeholder:text-stone-400 text-sm sm:text-base border border-transparent focus:border-[#E05A27] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E05A27]/15 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 transition-colors focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Remember Password & Forget Password */}
      <div className="flex items-center justify-between pt-1 pb-1">
        <label className="flex items-center gap-2 cursor-pointer select-none group">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-stone-300 text-[#E05A27] focus:ring-[#E05A27] cursor-pointer accent-[#E05A27]"
          />
          <span className="text-xs sm:text-sm text-stone-500 group-hover:text-stone-700 transition-colors">
            Remember Password
          </span>
        </label>

        <Link
          href="/forgot-password"
          className="text-xs sm:text-sm font-medium text-stone-500 hover:text-[#E05A27] transition-colors"
        >
          Forget Password?
        </Link>
      </div>

      {/* Sign In Button */}
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
              <span>Signing In...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </div>

      {/* Quick Demo Helper */}
      <div className="pt-3 text-center border-t border-stone-100">
        <button
          type="button"
          onClick={handleFillDemo}
          className="text-xs text-stone-400 hover:text-[#E05A27] transition-colors inline-flex items-center gap-1 font-medium"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Fill sample credentials
        </button>
      </div>
    </form>
  );
}
