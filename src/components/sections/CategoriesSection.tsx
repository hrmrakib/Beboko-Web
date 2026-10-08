import React from 'react';
import { Container } from '../layout/Container';

export function CategoriesSection() {
  return (
    <section id="food-groceries" className="pt-12 lg:pt-16 pb-0 bg-[#FFFFFF] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Content */}
          <div className="order-1">
            <h2 className="text-base font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
              Shop local
            </h2>
            <h3 className="text-[2.5rem] md:text-5xl font-black text-[#323232] mb-6 leading-[1.6] tracking-tight">
              Everything You <br className="hidden md:block" />
              Need, <span className="text-[#E96424]">In One Place</span>
            </h3>
            <p className="text-[#666666] text-[17px] mb-10 leading-relaxed max-w-[460px]">
              From a hot meal to everyday groceries, Dar Dar connects you with trusted local businesses.
            </p>
            
            <button className="bg-white border border-stone-200 hover:bg-stone-50 text-[#323232] px-7 py-3 rounded-full text-[15px] font-bold inline-flex items-center gap-2 transition-colors shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              Download the app
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>

          {/* Right Side: Mockup Image */}
          <div className="order-2 relative flex justify-center lg:justify-end mt-10 lg:mt-0 w-full">
            <img 
              src="/images/shop-phones.png" 
              alt="Dar Dar App on Multiple Phones" 
              className="w-full max-w-[600px] lg:max-w-none lg:w-[125%] xl:w-[130%] h-auto object-contain -mr-4 lg:-mr-[15%] xl:-mr-[20%]"
            />
          </div> 
          
        </div>
      </Container>
    </section>
  );
}
