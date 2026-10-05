import React from 'react';
import { Container } from '../layout/Container';
import { MapPinIcon, ClockIcon, CheckIcon } from '../ui/Icons';

export function HowItWorksSection() {
  const steps = [
    {
      id: '01',
      title: 'Select Restaurant',
      description: 'Choose from our wide range of partner restaurants and grocery stores near you.',
      icon: <MapPinIcon className="w-8 h-8 text-orange-500" />,
    },
    {
      id: '02',
      title: 'Select Menu',
      description: 'Browse menus, select your favorite meals or groceries, and add them to your cart.',
      icon: <CheckIcon className="w-8 h-8 text-orange-500" />,
    },
    {
      id: '03',
      title: 'Wait for Delivery',
      description: 'Sit back and relax while our delivery partners bring your order to your doorstep.',
      icon: <ClockIcon className="w-8 h-8 text-orange-500" />,
    }
  ];

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-orange-500 tracking-wider uppercase mb-3">How It Works</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">How Our App Works</h3>
          <p className="text-stone-600 text-lg">
            Ordering your favorite food or daily groceries is now easier than ever. Follow these three simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-stone-100 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center relative group">
                <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-300 shadow-sm border border-orange-100">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-stone-900 font-bold flex items-center justify-center shadow-md text-sm border border-stone-100">
                    {step.id}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-stone-900 mb-3">{step.title}</h4>
                <p className="text-stone-600 leading-relaxed max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
