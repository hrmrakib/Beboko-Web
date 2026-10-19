import React from 'react';
import type { Metadata } from 'next';
import { AuthCard } from '@/components/auth/AuthCard';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login to Account | Dar Dar',
  description: 'Sign in to your Dar Dar account to manage food, groceries, and orders.',
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Login to Account"
      subtitle="Please enter your email and password to continue"
    >
      <LoginForm />
    </AuthCard>
  );
}
