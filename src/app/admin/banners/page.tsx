"use client";

import React, { useState } from 'react';

const banners = [
  {
    id: 1,
    title: 'Kinshasa Fast Delivery 20% Off',
    type: 'Home Hero Banner',
    status: 'ACTIVE',
    validUntil: '31 Dec 2026',
  },
  {
    id: 2,
    title: 'Free Delivery Weekend on Groceries',
    type: 'Promotional Ribbon',
    status: 'ACTIVE',
    validUntil: '15 Nov 2026',
  },
];

export default function BannerSectionPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
            Banner &amp; Promo Section
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Manage promotional campaigns and hero announcement banners.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-[#85A72C] hover:bg-[#729124] text-white text-xs sm:text-sm font-bold shadow-sm transition-all self-start sm:self-auto">
          + Add New Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map((b) => (
          <div key={b.id} className="p-5 rounded-2xl border border-stone-100 bg-stone-50/50 flex flex-col justify-between h-40">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#85A72C] bg-lime-50 px-2 py-0.5 rounded-md">
                {b.type}
              </span>
              <h3 className="font-bold text-stone-800 text-base mt-2">{b.title}</h3>
              <p className="text-stone-400 text-xs mt-1">Valid until {b.validUntil}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-stone-100">
              <span className="text-xs font-bold text-green-600">● {b.status}</span>
              <button className="text-xs font-semibold text-stone-500 hover:text-stone-800">
                Edit Banner
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
