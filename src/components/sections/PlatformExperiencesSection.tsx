import React from 'react';
import { Container } from '../layout/Container';
import Image from 'next/image';

const experiences = [
  {
    title: 'CUSTOMER',
    desc: 'Discover, order and track.',
    image: '/images/customer.png',
  },
  {
    title: 'VENDOR',
    desc: 'Sell, manage and grow.',
    image: '/images/vendor.png',
    hasOverlay: true,
  },
  {
    title: 'DELIVERY PARTNER',
    desc: 'Accept, deliver and earn.',
    image: '/images/pickup.jpg',
  }
];

export function PlatformExperiencesSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#363535]">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20 px-4">
          <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
            CONNECTED LOCAL COMMERCE
          </h2>
          <h3 className="text-[2.2rem] md:text-5xl font-black text-white mb-6 leading-[1.15] tracking-tight">
            One Platform. <br className="hidden md:block" />
            Three Experiences.
          </h3>
          <p className="text-[#D4D4D4] text-[16px] md:text-[17px] leading-relaxed max-w-[600px] mx-auto">
            Dar Dar brings customers, local businesses and delivery partners into one practical ecosystem.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] overflow-hidden border-2 border-white flex flex-col">
              <div className="relative w-full h-[240px] sm:h-[300px] md:h-[220px] lg:h-[260px] xl:h-[280px]">
                <Image 
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover"
                />
                {exp.hasOverlay && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-20 bg-[#363535] border-[4px] border-white rounded-[14px] mt-36"></div>
                  </div>
                )}
              </div>
              <div className="p-6 lg:p-8 bg-white flex-grow">
                <h4 className="text-[11px] font-bold text-[#8DC63F] tracking-[0.15em] uppercase mb-2">
                  {exp.title}
                </h4>
                <p className="text-[18px] lg:text-[20px] font-bold text-[#333333]">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
