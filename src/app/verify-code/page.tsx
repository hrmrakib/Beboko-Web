import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthCard } from '@/components/auth/AuthCard';
import { VerifyCodeForm } from '@/components/auth/VerifyCodeForm';

export const metadata: Metadata = {
  title: 'Check your email | Dar Dar',
  description: 'Enter the 5-digit verification code sent to your email to verify your identity.',
};

export default function VerifyCodePage() {
  return (
    <AuthCard
      title="Check your email"
      subtitle={
        <span>
          We sent a reset link to <strong className="text-stone-700 font-semibold">contact@dscode...com</strong> enter 5 digit code that mentioned in the email
        </span>
      }
    >
      <Suspense fallback={<div className="h-48 flex items-center justify-center text-stone-400 text-sm">Loading verification...</div>}>
        <VerifyCodeForm />
      </Suspense>
    </AuthCard>
  );
}
