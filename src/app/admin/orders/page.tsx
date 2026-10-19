"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface OrderItem {
  id: number;
  sNo: string;
  itemsCount: number;
  price: string;
  deliveryFee: string;
  quantity: number;
  shopName: string;
  date: string;
  rider: {
    name: string;
    phone: string;
    avatar: string;
  };
  status: 'Completed' | 'Canceled';
}

const initialOrders: OrderItem[] = [
  {
    id: 1,
    sNo: '1.',
    itemsCount: 3,
    price: '$121',
    deliveryFee: '$12',
    quantity: 21,
    shopName: 'Stanford',
    date: '05/12/2024',
    rider: {
      name: 'Faysal Rahman',
      phone: '+1 (239) 555-0108',
      avatar: '/images/avatar-1.png',
    },
    status: 'Completed',
  },
  {
    id: 2,
    sNo: '2.',
    itemsCount: 4,
    price: '$121',
    deliveryFee: '$12',
    quantity: 12,
    shopName: 'Spring Foods',
    date: '05/12/2024',
    rider: {
      name: 'Jawwad Hossain',
      phone: '+1 (238) 555-0109',
      avatar: '/images/avatar-2.png',
    },
    status: 'Completed',
  },
  {
    id: 3,
    sNo: '3.',
    itemsCount: 3,
    price: '$121',
    deliveryFee: '$12',
    quantity: 21,
    shopName: 'Scroll Through',
    date: '05/12/2024',
    rider: {
      name: 'Al-Amin',
      phone: '+1 (230) 555-0109',
      avatar: '/images/avatar-3.png',
    },
    status: 'Completed',
  },
  {
    id: 4,
    sNo: '4.',
    itemsCount: 3,
    price: '$121',
    deliveryFee: '$12',
    quantity: 21,
    shopName: 'Widehaven',
    date: '05/12/2024',
    rider: {
      name: 'Alamgir Kabir',
      phone: '+1 (239) 555-0108',
      avatar: '/images/rider.png',
    },
    status: 'Canceled',
  },
  {
    id: 5,
    sNo: '5.',
    itemsCount: 3,
    price: '$121',
    deliveryFee: '$12',
    quantity: 21,
    shopName: 'Come To Market',
    date: '05/12/2024',
    rider: {
      name: 'Ashiqur Rahman',
      phone: '+1 (239) 555-0108',
      avatar: '/images/customer.png',
    },
    status: 'Completed',
  },
  {
    id: 6,
    sNo: '6.',
    itemsCount: 3,
    price: '$121',
    deliveryFee: '$12',
    quantity: 21,
    shopName: 'Spring Mart Grocery',
    date: '05/12/2024',
    rider: {
      name: 'Fahim Ahmed',
      phone: '+1 (239) 555-0108',
      avatar: '/images/avatar-1.png',
    },
    status: 'Completed',
  },
  {
    id: 7,
    sNo: '7.',
    itemsCount: 3,
    price: '$121',
    deliveryFee: '$12',
    quantity: 21,
    shopName: 'Made with Love',
    date: '05/12/2024',
    rider: {
      name: 'Benedict Fring Dron',
      phone: '+1 (239) 555-0108',
      avatar: '/images/avatar-2.png',
    },
    status: 'Completed',
  },
];

export default function TotalOrderPage() {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Current Order' | 'Completed' | 'Canceled'>('Current Order');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'Completed' && order.status !== 'Completed') return false;
    if (activeFilter === 'Canceled' && order.status !== 'Canceled') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        order.shopName.toLowerCase().includes(q) ||
        order.rider.name.toLowerCase().includes(q) ||
        order.price.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
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

        {/* Action Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Current Order Filter Pill */}
          <div className="relative inline-flex items-center bg-white border border-[#85A72C] rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold text-[#85A72C] shadow-sm">
            <span>{activeFilter}</span>
            <button
              onClick={() => {
                const cycle: ('All' | 'Current Order' | 'Completed' | 'Canceled')[] = [
                  'All',
                  'Current Order',
                  'Completed',
                  'Canceled',
                ];
                const nextIdx = (cycle.indexOf(activeFilter) + 1) % cycle.length;
                setActiveFilter(cycle[nextIdx]);
              }}
              className="ml-2 hover:opacity-80 transition-opacity"
              title="Change Filter"
            >
              <svg className="w-4 h-4 text-[#85A72C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Data Refresh Button */}
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs sm:text-sm font-semibold text-stone-700 shadow-sm transition-all active:scale-95"
          >
            <span>Data Refresh</span>
            <svg
              className={`w-4 h-4 text-indigo-600 ${isRefreshing ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="overflow-x-auto select-none">
        <table className="w-full text-left text-xs sm:text-sm min-w-[760px]">
          <thead>
            <tr className="text-stone-700 font-bold border-b border-stone-100 pb-3">
              <th className="py-3 px-2 font-bold w-10">S no.</th>
              <th className="py-3 px-2 font-bold">Products Item</th>
              <th className="py-3 px-2 font-bold">Price</th>
              <th className="py-3 px-2 font-bold">Delivery Fee</th>
              <th className="py-3 px-2 font-bold">Quantity</th>
              <th className="py-3 px-2 font-bold">Shop Name</th>
              <th className="py-3 px-2 font-bold">Date</th>
              <th className="py-3 px-2 font-bold">Delivery Received By</th>
              <th className="py-3 px-4 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                {/* S no. */}
                <td className="py-4 px-2 font-medium text-stone-500 whitespace-nowrap">
                  {order.sNo}
                </td>

                {/* Overlapping Products Thumbnails */}
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-3 overflow-hidden">
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center overflow-hidden shadow-xs">
                        <img src="/images/pickup.jpg" alt="Item" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center overflow-hidden shadow-xs">
                        <img src="/images/vendor.jpg" alt="Item" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-stone-200 flex items-center justify-center overflow-hidden shadow-xs">
                        <img src="/images/hero-phone.png" alt="Item" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <span className="text-stone-600 font-medium whitespace-nowrap text-xs">
                      {order.itemsCount} items
                    </span>
                  </div>
                </td>

                {/* Price */}
                <td className="py-4 px-2 font-semibold text-stone-700 whitespace-nowrap">
                  {order.price}
                </td>

                {/* Delivery Fee */}
                <td className="py-4 px-2 font-medium text-stone-600 whitespace-nowrap">
                  {order.deliveryFee}
                </td>

                {/* Quantity */}
                <td className="py-4 px-2 font-semibold text-stone-700 whitespace-nowrap">
                  {order.quantity}
                </td>

                {/* Shop Name */}
                <td className="py-4 px-2 font-medium text-stone-700 whitespace-nowrap">
                  {order.shopName}
                </td>

                {/* Date */}
                <td className="py-4 px-2 font-medium text-stone-500 whitespace-nowrap">
                  {order.date}
                </td>

                {/* Delivery Received By */}
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={order.rider.avatar}
                      alt={order.rider.name}
                      className="w-9 h-9 rounded-full object-cover border border-stone-200 flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold text-stone-800 leading-tight whitespace-nowrap">
                        {order.rider.name}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5 whitespace-nowrap">
                        {order.rider.phone}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Status Action */}
                <td className="py-4 px-4 text-center whitespace-nowrap">
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-xs ${
                      order.status === 'Completed'
                        ? 'bg-[#2DAE26]'
                        : 'bg-[#FA4B4B]'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
