import React from 'react';
import { Container } from '../layout/Container';
import { SparklesIcon, ShieldCheckIcon } from '../ui/Icons';

export function FeaturesSection() {
  return (
    <section className="py-24 bg-[#17201C] text-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Mockup Image */}
          <div className="order-2 lg:order-1 relative flex justify-center lg:justify-start mt-10 lg:mt-0 w-full">
            <img 
              src="/images/city-phone.png" 
              alt="City Phone App Mockup" 
              className="w-full max-w-[600px] lg:max-w-none lg:w-[125%] xl:w-[135%] h-auto object-contain -ml-4 lg:-ml-[15%] xl:-ml-[20%]"
            />
          </div>
          
          {/* Right Side: Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
              Made for everyday life
            </h2>
            <h3 className="text-[2.5rem] md:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Your whole city, in the <br className="hidden md:block" />
              palm of your hand.
            </h3>
            <p className="text-[#a8a8a8] text-[17px] mb-10 leading-relaxed max-w-lg">
              Beautifully simple and effortlessly fast. Find what you need, discover new local favorites, and manage every order from one place.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/5 p-6 rounded-[20px] border border-white/5 hover:border-[#E96424]/30 transition-colors">
                <SparklesIcon className="w-6 h-6 text-[#E96424] mb-4" />
                <h4 className="text-[17px] font-bold text-white mb-2">Personal picks</h4>
                <p className="text-[#a8a8a8] text-[14px] leading-relaxed">
                  Suggestions that get better with every order.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-[20px] border border-white/5 hover:border-[#E96424]/30 transition-colors">
                <ShieldCheckIcon className="w-6 h-6 text-[#E96424] mb-4" />
                <h4 className="text-[17px] font-bold text-white mb-2">Safe checkout</h4>
                <p className="text-[#a8a8a8] text-[14px] leading-relaxed">
                  Simple, secure payments you can trust.
                </p>
              </div>
            </div>
            
            <button className="bg-white hover:bg-stone-100 text-[#323232] px-7 py-3 rounded-full text-[15px] font-bold inline-flex items-center gap-2 transition-colors">
              Download the app
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
