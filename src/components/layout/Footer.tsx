'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { PartnerModal } from '../modals/PartnerModal';
import { SuccessModal } from '../modals/SuccessModal';

export function Footer() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerTab, setPartnerTab] = useState<'vendor' | 'delivery'>('vendor');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const openPartnerModal = (tab: 'vendor' | 'delivery') => {
    setPartnerTab(tab);
    setPartnerModalOpen(true);
  };

  const handleSuccess = () => {
    setPartnerModalOpen(false);
    setSuccessModalOpen(true);
  };

  return (
    <>
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
                    <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Vendor Support</Link></li>
                  </ul>
                </div>
                {/* Delivery Partners */}
                <div>
                  <h4 className="text-white font-bold text-[15px] mb-5 lg:mb-6">Delivery Partners</h4>
                  <ul className="space-y-3 lg:space-y-4">
                    <li><button onClick={() => openPartnerModal('delivery')} className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors text-left">Become a Delivery Partner</button></li>
                    <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Delivery Support</Link></li>
                  </ul>
                </div>
                {/* Legal */}
                <div>
                  <h4 className="text-white font-bold text-[15px] mb-5 lg:mb-6">Legal</h4>
                  <ul className="space-y-3 lg:space-y-4">
                    <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Privacy Policy</Link></li>
                    <li><Link href="#" className="text-[13px] text-[#CCCCCC] hover:text-white transition-colors">Terms & Conditions</Link></li>
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
                  <a href="#" className="w-[32px] h-[32px] rounded-full border border-[#808080] flex items-center justify-center text-[#CCCCCC] hover:text-white hover:border-white transition-colors">
                    <span className="text-[11px] font-semibold leading-none">in</span>
                  </a>
                </div>
                
                <p className="text-[12px] text-[#808080] text-center md:absolute md:left-1/2 md:-translate-x-1/2">
                  © 2026 Dar Dar. All rights reserved.
                </p>

                <p className="text-[12px] text-[#CCCCCC]">
                  Dar Dar is part of ETHOZ Group.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </footer>

      <PartnerModal 
        isOpen={partnerModalOpen} 
        onClose={() => setPartnerModalOpen(false)} 
        initialTab={partnerTab}
        onSuccess={handleSuccess}
      />
      <SuccessModal 
        isOpen={successModalOpen} 
        onClose={() => setSuccessModalOpen(false)} 
      />
    </>
  );
}
