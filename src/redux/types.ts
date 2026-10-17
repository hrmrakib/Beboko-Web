export type ApplicationStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';

export type ApplicationRole = 'VENDOR' | 'DELIVERY_PARTNER';

export type AvailabilityType = 'FULL_TIME' | 'PART_TIME' | 'FLEXIBLE';

// -------------------------------------------------------------
// 1. Vendor Application Submission
// -------------------------------------------------------------
export interface VendorOnboardingPayload {
  business_name: string;
  business_type: string;
  number_of_branches?: string | number;
  contact_person: string;
  phone: string;
  email: string;
  business_address: string;
  city: string;
  business_description?: string;
  business_logo?: File | Blob | null;
  trade_license?: File | Blob | null;
  agree_terms: boolean;
}

export interface VendorOnboardingData {
  tracking_id: string;
  business_name: string;
  contact_person: string;
  phone: string;
  email: string;
  status: ApplicationStatus;
  submitted_at: string;
  last_updated_at: string;
}

export interface VendorOnboardingResponse {
  status: 'success' | 'error';
  message: string;
  data: VendorOnboardingData;
}

// -------------------------------------------------------------
// 2. Delivery Partner Application Submission
// -------------------------------------------------------------
export interface DeliveryPartnerOnboardingPayload {
  full_name: string;
  phone: string;
  email: string;
  current_location: string;
  vehicle_type: string;
  vehicle_registration_number?: string;
  nid_number: string;
  driving_license_number?: string;
  preferred_working_area: string;
  availability: AvailabilityType | string;
  profile_pic?: File | Blob | null;
  nid_or_license_pic?: File | Blob | null;
  agree_terms: boolean;
}

export interface DeliveryPartnerOnboardingData {
  tracking_id: string;
  full_name: string;
  phone: string;
  email: string;
  status: ApplicationStatus;
  submitted_at: string;
  last_updated_at: string;
}

export interface DeliveryPartnerOnboardingResponse {
  status: 'success' | 'error';
  message: string;
  data: DeliveryPartnerOnboardingData;
}

// -------------------------------------------------------------
// 3. Track Application Status
// -------------------------------------------------------------
export interface TrackApplicationData {
  tracking_id: string;
  role: ApplicationRole;
  applicant_name: string;
  business_name: string | null;
  status: ApplicationStatus;
  admin_note: string | null;
  submitted_at: string;
  last_updated_at: string;
}

export interface TrackApplicationResponse {
  status: 'success';
  data: TrackApplicationData;
}

export interface TrackApplicationErrorResponse {
  status: 'error';
  message: string;
}

// -------------------------------------------------------------
// 4. Get All Applications (Admin)
// -------------------------------------------------------------
export interface GetApplicationsQueryParams {
  status?: ApplicationStatus;
  tracking_id?: string;
  type?: 'vendor' | 'delivery_partner';
  search?: string;
}

export interface ApplicationListItem {
  tracking_id: string;
  role: ApplicationRole;
  applicant_name: string;
  business_name: string | null;
  phone: string;
  email: string;
  location: string;
  status: ApplicationStatus;
  admin_note: string | null;
  submitted_at: string;
  last_updated_at: string;
}

export interface GetAllApplicationsResponse {
  status: 'success';
  total_count: number;
  data: ApplicationListItem[];
}

// -------------------------------------------------------------
// 5. Single Application Detail (Admin)
// -------------------------------------------------------------
export interface VendorApplicationDetail {
  id: number;
  tracking_id: string;
  business_name: string;
  business_type: string;
  number_of_branches: string;
  contact_person: string;
  phone: string;
  email: string;
  business_address: string;
  city: string;
  business_description?: string;
  business_logo?: string;
  trade_license?: string;
  agree_terms: boolean;
  status: ApplicationStatus;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeliveryPartnerApplicationDetail {
  id: number;
  tracking_id: string;
  full_name: string;
  phone: string;
  email: string;
  current_location: string;
  vehicle_type: string;
  vehicle_registration_number?: string;
  nid_number: string;
  driving_license_number?: string;
  preferred_working_area: string;
  availability: string;
  profile_pic?: string;
  nid_or_license_pic?: string;
  agree_terms: boolean;
  status: ApplicationStatus;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface GetApplicationDetailResponse {
  status: 'success';
  role: ApplicationRole;
  data: VendorApplicationDetail | DeliveryPartnerApplicationDetail;
}

// -------------------------------------------------------------
// 6. Update Status & Admin Note (Admin)
// -------------------------------------------------------------
export interface UpdateStatusPayload {
  tracking_id: string;
  status: ApplicationStatus;
  admin_note?: string;
}

export interface UpdateStatusResponse {
  status: 'success';
  message: string;
  data: {
    tracking_id: string;
    role: ApplicationRole;
    status: ApplicationStatus;
    admin_note: string | null;
    last_updated_at: string;
  };
}

// -------------------------------------------------------------
// Generic Error Interface
// -------------------------------------------------------------
export interface ApiErrorResponse {
  status?: string;
  message?: string;
  errors?: Record<string, string[] | string>;
  detail?: string;
}
