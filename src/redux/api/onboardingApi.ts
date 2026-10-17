import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  VendorOnboardingPayload,
  VendorOnboardingResponse,
  DeliveryPartnerOnboardingPayload,
  DeliveryPartnerOnboardingResponse,
  TrackApplicationResponse,
  GetApplicationsQueryParams,
  GetAllApplicationsResponse,
  GetApplicationDetailResponse,
  UpdateStatusPayload,
  UpdateStatusResponse,
} from '../types';
import type { OnboardingState } from '../slices/onboardingSlice';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.dardar-rdc.com/api/v1';

/**
 * Helper to convert VendorOnboardingPayload into FormData
 */
export function buildVendorFormData(payload: VendorOnboardingPayload): FormData {
  const formData = new FormData();
  formData.append('business_name', payload.business_name);
  formData.append('business_type', payload.business_type);
  if (payload.number_of_branches !== undefined && payload.number_of_branches !== '') {
    formData.append('number_of_branches', String(payload.number_of_branches));
  }
  formData.append('contact_person', payload.contact_person);
  formData.append('phone', payload.phone);
  formData.append('email', payload.email);
  formData.append('business_address', payload.business_address);
  formData.append('city', payload.city);
  if (payload.business_description) {
    formData.append('business_description', payload.business_description);
  }
  if (payload.business_logo) {
    formData.append('business_logo', payload.business_logo);
  }
  if (payload.trade_license) {
    formData.append('trade_license', payload.trade_license);
  }
  formData.append('agree_terms', String(payload.agree_terms));

  return formData;
}

/**
 * Helper to convert DeliveryPartnerOnboardingPayload into FormData
 */
export function buildDeliveryPartnerFormData(
  payload: DeliveryPartnerOnboardingPayload
): FormData {
  const formData = new FormData();
  formData.append('full_name', payload.full_name);
  formData.append('phone', payload.phone);
  formData.append('email', payload.email);
  formData.append('current_location', payload.current_location);
  formData.append('vehicle_type', payload.vehicle_type);
  if (payload.vehicle_registration_number) {
    formData.append('vehicle_registration_number', payload.vehicle_registration_number);
  }
  formData.append('nid_number', payload.nid_number);
  if (payload.driving_license_number) {
    formData.append('driving_license_number', payload.driving_license_number);
  }
  formData.append('preferred_working_area', payload.preferred_working_area);
  formData.append('availability', payload.availability);
  if (payload.profile_pic) {
    formData.append('profile_pic', payload.profile_pic);
  }
  if (payload.nid_or_license_pic) {
    formData.append('nid_or_license_pic', payload.nid_or_license_pic);
  }
  formData.append('agree_terms', String(payload.agree_terms));

  return formData;
}

export const onboardingApi = createApi({
  reducerPath: 'onboardingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Check Redux state for admin token
      const state = getState() as { onboarding?: OnboardingState };
      const adminToken = state.onboarding?.adminToken;

      if (adminToken) {
        headers.set('Authorization', `Bearer ${adminToken}`);
      } else if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('dardar_admin_token');
        if (storedToken) {
          headers.set('Authorization', `Bearer ${storedToken}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ['Applications', 'ApplicationDetail', 'Track'],
  endpoints: (builder) => ({
    // -------------------------------------------------------------
    // 1. Vendor Application Submission (POST multipart/form-data)
    // -------------------------------------------------------------
    submitVendorApplication: builder.mutation<
      VendorOnboardingResponse,
      VendorOnboardingPayload | FormData
    >({
      query: (body) => ({
        url: '/onboarding/vendor/',
        method: 'POST',
        body: body instanceof FormData ? body : buildVendorFormData(body),
      }),
      invalidatesTags: [{ type: 'Applications', id: 'LIST' }],
    }),

    // -------------------------------------------------------------
    // 2. Delivery Partner Application Submission (POST multipart/form-data)
    // -------------------------------------------------------------
    submitDeliveryPartnerApplication: builder.mutation<
      DeliveryPartnerOnboardingResponse,
      DeliveryPartnerOnboardingPayload | FormData
    >({
      query: (body) => ({
        url: '/onboarding/delivery-partner/',
        method: 'POST',
        body: body instanceof FormData ? body : buildDeliveryPartnerFormData(body),
      }),
      invalidatesTags: [{ type: 'Applications', id: 'LIST' }],
    }),

    // -------------------------------------------------------------
    // 3. Track Application Status (GET public)
    // -------------------------------------------------------------
    trackApplication: builder.query<TrackApplicationResponse, string>({
      query: (trackingId) => ({
        url: `/onboarding/track/${encodeURIComponent(trackingId)}/`,
        method: 'GET',
      }),
      providesTags: (_result, _error, trackingId) => [
        { type: 'Track', id: trackingId },
      ],
    }),

    // -------------------------------------------------------------
    // 4. Get All Applications (GET admin)
    // -------------------------------------------------------------
    getAllApplications: builder.query<
      GetAllApplicationsResponse,
      GetApplicationsQueryParams | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.status) queryParams.set('status', params.status);
        if (params?.tracking_id) queryParams.set('tracking_id', params.tracking_id);
        if (params?.type) queryParams.set('type', params.type);
        if (params?.search) queryParams.set('search', params.search);

        const qs = queryParams.toString();
        return {
          url: `/onboarding/applications/${qs ? `?${qs}` : ''}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ tracking_id }) => ({
                type: 'Applications' as const,
                id: tracking_id,
              })),
              { type: 'Applications', id: 'LIST' },
            ]
          : [{ type: 'Applications', id: 'LIST' }],
    }),

    // -------------------------------------------------------------
    // 5. Single Application Detail (GET admin)
    // -------------------------------------------------------------
    getApplicationDetail: builder.query<GetApplicationDetailResponse, string>({
      query: (trackingId) => ({
        url: `/onboarding/applications/${encodeURIComponent(trackingId)}/`,
        method: 'GET',
      }),
      providesTags: (_result, _error, trackingId) => [
        { type: 'ApplicationDetail', id: trackingId },
      ],
    }),

    // -------------------------------------------------------------
    // 6. Update Status & Admin Note (PATCH admin)
    // -------------------------------------------------------------
    updateApplicationStatus: builder.mutation<
      UpdateStatusResponse,
      UpdateStatusPayload
    >({
      query: ({ tracking_id, status, admin_note }) => ({
        url: `/onboarding/applications/${encodeURIComponent(tracking_id)}/status/`,
        method: 'PATCH',
        body: { status, admin_note },
      }),
      invalidatesTags: (_result, _error, { tracking_id }) => [
        { type: 'Applications', id: tracking_id },
        { type: 'Applications', id: 'LIST' },
        { type: 'ApplicationDetail', id: tracking_id },
        { type: 'Track', id: tracking_id },
      ],
    }),
  }),
});

export const {
  useSubmitVendorApplicationMutation,
  useSubmitDeliveryPartnerApplicationMutation,
  useTrackApplicationQuery,
  useLazyTrackApplicationQuery,
  useGetAllApplicationsQuery,
  useLazyGetAllApplicationsQuery,
  useGetApplicationDetailQuery,
  useLazyGetApplicationDetailQuery,
  useUpdateApplicationStatusMutation,
} = onboardingApi;
