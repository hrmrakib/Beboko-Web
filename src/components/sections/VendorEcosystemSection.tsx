import React from 'react';
import { Container } from '../layout/Container';

// Icons
const ForkKnifeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
    <path d="M7 2v20"></path>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
  </svg>
);

const StorefrontIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
    <path d="M3 9l2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
    <path d="M12 3v6"></path>
  </svg>
);

const LeafIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
    <path d="M2 22l8-8"></path>
  </svg>
);

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
  </svg>
);

const ToteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 7V5a4 4 0 0 1 8 0v2"></path>
    <rect x="3" y="7" width="18" height="14" rx="2"></rect>
  </svg>
);

const BuildingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <rect x="8" y="6" width="2" height="2"></rect>
    <rect x="14" y="6" width="2" height="2"></rect>
    <rect x="8" y="12" width="2" height="2"></rect>
    <rect x="14" y="12" width="2" height="2"></rect>
  </svg>
);

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"></path>
    <path d="M5 3l.717 2.18a1 1 0 0 0 .638.638L8.536 6.5l-2.181.717a1 1 0 0 0-.638.638L5 10l-.717-2.18a1 1 0 0 0-.638-.638L1.464 6.5l2.181-.717a1 1 0 0 0 .638-.638L5 3z"></path>
  </svg>
);

const vendorCategories = [
  { title: 'Restaurants', icon: ForkKnifeIcon, desc: 'Part of the broader Dar Dar vendor ecosystem concept.' },
  { title: 'Supermarkets', icon: StorefrontIcon, desc: 'Part of the broader Dar Dar vendor ecosystem concept.' },
  { title: 'Open-Air Markets', icon: LeafIcon, desc: 'Part of the broader Dar Dar vendor ecosystem concept.' },
  { title: 'Pharmacies', icon: HeartIcon, desc: 'Part of the broader Dar Dar vendor ecosystem concept.' },
  { title: 'Clothing', icon: ToteIcon, desc: 'Part of the broader Dar Dar vendor ecosystem concept.' },
  { title: 'Appliances', icon: BuildingIcon, desc: 'Part of the broader Dar Dar vendor ecosystem concept.' },
  { title: 'Groceries', icon: ToteIcon, desc: 'Part of the broader Dar Dar vendor ecosystem concept.' },
  { title: 'Other Local Vendors', icon: SparklesIcon, desc: 'Part of the broader Dar Dar vendor ecosystem concept.' },
];

export function VendorEcosystemSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF]">
      <Container>
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20 px-4">
          <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
            A GROWING VENDOR ECOSYSTEM
          </h2>
          <h3 className="text-[2.2rem] md:text-5xl font-black text-[#323232] mb-6 leading-[1.15] tracking-tight">
            More Than Restaurants.
          </h3>
          <p className="text-[#666666] text-[16px] md:text-[17px] leading-relaxed max-w-[500px] mx-auto">
            Dar Dar connects households with a growing ecosystem of local businesses and trusted vendors.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {vendorCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-[#E6E6E6] rounded-3xl p-6 lg:p-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-300 flex flex-col items-start"
              >
                <div className="text-[#333333] font-bold mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-[16px] lg:text-[17px] font-bold text-[#333333] mb-2">
                  {cat.title}
                </h4>
                <p className="text-[13px] text-[#888888] leading-[1.6]">
                  {cat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
