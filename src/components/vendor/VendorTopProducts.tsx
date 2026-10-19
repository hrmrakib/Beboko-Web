"use client";

import React from 'react';
import Link from 'next/link';

interface TopProductItem {
  id: number;
  name: string;
  itemsCount: string;
  barCode: string;
  discount: string;
  price: string;
  iconBg: string;
  emoji: string;
}

const topProducts: TopProductItem[] = [
  {
    id: 1,
    name: 'Oreweate wh..',
    itemsCount: '100 Items',
    barCode: '1289586',
    discount: '15%',
    price: '$20',
    iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
    emoji: '🍞',
  },
  {
    id: 2,
    name: 'Oreweate wh..',
    itemsCount: '100 Items',
    barCode: '1289586',
    discount: '10%',
    price: '$30',
    iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
    emoji: '🥫',
  },
  {
    id: 3,
    name: 'Oreweate wh..',
    itemsCount: '100 Items',
    barCode: '1289586',
    discount: '5%',
    price: '$30',
    iconBg: 'bg-pink-50 text-pink-600 border-pink-100',
    emoji: '🥛',
  },
];

export function VendorTopProducts() {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-100 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-base sm:text-lg font-bold text-stone-800 tracking-tight">
          Top Products
        </h2>
        <Link
          href="/vendor/products"
          className="text-xs font-bold text-[#85A72C] hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Products Column Header */}
      <div className="hidden sm:grid grid-cols-12 text-[11px] font-semibold text-stone-400 pb-2 border-b border-stone-100">
        <span className="col-span-5">Product</span>
        <span className="col-span-3 text-center">Bar Code</span>
        <span className="col-span-2 text-center">Discount</span>
        <span className="col-span-2 text-right">Price</span>
      </div>

      {/* Products List */}
      <div className="divide-y divide-stone-50 mt-1">
        {topProducts.map((prod) => (
          <div
            key={prod.id}
            className="py-3 flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center gap-2 hover:bg-stone-50/70 p-2 rounded-xl transition-colors"
          >
            {/* Product Thumbnail & Name */}
            <div className="col-span-5 flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg flex-shrink-0 shadow-2xs ${prod.iconBg}`}
              >
                {prod.emoji}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-stone-800 text-xs sm:text-sm truncate">
                  {prod.name}
                </h3>
                <p className="text-[11px] text-stone-400">{prod.itemsCount}</p>
              </div>
            </div>

            {/* Bar Code */}
            <div className="col-span-3 text-center text-xs font-medium text-stone-500 hidden sm:block">
              {prod.barCode}
            </div>

            {/* Discount */}
            <div className="col-span-2 text-center text-xs font-semibold text-stone-600 hidden sm:block">
              {prod.discount}
            </div>

            {/* Price */}
            <div className="col-span-2 text-right text-xs sm:text-sm font-bold text-stone-800 self-end sm:self-center">
              {prod.price}
            </div>

            {/* Mobile metadata row */}
            <div className="flex sm:hidden items-center justify-between w-full text-xs text-stone-500 pt-1">
              <span>Code: {prod.barCode}</span>
              <span className="font-semibold text-stone-700">Disc: {prod.discount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
