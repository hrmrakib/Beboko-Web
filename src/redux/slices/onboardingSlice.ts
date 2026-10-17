import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ApplicationRole, ApplicationStatus } from '../types';

export interface LastSubmissionInfo {
  tracking_id: string;
  role: ApplicationRole;
  name: string;
  phone: string;
  email: string;
  status: ApplicationStatus;
  submitted_at: string;
}

export interface OnboardingState {
  lastSubmission: LastSubmissionInfo | null;
  trackingHistory: string[];
  activeTrackingId: string | null;
  adminToken: string | null;
  isPartnerModalOpen: boolean;
  partnerModalTab: 'vendor' | 'delivery';
  isTrackModalOpen: boolean;
  isSuccessModalOpen: boolean;
}

const getInitialHistory = (): string[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('dardar_tracking_history');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
  }
  return [];
};

const getInitialAdminToken = (): string | null => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem('dardar_admin_token') || null;
    } catch {
      // ignore
    }
  }
  return null;
};

const initialState: OnboardingState = {
  lastSubmission: null,
  trackingHistory: getInitialHistory(),
  activeTrackingId: null,
  adminToken: getInitialAdminToken(),
  isPartnerModalOpen: false,
  partnerModalTab: 'vendor',
  isTrackModalOpen: false,
  isSuccessModalOpen: false,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setLastSubmission: (state, action: PayloadAction<LastSubmissionInfo>) => {
      state.lastSubmission = action.payload;
      state.activeTrackingId = action.payload.tracking_id;
      // Add to tracking history if not already present
      if (!state.trackingHistory.includes(action.payload.tracking_id)) {
        state.trackingHistory.unshift(action.payload.tracking_id);
        if (state.trackingHistory.length > 10) {
          state.trackingHistory.pop();
        }
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(
              'dardar_tracking_history',
              JSON.stringify(state.trackingHistory)
            );
          } catch {
            // ignore
          }
        }
      }
    },
    clearLastSubmission: (state) => {
      state.lastSubmission = null;
    },
    addTrackingHistory: (state, action: PayloadAction<string>) => {
      const id = action.payload.trim();
      if (!id) return;
      if (!state.trackingHistory.includes(id)) {
        state.trackingHistory.unshift(id);
        if (state.trackingHistory.length > 10) {
          state.trackingHistory.pop();
        }
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(
              'dardar_tracking_history',
              JSON.stringify(state.trackingHistory)
            );
          } catch {
            // ignore
          }
        }
      }
    },
    setActiveTrackingId: (state, action: PayloadAction<string | null>) => {
      state.activeTrackingId = action.payload;
    },
    setAdminToken: (state, action: PayloadAction<string>) => {
      state.adminToken = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('dardar_admin_token', action.payload);
      }
    },
    clearAdminToken: (state) => {
      state.adminToken = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('dardar_admin_token');
      }
    },
    openPartnerModal: (
      state,
      action: PayloadAction<'vendor' | 'delivery' | undefined>
    ) => {
      state.isPartnerModalOpen = true;
      if (action.payload) {
        state.partnerModalTab = action.payload;
      }
    },
    closePartnerModal: (state) => {
      state.isPartnerModalOpen = false;
    },
    setPartnerModalTab: (state, action: PayloadAction<'vendor' | 'delivery'>) => {
      state.partnerModalTab = action.payload;
    },
    openTrackModal: (state, action: PayloadAction<string | undefined>) => {
      state.isTrackModalOpen = true;
      if (action.payload) {
        state.activeTrackingId = action.payload;
      }
    },
    closeTrackModal: (state) => {
      state.isTrackModalOpen = false;
    },
    openSuccessModal: (state) => {
      state.isSuccessModalOpen = true;
    },
    closeSuccessModal: (state) => {
      state.isSuccessModalOpen = false;
    },
  },
});

export const {
  setLastSubmission,
  clearLastSubmission,
  addTrackingHistory,
  setActiveTrackingId,
  setAdminToken,
  clearAdminToken,
  openPartnerModal,
  closePartnerModal,
  setPartnerModalTab,
  openTrackModal,
  closeTrackModal,
  openSuccessModal,
  closeSuccessModal,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
