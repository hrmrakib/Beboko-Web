import React from 'react';
import { Container } from '../layout/Container';
import { StoreIcon, SmartphoneIcon, ShieldCheckIcon, MapPinIcon, BikeIcon } from '../ui/Icons';

export function FeatureBanner() {
  const features = [
    {
      id: '01',
      title: 'Local Vendors',
      description: 'Restaurants, supermarkets and neighborhood sellers.',
      icon: StoreIcon,
    },
    {
      id: '02',
      title: 'Easy Ordering',
      description: 'Browse and order in a few taps.',
      icon: SmartphoneIcon,
    },
    {
      id: '03',
      title: 'Mobile Money',
      description: 'Convenient local payment options.',
      icon: ShieldCheckIcon,
    },
    {
      id: '04',
      title: 'Real-Time Tracking',
      description: 'Follow preparation through delivery.',
      icon: MapPinIcon,
    },
    {
      id: '05',
      title: 'Fast Local Delivery',
      description: 'Delivered to your doorstep.',
      icon: BikeIcon,
    },
  ];

  return (
    <section className="w-full bg-[#F3FAE6] py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="flex gap-4">
              <div className="flex gap-2 shrink-0">
                <span className="text-[#E96424] text-xs font-bold leading-none pt-1">
                  {feature.id}
                </span>
                <feature.icon className="w-6 h-6 text-[#75B737]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[15px] font-bold text-[#323232] mb-1 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-[#666666] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
