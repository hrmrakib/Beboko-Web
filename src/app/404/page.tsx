import React from 'react';
import type { Metadata } from 'next';
import { NotFoundView } from '@/components/auth/NotFoundView';

export const metadata: Metadata = {
  title: 'Page Not Found - 404 | Dar Dar',
  description: "Looks like you've got lost. Return to Dar Dar dashboard or home.",
};

export default function Explicit404Page() {
  return <NotFoundView />;
}
