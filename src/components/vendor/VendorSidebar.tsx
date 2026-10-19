"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface VendorNavItem {
  name: string;
  href: string;
  hasChevron?: boolean;
  isCategory?: boolean;
  icon: (props: { className?: string }) => React.ReactNode;
}

const navItems: VendorNavItem[] = [
  {
    name: 'Dashboard',
    href: '/vendor',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        <path d="M16 12l-4-4-4 4" />
      </svg>
    ),
  },
  {
    name: 'Manage Products',
    href: '/vendor/products',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    name: '+ Add Products',
    href: '/vendor/products/add',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    name: 'Category',
    href: '/vendor/categories',
    hasChevron: true,
    isCategory: true,
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h10M4 18h7" />
        <circle cx="18" cy="15" r="3" />
        <line x1="20.5" y1="17.5" x2="23" y2="20" />
      </svg>
    ),
  },
  {
    name: 'Banner Section',
    href: '/vendor/banners',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    name: 'Profile',
    href: '/vendor/profile',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

const categorySubMenu = [
  { name: 'Category', href: '/vendor/categories' },
  { name: 'Sub Category', href: '/vendor/categories/sub-category' },
];

export function VendorSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isCategoryActive = pathname.startsWith('/vendor/categories');
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(isCategoryActive);

  useEffect(() => {
    if (pathname.startsWith('/vendor/categories')) {
      setIsCategoryExpanded(true);
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between bg-[#2C2C2C] px-4 py-3 border-b border-white/10 sticky top-0 z-40">
        <Link href="/vendor" className="flex items-center gap-2">
          <img src="/logo.png" alt="Dar Dar Logo" className="h-9 w-auto object-contain" />
          <span className="text-white font-bold text-sm tracking-wide">Vendor Portal</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-stone-300 hover:text-white rounded-lg focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {isMobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#2C2C2C] flex flex-col justify-between z-50 transition-transform duration-200 ease-in-out overflow-y-auto ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Logo Section */}
          <div className="pt-6 pb-6 px-6 flex flex-col items-center justify-center border-b border-white/5">
            <Link href="/" className="group flex flex-col items-center">
              <img
                src="/logo.png"
                alt="Dar Dar Logo"
                className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="mt-5 space-y-2.5 px-3">
            {navItems.map((item) => {
              if (item.isCategory) {
                const isActive = pathname.startsWith('/vendor/categories');

                return (
                  <div key={item.name} className="space-y-1.5">
                    {/* Category Main Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-[14px] transition-all duration-150 select-none ${
                        isActive
                          ? 'bg-[#85A72C] text-white shadow-md'
                          : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={`w-5 h-5 ${
                            isActive ? 'text-white' : 'text-stone-600'
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>

                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isActive ? 'text-white' : 'text-stone-400'
                        } ${isCategoryExpanded ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Expandable Category Submenu (Matches Image 1 & 2) */}
                    {isCategoryExpanded && (
                      <div className="space-y-1 pt-1 pb-1 animate-in slide-in-from-top-2 duration-150">
                        {categorySubMenu.map((sub) => {
                          const isSubActive =
                            sub.name === 'Category'
                              ? pathname === '/vendor/categories'
                              : pathname === '/vendor/categories/sub-category';

                          return (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setIsMobileOpen(false)}
                              className={`block w-full text-center py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                                isSubActive
                                  ? 'bg-[#BFE369] text-stone-900 font-bold shadow-sm'
                                  : 'text-stone-300 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive =
                item.href === '/vendor'
                  ? pathname === '/vendor'
                  : item.href === '/vendor/products'
                  ? pathname === '/vendor/products'
                  : pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-[14px] transition-all duration-150 select-none ${
                    isActive
                      ? 'bg-[#85A72C] text-white shadow-md'
                      : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`w-5 h-5 ${
                        isActive ? 'text-white' : 'text-stone-600'
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.hasChevron && (
                    <svg
                      className={`w-4 h-4 ${
                        isActive ? 'text-white' : 'text-stone-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Log Out Section */}
        <div className="p-4 border-t border-white/5 mt-auto">
          <Link
            href="/login"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white text-stone-700 hover:bg-stone-50 font-bold text-[14px] transition-all shadow-sm group"
          >
            <svg
              className="w-5 h-5 text-stone-600 group-hover:text-red-600 transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span className="group-hover:text-red-600 transition-colors">Log Out</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
