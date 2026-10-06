'use client';
import React, { useState } from 'react';

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

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'vendor' | 'delivery';
  onSuccess: () => void;
}

const InputField = ({ label, required = false, placeholder, type = 'text', className = '' }: any) => (
  <div className={`mb-5 ${className}`}>
    <label className="block text-[14px] font-bold text-[#333333] mb-2">
      {label} {required && <span className="text-[#E96424]">*</span>}
    </label>
    <input 
      type={type} 
      placeholder={placeholder} 
      required={required}
      className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] placeholder-[#B3B3B3] transition-colors"
    />
  </div>
);

const FileUpload = ({ label, hint, required = false }: any) => (
  <div className="mb-5">
    <label className="block text-[14px] font-bold text-[#333333] mb-2">
      {label} {required && <span className="text-[#E96424]">*</span>}
    </label>
    <div className="w-full p-4 rounded-xl border border-[#EAEAEA] bg-[#F9F9F9] flex items-center gap-4 cursor-pointer hover:bg-[#F2F2F2] transition-colors">
      <div className="w-10 h-10 rounded-full bg-white border border-[#EAEAEA] flex items-center justify-center text-[#E96424] shrink-0 shadow-sm">
        <UploadIcon className="w-4 h-4" />
      </div>
      <div>
        <h5 className="text-[14px] font-bold text-[#333333]">Choose File</h5>
        <p className="text-[12px] text-[#888888]">{hint}</p>
      </div>
    </div>
  </div>
);

