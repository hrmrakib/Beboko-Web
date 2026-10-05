import React from 'react';
import { Container } from '../layout/Container';

export function LocalDeliverySection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF]">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
            Neighborhood Logistics
          </h2>
          <h3 className="text-[2.5rem] md:text-5xl font-black text-[#323232] mb-6 tracking-tight">
            Built for Local Delivery.
          </h3>
          <p className="text-[#666666] text-[17px] leading-relaxed max-w-lg mx-auto">
            Our delivery network is designed around the realities of local neighborhoods and roads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1 */}
          <div className="rounded-[24px] overflow-hidden bg-[#FFF5EE] shadow-[0_4px_20px_rgb(0,0,0,0.03)] group transition-transform hover:-translate-y-1 duration-300">
            <div className="h-[280px] w-full overflow-hidden">
               <img 
                 src="/images/rider.png" 
                 alt="Motorcycle Delivery" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
            </div>
            <div className="p-8 lg:p-10">
              <h4 className="text-[11px] font-bold text-[#E96424] tracking-[0.15em] uppercase mb-3">
                Motorcycle Delivery
              </h4>
              <h5 className="text-[22px] font-bold text-[#323232] mb-3">
                Fast food and smaller orders
              </h5>
              <p className="text-[#666666] text-[15px] leading-relaxed">
                A practical delivery concept for moving meals and lighter baskets through neighborhood streets.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-[24px] overflow-hidden bg-[#FFF5EE] shadow-[0_4px_20px_rgb(0,0,0,0.03)] group transition-transform hover:-translate-y-1 duration-300">
            <div className="h-[280px] w-full overflow-hidden">
               <img 
                 src="/images/delivery-cargo.png" 
                 alt="Light Cargo Delivery" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
            </div>
            <div className="p-8 lg:p-10">
              <h4 className="text-[11px] font-bold text-[#75B737] tracking-[0.15em] uppercase mb-3">
                Light Cargo Delivery
              </h4>
              <h5 className="text-[22px] font-bold text-[#323232] mb-3">
                Larger grocery and household orders
              </h5>
              <p className="text-[#666666] text-[15px] leading-relaxed">
                A flexible concept for bigger baskets where suitable delivery options are available.
              </p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
