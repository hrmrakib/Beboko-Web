'use client';
import React from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { useModals } from '../modals/ModalProvider';

export function Footer() {
  const { openPartnerModal, openTrackModal, openAdminModal } = useModals();

  return (
    <footer className="bg-[#333333] pt-16 lg:pt-20 pb-8">
      <Container>
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Column */}
          <div className="w-full lg:w-[28%] pr-0 lg:pr-12 lg:border-r border-white/10 mb-10 lg:mb-0">
            <div className="mb-6">
              <img src="/logo.png" alt="Dar Dar Logo" className="h-[65px] lg:h-[75px] w-auto object-contain" />
            </div>
            <p className="text-[14px] text-[#EAEAEA] leading-[1.7] mb-8 pr-4">
              Food, groceries and everyday <br className="hidden xl:block" /> essentials delivered to your door.
            </p>
            <div>
              <h5 className="font-bold text-white text-[15px] mb-1">ETHOZ Group</h5>
              <p className="text-[#8DC63F] text-[14px] mb-6">ethozsarl@gmail.com</p>
              
              <p className="text-[13px] text-[#CCCCCC] mb-1.5">Quartier Mongo 13/A</p>
              <p className="text-[13px] text-[#CCCCCC] mb-1.5">City of Matete</p>
              <p className="text-[13px] text-[#CCCCCC] mb-1.5">Province of Kinshasa</p>
              <p className="text-[13px] text-[#CCCCCC]">Democratic Republic of Congo</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[72%] lg:pl-16 flex flex-col justify-between">
            {/* Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16 lg:mb-0">
              {/* Company */}
              <div>
                <h4 className="text-white font-bold text-[15px] mb-5 lg:mb-6">Company</h4>
                <ul className="space-y-3 lg:space-y-4">
                  <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">About Dar Dar</Link></li>
                  <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">How It Works</Link></li>
                  <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Contact Us</Link></li>
                </ul>
              </div>
              {/* For Customers */}
              <div>
                <h4 className="text-white font-bold text-[15px] mb-5 lg:mb-6">For Customers</h4>
                <ul className="space-y-3 lg:space-y-4">
                  <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Download App</Link></li>
                  <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Browse Food</Link></li>
                  <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Shop Groceries</Link></li>
                  <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Customer Support</Link></li>
                </ul>
              </div>
              {/* For Vendors */}
              <div>
                <h4 className="text-white font-bold text-[15px] mb-5 lg:mb-6">For Vendors</h4>
                <ul className="space-y-3 lg:space-y-4">
                  <li><button onClick={() => openPartnerModal('vendor')} className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors text-left">Become a Vendor</button></li>
                  <li><button onClick={() => openTrackModal()} className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors text-left">Track Vendor Application</button></li>
                  <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Vendor Support</Link></li>
                </ul>
              </div>
              {/* Delivery Partners */}
              <div>
                <h4 className="text-white font-bold text-[15px] mb-5 lg:mb-6">Delivery Partners</h4>
                <ul className="space-y-3 lg:space-y-4">
                  <li><button onClick={() => openPartnerModal('delivery')} className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors text-left">Become a Delivery Partner</button></li>
                  <li><button onClick={() => openTrackModal()} className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors text-left">Track Partner Application</button></li>
                  <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Delivery Support</Link></li>
                </ul>
              </div>
              {/* Legal */}
              <div>
                <h4 className="text-white font-bold text-[15px] mb-5 lg:mb-6">Legal & Admin</h4>
                <ul className="space-y-3 lg:space-y-4">
                  <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Terms & Conditions</Link></li>
                  <li><button onClick={() => openAdminModal()} className="text-[13px] text-[#E96424] hover:text-white transition-colors text-left font-semibold">Admin Portal</button></li>
                </ul>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="w-full relative flex flex-col md:flex-row items-center justify-between pb-6 border-b border-white/10 gap-6 md:gap-0 mt-8 lg:mt-0">
              <div className="flex gap-3">
                <a href="#" className="w-[32px] h-[32px] rounded-full border border-[#808080] flex items-center justify-center text-[#CCCCCC] hover:text-white hover:border-white transition-colors">
                  <span className="text-[11px] font-semibold leading-none">f</span>
                </a>
                <a href="#" className="w-[32px] h-[32px] rounded-full border border-[#808080] flex items-center justify-center text-[#CCCCCC] hover:text-white hover:border-white transition-colors">
                  <span className="text-[11px] font-semibold leading-none">ig</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/hrmrakib/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-[32px] h-[32px] rounded-full border border-[#808080] flex items-center justify-center text-[#CCCCCC] hover:text-white hover:border-[#8DC63F] transition-colors"
                >
                  <span className="text-[11px] font-semibold leading-none">in</span>
                </a>
              </div>

              <p className="text-[12px] text-[#808080] text-center md:absolute md:left-1/2 md:-translate-x-1/2">
                © {new Date().getFullYear()} Dar Dar. All rights reserved.
              </p>

              <p className="text-[12px] text-[#CCCCCC]">
                Dar Dar is part of ETHOZ Group.
              </p>
            </div>

            {/* Developer Credit Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#999999] gap-2">
              <span className="text-[#808080]">
                Food &amp; groceries delivery platform
              </span>
              <p className="flex items-center gap-1.5 text-[#B0B0B0]">
                <span>Developed by</span>
                <a
                  href="https://www.linkedin.com/in/hrmrakib/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8DC63F] hover:text-white font-medium transition-colors hover:underline inline-flex items-center gap-1"
                >
                  Rakib
                  <svg
                    className="w-3 h-3 opacity-70"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
