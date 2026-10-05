import React from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';

export function CategoriesSection() {
  return (
    <section className="py-24 bg-orange-50/50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-stone-900">
              Everything You <br />
              Need, <span className="text-orange-500">In One Place</span>
            </h2>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed max-w-lg">
              From fresh groceries to your favorite restaurant meals, we've got you covered. Discover a world of culinary delights and everyday essentials right at your fingertips.
            </p>
            
            <Button variant="outline">Explore More</Button>
          </div>
          
          <div className="relative">
             {/* Abstract Phones Representation */}
             <div className="flex items-end justify-center gap-4 h-[400px]">
                <div className="w-1/3 max-w-[160px] h-3/4 bg-white rounded-[2rem] shadow-xl border-4 border-stone-100 p-2 transform -rotate-6 translate-y-8 overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                   <div className="w-full h-24 bg-orange-100 rounded-xl mb-2 animate-pulse"></div>
                   <div className="w-full h-16 bg-stone-50 rounded-lg mb-2"></div>
                   <div className="w-full h-16 bg-stone-50 rounded-lg"></div>
                </div>
                <div className="w-1/3 max-w-[180px] h-full bg-white rounded-[2rem] shadow-2xl border-4 border-stone-100 p-3 z-10 overflow-hidden hover:-translate-y-4 transition-transform duration-500">
                   <div className="w-full h-full bg-stone-50 rounded-xl border border-stone-100 p-2">
                     <div className="w-full h-32 bg-stone-200 rounded-lg mb-3"></div>
                     <div className="w-3/4 h-4 bg-stone-200 rounded mb-2"></div>
                     <div className="w-1/2 h-4 bg-stone-200 rounded mb-4"></div>
                     <div className="w-full h-12 bg-orange-100 rounded-lg"></div>
                   </div>
                </div>
                <div className="w-1/3 max-w-[160px] h-4/5 bg-white rounded-[2rem] shadow-xl border-4 border-stone-100 p-2 transform rotate-6 translate-y-4 overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                   <div className="w-full h-full bg-stone-50 rounded-xl border border-stone-100 p-2 flex flex-col gap-2">
                     <div className="w-full h-12 bg-lime-100 rounded-lg"></div>
                     <div className="w-full h-12 bg-blue-100 rounded-lg"></div>
                     <div className="w-full h-12 bg-purple-100 rounded-lg"></div>
                     <div className="w-full h-12 bg-pink-100 rounded-lg"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
