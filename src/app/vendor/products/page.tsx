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
    id: '#12334',
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
    id: '#12335',
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
    id: '#12336',
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
    id: '#12337',
    name: 'Orange',
    category: 'Cleaning',
    price: '$ 20',
    quantity: '1kg',
    stock: 120,
    status: 'Available',
    emoji: '🍊',
    bgColor: 'bg-orange-50 border-orange-200',
  },
  {
    id: '#12338',
    name: 'Oreweate Wheat Bread',
    category: 'Bakery',
    price: '$ 20',
    quantity: '1 Loaf',
    stock: 100,
    status: 'Available',
    emoji: '🍞',
    bgColor: 'bg-purple-50 border-purple-200',
  },
  {
    id: '#12339',
    name: 'Fresh Dairy Milk',
    category: 'Dairy',
    price: '$ 30',
    quantity: '1 Gallon',
    stock: 80,
    status: 'Available',
    emoji: '🥛',
    bgColor: 'bg-blue-50 border-blue-200',
  },
];

export default function VendorManageProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const categories = ['All', 'Foods', 'Bakery', 'Dairy', 'Cleaning'];

  const filtered = products.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const next = p.status === 'Available' ? 'unavailable' : 'Available';
          setToastMsg(`${p.name} status updated to ${next}.`);
          setTimeout(() => setToastMsg(null), 3000);
          return { ...p, status: next };
        }
        return p;
      })
    );
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setToastMsg('Product deleted from inventory.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
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

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone-100">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
            Manage Products
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
            Monitor inventory, adjust prices, and toggle in-store product availability.
          </p>
        </div>

        <Link
          href="/vendor/products/add"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#85A72C] hover:bg-[#729124] text-white font-bold text-xs sm:text-sm shadow-sm transition-all self-start sm:self-auto active:scale-95"
        >
          <span>+ Add Products</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <svg className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth={2} />
            <path strokeLinecap="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name or ID..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C] bg-white transition-all"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#85A72C] text-white shadow-2xs font-bold'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto select-none">
          <table className="w-full text-left text-xs sm:text-sm min-w-[750px]">
            <thead>
              <tr className="text-stone-700 font-bold border-b border-stone-100 bg-stone-50/50">
                <th className="py-3.5 px-4 font-bold w-28">Products ID</th>
                <th className="py-3.5 px-4 font-bold">Products Name</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Price</th>
                <th className="py-3.5 px-4 font-bold">Quantity</th>
                <th className="py-3.5 px-4 font-bold text-center">Stock</th>
                <th className="py-3.5 px-4 font-bold text-center">Status</th>
                <th className="py-3.5 px-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-stone-500 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg flex-shrink-0 shadow-2xs ${item.bgColor}`}>
                        {item.emoji}
                      </div>
                      <span className="font-bold text-stone-800 whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 font-medium whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-stone-700 whitespace-nowrap">
                    {item.price}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 font-medium whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 font-semibold text-center whitespace-nowrap">
                    {item.stock}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => toggleStatus(item.id)}
                      className={`inline-block px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                        item.status === 'Available'
                          ? 'bg-[#EAF7E9] text-[#2EA240] hover:bg-[#d8eed7]'
                          : 'bg-[#FEECEC] text-[#D84242] hover:bg-[#fad3d3]'
                      }`}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
