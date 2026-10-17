'use client';

import React, { useState } from 'react';
import {
  useGetAllApplicationsQuery,
  useGetApplicationDetailQuery,
  useUpdateApplicationStatusMutation,
} from '@/redux/api/onboardingApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setAdminToken, clearAdminToken } from '@/redux/slices/onboardingSlice';
import type { ApplicationStatus, ApplicationRole } from '@/redux/types';

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminPortalModal({ isOpen, onClose }: AdminPortalModalProps) {
  const dispatch = useAppDispatch();
  const adminToken = useAppSelector((state) => state.onboarding.adminToken);

  const [tokenInput, setTokenInput] = useState('');
  const [selectedTrackingId, setSelectedTrackingId] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Status update form state
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('APPROVED');
  const [adminNote, setAdminNote] = useState('');
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState<string | null>(null);
  const [updateErrMsg, setUpdateErrMsg] = useState<string | null>(null);

  // RTK Queries
  const {
    data: applicationsData,
    isLoading: isLoadingList,
    isFetching: isFetchingList,
    refetch,
  } = useGetAllApplicationsQuery(
    {
      status: (statusFilter as ApplicationStatus) || undefined,
      type: (typeFilter as 'vendor' | 'delivery_partner') || undefined,
      search: searchQuery.trim() || undefined,
    },
    { skip: !adminToken || !isOpen }
  );

  const {
    data: detailData,
    isLoading: isLoadingDetail,
  } = useGetApplicationDetailQuery(selectedTrackingId || '', {
    skip: !adminToken || !selectedTrackingId || !isOpen,
  });

  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateApplicationStatusMutation();

  if (!isOpen) return null;

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      dispatch(setAdminToken(tokenInput.trim()));
    }
  };

  const handleLogout = () => {
    dispatch(clearAdminToken());
    setTokenInput('');
    setSelectedTrackingId(null);
  };

  const handleUpdateStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrackingId) return;
    setUpdateSuccessMsg(null);
    setUpdateErrMsg(null);

    try {
      const res = await updateStatus({
        tracking_id: selectedTrackingId,
        status: newStatus,
        admin_note: adminNote.trim() || undefined,
      }).unwrap();

      setUpdateSuccessMsg(
        res.message || `Application updated to ${res.data.status} successfully.`
      );
      setTimeout(() => setUpdateSuccessMsg(null), 3500);
    } catch (err: any) {
      setUpdateErrMsg(
        err?.data?.message || err?.message || 'Failed to update application status.'
      );
    }
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">Approved</span>;
      case 'UNDER_REVIEW':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Under Review</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">Rejected</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Pending</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl w-full max-w-[1100px] max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="px-8 py-5 border-b border-[#EAEAEA] flex items-center justify-between shrink-0 bg-[#1A1A1A] text-white">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#E96424] animate-ping"></span>
            <div>
              <h2 className="text-xl font-bold">Dar Dar Onboarding Admin Portal</h2>
              <p className="text-xs text-[#AAAAAA]">
                Manage vendor & delivery partner applications, review credentials, update status.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {adminToken && (
              <button
                onClick={handleLogout}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#EAEAEA] transition-colors"
              >
                Log Out
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Auth Screen if no token */}
        {!adminToken ? (
          <div className="p-10 flex flex-col items-center justify-center max-w-md mx-auto my-auto text-center">
            <div className="w-16 h-16 rounded-full bg-[#FEF0EA] text-[#E96424] flex items-center justify-center mb-5 font-black text-2xl">
              🛡️
            </div>
            <h3 className="text-2xl font-bold text-[#333333] mb-2">Admin Authentication</h3>
            <p className="text-sm text-[#666666] mb-6">
              Enter your Bearer admin access token to access and manage onboarding submissions.
            </p>
            <form onSubmit={handleSaveToken} className="w-full space-y-4">
              <input
                type="password"
                placeholder="Bearer <ADMIN_ACCESS_TOKEN>"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:border-[#E96424] focus:outline-none text-sm text-black placeholder-[#B3B3B3]"
                required
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#E96424] hover:bg-[#d6571b] text-white font-bold text-sm transition-colors shadow-md shadow-[#E96424]/20"
              >
                Connect as Admin
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            {/* Left Column: Applications List & Filters */}
            <div className="w-full md:w-[50%] lg:w-[45%] border-r border-[#EAEAEA] flex flex-col overflow-hidden">
              {/* Filter Bar */}
              <div className="p-4 border-b border-[#EAEAEA] bg-[#FBFBFB] space-y-3 shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search by name, email, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow px-3 py-2 text-xs rounded-lg border border-[#EAEAEA] bg-white focus:outline-none focus:border-[#E96424] text-black placeholder-stone-400"
                  />
                  <button
                    onClick={() => refetch()}
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg"
                  >
                    Refresh
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-[#EAEAEA] bg-white focus:outline-none text-black"
                  >
                    <option value="">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-[#EAEAEA] bg-white focus:outline-none text-black"
                  >
                    <option value="">All Roles</option>
                    <option value="vendor">Vendor</option>
                    <option value="delivery_partner">Delivery Partner</option>
                  </select>
                </div>
              </div>

              {/* Applications List */}
              <div className="flex-grow overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
                {isLoadingList || isFetchingList ? (
                  <div className="py-12 text-center text-stone-400">
                    <span className="inline-block w-6 h-6 border-2 border-[#E96424] border-t-transparent rounded-full animate-spin mb-2"></span>
                    <p className="text-xs">Loading applications...</p>
                  </div>
                ) : !applicationsData?.data?.length ? (
                  <div className="py-12 text-center text-stone-400">
                    <p className="text-sm font-semibold">No applications found</p>
                    <p className="text-xs mt-1">Try modifying your search or filter</p>
                  </div>
                ) : (
                  applicationsData.data.map((app) => {
                    const isSelected = selectedTrackingId === app.tracking_id;
                    return (
                      <div
                        key={app.tracking_id}
                        onClick={() => setSelectedTrackingId(app.tracking_id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#E96424] bg-[#FEF0EA]/30 shadow-sm'
                            : 'border-[#EAEAEA] bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-mono font-bold text-[#E96424]">
                            #{app.tracking_id}
                          </span>
                          {getStatusBadge(app.status)}
                        </div>
                        <h4 className="font-bold text-sm text-stone-900 truncate">
                          {app.business_name || app.applicant_name}
                        </h4>
                        {app.business_name && (
                          <p className="text-xs text-stone-600 truncate">
                            Contact: {app.applicant_name}
                          </p>
                        )}
                        <p className="text-xs text-stone-400 truncate mt-1">
                          {app.phone} • {app.email}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-stone-400 mt-2 pt-2 border-t border-stone-100">
                          <span className="font-semibold text-stone-600">
                            {app.role === 'VENDOR' ? '🏢 Vendor' : '🛵 Delivery'}
                          </span>
                          <span>{app.location || 'Kinshasa'}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Selected Application Detail & Status Update */}
            <div className="w-full md:w-[50%] lg:w-[55%] flex flex-col overflow-y-auto p-6 custom-scrollbar bg-[#FCFCFC]">
              {!selectedTrackingId ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 py-16">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-2xl mb-3">
                    📋
                  </div>
                  <h4 className="font-bold text-stone-700 text-sm">No Application Selected</h4>
                  <p className="text-xs max-w-xs mt-1">
                    Select an application from the left panel to inspect full submission data and update its review status.
                  </p>
                </div>
              ) : isLoadingDetail ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <span className="w-8 h-8 border-3 border-[#E96424] border-t-transparent rounded-full animate-spin mb-3"></span>
                  <p className="text-xs text-stone-500">Loading application detail...</p>
                </div>
              ) : detailData?.data ? (
                <div className="space-y-6">
                  {/* Top info card */}
                  <div className="p-5 rounded-2xl bg-white border border-[#EAEAEA] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-stone-500 uppercase">
                        Application #{selectedTrackingId}
                      </span>
                      {getStatusBadge(detailData.data.status)}
                    </div>
                    <h3 className="text-xl font-black text-stone-900 mb-1">
                      {'business_name' in detailData.data && detailData.data.business_name
                        ? detailData.data.business_name
                        : 'full_name' in detailData.data
                        ? detailData.data.full_name
                        : ''}
                    </h3>
                    <p className="text-xs font-semibold text-[#E96424] mb-4">
                      {detailData.role === 'VENDOR' ? '🏢 Vendor Onboarding' : '🛵 Delivery Partner Onboarding'}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-xs border-t border-stone-100 pt-3">
                      <div>
                        <span className="text-stone-400 block">Phone</span>
                        <span className="font-semibold text-stone-800">{detailData.data.phone}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">Email</span>
                        <span className="font-semibold text-stone-800">{detailData.data.email}</span>
                      </div>
                      {'contact_person' in detailData.data && (
                        <div>
                          <span className="text-stone-400 block">Contact Person</span>
                          <span className="font-semibold text-stone-800">{detailData.data.contact_person}</span>
                        </div>
                      )}
                      {'business_type' in detailData.data && (
                        <div>
                          <span className="text-stone-400 block">Business Type</span>
                          <span className="font-semibold text-stone-800">{detailData.data.business_type}</span>
                        </div>
                      )}
                      {'vehicle_type' in detailData.data && (
                        <div>
                          <span className="text-stone-400 block">Vehicle</span>
                          <span className="font-semibold text-stone-800">{detailData.data.vehicle_type}</span>
                        </div>
                      )}
                      {'nid_number' in detailData.data && (
                        <div>
                          <span className="text-stone-400 block">NID Number</span>
                          <span className="font-semibold text-stone-800">{detailData.data.nid_number}</span>
                        </div>
                      )}
                    </div>

                    {/* Files / Attachments preview */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-2">
                      {'business_logo' in detailData.data && detailData.data.business_logo && (
                        <a
                          href={detailData.data.business_logo}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
                        >
                          🖼️ Business Logo
                        </a>
                      )}
                      {'trade_license' in detailData.data && detailData.data.trade_license && (
                        <a
                          href={detailData.data.trade_license}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
                        >
                          📄 Trade License
                        </a>
                      )}
                      {'profile_pic' in detailData.data && detailData.data.profile_pic && (
                        <a
                          href={detailData.data.profile_pic}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
                        >
                          👤 Profile Photo
                        </a>
                      )}
                      {'nid_or_license_pic' in detailData.data && detailData.data.nid_or_license_pic && (
                        <a
                          href={detailData.data.nid_or_license_pic}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
                        >
                          🪪 NID/License Doc
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Status update form */}
                  <div className="p-5 rounded-2xl bg-white border border-[#EAEAEA] shadow-sm">
                    <h4 className="font-bold text-sm text-stone-900 mb-1">
                      Update Application Status & Note
                    </h4>
                    <p className="text-xs text-stone-500 mb-4">
                      Updating status will immediately propagate across the tracking query cache.
                    </p>

                    {updateSuccessMsg && (
                      <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                        ✓ {updateSuccessMsg}
                      </div>
                    )}
                    {updateErrMsg && (
                      <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                        ✕ {updateErrMsg}
                      </div>
                    )}

                    <form onSubmit={handleUpdateStatusSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5">
                          Status
                        </label>
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                          className="w-full px-3 py-2.5 rounded-xl border border-[#EAEAEA] bg-white text-xs font-bold text-black focus:outline-none focus:border-[#E96424]"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5">
                          Admin Note / Feedback for Applicant
                        </label>
                        <textarea
                          rows={3}
                          value={adminNote}
                          onChange={(e) => setAdminNote(e.target.value)}
                          placeholder="e.g. All documents verified, merchant onboarded."
                          className="w-full px-3 py-2 rounded-xl border border-[#EAEAEA] text-xs text-black placeholder-stone-400 focus:outline-none focus:border-[#E96424] resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isUpdatingStatus}
                        className="w-full py-3 rounded-xl bg-[#E96424] hover:bg-[#d6571b] disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        {isUpdatingStatus ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Saving...
                          </>
                        ) : (
                          'Save Status & Notify'
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
