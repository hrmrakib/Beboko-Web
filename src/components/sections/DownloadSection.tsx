import React from 'react';
import { Container } from '../layout/Container';

export function DownloadSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <Container>
        <div className="bg-stone-50 rounded-[3rem] p-8 md:p-16 relative overflow-hidden border border-stone-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full blur-[100px] opacity-50 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime-200 rounded-full blur-[100px] opacity-50 -z-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-stone-900 leading-tight">
                Scan To Download <br />
                <span className="text-orange-500">With One Click</span>
              </h2>
              <p className="text-stone-600 text-lg mb-8 max-w-md">
                Get the app now to enjoy exclusive discounts, faster ordering, and real-time tracking right from your mobile device.
              </p>
              
              <div className="flex gap-4">
                <div className="bg-white p-2 rounded-xl shadow-md border border-stone-100 flex items-center gap-4">
                   <div className="w-24 h-24 bg-stone-100 rounded-lg flex items-center justify-center p-2">
                     {/* Mock QR Code */}
                     <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik00IDRoOHY4SDR6TTE0IDE0aDh2OEgxNHoiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')] bg-repeat opacity-50 border-4 border-stone-900 p-1"></div>
                   </div>
                   <div className="pr-4">
                     <p className="text-sm font-bold text-stone-900 mb-1">iOS / Android</p>
                     <p className="text-xs text-stone-500">Scan QR Code</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Image mockups */}
            <div className="relative flex justify-center">
               <div className="relative w-48 h-96 bg-stone-800 rounded-[2.5rem] shadow-2xl border-4 border-stone-300 transform -rotate-12 translate-x-10 translate-y-10 z-10 overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-4 bg-stone-300 rounded-b-xl mx-auto w-24"></div>
                  <div className="w-full h-full bg-white mt-6 p-4">
                     <div className="h-8 bg-stone-100 rounded mb-4"></div>
                     <div className="h-32 bg-orange-100 rounded-xl mb-4"></div>
                     <div className="h-4 bg-stone-100 rounded mb-2 w-3/4"></div>
                  </div>
               </div>
               
               <div className="relative w-48 h-96 bg-stone-800 rounded-[2.5rem] shadow-2xl border-4 border-stone-300 transform rotate-12 -translate-x-10 -translate-y-4 overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-4 bg-stone-300 rounded-b-xl mx-auto w-24"></div>
                  <div className="w-full h-full bg-white mt-6 p-4">
                     <div className="h-16 bg-stone-100 rounded-xl mb-4"></div>
                     <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="h-16 bg-lime-100 rounded-lg"></div>
                        <div className="h-16 bg-orange-100 rounded-lg"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
