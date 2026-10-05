import React from 'react';
import { Container } from '../layout/Container';
import { SearchIcon, BagIcon, ShieldCheckIcon, MapPinIcon } from '../ui/Icons';

export function HowItWorksSection() {
  const steps = [
    {
      id: '01',
      title: 'Choose What You Need',
      description: 'Browse restaurants, supermarkets, local markets and other vendors.',
      icon: <SearchIcon className="w-8 h-8 text-[#E96424]" />,
    },
    {
      id: '02',
      title: 'Add to Cart',
      description: 'Select products, choose quantities and review your order.',
      icon: <BagIcon className="w-8 h-8 text-[#E96424]" />,
    },
    {
      id: '03',
      title: 'Pay Securely',
      description: 'Use available mobile-money services or other secure methods.',
      icon: <ShieldCheckIcon className="w-8 h-8 text-[#E96424]" />,
    },
    {
      id: '04',
      title: 'Track Your Delivery',
      description: 'Follow your order in real time until it reaches your doorstep.',
      icon: <MapPinIcon className="w-8 h-8 text-[#E96424]" />,
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24 px-4">
          <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
            Four Simple Steps
          </h2>
          <h3 className="text-[2.5rem] md:text-5xl font-black text-[#323232] mb-4 tracking-tight">
            How Dar Dar Works
          </h3>
          <p className="text-[#666666] text-[17px] font-medium">
            Getting food and groceries delivered is simple.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting dashed line - hidden on mobile, visible on lg screens */}
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-[#E96424]/40 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 relative">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center text-center px-2">
                <div className="relative mb-8">
                  {/* Icon Box */}
                  <div className="w-[88px] h-[88px] bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center border border-stone-50">
                    {step.icon}
                  </div>
                  {/* Number Badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#75B737] text-white font-bold flex items-center justify-center text-[11px] shadow-sm ring-4 ring-white">
                    {step.id}
                  </div>
                </div>
                
                <h4 className="text-[17px] font-bold text-[#323232] mb-3">{step.title}</h4>
                <p className="text-[14px] text-[#666666] leading-[1.6] max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
