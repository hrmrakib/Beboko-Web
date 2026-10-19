"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function VendorProfilePage() {
  const [storeName, setStoreName] = useState('Fresh Harvest Grocery & Fruits');
  const [ownerName, setOwnerName] = useState('Kabila Mukendi');
  const [email, setEmail] = useState('vendor@dardar.app');
  const [phone, setPhone] = useState('+243 81 234 5678');
  const [address, setAddress] = useState('Avenue de la Paix, Gombe, Kinshasa');
  const [openHours, setOpenHours] = useState('08:00 AM - 09:00 PM');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMsg('Store profile updated successfully.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-stone-900/95 text-white text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-[#85A72C] animate-ping" />
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="ml-2 text-stone-400 hover:text-white p-1">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
        <Link
          href="/vendor"
          className="p-1 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
          Store Profile
        </h1>
      </div>

      {/* Profile Card */}
      <div className="bg-[#F4F5F7] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-2xs">
        <div className="relative">
          <img
            src="/images/vendor.jpg"
            alt={storeName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white shadow-md"
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center text-stone-600 hover:text-[#85A72C]"
            title="Upload Logo"
          >
            📷
          </button>
        </div>

        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-800">{storeName}</h2>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">Verified Partner Store • Active</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF7E9] text-[#2EA240]">
            ✓ Open for Delivery
          </span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Owner / Manager Name</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-stone-700 mb-1">Store Location</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Operating Hours</label>
            <input
              type="text"
              value={openHours}
              onChange={(e) => setOpenHours(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-[#85A72C]"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            className="px-12 py-3 rounded-xl bg-[#E05A27] hover:bg-[#c94d1d] text-white font-bold text-sm shadow-md transition-all active:scale-98"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
