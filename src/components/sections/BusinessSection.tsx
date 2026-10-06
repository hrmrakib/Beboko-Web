'use client';
import React from 'react';
import { Container } from '../layout/Container';
import { useModals } from '../modals/ModalProvider';

export function BusinessSection() {
  const { openPartnerModal } = useModals();
  const features = [
    { id: '01', title: 'Reach More Customers' },
    { id: '02', title: 'Manage Products' },
    { id: '03', title: 'Manage Orders' },
    { id: '04', title: 'Sales Overview' },
    { id: '05', title: 'Payment Reports' },
    { id: '06', title: 'Real-Time Notifications' },
    { id: '07', title: 'Vendor Support' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Image with Floating Card */}
          <div className="relative order-2 lg:order-1 w-full mt-10 lg:mt-0 lg:-ml-[5%] xl:-ml-[10%]">
            <div className="relative w-full rounded-[40px] overflow-hidden shadow-xl group">
              <img 
                src="/images/business-owner.png" 
                alt="Dar Dar Business Owner" 
                className="w-full h-auto min-h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white p-6 rounded-[24px] shadow-[0_4px_30px_rgb(0,0,0,0.1)]">
                <span className="text-[12px] text-[#666666] font-medium block mb-2">
                  Dar Dar for local business
                </span>
                <span className="text-[18px] md:text-[20px] font-bold text-[#323232] leading-snug block">
                  Products, orders and payments in one place
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
              For Restaurants & Supermarkets
            </h2>
            <h3 className="text-[2.5rem] md:text-5xl font-black text-[#323232] mb-6 leading-[1.1] tracking-tight">
              Grow Your Business <br className="hidden md:block" />
              With Dar Dar.
            </h3>
            <p className="text-[#666666] text-[17px] leading-relaxed mb-10 max-w-[500px]">
              Reach more customers, manage your products and orders, and grow your business through Dar Dar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <div 
                  key={feature.id} 
                  className="bg-white border border-stone-200 rounded-[12px] p-5 flex flex-col justify-center transition-shadow hover:shadow-md"
                >
                  <span className="text-[11px] font-bold text-[#E96424] mb-2">{feature.id}</span>
                  <span className="text-[14px] font-bold text-[#323232]">{feature.title}</span>
                </div>
              ))}
            </div>

            <button onClick={() => openPartnerModal('vendor')} className="bg-[#E96424] hover:bg-[#d6571b] text-white px-8 py-4 rounded-full text-[15px] font-bold inline-flex items-center gap-2 transition-colors shadow-lg shadow-orange-500/20">
              Become a Dar Dar Vendor
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

        </div>
      </Container>
    </section>
  );
}
