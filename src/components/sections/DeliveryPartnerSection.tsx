'use client';
import React from 'react';
import { Container } from '../layout/Container';
import Image from 'next/image';
import { useModals } from '../modals/ModalProvider';

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const PinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const BikeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
  </svg>
);

const BagIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const features = [
  { text: 'Accept Orders', icon: CheckIcon, color: 'orange' },
  { text: 'Easy Pickup', icon: PinIcon, color: 'green' },
  { text: 'Delivery Tracking', icon: BikeIcon, color: 'orange' },
  { text: 'Pickup & Delivery', icon: BikeIcon, color: 'green' },
  { text: 'Delivery History', icon: BikeIcon, color: 'orange' },
  { text: 'Real-Time Notifications', icon: BikeIcon, color: 'green' },
  { text: 'Subscription Packages', icon: BagIcon, color: 'orange' },
];

export function DeliveryPartnerSection() {
  const { openPartnerModal } = useModals();

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden border-y-[2px] border-[#FEF0EA]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Side: Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
              FOR DELIVERY PARTNERS
            </h2>
            <h3 className="text-[2.5rem] md:text-5xl font-black text-[#323232] mb-6 leading-[1.1] tracking-tight">
              Deliver With Dar Dar.
            </h3>
            <p className="text-[#666666] text-[17px] leading-relaxed mb-10 max-w-[500px]">
              Join the Dar Dar delivery network, accept orders and help bring food and groceries to customers across your neighborhood.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-[600px]">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                const isOrange = feature.color === 'orange';
                const bgClass = isOrange ? 'bg-[#FEF0EA]' : 'bg-[#F1F8EB]';
                const iconColorClass = isOrange ? 'text-[#E96424]' : 'text-[#75B737]';

                return (
                  <div key={idx} className="flex items-center gap-4 p-4 border border-[#F0F0F0] rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bgClass} ${iconColorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[#323232] font-bold text-[15px]">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-center lg:justify-start w-full">
              <button onClick={() => openPartnerModal('delivery')} className="bg-[#E96424] hover:bg-[#d6571b] text-white px-8 py-4 rounded-full text-[15px] font-bold inline-flex items-center justify-center gap-2 transition-colors shadow-[0_8px_25px_rgb(233,100,36,0.35)]">
                Become a Delivery Partner
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Right Side: Image */}
          <div className="order-1 lg:order-2 relative w-full h-full flex justify-center lg:justify-end">
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-auto lg:min-h-full max-w-[550px] lg:max-w-none">
              <Image 
                src="/images/pickup.jpg" 
                alt="Delivery Rider" 
                width={1200}
                height={1200}
                className="absolute lg:absolute inset-0 w-full h-full object-cover rounded-[2rem] lg:rounded-[3rem]"
              />
              
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 bg-white rounded-2xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.12)] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E96424] flex items-center justify-center shrink-0">
                  <BikeIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[13px] text-[#666666] font-medium leading-tight mb-1">New request</p>
                  <p className="text-[16px] text-[#323232] font-black leading-tight">Pickup in Matete</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
