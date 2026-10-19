import React from 'react';
import type { Metadata } from 'next';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Dar Dar',
  description: 'Manage Dar Dar orders, vendor requests, deliveries, and platform operations.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#ECEEF2] flex flex-col lg:flex-row antialiased selection:bg-[#85A72C] selection:text-white">
      {/* Persistent Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-3 sm:p-4 md:p-6">
          <div className="bg-white rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 md:p-8 shadow-sm border border-stone-200/60 min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
