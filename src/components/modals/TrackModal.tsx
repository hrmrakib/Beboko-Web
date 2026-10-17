'use client';

import React, { useState, useEffect } from 'react';
import { useLazyTrackApplicationQuery } from '@/redux/api/onboardingApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addTrackingHistory, setActiveTrackingId } from '@/redux/slices/onboardingSlice';
import type { ApplicationStatus } from '@/redux/types';

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const AlertCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

interface TrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackingId?: string;
}

export function TrackModal({ isOpen, onClose, initialTrackingId }: TrackModalProps) {
  const dispatch = useAppDispatch();
  const storedTrackingHistory = useAppSelector((state) => state.onboarding.trackingHistory);
  const activeTrackingId = useAppSelector((state) => state.onboarding.activeTrackingId);

  const [trackingIdInput, setTrackingIdInput] = useState(
    initialTrackingId || activeTrackingId || ''
  );

  const [triggerTrack, { data, isFetching, isError, error }] =
    useLazyTrackApplicationQuery();

  useEffect(() => {
    if (isOpen) {
      const idToSearch = initialTrackingId || activeTrackingId || '';
      if (idToSearch) {
        setTrackingIdInput(idToSearch);
        triggerTrack(idToSearch);
        dispatch(addTrackingHistory(idToSearch));
      }
    }
  }, [isOpen, initialTrackingId, activeTrackingId, triggerTrack, dispatch]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = trackingIdInput.trim();
    if (!trimmed) return;
    dispatch(addTrackingHistory(trimmed));
    dispatch(setActiveTrackingId(trimmed));
    triggerTrack(trimmed);
  };

  const handleSelectHistory = (id: string) => {
    setTrackingIdInput(id);
    dispatch(setActiveTrackingId(id));
    triggerTrack(id);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Approved
          </span>
        );
      case 'UNDER_REVIEW':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Under Review
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Rejected
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Pending
          </span>
        );
    }
  };

  const errorMessage =
    (error as any)?.data?.message ||
    (error as any)?.message ||
    'No application found with this tracking ID.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl w-full max-w-[640px] max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 border-b border-[#EAEAEA] flex items-center justify-between shrink-0">
          <div>
            <p className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-1">
              DAR DAR ONBOARDING
            </p>
            <h2 className="text-[24px] font-black text-[#333333] tracking-tight">
              Track Your Application
            </h2>
            <p className="text-[13px] text-[#666666]">
              Enter your tracking reference ID to check real-time application status.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[#EAEAEA] flex items-center justify-center text-[#888888] hover:bg-gray-50 transition-colors shrink-0"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <label className="block text-[14px] font-bold text-[#333333] mb-2">
              Application Tracking ID
            </label>
            <div className="flex gap-3">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={trackingIdInput}
                  onChange={(e) => setTrackingIdInput(e.target.value)}
                  placeholder="e.g. 481920 or 931205"
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] font-medium text-black placeholder-[#B3B3B3] transition-colors uppercase"
                  required
                />
                <SearchIcon className="w-5 h-5 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                disabled={isFetching || !trackingIdInput.trim()}
                className="px-6 py-3 rounded-xl bg-[#E96424] hover:bg-[#d6571b] disabled:opacity-50 text-white font-bold text-[14px] transition-colors flex items-center justify-center shrink-0 shadow-md shadow-[#E96424]/20"
              >
                {isFetching ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  'Track'
                )}
              </button>
            </div>
          </form>

          {/* Quick history chips */}
          {storedTrackingHistory.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-semibold text-[#888888]">Recent:</span>
              {storedTrackingHistory.slice(0, 4).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelectHistory(id)}
                  className={`text-[12px] font-bold px-3 py-1 rounded-lg border transition-colors ${
                    trackingIdInput === id
                      ? 'border-[#E96424] bg-[#FEF0EA] text-[#E96424]'
                      : 'border-[#EAEAEA] bg-[#F9F9F9] text-[#666666] hover:border-[#CCCCCC]'
                  }`}
                >
                  #{id}
                </button>
              ))}
            </div>
          )}

          {/* Loading State */}
          {isFetching && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 border-3 border-[#E96424] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[15px] font-semibold text-[#333333]">
                Fetching application status...
              </p>
              <p className="text-[13px] text-[#888888]">
                Querying Dar Dar Onboarding records
              </p>
            </div>
          )}

          {/* Error State */}
          {!isFetching && isError && (
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                <AlertCircleIcon className="w-6 h-6" />
              </div>
              <h4 className="text-[16px] font-bold text-red-900 mb-1">
                Application Not Found
              </h4>
              <p className="text-[14px] text-red-700 max-w-md mx-auto">{errorMessage}</p>
            </div>
          )}

          {/* Result Card */}
          {!isFetching && data?.data && (
            <div className="bg-[#FAF9F7] border border-[#EAEAEA] rounded-2xl p-6 sm:p-7 space-y-6">
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEAEA] gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold tracking-wider text-[#888888] uppercase">
                      Reference #{data.data.tracking_id}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E96424]/10 text-[#E96424]">
                      {data.data.role === 'VENDOR' ? 'Vendor Partner' : 'Delivery Partner'}
                    </span>
                  </div>
                  <h3 className="text-[20px] font-black text-[#333333]">
                    {data.data.business_name || data.data.applicant_name}
                  </h3>
                  {data.data.business_name && (
                    <p className="text-[13px] text-[#666666]">
                      Contact: {data.data.applicant_name}
                    </p>
                  )}
                </div>
                <div>{getStatusBadge(data.data.status)}</div>
              </div>

              {/* Status Timeline Stepper */}
              <div>
                <p className="text-[12px] font-bold text-[#888888] uppercase tracking-wider mb-4">
                  Application Progress
                </p>
                <div className="grid grid-cols-3 gap-2 text-center relative">
                  {/* Step 1: Submitted */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#E96424] text-white flex items-center justify-center font-bold text-xs mb-2 shadow-sm">
                      <CheckCircleIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[12px] font-bold text-[#333333]">
                      Submitted
                    </span>
                    <span className="text-[10px] text-[#888888]">
                      {formatDate(data.data.submitted_at)}
                    </span>
                  </div>

                  {/* Step 2: Under Review */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 shadow-sm ${
                        data.data.status !== 'PENDING'
                          ? 'bg-[#3B82F6] text-white'
                          : 'bg-[#EAEAEA] text-[#888888]'
                      }`}
                    >
                      <ClockIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[12px] font-bold text-[#333333]">
                      Review
                    </span>
                    <span className="text-[10px] text-[#888888]">
                      {data.data.status !== 'PENDING' ? 'In Progress' : 'Pending'}
                    </span>
                  </div>

                  {/* Step 3: Decision */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 shadow-sm ${
                        data.data.status === 'APPROVED'
                          ? 'bg-[#10B981] text-white'
                          : data.data.status === 'REJECTED'
                          ? 'bg-[#EF4444] text-white'
                          : 'bg-[#EAEAEA] text-[#888888]'
                      }`}
                    >
                      {data.data.status === 'APPROVED' ? (
                        <CheckCircleIcon className="w-4 h-4" />
                      ) : data.data.status === 'REJECTED' ? (
                        <CloseIcon className="w-4 h-4" />
                      ) : (
                        '3'
                      )}
                    </div>
                    <span className="text-[12px] font-bold text-[#333333]">
                      {data.data.status === 'APPROVED'
                        ? 'Approved'
                        : data.data.status === 'REJECTED'
                        ? 'Rejected'
                        : 'Decision'}
                    </span>
                    <span className="text-[10px] text-[#888888]">
                      {data.data.status === 'APPROVED' || data.data.status === 'REJECTED'
                        ? formatDate(data.data.last_updated_at)
                        : 'Awaiting'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Admin Note / Status Message */}
              {data.data.admin_note && (
                <div className="p-4 rounded-xl bg-white border border-[#EAEAEA]">
                  <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-1">
                    Official Note from Onboarding Team
                  </p>
                  <p className="text-[14px] text-[#333333] leading-relaxed">
                    “{data.data.admin_note}”
                  </p>
                </div>
              )}

              {/* Summary Details */}
              <div className="grid grid-cols-2 gap-4 text-xs pt-3 border-t border-[#EAEAEA]">
                <div>
                  <span className="text-[#888888] block">Date Submitted</span>
                  <span className="font-semibold text-[#333333]">
                    {formatDate(data.data.submitted_at)}
                  </span>
                </div>
                <div>
                  <span className="text-[#888888] block">Last Update</span>
                  <span className="font-semibold text-[#333333]">
                    {formatDate(data.data.last_updated_at)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {!data && !isFetching && !isError && (
            <div className="text-center py-8 text-[#888888]">
              <p className="text-[14px]">
                Please enter your 6-digit tracking reference code provided upon application submission.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
