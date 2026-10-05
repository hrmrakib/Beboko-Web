import React from 'react';
import { Container } from '../layout/Container';

export function StatsSection() {
  return (
    <section className="py-16 bg-stone-800 text-white relative">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="flex-1">
            <h2 className="text-6xl md:text-8xl font-black text-lime-500 mb-2">95%</h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">On-Time Delivery</h3>
            <p className="text-stone-400 max-w-md">
              We take pride in our punctuality. The vast majority of our orders arrive exactly when promised or even earlier.
            </p>
          </div>

          <div className="flex-1 w-full bg-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
             <div className="flex flex-col h-full gap-4 relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-stone-900 font-bold text-lg">Delivery Success Rate</span>
                  <span className="text-stone-500 text-sm">Last 30 days</span>
                </div>
                
                <div className="flex items-end gap-2 h-32">
                  {[40, 60, 50, 80, 90, 70, 95].map((height, i) => (
                    <div key={i} className="flex-1 bg-stone-100 rounded-t-lg relative group">
                      <div 
                        className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-1000 ${i === 6 ? 'bg-lime-500' : 'bg-orange-400 group-hover:bg-orange-500'}`}
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between text-xs text-stone-400 font-bold mt-2">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
             </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
