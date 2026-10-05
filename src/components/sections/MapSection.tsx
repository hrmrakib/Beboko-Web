import React from 'react';
import { Container } from '../layout/Container';

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export function MapSection() {
  const steps = [
    { label: 'Order Confirmed', status: 'completed' },
    { label: 'Preparing', status: 'completed' },
    { label: 'Picked Up', status: 'completed' },
    { label: 'On The Way', status: 'active' },
    { label: 'Delivered', status: 'pending' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content & Steps */}
          <div className="order-1">
            <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
              Live order updates
            </h2>
            <h3 className="text-[2.5rem] md:text-5xl font-black text-[#323232] mb-6 leading-[1.1] tracking-tight">
              Know Where Your Order Is.
            </h3>
            <p className="text-[#666666] text-[17px] leading-relaxed max-w-[460px] mb-12">
              From the moment your order is confirmed to the moment it reaches your door, Dar Dar keeps you updated.
            </p>

            {/* Vertical Steps */}
            <div className="relative pl-1">
              {/* Vertical line connecting steps */}
              <div className="absolute left-[17px] top-4 bottom-8 w-[2px] bg-[#FFE0D1]"></div>
              
              <div className="flex flex-col gap-8 relative z-10">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-6">
                    {/* Circle icon */}
                    <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 border-2
                      ${step.status === 'completed' || step.status === 'active' 
                        ? 'bg-[#E96424] border-[#E96424] text-white shadow-[0_2px_8px_rgb(233,100,36,0.3)]' 
                        : 'bg-white border-[#E0E0E0]'}
                    `}>
                      {(step.status === 'completed' || step.status === 'active') ? (
                        <CheckIcon />
                      ) : (
                        <div className="w-[6px] h-[6px] rounded-full bg-[#E0E0E0]"></div>
                      )}
                    </div>
                    {/* Text */}
                    <span className={`text-[16px] font-bold 
                      ${step.status === 'active' ? 'text-[#E96424]' : 'text-[#323232]'}
                    `}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Image & Button */}
          <div className="order-2 relative flex flex-col items-center justify-center w-full mt-10 lg:mt-0">
            <img 
              src="/images/order-status.png" 
              alt="Order Status Tracking" 
              className="w-full max-w-[500px] lg:max-w-[550px] h-auto object-contain mb-8 lg:-mr-[10%] xl:-mr-[15%]"
            />
         
          </div>

        </div>
      </Container>
    </section>
  );
}
