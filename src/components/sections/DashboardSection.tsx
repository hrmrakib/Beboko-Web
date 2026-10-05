import React from 'react';
import { Container } from '../layout/Container';

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" fill="currentColor" className="text-[#75B737]" stroke="none" />
    <polyline points="8 12 11 15 16 9" className="text-white" />
  </svg>
);

export function DashboardSection() {
  const bullets = [
    'Accept and manage incoming orders in real time',
    'Track sales and spot your best-performing products',
    'Get dedicated local support whenever you need it'
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Mockup Image */}
          <div className="order-2 lg:order-1 relative flex justify-center w-full mt-10 lg:mt-0">
            <img 
              src="/images/dashboard-phone.png" 
              alt="Dar Dar Vendor Dashboard Mockup" 
              className="w-full max-w-[450px] lg:max-w-[550px] h-auto object-contain"
            />
          </div> 
          
          {/* Right Side: Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
              Dar Dar Vendor Dashboard
            </h2>
            <h3 className="text-[2.5rem] md:text-5xl font-black text-[#323232] mb-6 leading-[1.1] tracking-tight">
              Run your business with <br className="hidden xl:block" />
              clarity and confidence.
            </h3>
            <p className="text-[#666666] text-[17px] leading-relaxed mb-10 max-w-[480px]">
              Manage orders, update your menu, understand performance, and grow sales from one intuitive dashboard.
            </p>

            <ul className="flex flex-col gap-5 mb-12">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <CheckCircleIcon className="w-6 h-6 shrink-0" />
                  <span className="text-[#323232] font-bold text-[15px]">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
            
            <button className="bg-[#E96424] hover:bg-[#d6571b] text-white px-8 py-3.5 rounded-full text-[15px] font-bold inline-flex items-center gap-2 transition-colors shadow-[0_8px_20px_rgb(233,100,36,0.3)]">
              Join Now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
