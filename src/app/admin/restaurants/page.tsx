"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface RestaurantItem {
  id: number;
  sNo: string;
  name: string;
  branch: string;
  image: string;
  totalIncome: string;
  contactNumber: string;
  date: string;
  rider: {
    name: string;
    phone: string;
    avatar: string;
  };
  status: 'Activate' | 'deactivate';
}

const initialRestaurants: RestaurantItem[] = [
  {
    id: 1,
    sNo: '1.',
    name: 'Hawaiian Pizza',
    branch: 'Hawaiian Pizza',
    image: '/images/pickup.jpg',
    totalIncome: '$121,4402',
    contactNumber: '+1 (470) 918 8599',
    date: '05/12/2024',
    rider: {
      name: 'Foysal Rahman',
      phone: '+1 (239) 555-0108',
      avatar: '/images/avatar-1.png',
    },
    status: 'deactivate',
  },
  {
    id: 2,
    sNo: '2.',
    name: 'Hawaiian Pizza',
    branch: 'Kent, Utah',
    image: '/images/vendor.jpg',
    totalIncome: '$121,4402',
    contactNumber: '+1 (229) 555-0109',
    date: '05/12/2024',
    rider: {
      name: 'Jawwad Hossain',
      phone: '+1 (239) 555-0108',
      avatar: '/images/avatar-2.png',
    },
    status: 'Activate',
  },
  {
    id: 3,
    sNo: '3.',
    name: 'Hawaiian Pizza',
    branch: 'Pasadena, Oklah...',
    image: '/images/pickup.jpg',
    totalIncome: '$293.01',
    contactNumber: '+1 470 9181 8522',
    date: '05/12/2024',
    rider: {
      name: 'Al-Amin',
      phone: '+1 (239) 555-0108',
      avatar: '/images/avatar-3.png',
    },
    status: 'Activate',
  },
  {
    id: 4,
    sNo: '4.',
    name: 'Hawaiian Pizza',
    branch: 'Coppell, Virginia',
    image: '/images/vendor.jpg',
    totalIncome: '$948.55',
    contactNumber: '+1 (907) 555-0101',
    date: '05/12/2024',
    rider: {
      name: 'Alamgir Kabir',
      phone: '+1 (239) 555-0108',
      avatar: '/images/rider.png',
    },
    status: 'Activate',
  },
  {
    id: 5,
    sNo: '5.',
    name: 'Hawaiian Pizza',
    branch: 'Lafayette, Califo...',
    image: '/images/pickup.jpg',
    totalIncome: '$219.78',
    contactNumber: '+1 470 9181 8566',
    date: '05/12/2024',
    rider: {
      name: 'Ashiqur Rahman',
      phone: '+1 (239) 555-0108',
      avatar: '/images/customer.png',
    },
    status: 'Activate',
  },
  {
    id: 6,
    sNo: '6.',
    name: 'Hawaiian Pizza',
    branch: 'Corona, Michigan',
    image: '/images/vendor.jpg',
    totalIncome: '$106.58',
    contactNumber: '+1 (307) 555-0133',
    date: '05/12/2024',
    rider: {
      name: 'Fahim Ahmed',
      phone: '+1 (239) 555-0108',
      avatar: '/images/avatar-1.png',
    },
    status: 'Activate',
  },
  {
    id: 7,
    sNo: '7.',
    name: 'Hawaiian Pizza',
    branch: 'Stockton, New H...',
    image: '/images/pickup.jpg',
    totalIncome: '$630.44',
    contactNumber: '+1 (207) 555-0119',
    date: '05/12/2024',
    rider: {
      name: 'Banedict Fring Dron',
      phone: '+1 (239) 555-0108',
      avatar: '/images/avatar-2.png',
    },
    status: 'Activate',
  },
];

