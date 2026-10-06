import React from 'react';
import { Container } from '../layout/Container';

export function AppDownloadSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#E96424] relative overflow-hidden">
      {/* Decorative Circle */}
      <div className="absolute top-1/2 -right-[200px] lg:-right-[250px] xl:-right-[150px] transform -translate-y-1/2 w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] rounded-full border-[50px] lg:border-[90px] border-white/10 pointer-events-none"></div>
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-8 items-center relative z-10">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h2 className="text-[11px] font-bold text-white tracking-[0.2em] uppercase mb-4 opacity-90">
              DAR DAR IN YOUR POCKET
            </h2>
            <h3 className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] font-black text-white mb-6 leading-[1.1] tracking-tight">
              Ready when you are. <br className="hidden sm:block" />
              Wherever you are.
            </h3>
            <p className="text-[16px] md:text-[17px] text-white/90 leading-relaxed mb-10 max-w-[500px] mx-auto lg:mx-0">
              Download Dar Dar today and enjoy the easiest way to order food, groceries, and everyday essentials.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#" className="transition-transform hover:scale-105 active:scale-95 block">
                <img 
                  src="/images/play-store.png" 
                  alt="Get it on Google Play" 
                  className="h-[52px] md:h-[56px] w-auto object-contain drop-shadow-sm"
                />
              </a>
              <a href="#" className="transition-transform hover:scale-105 active:scale-95 block">
                <img 
                  src="/images/app-store.png" 
                  alt="Download on the App Store" 
                  className="h-[52px] md:h-[56px] w-auto object-contain drop-shadow-sm"
                />
              </a>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[380px] sm:max-w-[450px] lg:max-w-[580px] xl:max-w-[650px] lg:-mr-10 xl:-mr-14">
              <img 
                src="/images/cta-phones.png" 
                alt="Dar Dar App on Multiple Phones" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
