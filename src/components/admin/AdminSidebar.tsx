"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  name: string;
  href: string;
  icon: (props: { className?: string }) => React.ReactNode;
  hasChevron?: boolean;
  isSettings?: boolean;
}

const navItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        <circle cx="12" cy="12" r="10" />
        <path d="M16 12l-4-4-4 4" />
      </svg>
    ),
  },
  {
    name: 'Total Order',
    href: '/admin/orders',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
    ),
  },
  {
    name: 'All Vendor',
    href: '/admin/vendors',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <line x1="20" y1="8" x2="20" y2="14"></line>
        <line x1="23" y1="11" x2="17" y2="11"></line>
      </svg>
    ),
  },
  {
    name: 'Total Restaurant',
    href: '/admin/restaurants',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
        <path d="M7 2v20"></path>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
      </svg>
    ),
  },
  {
    name: 'Make admin',
    href: '/admin/make-admin',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
  {
    name: 'Rider Request',
    href: '/admin/riders',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18.5" cy="17.5" r="3.5" />
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="15" cy="5" r="1" />
        <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
      </svg>
    ),
  },
  {
    name: 'Feedback',
    href: '/admin/feedback',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="15" rx="2" />
        <line x1="12" y1="7" x2="12" y2="11" />
        <line x1="12" y1="14" x2="12.01" y2="14" />
      </svg>
    ),
  },
  {
    name: 'Banner Section',
    href: '/admin/banners',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    hasChevron: true,
    isSettings: true,
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    ),
  },
];

const settingsSubMenu = [
  { name: 'Profile', href: '/admin/settings' },
  { name: 'Privacy Policy', href: '/admin/settings/privacy' },
  { name: 'Terms & Conditions', href: '/admin/settings/terms' },
  { name: 'FAQ', href: '/admin/settings/faq' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isSettingsActive = pathname.startsWith('/admin/settings');
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(isSettingsActive);

  useEffect(() => {
    if (pathname.startsWith('/admin/settings')) {
      setIsSettingsExpanded(true);
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between bg-[#2C2C2C] px-4 py-3 border-b border-white/10 sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <img src="/logo.png" alt="Dar Dar Logo" className="h-10 w-auto object-contain" />
          <span className="text-white font-bold text-sm tracking-wide">Admin Portal</span>
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
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
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

          {/* Navigation Items (White pills on dark background, active item is Lime Green #85A72C) */}
          <nav className="mt-5 space-y-2.5 px-3">
            {navItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname === item.href || (item.isSettings && pathname.startsWith('/admin/settings'));

              if (item.isSettings) {
                return (
                  <div key={item.name} className="space-y-1.5">
                    {/* Settings Main Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
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
                        } ${isSettingsExpanded ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Expandable Settings Submenu (Image 5 style) */}
                    {isSettingsExpanded && (
                      <div className="space-y-1 pt-1 pb-1 animate-in slide-in-from-top-2 duration-150">
                        {settingsSubMenu.map((sub) => {
                          const isSubActive =
                            sub.name === 'Profile'
                              ? pathname === '/admin/settings' || pathname === '/admin/profile'
                              : pathname === sub.href;

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
                    <span>{item.name}</span>
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
