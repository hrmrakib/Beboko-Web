import React from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';

export function FeaturesSection() {
  return (
    <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-800 rounded-l-[100px] -z-10 hidden lg:block opacity-50"></div>
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mockup */}
          <div className="order-2 lg:order-1 relative">
             <div className="relative mx-auto w-full max-w-[320px] aspect-[1/2] bg-stone-800 rounded-[3rem] shadow-2xl border-8 border-stone-700 overflow-hidden rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                <div className="absolute top-0 inset-x-0 h-6 bg-stone-700 rounded-b-3xl mx-auto w-32 z-10"></div>
                {/* Internal App Mockup */}
                <div className="w-full h-full bg-stone-100 flex flex-col p-4 pt-10">
                   <div className="flex gap-2 mb-4 overflow-hidden">
                     <div className="w-20 h-24 bg-white rounded-xl shadow-sm shrink-0 animate-pulse"></div>
                     <div className="w-20 h-24 bg-white rounded-xl shadow-sm shrink-0 animate-pulse delay-75"></div>
                     <div className="w-20 h-24 bg-white rounded-xl shadow-sm shrink-0 animate-pulse delay-150"></div>
                   </div>
                   <div className="space-y-3 flex-1">
                     <div className="h-20 bg-white rounded-xl shadow-sm w-full"></div>
                     <div className="h-20 bg-white rounded-xl shadow-sm w-full"></div>
                     <div className="h-20 bg-white rounded-xl shadow-sm w-full"></div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Your whole day in the <br />
              <span className="text-orange-500">palm of your hand</span>
            </h2>
            <p className="text-stone-400 text-lg mb-8 leading-relaxed max-w-lg">
              Experience the ultimate convenience with our app. Browse thousands of local restaurants and grocery stores, track your delivery in real-time, and manage your orders effortlessly.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700 hover:border-orange-500 transition-colors group">
                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-500">20k+</h4>
                <p className="text-stone-400 text-sm">Partner Restaurants</p>
              </div>
              <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700 hover:border-orange-500 transition-colors group">
                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-500">98%</h4>
                <p className="text-stone-400 text-sm">Customer Satisfaction</p>
              </div>
            </div>
            
            <Button size="lg" variant="primary">
              Download App
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
