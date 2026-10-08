import React from 'react';
import { Container } from '../layout/Container';

// Exact Figma Phone Icon for Mobile App & WhatsApp
function PhoneDeviceIcon({ className = 'w-6 h-8 text-[#F35E24]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2.5" y="2" width="15" height="24" rx="3.5" />
      <line x1="8.5" y1="21" x2="11.5" y2="21" />
    </svg>
  );
}

// Exact Figma Mail Icon for SMS
function SmsMailIcon({ className = 'w-8 h-7 text-[#F35E24]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 26 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="22" height="18" rx="3" />
      <path d="M2.5 3.5l10.5 8 10.5-8" />
    </svg>
  );
}

// Right Arrow Icon for the flow
function ArrowRightIcon({ className = 'text-[#666666] w-3.5 h-3.5' }: { className?: string }) {
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

export function ConnectivitySection() {
  const features = [
    'Lightweight Mobile Experience',
    'Low-Bandwidth Friendly',
    'Accessible Ordering',
    'Simple User Experience',
  ];

  const channels = [
    {
      id: 'mobile-app',
      title: 'Mobile App',
      icon: <PhoneDeviceIcon className="w-6 h-8 text-[#F35E24] mb-3" />,
    },
    {
      id: 'sms',
      title: 'SMS',
      icon: <SmsMailIcon className="w-8 h-7 text-[#F35E24] mb-3.5" />,
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      icon: <PhoneDeviceIcon className="w-6 h-8 text-[#F35E24] mb-3" />,
    },
  ];

  const flowSteps = [
    'Customer',
    'Dar Dar',
    'Restaurant / Vendor',
    'Delivery Rider',
    'Customer',
  ];

  return (
    <section
      id="connectivity"
      className="py-16 sm:py-20 lg:py-24 bg-white border-t border-b border-[#FBD2C1] overflow-hidden"
    >
      <Container>
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto px-4">
          
          {/* Eyebrow */}
          <p className="text-[12px] sm:text-[13px] font-bold text-[#F35E24] tracking-[0.18em] uppercase mb-2.5">
            ACCESSIBLE BY DESIGN
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#262626] mb-3.5 sm:mb-4 tracking-tight leading-tight">
            Built for Real-World Connectivity.
          </h2>

          {/* Subtitle */}
          <p className="text-[#666666] text-[15px] sm:text-[16px] leading-[1.6] max-w-2xl mx-auto mb-10 sm:mb-12 font-normal">
            Dar Dar is designed around local infrastructure realities, helping customers access food and
            grocery services even where connectivity may be limited.
          </p>

          {/* 4 Feature Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full mb-8 sm:mb-10">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#F2F2F2] text-[#333333] font-medium text-[13px] sm:text-[14px] px-4 sm:px-5 py-3 sm:py-3.5 rounded-[12px] flex items-center justify-center whitespace-normal sm:whitespace-nowrap transition-colors hover:bg-[#EBEBEB]"
              >
                {feature}
              </div>
            ))}
          </div>

          {/* 3 Channel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full mb-10 sm:mb-12">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="bg-[#FEEFE9] rounded-[20px] py-8 sm:py-9 px-6 flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-1"
              >
                {channel.icon}
                <span className="text-[15px] sm:text-[16px] font-bold text-[#262626]">
                  {channel.title}
                </span>
              </div>
            ))}
          </div>

          {/* Flow Diagram */}
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 gap-y-2.5 text-[13px] sm:text-[14px] font-medium text-[#262626]">
            {flowSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="whitespace-nowrap">{step}</span>
                {idx < flowSteps.length - 1 && (
                  <ArrowRightIcon className="text-[#666666] w-3.5 h-3.5 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
