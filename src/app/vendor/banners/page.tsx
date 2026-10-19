"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface BannerCoverItem {
  id: number;
  sNo: number;
  name: string;
  image: string;
}

const initialBanners: BannerCoverItem[] = [
  {
    id: 1,
    sNo: 1,
    name: 'Christmas',
    image: '/images/banner-christmas.jpg',
  },
  {
    id: 2,
    sNo: 2,
    name: 'Vegetable',
    image: '/images/banner-vegetable.jpg',
  },
];

export default function VendorBannerSectionPage() {
  const [banners, setBanners] = useState<BannerCoverItem[]>(initialBanners);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerCoverItem | null>(null);
  const [formName, setFormName] = useState('');
  const [formImage, setFormImage] = useState<string | null>(null);

  const handleDelete = (id: number) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    setToastMsg('Cover banner deleted.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openAddModal = () => {
    setEditingBanner(null);
    setFormName('');
    setFormImage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: BannerCoverItem) => {
    setEditingBanner(item);
    setFormName(item.name);
    setFormImage(item.image);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingBanner) {
      setBanners((prev) =>
        prev.map((b) =>
          b.id === editingBanner.id
            ? { ...b, name: formName, image: formImage || b.image }
            : b
        )
      );
      setToastMsg(`Cover "${formName}" updated successfully.`);
    } else {
      const nextSNo = banners.length > 0 ? Math.max(...banners.map((b) => b.sNo)) + 1 : 1;
      const newBanner: BannerCoverItem = {
        id: Date.now(),
        sNo: nextSNo,
        name: formName,
        image: formImage || '/images/banner-vegetable.jpg',
      };
      setBanners([...banners, newBanner]);
      setToastMsg(`Cover "${formName}" added successfully.`);
    }

    setIsModalOpen(false);
    setTimeout(() => setToastMsg(null), 3000);
  };

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

      {/* Header Bar (Matches Image 3: ← Total Order / Add Cover +) */}
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
            Total Order
          </h1>
        </div>

        {/* Right Action: Add Cover + Button (Matches Image 3) */}
        <button
          type="button"
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-[#72B043] hover:bg-[#629B37] text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Add Cover</span>
          <span className="text-base leading-none font-bold">+</span>
        </button>
      </div>

      {/* Table (Matches Image 3) */}
      <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-2xs">
        <div className="overflow-x-auto select-none">
          <table className="w-full text-left text-xs sm:text-sm min-w-[650px]">
            <thead>
              <tr className="text-stone-700 font-bold border-b border-stone-100 bg-stone-50/50">
                <th className="py-3.5 px-4 font-bold w-20">S.No</th>
                <th className="py-3.5 px-4 font-bold w-72">Image</th>
                <th className="py-3.5 px-4 font-bold">Name</th>
                <th className="py-3.5 px-4 font-bold text-center w-28">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {banners.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/60 transition-colors">
                  {/* S.No */}
                  <td className="py-5 px-4 font-medium text-stone-500 whitespace-nowrap">
                    {item.sNo}
                  </td>

                  {/* Wide Horizontal Banner Image */}
                  <td className="py-5 px-4">
                    <div className="w-40 sm:w-48 h-16 sm:h-20 rounded-xl overflow-hidden border border-stone-200/80 bg-stone-100 shadow-2xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  {/* Name */}
                  <td className="py-5 px-4 font-medium text-stone-600 whitespace-nowrap">
                    {item.name}
                  </td>

                  {/* Action Icons: Edit (Blue) & Trash (Red) */}
                  <td className="py-5 px-4 text-center whitespace-nowrap">
                    <div className="inline-flex items-center gap-3">
                      {/* Edit Pencil Icon (Blue/Purple) */}
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Banner"
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
                        title="Delete Banner"
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

      {/* Add / Edit Cover Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-800 text-lg">
                {editingBanner ? 'Edit Cover Banner' : 'Add Cover Banner'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="pt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Cover Name
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Summer Harvest"
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#72B043]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Banner Image (16:9 or horizontal)
                </label>
                <div
                  onClick={() => setFormImage('/images/banner-vegetable.jpg')}
                  className="h-36 rounded-2xl border-2 border-dashed border-stone-300 hover:border-[#72B043] bg-stone-50 flex flex-col items-center justify-center p-3 cursor-pointer group transition-colors overflow-hidden"
                >
                  {formImage ? (
                    <img src={formImage} alt="Cover" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-400 shadow-2xs mb-1.5 group-hover:text-[#72B043]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.8} />
                          <circle cx="8.5" cy="8.5" r="1.5" strokeWidth={1.8} />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-[#72B043]">Browse Image</span>
                    </>
                  )}
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
