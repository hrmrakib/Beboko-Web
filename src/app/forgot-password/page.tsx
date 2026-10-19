import React from 'react';
import type { Metadata } from 'next';
import { AuthCard } from '@/components/auth/AuthCard';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forget Password | Dar Dar',
  description: 'Reset your password by entering your email address.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forget Password"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
