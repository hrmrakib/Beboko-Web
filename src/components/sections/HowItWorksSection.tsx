import React from 'react';
import { Container } from '../layout/Container';

// Exact Figma SVGs matching stroke, geometry, and color of original design
function SearchStepIcon({ className = 'w-7 h-7 sm:w-8 sm:h-8 text-[#F35E24]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

function BagStepIcon({ className = 'w-7 h-7 sm:w-8 sm:h-8 text-[#F35E24]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 8.5h12l-1.2 11.2a1.8 1.8 0 0 1-1.8 1.3H9a1.8 1.8 0 0 1-1.8-1.3L6 8.5z" />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
    </svg>
  );
}

function ShieldStepIcon({ className = 'w-7 h-7 sm:w-8 sm:h-8 text-[#F35E24]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 21.5c-4.5-2.2-7-6.5-7-10.5V6.5l7-3 7 3V11c0 4-2.5 8.3-7 10.5z" />
      <path d="M9.5 11.8l1.8 1.8 3.7-3.8" />
    </svg>
  );
}

function MapPinStepIcon({ className = 'w-7 h-7 sm:w-8 sm:h-8 text-[#F35E24]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 21.5c-4-4.8-6.5-8.2-6.5-11.5a6.5 6.5 0 1 1 13 0c0 3.3-2.5 6.7-6.5 11.5z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      id: '01',
      title: 'Choose What You Need',
      description: 'Browse restaurants, supermarkets, local markets and other vendors.',
      icon: <SearchStepIcon />,
    },
    {
      id: '02',
      title: 'Add to Cart',
      description: 'Select products, choose quantities and review your order.',
      icon: <BagStepIcon />,
    },
    {
      id: '03',
      title: 'Pay Securely',
      description: 'Use available mobile-money services or other secure methods.',
      icon: <ShieldStepIcon />,
    },
    {
      id: '04',
      title: 'Track Your Delivery',
      description: 'Follow your order in real time until it reaches your doorstep.',
      icon: <MapPinStepIcon />,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 lg:mb-20 px-4">
          <p className="text-[12px] sm:text-[13px] font-bold text-[#F35E24] tracking-[0.18em] uppercase mb-2.5">
            FOUR SIMPLE STEPS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#262626] mb-3 sm:mb-3.5 tracking-tight leading-tight">
            How Dar Dar Works
          </h2>
          <p className="text-[#666666] text-[15px] sm:text-[16px] font-normal leading-normal">
            Getting food and groceries delivered is simple.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Connecting Dashed Line: connects center of Step 1 to center of Step 4 */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[44px] left-[12.5%] right-[12.5%] -translate-y-1/2 z-0 pointer-events-none"
          >
            <svg
              className="w-full h-[2px] block overflow-visible"
            >
              <line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="#F35E24"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-y-12 lg:gap-y-0 gap-x-6 lg:gap-x-8 relative z-10">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center px-1 sm:px-2 group">
                {/* Icon Box with Green Badge */}
                <div className="relative mb-6 sm:mb-7">
                  <div className="w-[84px] h-[84px] sm:w-[88px] sm:h-[88px] bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center border border-[#F2F2F2] transition-transform duration-300 group-hover:scale-105">
                    {step.icon}
                  </div>
                  {/* Green Number Badge */}
                  <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#82C800] text-white font-bold flex items-center justify-center text-[11px] sm:text-xs leading-none shadow-[0_2px_4px_rgba(130,200,0,0.25)]">
                    {step.id}
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-base sm:text-[17px] lg:text-[18px] font-bold text-[#262626] mb-2 sm:mb-2.5 whitespace-normal lg:whitespace-nowrap">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[13px] sm:text-[14px] text-[#666666] leading-[1.6] max-w-[245px] lg:max-w-[265px] mx-auto font-normal">
                  {step.description}
                </p>

                {/* Mobile Vertical Connecting Dashed Line between items */}
                {index < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="sm:hidden flex justify-center mt-6 mb-1 pointer-events-none"
                  >
                    <div className="w-0 h-7 border-r-2 border-dashed border-[#F35E24]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
