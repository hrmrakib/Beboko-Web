import React from 'react';
import { Container } from '../layout/Container';
import { SmartphoneIcon } from '../ui/Icons';

// Simple Mail Icon
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
    <path d="M2 4l10 8 10-8"></path>
  </svg>
);

// Simple Arrow Right Icon
const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export function ConnectivitySection() {
  const features = [
    'Lightweight Mobile Experience',
    'Low-Bandwidth Friendly',
    'Accessible Ordering',
    'Simple User Experience'
  ];

  return (
    <section className="pt-0 pb-20 lg:pb-28 bg-[#FFFFFF] overflow-hidden">
      <Container>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
            Accessible by design
          </h2>
          
          <h3 className="text-[2.5rem] md:text-5xl font-black text-[#323232] mb-6 tracking-tight">
            Built for Real-World Connectivity.
          </h3>
          
          <p className="text-[#666666] text-[17px] mb-12 leading-relaxed max-w-3xl">
            Dar Dar is designed around local infrastructure realities, helping customers access food and grocery services even where connectivity may be limited.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-[#F6F6F6] text-[#323232] font-bold text-[13px] px-6 py-3 rounded-lg"
              >
                {feature}
              </div>
            ))}
          </div>

          {/* 3 Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
            <div className="bg-[#FFF5EE] rounded-[16px] py-10 flex flex-col items-center justify-center transition-transform hover:-translate-y-1">
              <SmartphoneIcon className="w-10 h-10 text-[#E96424] mb-4" />
              <span className="text-[15px] font-bold text-[#323232]">Mobile App</span>
            </div>
            
            <div className="bg-[#FFF5EE] rounded-[16px] py-10 flex flex-col items-center justify-center transition-transform hover:-translate-y-1">
              <MailIcon className="w-10 h-10 text-[#E96424] mb-4" />
              <span className="text-[15px] font-bold text-[#323232]">SMS</span>
            </div>
            
            <div className="bg-[#FFF5EE] rounded-[16px] py-10 flex flex-col items-center justify-center transition-transform hover:-translate-y-1">
              <SmartphoneIcon className="w-10 h-10 text-[#E96424] mb-4" />
              <span className="text-[15px] font-bold text-[#323232]">WhatsApp</span>
            </div>
          </div>

          {/* Flow */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] font-bold text-[#323232]">
            <span>Customer</span>
            <ArrowRightIcon className="text-[#666666]" />
            <span>Dar Dar</span>
            <ArrowRightIcon className="text-[#666666]" />
            <span>Restaurant / Vendor</span>
            <ArrowRightIcon className="text-[#666666]" />
            <span>Delivery Rider</span>
            <ArrowRightIcon className="text-[#666666]" />
            <span>Customer</span>
          </div>

        </div>
      </Container>
    </section>
  );
}