export function PartnerModal({ isOpen, onClose, initialTab = 'vendor', onSuccess }: PartnerModalProps) {
  const [tab, setTab] = useState<'vendor' | 'delivery'>(initialTab);
  const [availability, setAvailability] = useState('');
  
  React.useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setAvailability('');
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
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
            <button onClick={onClose} className="w-10 h-10 rounded-full border border-[#EAEAEA] flex items-center justify-center text-[#888888] hover:bg-gray-50 transition-colors shrink-0">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <button 
              onClick={() => setTab('vendor')}
              className={`p-5 rounded-2xl border-2 text-left transition-colors ${tab === 'vendor' ? 'border-[#E96424] bg-[#FEF0EA]/20' : 'border-[#EAEAEA] hover:border-[#CCCCCC]'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${tab === 'vendor' ? 'bg-[#FEF0EA] text-[#E96424]' : 'bg-[#F5F5F5] text-[#888888]'}`}>
                <StoreIcon className="w-5 h-5" />
              </div>
              <h4 className="text-[15px] font-bold text-[#333333] mb-1">Become a Vendor</h4>
              <p className="text-[13px] text-[#888888] leading-relaxed">Sell your food, groceries and products to more customers.</p>
            </button>

            <button 
              onClick={() => setTab('delivery')}
              className={`p-5 rounded-2xl border-2 text-left transition-colors ${tab === 'delivery' ? 'border-[#E96424] bg-[#FEF0EA]/20' : 'border-[#EAEAEA] hover:border-[#CCCCCC]'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${tab === 'delivery' ? 'bg-[#FEF0EA] text-[#E96424]' : 'bg-[#F5F5F5] text-[#888888]'}`}>
                <BikeIcon className="w-5 h-5" />
              </div>
              <h4 className="text-[15px] font-bold text-[#333333] mb-1">Become a Delivery Partner</h4>
              <p className="text-[13px] text-[#888888] leading-relaxed">Deliver orders with Dar Dar and earn on every delivery.</p>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {tab === 'vendor' && (
              <>
                <div className="mb-8">
                  <h3 className="text-[22px] font-black text-[#333333] mb-2">Tell Us About Your Business</h3>
                  <p className="text-[14px] text-[#666666]">Share a few details so our partnership team can help you get started.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <InputField label="Business Name" required placeholder="Enter your business name" className="md:col-span-2" />
                  
                  <div className="mb-5">
                    <label className="block text-[14px] font-bold text-[#333333] mb-2">Business Type <span className="text-[#E96424]">*</span></label>
                    <div className="relative">
                      <select required className="w-full px-4 py-3 pl-10 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-[#333333] appearance-none bg-white">
                        <option value="" disabled selected hidden>Select an option</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Supermarket">Supermarket</option>
                        <option value="Pharmacy">Pharmacy</option>
                      </select>
                      <ForkKnifeIcon className="w-4 h-4 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
                      <ChevronDownIcon className="w-4 h-4 text-[#888888] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <InputField label="Number of Branches" placeholder="Enter number of branches" />
                  <InputField label="Owner / Contact Person" required placeholder="Enter your full name" />
                  <InputField label="Phone Number" required placeholder="+243 XXXXXXXX" />
                  <InputField label="Email Address" placeholder="you@example.com" className="md:col-span-2" />
                  <InputField label="Business Address" required placeholder="Enter your business address" className="md:col-span-2" />
                  <InputField label="City / Area" required placeholder="e.g. Matete, Kinshasa" className="md:col-span-2" />
                  
                  <div className="mb-5 md:col-span-2">
                    <label className="block text-[14px] font-bold text-[#333333] mb-2">Business Description</label>
                    <textarea rows={3} placeholder="Tell us briefly about your business..." className="w-full px-4 py-3 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] placeholder-[#B3B3B3] resize-none"></textarea>
                  </div>
                  
                  <FileUpload label="Upload Business Logo" hint="JPG or PNG, up to 5MB" />
                  <FileUpload label="Trade License / Business Document" hint="PDF, JPG or PNG, up to 10MB" />
                </div>
              </>
            )}

            {tab === 'delivery' && (
              <>
                <div className="mb-8">
                  <h3 className="text-[22px] font-black text-[#333333] mb-2">Join Our Delivery Network</h3>
                  <p className="text-[14px] text-[#666666]">Complete the form below and our team will contact you about becoming a Dar Dar delivery partner.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <InputField label="Full Name" required placeholder="Enter your full name" className="md:col-span-2" />
                  <InputField label="Phone Number" required placeholder="+243 XXXXXXXX" />
                  <InputField label="Email Address" placeholder="you@example.com" />
                  <InputField label="Current Location / Area" required placeholder="e.g. Matete, Kinshasa" className="md:col-span-2" />
                  
                  <div className="mb-5">
                    <label className="block text-[14px] font-bold text-[#333333] mb-2">Vehicle Type <span className="text-[#E96424]">*</span></label>
                    <div className="relative">
                      <select required className="w-full px-4 py-3 pl-10 rounded-xl border border-[#EAEAEA] focus:outline-none focus:border-[#E96424] text-[15px] text-[#333333] appearance-none bg-white">
                        <option value="" disabled selected hidden>Select an option</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Bicycle">Bicycle</option>
                        <option value="Car">Car</option>
                      </select>
                      <CarIcon className="w-4 h-4 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
                      <ChevronDownIcon className="w-4 h-4 text-[#888888] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  
                  <InputField label="Vehicle Registration Number" placeholder="Enter registration number" />
                  <InputField label="National ID Number" required placeholder="Enter your NID number" />
                  <InputField label="Driving License Number" placeholder="Enter license number" />
                  <InputField label="Preferred Working Area" placeholder="e.g. Gombe, Ngaliema" className="md:col-span-2" />
                  
                  <div className="mb-5 md:col-span-2">
                    <label className="block text-[14px] font-bold text-[#333333] mb-2">Availability <span className="text-[#E96424]">*</span></label>
                    <div className="grid grid-cols-3 gap-3">
                       <button type="button" onClick={() => setAvailability('Full Time')} className={`py-3 rounded-xl border text-[13px] font-medium transition-colors ${availability === 'Full Time' ? 'border-[#E96424] bg-[#FEF0EA]/30 text-[#E96424]' : 'border-[#EAEAEA] text-[#333333] hover:border-[#E96424]'}`}>Full Time</button>
                       <button type="button" onClick={() => setAvailability('Part Time')} className={`py-3 rounded-xl border text-[13px] font-medium transition-colors ${availability === 'Part Time' ? 'border-[#E96424] bg-[#FEF0EA]/30 text-[#E96424]' : 'border-[#EAEAEA] text-[#333333] hover:border-[#E96424]'}`}>Part Time</button>
                       <button type="button" onClick={() => setAvailability('Flexible')} className={`py-3 rounded-xl border text-[13px] font-medium transition-colors ${availability === 'Flexible' ? 'border-[#E96424] bg-[#FEF0EA]/30 text-[#E96424]' : 'border-[#EAEAEA] text-[#333333] hover:border-[#E96424]'}`}>Flexible</button>
                    </div>
                  </div>

                  <FileUpload label="Upload Profile Photo" hint="JPG or PNG, up to 5MB" />
                  <FileUpload label="NID / Driving License" required hint="PDF, JPG or PNG, up to 10MB" />
                </div>
              </>
            )}

            <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EAEAEA] mb-8 flex items-start gap-3 mt-4">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-[#CCCCCC] text-[#E96424] focus:ring-[#E96424]" />
              <p className="text-[13px] text-[#666666]">
                I agree to Dar Dar's <a href="#" className="font-bold text-[#333333] hover:text-[#E96424]">Terms & Conditions</a> and <a href="#" className="font-bold text-[#333333] hover:text-[#E96424]">Privacy Policy</a>.
              </p>
            </div>

            <button type="submit" className="w-full py-4 rounded-xl bg-[#E96424] hover:bg-[#d6571b] text-white font-bold text-[16px] flex items-center justify-center gap-2 transition-colors shadow-[0_8px_25px_rgb(233,100,36,0.25)] mb-4">
              {tab === 'vendor' ? 'Submit Now' : 'Apply as Delivery Partner'}
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            <p className="text-center text-[12px] text-[#888888]">
              Our team will review your application and contact you shortly.
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}
