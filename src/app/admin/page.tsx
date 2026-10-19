import React from 'react';
import { IncomeChart } from '@/components/admin/IncomeChart';
import { RestaurantGroceryChart } from '@/components/admin/RestaurantGroceryChart';
import { VendorRequestTable } from '@/components/admin/VendorRequestTable';

const stats = [
  { label: 'Total Orders', value: '125' },
  { label: 'Total Grocery', value: '500' },
  { label: 'Total Restaurant', value: '300' },
  { label: 'Total Complete Order', value: '200' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-stone-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-stone-700 text-sm sm:text-base font-semibold">
              {stat.label}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2 tracking-tight">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Two Chart Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeChart />
        <RestaurantGroceryChart />
      </div>

      {/* Vendor Request Table */}
      <VendorRequestTable />
    </div>
  );
}
