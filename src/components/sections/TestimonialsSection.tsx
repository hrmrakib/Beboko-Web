import React from 'react';
import { Container } from '../layout/Container';
import Image from 'next/image';

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const testimonials = [
  {
    quote: '“Dar Dar makes ordering food so much easier. I can choose what I want and follow my delivery.”',
    name: 'Dar Dar Customer',
    role: 'Customer testimonial placeholder',
    image: '/images/customer.png',
  },
  {
    quote: '“I can order groceries without leaving home. The app is simple and convenient.”',
    name: 'Dar Dar Customer',
    role: 'Customer testimonial placeholder',
    image: '/images/vendor.png',
  },
  {
    quote: '“I love having different local vendors in one place.”',
    name: 'Dar Dar Customer',
    role: 'Customer testimonial placeholder',
    image: '/images/pickup.jpg',
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-y-[2px] border-[#FEF0EA]">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 px-4">
          <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
            PREVIEW FEEDBACK
          </h2>
          <h3 className="text-[2.2rem] md:text-5xl font-black text-[#333333] mb-6 tracking-tight">
            What Our Customers Say
          </h3>
          <p className="text-[#666666] text-[16px] md:text-[17px] leading-relaxed max-w-[650px] mx-auto">
            Example testimonials shown for layout preview. These will be replaced with verified customer feedback.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testi, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-[#EAEAEA] rounded-[24px] p-8 lg:p-10 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-300"
            >
              <div>
                <div className="flex gap-1 mb-6 text-[#E96424]">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <p className="text-[16px] lg:text-[17px] font-bold text-[#333333] leading-[1.6] mb-10">
                  {testi.quote}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0">
                  <Image 
                    src={testi.image} 
                    alt={testi.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#333333] leading-tight mb-1">
                    {testi.name}
                  </h4>
                  <p className="text-[12px] text-[#888888] leading-tight">
                    {testi.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
