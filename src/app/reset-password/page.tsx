import React from 'react';
import type { Metadata } from 'next';
import { AuthCard } from '@/components/auth/AuthCard';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Set a new password | Dar Dar',
  description: 'Create a new secure password for your Dar Dar account.',
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Set a new password"
      subtitle="Create a new password. Ensure it differs from previous ones for security"
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
