import React from 'react';
import Image from 'next/image';
import { Container } from '../layout/Container';

export function AppDownloadSection() {
  return (
    <section className="py-10 lg:py-14 bg-[#E96424] relative overflow-hidden">
      {/* Decorative Circle */}
      <div className="absolute top-1/2 -right-[150px] lg:-right-[200px] transform -translate-y-1/2 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full border-[40px] lg:border-[60px] border-white/10 pointer-events-none"></div>
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 items-center relative z-10">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left lg:pr-8">
            <h2 className="text-[11px] font-bold text-white tracking-[0.2em] uppercase mb-4 opacity-90">
              DAR DAR IN YOUR POCKET
            </h2>
            <h3 className="text-[2.5rem] lg:text-[44px] font-black text-white mb-5 leading-[1.15] tracking-tight">
              Ready when you are. <br className="hidden sm:block" />
              Wherever you are.
            </h3>
            <p className="text-[15px] lg:text-[16px] text-white/90 leading-[1.6] mb-8 lg:mb-10 mx-auto lg:mx-0">
              Download Dar Dar today and enjoy the easiest way to <br className="hidden lg:block" /> order food, groceries, and everyday essentials.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-4">
              <a href="#" className="bg-white rounded-lg px-4 lg:px-5 py-2.5 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-sm">
                <Image 
                  src="/images/play-store.png" 
                  alt="Play Store icon" 
                  width={28}
                  height={28}
                  className="w-[26px] h-[26px] lg:w-[28px] lg:h-[28px] object-contain shrink-0"
                />
                <div className="text-left">
                  <p className="text-[9px] lg:text-[10px] text-[#666666] tracking-wide mb-[2px] leading-none">GET IT ON</p>
                  <p className="text-sm lg:text-base font-bold text-[#333333] leading-none tracking-tight">Google Play</p>
                </div>
              </a>
              <a href="#" className="bg-white rounded-lg px-4 lg:px-5 py-2.5 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-sm">
                <Image 
                  src="/images/app-store.png" 
                  alt="App Store icon" 
                  width={28}
                  height={28}
                  className="w-[26px] h-[26px] lg:w-[28px] lg:h-[28px] object-contain shrink-0"
                />
                <div className="text-left">
                  <p className="text-[9px] lg:text-[10px] text-[#666666] tracking-wide mb-[2px] leading-none">DOWNLOAD ON</p>
                  <p className="text-sm lg:text-base font-bold text-[#333333] leading-none tracking-tight">App Store</p>
                </div>
              </a>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[450px] xl:max-w-[480px] transform origin-center lg:origin-right">
              <Image 
                src="/images/cta-phones.png" 
                alt="Dar Dar App on Multiple Phones" 
                width={800}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
