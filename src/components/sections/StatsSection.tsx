import React from 'react';
import { Container } from '../layout/Container';

export function StatsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#333333] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text & CTA */}
          <div>
            <h2 className="text-[7rem] md:text-[9rem] font-black text-[#75B737] leading-none tracking-tighter mb-4">
              95%
            </h2>
            <h3 className="text-[2rem] md:text-[2.5rem] font-bold text-white mb-4 leading-tight">
              Keep 95% of Your Sales.
            </h3>
            <p className="text-[#E0E0E0] text-[17px] leading-relaxed max-w-md mb-8">
              Dar Dar retains 5% as a platform fee, while vendors receive 95% of their sales.
            </p>
            <button className="bg-white hover:bg-stone-100 text-[#323232] px-7 py-3.5 rounded-full text-[15px] font-bold inline-flex items-center transition-colors">
              Join Dar Dar as a Vendor
            </button>
          </div>

          {/* Right Column: Stats Card */}
          <div className="w-full">
            <div className="bg-white rounded-[24px] lg:rounded-[32px] p-8 md:p-10 shadow-2xl">
              
              <div className="mb-8">
                <span className="text-[#666666] text-[13px] font-bold block mb-1">
                  Customer order
                </span>
                <span className="text-[#323232] text-[2.5rem] md:text-5xl font-black leading-none tracking-tight">
                  100%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Vendor receives block */}
                <div className="bg-[#75B737] rounded-[16px] p-6 flex flex-col justify-center">
                  <span className="text-white text-[13px] font-bold mb-2">
                    Vendor receives
                  </span>
                  <span className="text-white text-[2.5rem] md:text-5xl font-black leading-none tracking-tight">
                    95%
                  </span>
                </div>

                {/* Platform fee block */}
                <div className="bg-[#E96424] rounded-[16px] p-6 flex flex-col justify-center">
                  <span className="text-white text-[13px] font-bold mb-2">
                    Dar Dar platform fee
                  </span>
                  <span className="text-white text-[2.5rem] md:text-5xl font-black leading-none tracking-tight">
                    5%
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
