"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, CloseIcon } from '../ui/Icons';
import { Button } from '../ui/Button';
import { Container } from './Container';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Food & Groceries', href: '/food-groceries' },
    { name: 'For Vendors', href: '/for-vendors' },
    { name: 'Delivery Partners', href: '/delivery-partners' },
    { name: 'About Dar Dar', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur-md shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img src="/logo.png" alt="Dar Dar Logo" className="h-[60px] w-auto object-contain bg-[#333333] rounded-xl px-2 py-1" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[15px] font-bold text-stone-700 hover:text-[#E96424] transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="outline" 
              className="border-[#E96424] text-[#E96424] hover:bg-[#E96424] hover:text-white hover:border-[#E96424] px-6 py-2.5 h-auto text-[15px]"
            >
              Become a Vendor
            </Button>
            <Button 
              variant="primary" 
              className="bg-[#E96424] hover:bg-[#d5581c] text-white px-6 py-2.5 h-auto text-[15px]"
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              className="p-2 text-stone-600 hover:text-[#E96424] focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 absolute w-full left-0 shadow-lg">
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
              <Button 
                variant="outline" 
                fullWidth
                className="border-[#E96424] text-[#E96424] hover:bg-[#E96424] hover:text-white"
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
