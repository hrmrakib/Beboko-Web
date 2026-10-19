"use client";

import React, { useState } from 'react';

interface VendorRequest {
  id: number;
  serial: string;
  name: string;
  email: string;
  contact: string;
  location: string;
  userType: 'Grocery' | 'Restaurant';
  avatar: string;
  status: 'PENDING' | 'APPROVED' | 'CANCELLED';
}

const initialVendors: VendorRequest[] = [
  {
    id: 1,
    serial: '1.',
    name: 'DZ Bra Panties Shop',
    email: 'redaniel@gmail.com',
    contact: '+1 (239) 555-0108',
    location: '0 / 77 Purdy Crescent,...',
    userType: 'Grocery',
    avatar: '/images/vendor.jpg',
    status: 'PENDING',
  },
  {
    id: 2,
    serial: '2.',
    name: "Nature's Cart",
    email: 'zitka@mail.ru',
    contact: '+1 (470) 916 8511',
    location: '09 Arnulfo Crossing, B...',
    userType: 'Restaurant',
    avatar: '/images/pickup.jpg',
    status: 'PENDING',
  },
  {
    id: 3,
    serial: '3.',
    name: 'Flavors & Feasts',
    email: 'seema@gmail.com',
    contact: '+1 (704) 555-0127',
    location: '3 / 621 Juvenal Ridge,...',
    userType: 'Grocery',
    avatar: '/images/avatar-1.png',
    status: 'PENDING',
  },
  {
    id: 4,
    serial: '4.',
    name: 'Taste Retreat',
    email: 'fzaaaaa@gmail.com',
    contact: '+1 (302) 555-0107',
    location: '208 Olson Boulevard,...',
    userType: 'Restaurant',
    avatar: '/images/avatar-2.png',
    status: 'PENDING',
  },
];

export function VendorRequestTable() {
  const [vendors, setVendors] = useState<VendorRequest[]>(initialVendors);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleAction = (id: number, action: 'APPROVED' | 'CANCELLED') => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: action } : v))
    );

    const vendor = vendors.find((v) => v.id === id);
    if (vendor) {
      setToastMsg(
        `${vendor.name} has been ${action === 'APPROVED' ? 'Approved' : 'Cancelled'}.`
      );
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-5 sm:p-6 shadow-sm">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="mb-4 p-3 rounded-xl bg-stone-900 text-white text-xs sm:text-sm font-semibold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>{toastMsg}</span>
          <button
            onClick={() => setToastMsg(null)}
            className="text-stone-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-stone-800 text-base sm:text-lg">
          Vendor Request
        </h3>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
          {vendors.filter((v) => v.status === 'PENDING').length} Pending
        </span>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm min-w-[700px]">
          <thead>
            <tr className="text-stone-700 font-bold border-b border-stone-100 pb-3">
              <th className="py-3 px-2 font-bold">Serial no.</th>
              <th className="py-3 px-3 font-bold">Name</th>
              <th className="py-3 px-3 font-bold">Contact</th>
              <th className="py-3 px-3 font-bold">Location</th>
              <th className="py-3 px-3 font-bold">User Types</th>
              <th className="py-3 px-3 font-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {vendors.map((vendor) => (
              <tr
                key={vendor.id}
                className="hover:bg-stone-50/60 transition-colors"
              >
                {/* Serial no. */}
                <td className="py-4 px-2 font-medium text-stone-600 whitespace-nowrap">
                  {vendor.serial}
                </td>

                {/* Name & Email with Avatar */}
                <td className="py-4 px-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={vendor.avatar}
                      alt={vendor.name}
                      className="w-10 h-10 rounded-full object-cover border border-stone-200 flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold text-stone-800 leading-tight">
                        {vendor.name}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        {vendor.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Contact */}
                <td className="py-4 px-3 text-stone-600 font-medium whitespace-nowrap">
                  {vendor.contact}
                </td>

                {/* Location */}
                <td className="py-4 px-3 text-stone-600 font-medium max-w-[180px] truncate">
                  {vendor.location}
                </td>

                {/* User Types */}
                <td className="py-4 px-3 text-stone-600 font-medium whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      vendor.userType === 'Grocery'
                        ? 'bg-lime-50 text-lime-700'
                        : 'bg-orange-50 text-orange-700'
                    }`}
                  >
                    {vendor.userType}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-3 text-center whitespace-nowrap">
                  {vendor.status === 'PENDING' ? (
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleAction(vendor.id, 'APPROVED')}
                        className="px-4 py-1.5 rounded-full bg-[#4CAE24] hover:bg-[#41961e] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(vendor.id, 'CANCELLED')}
                        className="px-4 py-1.5 rounded-full bg-[#C82323] hover:bg-[#aa1d1d] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        vendor.status === 'APPROVED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {vendor.status === 'APPROVED' ? '✓ Approved' : '✕ Cancelled'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
