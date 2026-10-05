import React from 'react';
import { Container } from '../layout/Container';

export function LocalDeliverySection() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-orange-500 tracking-wider uppercase mb-3">A Little Real-World Community</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">Built for Local Delivery</h3>
          <p className="text-stone-600 text-lg">
            We partner with the best local restaurants and grocery stores to bring you the freshest items, while supporting our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-stone-100 group">
            <div className="h-64 bg-stone-200 relative overflow-hidden">
               {/* Mock Image */}
               <div className="absolute inset-0 bg-stone-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] mix-blend-overlay"></div>
                  <span className="font-bold text-stone-500 text-2xl">Delivery Image</span>
               </div>
            </div>
            <div className="p-8 bg-orange-50/50">
              <h4 className="text-xl font-bold text-stone-900 mb-3">Real-Time Order Tracking</h4>
              <p className="text-stone-600">Know exactly where your order is with our live tracking feature. From the kitchen to your doorstep.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-stone-100 group">
            <div className="h-64 bg-stone-200 relative overflow-hidden">
               {/* Mock Image */}
               <div className="absolute inset-0 bg-stone-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,#000_10px,#000_20px)] mix-blend-overlay"></div>
                  <span className="font-bold text-stone-500 text-2xl">Grocery Image</span>
               </div>
            </div>
            <div className="p-8 bg-orange-50/50">
              <h4 className="text-xl font-bold text-stone-900 mb-3">Fresh Groceries Daily</h4>
              <p className="text-stone-600">Get your daily essentials delivered fresh. We ensure quality and speed for every single order.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
