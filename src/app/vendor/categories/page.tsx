"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface CategoryRow {
  id: number;
  sNo: number;
  name: string;
  subCategoriesCount: number;
  image: string;
  emoji: string;
  bgColor: string;
}

const initialCategories: CategoryRow[] = [
  { id: 1, sNo: 1, name: 'Foods', subCategoriesCount: 5, image: '/images/pickup.jpg', emoji: '🧺', bgColor: 'bg-amber-50' },
  { id: 2, sNo: 2, name: 'Cleaning', subCategoriesCount: 12, image: '/images/vendor.jpg', emoji: '🧹', bgColor: 'bg-blue-50' },
  { id: 3, sNo: 3, name: 'Personal Care', subCategoriesCount: 3, image: '/images/hero-phone.png', emoji: '🧴', bgColor: 'bg-purple-50' },
  { id: 4, sNo: 4, name: 'Health & Wellness', subCategoriesCount: 2, image: '/images/pickup.jpg', emoji: '💊', bgColor: 'bg-emerald-50' },
  { id: 5, sNo: 5, name: 'Homes & Kitchen', subCategoriesCount: 0, image: '/images/vendor.jpg', emoji: '🍳', bgColor: 'bg-orange-50' },
  { id: 6, sNo: 6, name: 'Baby Care', subCategoriesCount: 0, image: '/images/hero-phone.png', emoji: '🍼', bgColor: 'bg-pink-50' },
  { id: 7, sNo: 7, name: 'Beauty & Makeup', subCategoriesCount: 0, image: '/images/pickup.jpg', emoji: '💄', bgColor: 'bg-rose-50' },
  { id: 8, sNo: 8, name: 'Pet Care', subCategoriesCount: 0, image: '/images/vendor.jpg', emoji: '🐾', bgColor: 'bg-yellow-50' },
  { id: 9, sNo: 9, name: 'Stationery and Office', subCategoriesCount: 0, image: '/images/hero-phone.png', emoji: '📚', bgColor: 'bg-indigo-50' },
  { id: 10, sNo: 10, name: 'Toys & Sports', subCategoriesCount: 0, image: '/images/pickup.jpg', emoji: '⚽', bgColor: 'bg-teal-50' },
];

export default function VendorCategoriesListPage() {
  const [categories, setCategories] = useState<CategoryRow[]>(initialCategories);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryRow | null>(null);
  const [formData, setFormData] = useState({ name: '', image: '/images/pickup.jpg' });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMsg('Category list refreshed.');
      setTimeout(() => setToastMsg(null), 2500);
    }, 600);
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setToastMsg('Category removed successfully.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? { ...c, name: formData.name } : c))
      );
      setToastMsg(`Category "${formData.name}" updated.`);
    } else {
      const nextSNo = categories.length > 0 ? Math.max(...categories.map((c) => c.sNo)) + 1 : 1;
      const newCat: CategoryRow = {
        id: Date.now(),
        sNo: nextSNo,
        name: formData.name,
        subCategoriesCount: 0,
        image: formData.image,
        emoji: '📦',
        bgColor: 'bg-stone-50',
      };
      setCategories([...categories, newCat]);
      setToastMsg(`Category "${formData.name}" added successfully.`);
    }

    setShowAddModal(false);
    setEditingCategory(null);
    setFormData({ name: '', image: '/images/pickup.jpg' });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openEditModal = (cat: CategoryRow) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, image: cat.image });
    setShowAddModal(true);
  };

  const filteredCategories = categories.filter((c) => {
    if (selectedFilter === 'All') return true;
    return c.name === selectedFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-stone-900/95 text-white text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-[#85A72C] animate-ping" />
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="ml-2 text-stone-400 hover:text-white p-1">✕</button>
        </div>
      )}

      {/* Header Bar (Matches Image 1) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <Link
            href="/vendor"
            className="p-1 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title="Back to Dashboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
            Category
          </h1>
        </div>

        {/* Right Controls: Data Refresh + Timestamp + Add Category Button */}
        <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto text-xs sm:text-sm">
          <button
            type="button"
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 font-semibold text-stone-700 shadow-2xs transition-all active:scale-95"
          >
            <span>Data Refresh</span>
            <svg
              className={`w-3.5 h-3.5 text-indigo-600 ${isRefreshing ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <span className="text-stone-600 font-medium whitespace-nowrap hidden md:inline">
            March 25,2024 10:43 Am
          </span>

          <button
            type="button"
            onClick={() => {
              setEditingCategory(null);
              setFormData({ name: '', image: '/images/pickup.jpg' });
              setShowAddModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#72B043] hover:bg-[#629B37] text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>Add Category</span>
            <span className="text-base leading-none font-bold">+</span>
          </button>
        </div>
      </div>

      {/* Filter Dropdown (Matches Image 1) */}
      <div className="pt-1">
        <div className="relative inline-block w-48 sm:w-56">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="appearance-none w-full h-10 px-4 pr-9 rounded-xl border border-stone-200 text-stone-700 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#72B043] bg-white transition-all cursor-pointer shadow-2xs"
          >
            <option value="All">Category (All)</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <svg className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Table (Matches Image 1) */}
      <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-2xs">
        <div className="overflow-x-auto select-none">
          <table className="w-full text-left text-xs sm:text-sm min-w-[700px]">
            <thead>
              <tr className="text-stone-700 font-bold border-b border-stone-100 bg-stone-50/50">
                <th className="py-3.5 px-4 font-bold w-16">S.No</th>
                <th className="py-3.5 px-4 font-bold w-36">Category Image</th>
                <th className="py-3.5 px-4 font-bold">Category Name</th>
                <th className="py-3.5 px-4 font-bold text-center w-36">Sub Categories</th>
                <th className="py-3.5 px-4 font-bold text-center w-28">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredCategories.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-4 px-4 font-medium text-stone-500 whitespace-nowrap">
                    {item.sNo}
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-stone-200/80 bg-stone-50 flex items-center justify-center shadow-2xs p-1">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-stone-800 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="py-4 px-4 font-semibold text-stone-600 text-center whitespace-nowrap">
                    {item.subCategoriesCount}
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <div className="inline-flex items-center gap-3">
                      {/* Edit Pencil Icon (Blue/Purple) */}
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Category"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>

                      {/* Trash Can Icon (Red) */}
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Category"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-800 text-lg">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="pt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dairy &amp; Eggs"
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#72B043]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Category Image
                </label>
                <div className="h-36 rounded-2xl border-2 border-dashed border-stone-300 hover:border-[#72B043] bg-stone-50 flex flex-col items-center justify-center p-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-400 shadow-2xs mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.8} />
                      <circle cx="8.5" cy="8.5" r="1.5" strokeWidth={1.8} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-[#72B043]">Browse Image</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="px-12 py-3 rounded-xl bg-[#72B043] hover:bg-[#629B37] text-white font-bold text-sm shadow-md transition-all active:scale-98"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
