import React from 'react';
import { Container } from '../layout/Container';

const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const ForkKnifeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
    <path d="M7 2v20"></path>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
  </svg>
);

const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const BikeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
  </svg>
);

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"></path>
    <path d="M5 3l.717 2.18a1 1 0 0 0 .638.638L8.536 6.5l-2.181.717a1 1 0 0 0-.638.638L5 10l-.717-2.18a1 1 0 0 0-.638-.638L1.464 6.5l2.181-.717a1 1 0 0 0 .638-.638L5 3z"></path>
  </svg>
);

const features = [
  {
    num: '01',
    title: 'Local & Convenient',
    desc: 'Access products from businesses around your community.',
    icon: MapPinIcon,
    color: 'orange'
  },
  {
    num: '02',
    title: 'Food & Groceries',
    desc: 'One platform for meals, groceries and essentials.',
    icon: ForkKnifeIcon,
    color: 'green'
  },
  {
    num: '03',
    title: 'Mobile-Money Friendly',
    desc: 'Use convenient local payment methods.',
    icon: PhoneIcon,
    color: 'orange'
  },
  {
    num: '04',
    title: 'Real-Time Tracking',
    desc: 'Stay updated throughout your delivery.',
    icon: MapPinIcon,
    color: 'green'
  },
  {
    num: '05',
    title: 'Fast Local Delivery',
    desc: 'Designed around neighborhood-level delivery.',
    icon: BikeIcon,
    color: 'orange'
  },
  {
    num: '06',
    title: 'Simple Experience',
    desc: 'Easy ordering through a lightweight mobile experience.',
    icon: SparklesIcon,
    color: 'green'
  }
];

export function WhyChooseSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA]">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
            WHY DAR DAR
          </h2>
          <h3 className="text-[2.2rem] md:text-5xl font-black text-[#333333] tracking-tight">
            Why Choose Dar Dar?
          </h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isOrange = feature.color === 'orange';
            const bgClass = isOrange ? 'bg-[#FEF0EA]' : 'bg-[#F1F8EB]';
            const textClass = isOrange ? 'text-[#E96424]' : 'text-[#8DC63F]';

            return (
              <div 
                key={idx} 
                className="bg-white border border-[#E6E6E6] rounded-[24px] p-8 lg:p-10 flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-300"
              >
                <div className="w-full flex justify-between items-start mb-8">
                  <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${bgClass} ${textClass}`}>
                    <Icon className="w-[22px] h-[22px]" />
                  </div>
                  <span className="text-[14px] font-bold text-[#333333]">
                    {feature.num}
                  </span>
                </div>
                <h4 className="text-[17px] lg:text-[18px] font-bold text-[#333333] mb-3">
                  {feature.title}
                </h4>
                <p className="text-[14px] text-[#888888] leading-[1.6]">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
