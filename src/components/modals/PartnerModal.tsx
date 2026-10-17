'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  useSubmitVendorApplicationMutation,
  useSubmitDeliveryPartnerApplicationMutation,
} from '@/redux/api/onboardingApi';
import { useAppDispatch } from '@/redux/hooks';
import { setLastSubmission } from '@/redux/slices/onboardingSlice';
import type { AvailabilityType } from '@/redux/types';

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const StoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
const BikeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="5.5" cy="17.5" r="3.5"></circle><circle cx="18.5" cy="17.5" r="3.5"></circle><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"></path></svg>
);
const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
);
const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);
const ForkKnifeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
);
const CarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a3 3 0 1 1-6 0m6 0a3 3 0 1 0-6 0M8 16a3 3 0 1 1-6 0m6 0a3 3 0 1 0-6 0"></path></svg>
);
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'vendor' | 'delivery';
  onSuccess: (trackingId: string, role: 'VENDOR' | 'DELIVERY_PARTNER') => void;
}

interface FileUploadProps {
  label: string;
  hint: string;
  required?: boolean;
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
}

const FileUpload = ({ label, hint, required = false, file, onFileChange, accept }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="mb-5">
      <label className="block text-[14px] font-bold text-[#333333] mb-2">
        {label} {required && <span className="text-[#E96424]">*</span>}
      </label>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      <div
        onClick={handleClick}
        className={`w-full p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
          file
            ? 'border-[#75B737] bg-[#F1F8EB]/40'
            : 'border-[#EAEAEA] bg-[#F9F9F9] hover:bg-[#F2F2F2]'
        }`}
      >
        <div className="flex items-center gap-4 overflow-hidden">
          <div
            className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 shadow-sm ${
              file
                ? 'bg-[#75B737] border-[#75B737] text-white'
                : 'bg-white border-[#EAEAEA] text-[#E96424]'
            }`}
          >
            {file ? <CheckIcon className="w-5 h-5" /> : <UploadIcon className="w-4 h-4" />}
          </div>
          <div className="overflow-hidden">
            <h5 className="text-[14px] font-bold text-[#333333] truncate">
              {file ? file.name : 'Choose File'}
            </h5>
            <p className="text-[12px] text-[#888888]">
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : hint}
            </p>
          </div>
        </div>
        {file && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFileChange(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
            className="text-xs font-bold text-red-500 hover:text-red-700 px-2 py-1 ml-2"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export function PartnerModal({ isOpen, onClose, initialTab = 'vendor', onSuccess }: PartnerModalProps) {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<'vendor' | 'delivery'>(initialTab);
  const [apiError, setApiError] = useState<string | null>(null);

  // RTK Query Mutations
  const [submitVendor, { isLoading: isSubmittingVendor }] =
    useSubmitVendorApplicationMutation();
  const [submitDeliveryPartner, { isLoading: isSubmittingDelivery }] =
    useSubmitDeliveryPartnerApplicationMutation();

  const isSubmitting = isSubmittingVendor || isSubmittingDelivery;

  // Vendor Form State
  const [vendorForm, setVendorForm] = useState({
    business_name: '',
    business_type: '',
    number_of_branches: '',
    contact_person: '',
    phone: '',
    email: '',
    business_address: '',
    city: 'Kinshasa',
    business_description: '',
    business_logo: null as File | null,
    trade_license: null as File | null,
    agree_terms: false,
  });

  // Delivery Partner Form State
  const [deliveryForm, setDeliveryForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    current_location: '',
    vehicle_type: '',
    vehicle_registration_number: '',
    nid_number: '',
    driving_license_number: '',
    preferred_working_area: '',
    availability: 'FULL_TIME' as AvailabilityType,
    profile_pic: null as File | null,
    nid_or_license_pic: null as File | null,
    agree_terms: false,
  });

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setApiError(null);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!vendorForm.agree_terms) {
      setApiError('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    try {
      const response = await submitVendor({
        business_name: vendorForm.business_name,
        business_type: vendorForm.business_type,
        number_of_branches: vendorForm.number_of_branches,
        contact_person: vendorForm.contact_person,
        phone: vendorForm.phone,
        email: vendorForm.email,
        business_address: vendorForm.business_address,
        city: vendorForm.city,
        business_description: vendorForm.business_description,
        business_logo: vendorForm.business_logo,
        trade_license: vendorForm.trade_license,
        agree_terms: vendorForm.agree_terms,
      }).unwrap();

      if (response?.data?.tracking_id) {
        dispatch(
          setLastSubmission({
            tracking_id: response.data.tracking_id,
            role: 'VENDOR',
            name: response.data.business_name || response.data.contact_person,
            phone: response.data.phone,
            email: response.data.email,
            status: response.data.status,
            submitted_at: response.data.submitted_at,
          })
        );
        onSuccess(response.data.tracking_id, 'VENDOR');
      }
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.message ||
        'Failed to submit vendor application. Please check your network and input.';
      setApiError(msg);
    }
  };

  const handleDeliverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!deliveryForm.agree_terms) {
      setApiError('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    try {
      const response = await submitDeliveryPartner({
        full_name: deliveryForm.full_name,
        phone: deliveryForm.phone,
        email: deliveryForm.email,
        current_location: deliveryForm.current_location,
        vehicle_type: deliveryForm.vehicle_type,
        vehicle_registration_number: deliveryForm.vehicle_registration_number,
        nid_number: deliveryForm.nid_number,
        driving_license_number: deliveryForm.driving_license_number,
        preferred_working_area: deliveryForm.preferred_working_area,
        availability: deliveryForm.availability,
        profile_pic: deliveryForm.profile_pic,
        nid_or_license_pic: deliveryForm.nid_or_license_pic,
        agree_terms: deliveryForm.agree_terms,
      }).unwrap();

      if (response?.data?.tracking_id) {
        dispatch(
          setLastSubmission({
            tracking_id: response.data.tracking_id,
            role: 'DELIVERY_PARTNER',
            name: response.data.full_name,
            phone: response.data.phone,
            email: response.data.email,
            status: response.data.status,
            submitted_at: response.data.submitted_at,
          })
        );
        onSuccess(response.data.tracking_id, 'DELIVERY_PARTNER');
      }
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.message ||
        'Failed to submit delivery application. Please check your network and input.';
      setApiError(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl w-full max-w-[700px] max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header (Sticky) */}
        <div className="px-8 pt-8 pb-6 border-b border-[#EAEAEA] shrink-0">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[11px] font-bold text-[#E96424] tracking-[0.2em] uppercase mb-2">JOIN DAR DAR</p>
              <h2 className="text-[28px] font-black text-[#333333] mb-1 tracking-tight">Become a Dar Dar Partner</h2>
              <p className="text-[14px] text-[#666666]">Choose how you'd like to partner with Dar Dar.</p>
            </div>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="w-10 h-10 rounded-full border border-[#EAEAEA] flex items-center justify-center text-[#888888] hover:bg-gray-50 transition-colors shrink-0 disabled:opacity-50"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-[#E96424] text-[#E96424] flex items-center justify-center text-[12px] font-bold">01</div>
              <span className="text-[13px] font-bold text-[#E96424]">Partner Type</span>
            </div>
            <div className="flex-grow h-[1px] bg-[#FEF0EA]"></div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#E96424] text-white flex items-center justify-center text-[12px] font-bold">02</div>
              <span className="text-[13px] font-bold text-[#E96424]">Your Details</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
          {/* Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => {
                setTab('vendor');
                setApiError(null);
              }}
              className={`p-5 rounded-2xl border-2 text-left transition-colors ${tab === 'vendor' ? 'border-[#E96424] bg-[#FEF0EA]/20' : 'border-[#EAEAEA] hover:border-[#CCCCCC]'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${tab === 'vendor' ? 'bg-[#FEF0EA] text-[#E96424]' : 'bg-[#F5F5F5] text-[#888888]'}`}>
                <StoreIcon className="w-5 h-5" />
              </div>
              <h4 className="text-[15px] font-bold text-[#333333] mb-1">Become a Vendor</h4>
              <p className="text-[13px] text-[#888888] leading-relaxed">Sell your food, groceries and products to more customers.</p>
            </button>

            <button
              type="button"
              onClick={() => {
                setTab('delivery');
                setApiError(null);
              }}
              className={`p-5 rounded-2xl border-2 text-left transition-colors ${tab === 'delivery' ? 'border-[#E96424] bg-[#FEF0EA]/20' : 'border-[#EAEAEA] hover:border-[#CCCCCC]'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${tab === 'delivery' ? 'bg-[#FEF0EA] text-[#E96424]' : 'bg-[#F5F5F5] text-[#888888]'}`}>
                <BikeIcon className="w-5 h-5" />
              </div>
              <h4 className="text-[15px] font-bold text-[#333333] mb-1">Become a Delivery Partner</h4>
              <p className="text-[13px] text-[#888888] leading-relaxed">Deliver orders with Dar Dar and earn on every delivery.</p>
            </button>
          </div>

          {/* Error Banner */}
          {apiError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[14px]">
              <span className="font-bold">Error: </span>
              {apiError}
            </div>
          )}

          {/* VENDOR FORM */}
          {tab === 'vendor' && (
            <form onSubmit={handleVendorSubmit}>
              <div className="mb-8">
                <h3 className="text-[22px] font-black text-[#333333] mb-2">Tell Us About Your Business</h3>
                <p className="text-[14px] text-[#666666]">Share a few details so our partnership team can help you get started.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <div className="mb-5 md:col-span-2">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Business Name <span className="text-[#E96424]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={vendorForm.business_name}
                    onChange={(e) => setVendorForm({ ...vendorForm, business_name: e.target.value })}
                    placeholder="e.g. Kabab Hut"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Business Type <span className="text-[#E96424]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={vendorForm.business_type}
                      onChange={(e) => setVendorForm({ ...vendorForm, business_type: e.target.value })}
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black appearance-none bg-white"
                    >
                      <option value="" disabled hidden>Select an option</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Supermarket">Supermarket</option>
                      <option value="Pharmacy">Pharmacy</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Other">Other</option>
                    </select>
                    <ForkKnifeIcon className="w-4 h-4 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
                    <ChevronDownIcon className="w-4 h-4 text-[#888888] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Number of Branches
                  </label>
                  <input
                    type="text"
                    value={vendorForm.number_of_branches}
                    onChange={(e) => setVendorForm({ ...vendorForm, number_of_branches: e.target.value })}
                    placeholder="e.g. 2"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Contact Person / Owner <span className="text-[#E96424]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={vendorForm.contact_person}
                    onChange={(e) => setVendorForm({ ...vendorForm, contact_person: e.target.value })}
                    placeholder="e.g. Mohammad Ali"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Phone Number <span className="text-[#E96424]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={vendorForm.phone}
                    onChange={(e) => setVendorForm({ ...vendorForm, phone: e.target.value })}
                    placeholder="+243812345678"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5 md:col-span-2">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Email Address <span className="text-[#E96424]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={vendorForm.email}
                    onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })}
                    placeholder="ali@kababhut.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5 md:col-span-2">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Business Address <span className="text-[#E96424]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={vendorForm.business_address}
                    onChange={(e) => setVendorForm({ ...vendorForm, business_address: e.target.value })}
                    placeholder="123 Boulevard du 30 Juin"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5 md:col-span-2">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    City / Area <span className="text-[#E96424]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={vendorForm.city}
                    onChange={(e) => setVendorForm({ ...vendorForm, city: e.target.value })}
                    placeholder="Kinshasa"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5 md:col-span-2">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Business Description (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={vendorForm.business_description}
                    onChange={(e) => setVendorForm({ ...vendorForm, business_description: e.target.value })}
                    placeholder="Tell us briefly about your business, specialties or offerings..."
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] resize-none"
                  ></textarea>
                </div>

                <FileUpload
                  label="Upload Business Logo"
                  hint="JPG or PNG, up to 5MB"
                  accept="image/png,image/jpeg,image/jpg"
                  file={vendorForm.business_logo}
                  onFileChange={(file) => setVendorForm({ ...vendorForm, business_logo: file })}
                />

                <FileUpload
                  label="Trade License / Business Document"
                  hint="PDF, JPG or PNG, up to 10MB"
                  accept=".pdf,image/png,image/jpeg,image/jpg"
                  file={vendorForm.trade_license}
                  onFileChange={(file) => setVendorForm({ ...vendorForm, trade_license: file })}
                />
              </div>

              <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EAEAEA] mb-8 flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  id="vendor_agree"
                  required
                  checked={vendorForm.agree_terms}
                  onChange={(e) => setVendorForm({ ...vendorForm, agree_terms: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-[#CCCCCC] text-[#E96424] focus:ring-[#E96424]"
                />
                <label htmlFor="vendor_agree" className="text-[13px] text-[#666666] cursor-pointer">
                  I agree to Dar Dar's <a href="#" className="font-bold text-[#333333] hover:text-[#E96424]">Terms & Conditions</a> and <a href="#" className="font-bold text-[#333333] hover:text-[#E96424]">Privacy Policy</a>.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#E96424] hover:bg-[#d6571b] disabled:opacity-60 text-white font-bold text-[16px] flex items-center justify-center gap-2 transition-colors shadow-[0_8px_25px_rgb(233,100,36,0.25)] mb-4"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Now
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-[12px] text-[#888888]">
                Our team will review your application and contact you shortly.
              </p>
            </form>
          )}

          {/* DELIVERY PARTNER FORM */}
          {tab === 'delivery' && (
            <form onSubmit={handleDeliverySubmit}>
              <div className="mb-8">
                <h3 className="text-[22px] font-black text-[#333333] mb-2">Join Our Delivery Network</h3>
                <p className="text-[14px] text-[#666666]">Complete the form below and our team will contact you about becoming a Dar Dar delivery partner.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <div className="mb-5 md:col-span-2">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Full Name <span className="text-[#E96424]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryForm.full_name}
                    onChange={(e) => setDeliveryForm({ ...deliveryForm, full_name: e.target.value })}
                    placeholder="e.g. Jean Pierre"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Phone Number <span className="text-[#E96424]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={deliveryForm.phone}
                    onChange={(e) => setDeliveryForm({ ...deliveryForm, phone: e.target.value })}
                    placeholder="+243998765432"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Email Address <span className="text-[#E96424]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={deliveryForm.email}
                    onChange={(e) => setDeliveryForm({ ...deliveryForm, email: e.target.value })}
                    placeholder="jean@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5 md:col-span-2">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Current Location / Area <span className="text-[#E96424]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryForm.current_location}
                    onChange={(e) => setDeliveryForm({ ...deliveryForm, current_location: e.target.value })}
                    placeholder="e.g. Gombe, Kinshasa"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Vehicle Type <span className="text-[#E96424]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={deliveryForm.vehicle_type}
                      onChange={(e) => setDeliveryForm({ ...deliveryForm, vehicle_type: e.target.value })}
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black appearance-none bg-white"
                    >
                      <option value="" disabled hidden>Select an option</option>
                      <option value="Motorbike">Motorbike</option>
                      <option value="Bicycle">Bicycle</option>
                      <option value="Car">Car</option>
                      <option value="Van">Van</option>
                    </select>
                    <CarIcon className="w-4 h-4 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
                    <ChevronDownIcon className="w-4 h-4 text-[#888888] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Vehicle Registration Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryForm.vehicle_registration_number}
                    onChange={(e) => setDeliveryForm({ ...deliveryForm, vehicle_registration_number: e.target.value })}
                    placeholder="e.g. KIN-8899-AA"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    National ID Number (NID) <span className="text-[#E96424]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryForm.nid_number}
                    onChange={(e) => setDeliveryForm({ ...deliveryForm, nid_number: e.target.value })}
                    placeholder="e.g. NID-99887766"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Driving License Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryForm.driving_license_number}
                    onChange={(e) => setDeliveryForm({ ...deliveryForm, driving_license_number: e.target.value })}
                    placeholder="e.g. DL-123456"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5 md:col-span-2">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Preferred Working Area <span className="text-[#E96424]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryForm.preferred_working_area}
                    onChange={(e) => setDeliveryForm({ ...deliveryForm, preferred_working_area: e.target.value })}
                    placeholder="e.g. Gombe & Lingwala"
                    className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-black placeholder-[#B3B3B3] transition-colors"
                  />
                </div>

                <div className="mb-5 md:col-span-2">
                  <label className="block text-[14px] font-bold text-[#333333] mb-2">
                    Availability <span className="text-[#E96424]">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['FULL_TIME', 'PART_TIME', 'FLEXIBLE'] as AvailabilityType[]).map((mode) => {
                      const labels = {
                        FULL_TIME: 'Full Time',
                        PART_TIME: 'Part Time',
                        FLEXIBLE: 'Flexible',
                      };
                      const isActive = deliveryForm.availability === mode;
                      return (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setDeliveryForm({ ...deliveryForm, availability: mode })}
                          className={`py-3 rounded-xl border text-[13px] font-bold transition-colors ${
                            isActive
                              ? 'border-[#E96424] bg-[#FEF0EA] text-[#E96424]'
                              : 'border-[#EAEAEA] text-[#333333] hover:border-[#E96424]'
                          }`}
                        >
                          {labels[mode]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <FileUpload
                  label="Upload Profile Photo"
                  hint="JPG or PNG, up to 5MB"
                  accept="image/png,image/jpeg,image/jpg"
                  file={deliveryForm.profile_pic}
                  onFileChange={(file) => setDeliveryForm({ ...deliveryForm, profile_pic: file })}
                />

                <FileUpload
                  label="NID or Driving License Photo / PDF"
                  hint="PDF, JPG or PNG, up to 10MB"
                  accept=".pdf,image/png,image/jpeg,image/jpg"
                  file={deliveryForm.nid_or_license_pic}
                  onFileChange={(file) => setDeliveryForm({ ...deliveryForm, nid_or_license_pic: file })}
                />
              </div>

              <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EAEAEA] mb-8 flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  id="delivery_agree"
                  required
                  checked={deliveryForm.agree_terms}
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, agree_terms: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-[#CCCCCC] text-[#E96424] focus:ring-[#E96424]"
                />
                <label htmlFor="delivery_agree" className="text-[13px] text-[#666666] cursor-pointer">
                  I agree to Dar Dar's <a href="#" className="font-bold text-[#333333] hover:text-[#E96424]">Terms & Conditions</a> and <a href="#" className="font-bold text-[#333333] hover:text-[#E96424]">Privacy Policy</a>.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#E96424] hover:bg-[#d6571b] disabled:opacity-60 text-white font-bold text-[16px] flex items-center justify-center gap-2 transition-colors shadow-[0_8px_25px_rgb(233,100,36,0.25)] mb-4"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Apply as Delivery Partner
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-[12px] text-[#888888]">
                Our team will review your application and contact you shortly.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
