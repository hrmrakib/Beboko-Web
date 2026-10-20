import React from 'react';
import { Button } from '../ui/Button';
import { Container } from '../layout/Container';
import { StarIcon } from '../ui/Icons';

export function HeroSection() {
  return (
    <section id="home" className="relative pt-16 pb-24 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 max-w-xl animate-in slide-in-from-bottom-8 duration-700 fade-in text-center lg:text-left mx-auto lg:mx-0">
            <div className="text-[#E96424] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4">
              FOOD • GROCERIES • LOCAL DELIVERY
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] font-black text-[#323232] leading-[1.1] lg:leading-[1.05] mb-6 tracking-tight">
              Your Food & <br />
              Groceries, <br />
              <span className="text-[#E96424]">Delivered.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-[#666666] mb-4 max-w-[480px] mx-auto lg:mx-0 leading-relaxed">
              Order meals, groceries and everyday essentials from local restaurants, supermarkets and trusted vendors — all from one simple app.
            </p>
            <p className="text-base sm:text-lg text-[#323232] font-medium mb-8 sm:mb-10 max-w-[480px] mx-auto lg:mx-0">
              Fast, convenient and built for everyday life in Kinshasa.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-10 sm:mb-12">
              <Button 
                size="lg" 
                className="bg-[#E96424] hover:bg-[#d5581c] text-white px-8 py-3.5 h-auto text-[15px] font-bold rounded-full w-full sm:w-auto"
                iconPosition="right"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                }
              >
                Download the App
              </Button>
              
              <button className="flex items-center gap-3 bg-white border border-stone-100 shadow-sm hover:shadow-md transition-shadow px-6 py-2.5 rounded-full w-full sm:w-auto h-auto">
                <div className="w-8 h-8 rounded-full bg-[#f1f8eb] flex items-center justify-center text-[#75B737]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <span className="text-[15px] font-bold text-[#323232]">See how it works</span>
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#E96424] text-white flex items-center justify-center text-xs font-bold z-40">AB</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#75B737] text-white flex items-center justify-center text-xs font-bold z-30">MD</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#ffb800] text-white flex items-center justify-center text-xs font-bold z-20">FC</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#323232] text-white flex items-center justify-center text-xs font-bold z-10">IK</div>
              </div>
              <div className="flex flex-col items-center sm:items-start justify-center">
                <div className="flex items-center gap-1 text-[#ffb800] mb-0.5">
                  <StarIcon className="w-4 h-4 fill-current" />
                  <StarIcon className="w-4 h-4 fill-current" />
                  <StarIcon className="w-4 h-4 fill-current" />
                  <StarIcon className="w-4 h-4 fill-current" />
                  <StarIcon className="w-4 h-4 fill-current" />
                </div>
                <span className="text-[13px] font-medium text-[#666666]">
                  Loved by 0 customers
                </span>
              </div>
            </div>
          </div>
          
          {/* Image Area */}
          <div className="order-1 lg:order-2 relative animate-in slide-in-from-right-8 duration-1000 fade-in delay-200 flex justify-center lg:justify-end mb-8 lg:mb-0">
            <img 
              src="/images/hero-phone.png" 
              alt="App Mockup" 
              className="w-full max-w-[600px] h-auto object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
