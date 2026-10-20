"use client";

import React, { useState } from 'react';

interface RiderItem {
  id: number;
  name: string;
  phone: string;
  vehicle: string;
  area: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  avatar: string;
}

const initialRiders: RiderItem[] = [
  {
    id: 1,
    name: 'Faysal Rahman',
    phone: '+1 (239) 555-0108',
    vehicle: 'Motorbike (Honda 125)',
    area: 'Gombe, Kinshasa',
    status: 'PENDING',
    avatar: '/images/avatar-1.png',
  },
  {
    id: 2,
    name: 'Jawwad Hossain',
    phone: '+1 (238) 555-0109',
    vehicle: 'Bicycle / E-bike',
    area: 'Gombe, Kinshasa',
    status: 'PENDING',
    avatar: '/images/avatar-2.png',
  },
  {
    id: 3,
    name: 'Alamgir Kabir',
    phone: '+1 (239) 555-0108',
    vehicle: 'Motorbike (Yamaha 150)',
    area: 'Lemba, Kinshasa',
    status: 'PENDING',
    avatar: '/images/rider.png',
  },
];

export default function RiderRequestPage() {
  const [riders, setRiders] = useState<RiderItem[]>(initialRiders);
  const [notification, setNotification] = useState<string | null>(null);

  const handleStatus = (id: number, newStatus: 'APPROVED' | 'REJECTED') => {
    setRiders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    const r = riders.find((x) => x.id === id);
    if (r) {
      setNotification(`${r.name} has been ${newStatus.toLowerCase()} successfully.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
            Rider Requests
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Review delivery partner onboarding submissions and vehicle details.
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-stone-900 text-white text-xs sm:text-sm font-semibold shadow-sm">
          {notification}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm min-w-[700px]">
          <thead>
            <tr className="text-stone-700 font-bold border-b border-stone-100 pb-3">
              <th className="py-3 px-3 font-bold">Rider</th>
              <th className="py-3 px-3 font-bold">Contact</th>
              <th className="py-3 px-3 font-bold">Vehicle</th>
              <th className="py-3 px-3 font-bold">Preferred Area</th>
              <th className="py-3 px-3 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {riders.map((rider) => (
              <tr key={rider.id} className="hover:bg-stone-50/60 transition-colors">
                <td className="py-4 px-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rider.avatar}
                      alt={rider.name}
                      className="w-10 h-10 rounded-full object-cover border border-stone-200"
                    />
                    <span className="font-bold text-stone-800">{rider.name}</span>
                  </div>
                </td>
                <td className="py-4 px-3 text-stone-600 font-medium">{rider.phone}</td>
                <td className="py-4 px-3 text-stone-600 font-medium">{rider.vehicle}</td>
                <td className="py-4 px-3 text-stone-600 font-medium">{rider.area}</td>
                <td className="py-4 px-3 text-center">
                  {rider.status === 'PENDING' ? (
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleStatus(rider.id, 'APPROVED')}
                        className="px-4 py-1.5 rounded-full bg-[#4CAE24] hover:bg-[#41961e] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatus(rider.id, 'REJECTED')}
                        className="px-4 py-1.5 rounded-full bg-[#C82323] hover:bg-[#aa1d1d] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        rider.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {rider.status}
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
