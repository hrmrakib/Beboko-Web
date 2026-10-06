import React from 'react';
import { Container } from '../layout/Container';

const BagIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M9 12l2 2 4-4"></path>
  </svg>
);

const BikeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const supportCards = [
  {
    title: 'Order Support',
    desc: 'Get help with an active order.',
    icon: BagIcon,
  },
  {
    title: 'Payment Support',
    desc: 'Get assistance with payment issues.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Delivery Support',
    desc: 'Get help tracking or resolving delivery issues.',
    icon: BikeIcon,
  }
];

export function CustomerSupportSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#F4F4F4]">
      <Container>
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16 px-4">
          <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
            CUSTOMER SUPPORT
          </h2>
          <h3 className="text-[2.2rem] md:text-5xl font-black text-[#333333] mb-6 leading-[1.15] tracking-tight">
            Need Help With Your Order?
          </h3>
          <p className="text-[#666666] text-[16px] md:text-[17px] leading-relaxed max-w-[650px] mx-auto">
            Our customer support team is available to help with ordering and delivery issues.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {supportCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-[24px] p-8 lg:p-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-shadow duration-300"
              >
                <div className="text-[#E96424] mb-6 flex justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-[17px] lg:text-[18px] font-bold text-[#333333] mb-3">
                  {card.title}
                </h4>
                <p className="text-[#888888] text-[14px] lg:text-[15px] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button className="bg-[#E96424] hover:bg-[#d6571b] text-white px-8 py-4 rounded-full text-[15px] font-bold inline-flex items-center gap-2 transition-colors shadow-[0_8px_25px_rgb(233,100,36,0.35)]">
            Contact Support
            <ArrowRightIcon />
          </button>
        </div>
      </Container>
    </section>
  );
}
