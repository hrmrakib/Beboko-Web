'use client';

import React, { useState } from 'react';
import { Container } from '../layout/Container';

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const faqs = [
  {
    question: 'What is Dar Dar?',
    answer: 'Dar Dar is a food and groceries delivery platform connecting customers with local restaurants, supermarkets and other vendors.'
  },
  {
    question: 'What can I order on Dar Dar?',
    answer: 'You can order a wide variety of items including prepared meals, fresh groceries, pharmacy essentials, and more.'
  },
  {
    question: 'Where is Dar Dar available?',
    answer: 'Dar Dar is currently available in select neighborhoods. Enter your address in the app to see if we deliver to your area.'
  },
  {
    question: 'How can I pay?',
    answer: 'We accept a variety of payment methods including credit/debit cards, mobile money, and cash on delivery depending on your location.'
  },
  {
    question: 'Can I track my order?',
    answer: 'Yes, you can track your order in real-time through the Dar Dar app from the moment it is accepted to when it arrives at your door.'
  },
  {
    question: 'Can I become a vendor?',
    answer: 'Absolutely! We are always looking for great local businesses to partner with. Visit our vendor page to apply.'
  },
  {
    question: 'Can I become a delivery partner?',
    answer: 'Yes, you can join our network of delivery partners. Apply through our delivery partner portal to get started.'
  },
  {
    question: 'Is Dar Dar available on mobile?',
    answer: 'Yes, Dar Dar is fully accessible via our responsive web app, and our native mobile apps will be launching soon.'
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF]">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20 px-4">
          <h2 className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-4">
            HELP CENTER
          </h2>
          <h3 className="text-[2.2rem] md:text-5xl font-black text-[#333333] mb-6 tracking-tight leading-[1.15]">
            Frequently <br className="hidden sm:block" /> Asked Questions
          </h3>
          <p className="text-[#666666] text-[16px] md:text-[17px] leading-relaxed max-w-[550px] mx-auto">
            Clear answers about ordering, payments and partnering with Dar Dar.
          </p>
        </div>

        {/* FAQs */}
        <div className="max-w-[1000px] mx-auto flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <div 
                key={idx}
                className="bg-white border border-[#E6E6E6] rounded-[16px] overflow-hidden transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.01)]"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 lg:p-6 text-left focus:outline-none hover:bg-gray-50/50 transition-colors"
                >
                  <span className="text-[15px] lg:text-[16px] font-bold text-[#333333]">
                    {faq.question}
                  </span>
                  
                  {isOpen ? (
                    <div className="w-7 h-7 rounded-full bg-[#E96424] text-white flex items-center justify-center shrink-0 ml-4 shadow-sm">
                      <ChevronDownIcon className="w-[14px] h-[14px]" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 flex items-center justify-end text-[#888888] shrink-0 ml-4">
                      <ChevronRightIcon className="w-4 h-4" />
                    </div>
                  )}
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#F0F0F0] p-6 lg:p-7 pt-5 lg:pt-6 text-[14px] lg:text-[15px] text-[#666666] leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
