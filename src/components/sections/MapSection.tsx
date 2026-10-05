"use client";

import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { MapPinIcon } from '../ui/Icons';
import { Toast, ToastType } from '../ui/Toast';

export function MapSection() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setToast({ message: 'Please enter a valid address', type: 'error' });
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setToast({ message: `Coverage confirmed for ${address}!`, type: 'success' });
      setAddress('');
    }, 1500);
  };

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-stone-900">
              Everywhere You <span className="text-orange-500">Need.</span>
            </h2>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed max-w-lg">
              Our extensive network ensures that you can get deliveries from almost anywhere in the city. Fast, reliable, and always close to you.
            </p>
            
            <ul className="space-y-4 mb-8">
              {['Extensive coverage area', 'Lightning fast delivery times', 'Verified local partners'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-stone-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address..." 
                className="flex-1 px-4 py-3 rounded-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Checking
                  </span>
                ) : 'Check'}
              </Button>
            </form>
          </div>

          {/* Map Mockup */}
          <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200">
            {/* Abstract Map Background */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Pulse rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <div className="w-64 h-64 rounded-full border border-orange-500/30 animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
               <div className="w-48 h-48 rounded-full border border-orange-500/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
               <div className="w-32 h-32 rounded-full border border-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-100/20"></div>
               
               {/* Center Pin */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%] w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-orange-500 z-10">
                 <MapPinIcon className="w-6 h-6" />
               </div>
            </div>

            {/* Other pins */}
            <div className="absolute top-[20%] left-[30%] w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-stone-500 animate-bounce delay-100">
               <MapPinIcon className="w-4 h-4" />
            </div>
            <div className="absolute bottom-[30%] right-[20%] w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-stone-500 animate-bounce delay-300">
               <MapPinIcon className="w-4 h-4" />
            </div>
            <div className="absolute top-[60%] left-[20%] w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-stone-500 animate-bounce delay-500">
               <MapPinIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Container>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </section>
  );
}
