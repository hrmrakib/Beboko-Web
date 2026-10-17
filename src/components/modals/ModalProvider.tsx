'use client';

import React, { createContext, useContext, useState } from 'react';
import { PartnerModal } from './PartnerModal';
import { SuccessModal } from './SuccessModal';
import { TrackModal } from './TrackModal';
import { AdminPortalModal } from './AdminPortalModal';

interface ModalContextType {
  openPartnerModal: (tab: 'vendor' | 'delivery') => void;
  openTrackModal: (trackingId?: string) => void;
  openSuccessModal: (trackingId?: string) => void;
  openAdminModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerTab, setPartnerTab] = useState<'vendor' | 'delivery'>('vendor');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('');

  const openPartnerModal = (tab: 'vendor' | 'delivery') => {
    setPartnerTab(tab);
    setPartnerModalOpen(true);
  };

  const openTrackModal = (trackingId?: string) => {
    if (trackingId) setActiveTrackingId(trackingId);
    setTrackModalOpen(true);
  };

  const openSuccessModal = (trackingId?: string) => {
    if (trackingId) setActiveTrackingId(trackingId);
    setSuccessModalOpen(true);
  };

  const openAdminModal = () => {
    setAdminModalOpen(true);
  };

  const handlePartnerSuccess = (trackingId: string) => {
    setPartnerModalOpen(false);
    setActiveTrackingId(trackingId);
    setSuccessModalOpen(true);
  };

  const handleTrackFromSuccess = (trackingId: string) => {
    setSuccessModalOpen(false);
    setActiveTrackingId(trackingId);
    setTrackModalOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        openPartnerModal,
        openTrackModal,
        openSuccessModal,
        openAdminModal,
      }}
    >
      {children}
      <PartnerModal 
        isOpen={partnerModalOpen} 
        onClose={() => setPartnerModalOpen(false)} 
        initialTab={partnerTab}
        onSuccess={handlePartnerSuccess}
      />
      <SuccessModal 
        isOpen={successModalOpen} 
        onClose={() => setSuccessModalOpen(false)} 
        trackingId={activeTrackingId}
        onTrack={handleTrackFromSuccess}
      />
      <TrackModal
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
        initialTrackingId={activeTrackingId}
      />
      <AdminPortalModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
}
