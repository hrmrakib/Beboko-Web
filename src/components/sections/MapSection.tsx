import React from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';

// Checkmark Icon for completed/active steps
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Download Arrow with Tray Icon matching Figma
const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
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
    <section
      id="order-tracking"
      className="py-16 sm:py-20 lg:py-24 bg-white border-t border-b border-[#FBD2C1] overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Content & Steps */}
          <div className="order-1 flex flex-col justify-center">
            {/* Eyebrow */}
            <p className="text-[12px] sm:text-[13px] font-bold text-[#F35E24] tracking-[0.18em] uppercase mb-2.5">
              LIVE ORDER UPDATES
            </p>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#262626] mb-3.5 sm:mb-4 tracking-tight leading-tight">
              Know Where Your Order Is.
            </h2>

            {/* Subtitle */}
            <p className="text-[#666666] text-[15px] sm:text-[16px] leading-[1.6] max-w-[480px] mb-10 sm:mb-12 font-normal">
              From the moment your order is confirmed to the moment it reaches your door, Dar Dar keeps you updated.
            </p>

            {/* Vertical Timeline Stepper */}
            <div className="relative pl-0.5">
              {/* Connecting Vertical Line */}
              <div
                aria-hidden="true"
                className="absolute left-[13px] sm:left-[14px] top-3.5 bottom-4 w-[1.5px] bg-[#FDDFD5] -translate-x-1/2 z-0"
              />

              <div className="flex flex-col gap-6 sm:gap-7 relative z-10">
                {steps.map((step, idx) => {
                  const isFinishedOrActive = step.status === 'completed' || step.status === 'active';
                  const isActive = step.status === 'active';

                  return (
                    <div key={idx} className="flex items-center gap-4 sm:gap-5">
                      {/* Step Circle */}
                      <div
                        className={`w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isFinishedOrActive
                            ? 'bg-[#F35E24] text-white shadow-[0_2px_8px_rgba(243,94,36,0.3)]'
                            : 'bg-white border border-[#E5E7EB]'
                        }`}
                      >
                        {isFinishedOrActive ? (
                          <CheckIcon />
                        ) : (
                          <div className="w-[6px] h-[6px] rounded-full bg-[#D1D5DB]" />
                        )}
                      </div>

                      {/* Step Label */}
                      <span
                        className={`text-[15px] sm:text-[16px] font-bold ${
                          isActive ? 'text-[#F35E24]' : 'text-[#262626]'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Order Status Graphic & Download Button */}
          <div className="order-2 flex flex-col items-center justify-center w-full mt-6 lg:mt-0">
            <div className="w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[440px] flex flex-col items-center">
              {/* Floating Order Status Map Image */}
              <img
                src="/images/order-status.png"
                alt="Order Status Tracking"
                className="w-full h-auto object-contain select-none"
              />

              {/* Download Dar Dar Button matching Figma */}
              <Button
                variant="primary"
                className="w-full max-w-[320px] sm:max-w-[360px] bg-[#F35E24] hover:bg-[#d9521d] text-white px-8 py-3.5 text-[15px] sm:text-[16px] font-semibold rounded-full shadow-[0_8px_25px_rgba(243,94,36,0.3)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(243,94,36,0.4)] hover:-translate-y-0.5 active:translate-y-0 mt-6 sm:mt-8"
                iconPosition="right"
                icon={<DownloadIcon className="w-5 h-5 ml-1.5" />}
              >
                Download Dar Dar
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
