'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingId?: string;
  onTrack?: (trackingId: string) => void;
}

export function SuccessModal({ isOpen, onClose, trackingId, onTrack }: SuccessModalProps) {
  const lastSubmission = useAppSelector((state) => state.onboarding.lastSubmission);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const displayTrackingId = trackingId || lastSubmission?.tracking_id || 'PENDING';
  const roleName = lastSubmission?.role === 'VENDOR' ? 'Vendor' : 'Delivery Partner';

  const handleCopy = () => {
    if (displayTrackingId && displayTrackingId !== 'PENDING') {
      navigator.clipboard.writeText(displayTrackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl w-full max-w-[480px] p-8 md:p-10 shadow-2xl flex flex-col items-center text-center">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#EAEAEA] flex items-center justify-center text-[#888888] hover:bg-gray-50 transition-colors"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 rounded-full bg-[#F1F8EB] text-[#75B737] flex items-center justify-center mb-6">
          <CheckIcon className="w-10 h-10" />
        </div>

        <p className="text-[11px] font-bold text-[#75B737] tracking-[0.2em] uppercase mb-3">
          APPLICATION RECEIVED
        </p>
        <h2 className="text-[28px] font-black text-[#333333] mb-3 tracking-tight">
          Application Submitted!
        </h2>
        <p className="text-[15px] text-[#666666] leading-relaxed mb-6">
          Thank you for applying to partner with Dar Dar as a{' '}
          <span className="font-bold text-[#333333]">{roleName}</span>. We've received your
          application and our onboarding team will contact you shortly.
        </p>

        {/* Tracking ID Box */}
        <div className="w-full bg-[#F9F9F9] border border-[#EAEAEA] rounded-2xl p-5 mb-6 text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12px] font-semibold text-[#888888] uppercase tracking-wider">
              Your Tracking Reference ID
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#75B737]/15 text-[#75B737]">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 bg-white border border-[#EAEAEA] rounded-xl px-4 py-3 mt-2">
            <span className="text-[22px] font-black text-[#E96424] tracking-wider font-mono">
              {displayTrackingId}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EAEAEA] text-[12px] font-bold text-[#666666] hover:bg-gray-50 transition-colors"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[11px] text-[#888888] mt-2">
            Save this reference ID to track your application status anytime.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          {onTrack && (
            <button
              onClick={() => onTrack(displayTrackingId)}
              className="w-full py-4 rounded-xl bg-[#E96424] hover:bg-[#d6571b] text-white font-bold text-[16px] transition-colors shadow-[0_8px_25px_rgb(233,100,36,0.25)] flex items-center justify-center gap-2"
            >
              Track Application Status
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-[#EAEAEA] text-[#666666] hover:text-[#333333] hover:bg-gray-50 font-bold text-[15px] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
