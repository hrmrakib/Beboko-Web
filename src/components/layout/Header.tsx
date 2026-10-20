"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, CloseIcon } from '../ui/Icons';
import { Button } from '../ui/Button';
import { Container } from './Container';
import { useModals } from '../modals/ModalProvider';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openPartnerModal, openTrackModal } = useModals();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Food & Groceries', href: '#food-groceries' },
    { name: 'For Vendors', href: '#for-vendors' },
    { name: 'Delivery Partners', href: '#delivery-partners' },
    { name: 'About Dar Dar', href: '#about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur-md shadow-sm">
      <div className="w-full max-w-[2560px] mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex items-center justify-between h-20 xl:h-22">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img src="/logo.png" alt="Dar Dar Logo" className="h-[48px] xl:h-[54px] w-auto object-contain bg-[#333333] rounded-xl px-2 py-1" />
          </Link>

          {/* Desktop Navigation (active from xl: 1280px+) */}
          <nav className="hidden xl:flex items-center gap-2 2xl:gap-4.5">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[13px] 2xl:text-[14px] font-semibold text-stone-700 hover:text-[#E96424] transition-colors whitespace-nowrap px-1 py-0.5"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden xl:flex items-center gap-2 xl:gap-2.5 2xl:gap-3 flex-shrink-0">
            {/* Language Switcher (English <-> French via Google Translate) */}
            <LanguageSwitcher variant="desktop" />
            {/* Track Application */}
            <button
              onClick={() => openTrackModal()}
              title="Track Application"
              className="text-[12.5px] 2xl:text-[13px] font-bold text-stone-700 hover:text-[#E96424] px-2.5 py-1.5 flex items-center gap-1.5 transition-colors whitespace-nowrap rounded-lg hover:bg-stone-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="hidden 2xl:inline">Track Application</span>
            </button>
            <div className="hidden 2xl:block">
              <Button 
                variant="outline" 
                className="border-[#E96424] text-[#E96424] hover:bg-[#E96424] hover:text-white hover:border-[#E96424] px-3.5 py-2 h-auto text-[13px] font-bold whitespace-nowrap"
                onClick={() => openPartnerModal('vendor')}
              >
                Become a Vendor
              </Button>
            </div>
            <Button 
              variant="primary" 
              className="bg-[#E96424] hover:bg-[#d5581c] text-white px-3.5 2xl:px-4 py-2 h-auto text-[13px] font-bold whitespace-nowrap shadow-sm"
              iconPosition="right"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              }
            >
              Download App
            </Button>
          </div>

          {/* Mobile Menu Button & Quick Switcher (< xl) */}
          <div className="xl:hidden flex items-center gap-2">
            <LanguageSwitcher variant="desktop" className="mr-1" />
            <button 
              className="p-2 text-stone-600 hover:text-[#E96424] focus:outline-none rounded-lg hover:bg-stone-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-stone-100 absolute w-full left-0 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-bold text-stone-700 hover:text-[#E96424] hover:bg-orange-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-3">
              {/* Language Switcher Mobile */}
              <LanguageSwitcher variant="mobile" />

              <button
                className="w-full py-3 rounded-xl border border-stone-200 text-stone-700 font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-stone-50"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openTrackModal();
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Track Application
              </button>
              <Button 
                variant="outline" 
                fullWidth
                className="border-[#E96424] text-[#E96424] hover:bg-[#E96424] hover:text-white"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openPartnerModal('vendor');
                }}
              >
                Become a Vendor
              </Button>
              <Button 
                variant="primary" 
                fullWidth
                className="bg-[#E96424] hover:bg-[#d5581c] text-white"
                iconPosition="right"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                }
              >
                Download App
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
