'use client';
import React from 'react';

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);

export function SuccessModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl w-full max-w-[480px] p-8 md:p-10 shadow-2xl flex flex-col items-center text-center">
        <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#EAEAEA] flex items-center justify-center text-[#888888] hover:bg-gray-50 transition-colors">
          <CloseIcon className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 rounded-full bg-[#F1F8EB] text-[#75B737] flex items-center justify-center mb-6">
          <CheckIcon className="w-10 h-10" />
        </div>

        <p className="text-[11px] font-bold text-[#75B737] tracking-[0.2em] uppercase mb-3">APPLICATION RECEIVED</p>
        <h2 className="text-[28px] font-black text-[#333333] mb-4 tracking-tight">Application Submitted!</h2>
        <p className="text-[15px] text-[#666666] leading-relaxed mb-8">
          Thank you for your interest in partnering with Dar Dar. We've received your application and our team will contact you shortly.
        </p>

        <div className="w-full bg-[#F9F9F9] border border-[#EAEAEA] rounded-2xl p-6 mb-8">
          <p className="text-[13px] text-[#888888] mb-1">Application Reference</p>
          <p className="text-[20px] font-black text-[#333333] mb-2 tracking-wide">DD-XXXXXX</p>
          <p className="text-[12px] text-[#888888]">Reference will be populated after backend confirmation.</p>
        </div>

        <button onClick={onClose} className="w-full py-4 rounded-xl bg-[#E96424] hover:bg-[#d6571b] text-white font-bold text-[16px] transition-colors shadow-[0_8px_25px_rgb(233,100,36,0.25)] mb-4">
          Done
        </button>
        <button onClick={onClose} className="text-[14px] font-bold text-[#666666] hover:text-[#333333] transition-colors">
          Back to Dar Dar
        </button>
      </div>
    </div>
  );
}
