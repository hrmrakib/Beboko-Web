'use client';
import React, { createContext, useContext, useState } from 'react';
import { PartnerModal } from './PartnerModal';
import { SuccessModal } from './SuccessModal';

interface ModalContextType {
  openPartnerModal: (tab: 'vendor' | 'delivery') => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerTab, setPartnerTab] = useState<'vendor' | 'delivery'>('vendor');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const openPartnerModal = (tab: 'vendor' | 'delivery') => {
    setPartnerTab(tab);
    setPartnerModalOpen(true);
  };

  const handleSuccess = () => {
    setPartnerModalOpen(false);
    setSuccessModalOpen(true);
  };

  return (
    <ModalContext.Provider value={{ openPartnerModal }}>
      {children}
      <PartnerModal 
        isOpen={partnerModalOpen} 
        onClose={() => setPartnerModalOpen(false)} 
        initialTab={partnerTab}
        onSuccess={handleSuccess}
      />
      <SuccessModal 
        isOpen={successModalOpen} 
        onClose={() => setSuccessModalOpen(false)} 
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