export default function TotalRestaurantPage() {
  const [restaurants, setRestaurants] = useState<RestaurantItem[]>(initialRestaurants);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toggleStatus = (id: number, forcedStatus?: 'Activate' | 'deactivate') => {
    setRestaurants((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = forcedStatus || (item.status === 'Activate' ? 'deactivate' : 'Activate');
          setToastMsg(`${item.name} (${item.branch}) status set to ${next}.`);
          setTimeout(() => setToastMsg(null), 3500);
          return { ...item, status: next };
        }
        return item;
      })
    );
    setOpenDropdownId(null);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-stone-900 text-white text-xs sm:text-sm font-semibold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="text-stone-400 hover:text-white p-1">
            ✕
          </button>
        </div>
      )}

      {/* Header Bar (Matches Image 1: ← Total Restaurant) */}
      <div className="flex items-center gap-3 pb-3">
        <Link
          href="/admin"
          className="p-1 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          title="Back to Dashboard"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
          Total Restaurant
        </h1>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto select-none">
        <table className="w-full text-left text-xs sm:text-sm min-w-[900px]">
          <thead>
            <tr className="text-stone-700 font-bold border-b border-stone-100 pb-3">
              <th className="py-3 px-2 font-bold w-12">S no.</th>
              <th className="py-3 px-3 font-bold">Name</th>
              <th className="py-3 px-3 font-bold">Total Income</th>
              <th className="py-3 px-3 font-bold">Contact Number</th>
              <th className="py-3 px-3 font-bold">Date</th>
              <th className="py-3 px-3 font-bold">Delivery Received By</th>
              <th className="py-3 px-3 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {restaurants.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50/60 transition-colors">
                {/* S no. */}
                <td className="py-4 px-2 font-medium text-stone-500 whitespace-nowrap">
                  {item.sNo}
                </td>

                {/* Name */}
                <td className="py-4 px-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-stone-200 flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold text-stone-800 leading-tight">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5 whitespace-nowrap">
                        {item.branch}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Total Income */}
                <td className="py-4 px-3 font-semibold text-stone-700 whitespace-nowrap">
                  {item.totalIncome}
                </td>

                {/* Contact Number */}
                <td className="py-4 px-3 text-stone-600 font-medium whitespace-nowrap">
                  {item.contactNumber}
                </td>

                {/* Date */}
                <td className="py-4 px-3 text-stone-500 font-medium whitespace-nowrap">
                  {item.date}
                </td>

                {/* Delivery Received By */}
                <td className="py-4 px-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.rider.avatar}
                      alt={item.rider.name}
                      className="w-9 h-9 rounded-full object-cover border border-stone-200 flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold text-stone-800 leading-tight whitespace-nowrap">
                        {item.rider.name}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5 whitespace-nowrap">
                        {item.rider.phone}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Action: [ deactivate / Activate ] [ ⌄ ] (Matches Image 1 & 2) */}
                <td className="py-4 px-3 text-center whitespace-nowrap">
                  <div className="relative inline-flex items-center gap-1.5 justify-center">
                    {/* Status Pill Button */}
                    <button
                      type="button"
                      onClick={() => toggleStatus(item.id)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        item.status === 'deactivate'
                          ? 'bg-[#FEECEC] text-[#D84242] hover:bg-[#FCD8D8]'
                          : 'bg-[#EAF7E9] text-[#2EA240] hover:bg-[#DEF2DD]'
                      }`}
                    >
                      {item.status}
                    </button>

                    {/* Small Square Chevron Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdownId(openDropdownId === item.id ? null : item.id)
                      }
                      className="w-7 h-7 rounded-lg border border-stone-200/90 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-400 hover:text-stone-600 transition-colors"
                      title="More Options"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Options */}
                    {openDropdownId === item.id && (
                      <div className="absolute right-0 top-9 z-30 bg-white rounded-xl shadow-xl border border-stone-200/80 py-1.5 w-36 text-left text-xs font-semibold animate-in fade-in slide-in-from-top-1">
                        <button
                          onClick={() => toggleStatus(item.id, 'Activate')}
                          className="w-full px-3 py-1.5 text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                          Activate
                        </button>
                        <button
                          onClick={() => toggleStatus(item.id, 'deactivate')}
                          className="w-full px-3 py-1.5 text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          Deactivate
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
