"use client";

import React from 'react';
import { VendorSalesChart } from '@/components/vendor/VendorSalesChart';
import { VendorTopProducts } from '@/components/vendor/VendorTopProducts';
import { VendorProductsTable } from '@/components/vendor/VendorProductsTable';

export default function VendorDashboardPage() {
  const statCards = [
    {
      label: 'Total sales',
      value: '566+',
      bgColor: 'bg-[#E0F2FE]',
      iconColor: 'text-[#0284C7]',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      label: 'Total Income',
      value: '258+',
      bgColor: 'bg-[#EEF2FF]',
      iconColor: 'text-[#4F46E5]',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v12M15 9.5a2.5 2.5 0 0 0-5 0c0 4 5 2 5 5a2.5 2.5 0 0 1-5 0" />
        </svg>
      ),
    },
    {
      label: 'Complete Order',
      value: '865+',
      bgColor: 'bg-[#FEF3C7]',
      iconColor: 'text-[#D97706]',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      label: 'Pending Orders',
      value: '865+',
      bgColor: 'bg-[#FFEDD5]',
      iconColor: 'text-[#EA580C]',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 4 Stat Cards Row (Matches Image 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-100 flex items-center gap-4 shadow-2xs hover:shadow-xs transition-shadow"
          >
            {/* Round Icon Badge */}
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 ${card.bgColor} ${card.iconColor}`}
            >
              {card.icon}
            </div>

            {/* Numbers & Label */}
            <div>
              <div className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight leading-tight">
                {card.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-400 mt-0.5">
                {card.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row: Sales Overview Wave Chart + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <VendorSalesChart />
        </div>
        <div className="lg:col-span-5">
          <VendorTopProducts />
        </div>
      </div>

      {/* Bottom Section: Products List Table */}
      <div>
        <VendorProductsTable />
      </div>
    </div>
  );
}
