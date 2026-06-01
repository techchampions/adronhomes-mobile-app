interface EligibleGift {
  promo_id: number;
  promo_name: string;
  tier_id: number;
  is_claimed: boolean;
  gift_request: GiftRequest;
  unlocked_by: string; // Formatted currency string (e.g., "₦10,000")
  reward_groups: RewardGroup[];
}
interface GiftRequest {
  id: number;
  user_id: number;
  promo_id: number;
  property_id: number;
  user_note: string;
  status: "pending" | "approved" | "rejected"; // Add other statuses as needed
  processed_at: string | null;
  created_at: string;
  updated_at: string;
  reward_group_id: number;
  items: GiftRequestItem[];
  logic: "AND" | "OR";
}

interface GiftRequestItem {
  item_id: string;
  name: string;
  qty: number;
}
interface RewardItem {
  item_id: string;
  name: string;
  item_name: string;
  qty: number;
}

// Reward group containing multiple items with logic
interface RewardGroup {
  id: number;
  logic: "AND" | "OR"; // Logic operator for combining items
  items: RewardItem[];
}
interface VerifyMarketerResponse {
  success: boolean;
  user: {
    first_name: string;
  };
}

interface UserExistsResponse {
  success: boolean;
  message: string;
}

interface subscribePayload {
  marketID: string;
  property_id?: number;
  plan_id?: number;
  payment_type?: number;
  monthly_duration?: number;
  repayment_schedule?: string | number;
  start_date?: string;
  end_date?: string;
  paid_amount?: number;
  payment_method?: string;
  marketer_code?: string;
  purpose?: string;
  number_of_unit?: number;
  proof_of_payment?: File;
  bank_name?: string;
  fdf: string;
  // Add contract details fields
  contract_business_type?: string;
  contract_subscriber_name_1?: string;
  contract_subscriber_name_2?: string;
  contract_subscriber_name_3?: string;
  contract_additional_name?: string;
  contract_marital_status?: string;
  contract_gender?: string;
  contract_date_of_birth?: string;
  contract_nationality?: string;
  contract_residential_address?: string;
  contract_town?: string;
  contract_state?: string;
  contract_country?: string;
  contract_email?: string;
  contract_sms?: string;
  contract_employer_address?: string;
  contract_occupation?: string;
  contract_employer?: string;
  contract_next_of_kin_phone?: string;
  contract_next_of_kin_address?: string;
  contract_next_of_kin?: string;
  contract_next_of_kin_relationship?: string;
  contract_profile_picture?: File | null;
  contract_profile_picture_2?: File | null;
  means_of_ids?: File[] | null;
}

interface BuyPropertyPayload {
  marketer_code: string;
  citta_id: string;
  contract_business_type: string;
  contract_business_type_code: string;

  contract_title: string;

  contract_subscriber_name_1: string;
  contract_subscriber_name_2: string;
  contract_subscriber_name_3: string;
  contract_additional_name?: string;

  contract_marital_status: string;
  contract_marital_status_code: string;
  contract_gender: string;
  contract_gender_code: string;
  contract_date_of_birth: string; // YYYY-MM-DD
  contract_nationality: string;

  contract_residential_address: string;
  contract_town: string;
  contract_state: string;
  contract_country: string;
  contract_country_code: string;

  contract_email: string;
  contract_sms: string; // phone with country code

  contract_employer_address: string;
  contract_occupation: string;
  contract_employer_phone: string;
  contract_employer: string;

  contract_next_of_kin_phone: string;
  contract_next_of_kin: string;
  contract_next_of_kin_relationship: string;
  contract_next_of_kin_address: string;

  contract_profile_picture: File | null;
  contract_profile_picture2: File | null;
  contract_id_files: File[] | null;
  means_of_ids: File[] | null;

  land_size: string; // e.g., "600 sqm"

  monthly_duration: string; // e.g., "12 months"
  repayment_schedule: string; // e.g., "Monthly"
  payable_amount: number;
  payment_method: string; // e.g., "interswitch"
  payment_type: number; // e.g., 1
  paid_amount: number;

  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD

  purpose: string; // e.g., "Residential"
  contract_purpose_code: string;
  contract_purpose_name: string;
  contract_purpose: string;
  property_id: string;
  reference: string;
  number_of_unit: number;
}

interface GuestSubscribePayload {
  marketID: string;
  contract_business_type: string;

  contract_subscriber_name_1: string;
  contract_subscriber_name_2: string;
  contract_subscriber_name_3: string;
  contract_additional_name?: string;

  contract_marital_status: string;
  contract_gender: string;
  contract_date_of_birth: string; // YYYY-MM-DD
  contract_nationality: string;

  contract_residential_address: string;
  contract_town: string;
  contract_state: string;
  contract_country: string;

  contract_email: string;
  contract_sms: string; // phone with country code

  contract_employer_address: string;
  contract_occupation: string;
  contract_employer_phone: string;
  contract_employer: string;

  contract_next_of_kin_phone: string;
  contract_next_of_kin_name: string;
  contract_next_of_kin_relationship: string;

  contract_profile_picture: File | null;
  contract_profile_picture2: File | null;
  contract_id_files: File[] | null;

  land_size: string; // e.g., "600 sqm"

  payment_duration: string; // e.g., "12 months"
  payment_schedule: string; // e.g., "Monthly"
  payable_amount: number;
  payment_method: string; // e.g., "interswitch"
  payment_type: number; // e.g., 1
  paid_amount: number;

  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD

  property_purpose: string; // e.g., "Residential"
  contract_purpose: string; // e.g., "Residential"
  property_id: string;
  reference: string;
  number_of_unit: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
interface BusinessType {
  pCode: string;
  pName: string;
}

interface ErrorResponse {
  success: boolean;
  message: string;
}
