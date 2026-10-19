"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: string;
  quantity: string;
  stock: number;
  status: 'Available' | 'unavailable';
  emoji: string;
  bgColor: string;
}

const initialProducts: ProductItem[] = [
  {
    id: '#12333',
    name: 'Papaya',
    category: 'Foods',
    price: '$ 15',
    quantity: '500-600gm',
    stock: 120,
    status: 'Available',
    emoji: '🥭',
    bgColor: 'bg-amber-50 border-amber-200',
  },
  {
    id: '#12333',
    name: 'Pineapple',
    category: 'Foods',
    price: '$ 10',
    quantity: '500-600gm',
    stock: 120,
    status: 'unavailable',
    emoji: '🍍',
    bgColor: 'bg-yellow-50 border-yellow-200',
  },
  {
    id: '#12333',
    name: 'Ice-cream',
    category: 'Foods',
    price: '$ 12',
    quantity: '500-600gm',
    stock: 120,
    status: 'Available',
    emoji: '🍨',
    bgColor: 'bg-rose-50 border-rose-200',
  },
  {
    id: '#12333',
    name: 'Mango',
    category: 'Foods',
    price: '$ 25',
    quantity: '1kg',
    stock: 120,
    status: 'Available',
    emoji: '🥭',
    bgColor: 'bg-orange-50 border-orange-200',
  },
  {
    id: '#12333',
    name: 'Orange',
    category: 'Cleaning',
    price: '$ 20',
    quantity: '1kg',
    stock: 120,
    status: 'Available',
    emoji: '🍊',
    bgColor: 'bg-orange-50 border-orange-200',
  },
];

export function VendorProductsTable() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toggleProductStatus = (index: number) => {
    setProducts((prev) =>
      prev.map((p, idx) => {
        if (idx === index) {
          const next = p.status === 'Available' ? 'unavailable' : 'Available';
          setToastMsg(`${p.name} status updated to ${next}.`);
          setTimeout(() => setToastMsg(null), 3000);
          return { ...p, status: next };
        }
        return p;
      })
    );
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-100">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-stone-900/95 text-white text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-[#85A72C] animate-ping" />
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="ml-2 text-stone-400 hover:text-white p-1">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-base sm:text-lg font-bold text-stone-800 tracking-tight">
          Products List
        </h2>
        <Link
          href="/vendor/products"
          className="text-xs font-bold text-[#85A72C] hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto select-none">
        <table className="w-full text-left text-xs sm:text-sm min-w-[700px]">
          <thead>
            <tr className="text-stone-700 font-bold border-b border-stone-100 pb-3">
              <th className="py-3 px-3 font-bold w-28">Products ID</th>
              <th className="py-3 px-3 font-bold">Products Name</th>
              <th className="py-3 px-3 font-bold">Category</th>
              <th className="py-3 px-3 font-bold">Price</th>
              <th className="py-3 px-3 font-bold">Quantity</th>
              <th className="py-3 px-3 font-bold text-center">Stock</th>
              <th className="py-3 px-3 font-bold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {products.map((item, idx) => (
              <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                {/* ID */}
                <td className="py-3.5 px-3 font-medium text-stone-500 whitespace-nowrap">
                  {item.id}
                </td>

                {/* Name */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg flex-shrink-0 shadow-2xs ${item.bgColor}`}
                    >
                      {item.emoji}
                    </div>
                    <span className="font-bold text-stone-800 whitespace-nowrap">
                      {item.name}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="py-3.5 px-3 text-stone-600 font-medium whitespace-nowrap">
                  {item.category}
                </td>

                {/* Price */}
                <td className="py-3.5 px-3 font-semibold text-stone-700 whitespace-nowrap">
                  {item.price}
                </td>

                {/* Quantity */}
                <td className="py-3.5 px-3 text-stone-600 font-medium whitespace-nowrap">
                  {item.quantity}
                </td>

                {/* Stock */}
                <td className="py-3.5 px-3 text-stone-600 font-semibold text-center whitespace-nowrap">
                  {item.stock}
                </td>

                {/* Status: Available (green pill) / unavailable (red pill) */}
                <td className="py-3.5 px-3 text-center whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => toggleProductStatus(idx)}
                    className={`inline-block px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                      item.status === 'Available'
                        ? 'bg-[#EAF7E9] text-[#2EA240] hover:bg-[#d8eed7]'
                        : 'bg-[#FEECEC] text-[#D84242] hover:bg-[#fad3d3]'
                    }`}
                    title="Click to toggle availability"
                  >
                    {item.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
