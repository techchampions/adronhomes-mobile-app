import { create } from "zustand";

type SubscribeFormData = {
  marketID: string;
  soleOwner: string;
  initial_deposit: string;
  units: number;
  total_amount: number;
  contract_business_type: string;
  contract_business_type_code: string;
  contract_subscriber_name_1: string;
  contract_subscriber_name_2: string;
  contract_subscriber_name_3: string;
  contract_additional_name: string;
  contract_marital_status: string;
  contract_marital_status_code: string;
  contract_gender: string;
  contract_gender_code: string;
  contract_date_of_birth: string;
  contract_nationality: string;
  contract_residential_address: string;
  contract_town: string;
  contract_state: string;
  contract_country: string;
  contract_country_code: string;
  longitude: string;
  latitude: string;
  property_id: string;
  contract_title: string;
  contract_email: string;
  contract_sms: string;
  contract_employer_address: string;
  contract_occupation: string;
  contract_employer: string;
  contract_next_of_kin_phone: string;
  contract_next_of_kin: string;
  contract_next_of_kin_relationship: string;
  contract_next_of_kin_address: string;
  contract_profile_picture: File | null;
  contract_profile_picture2: File | null;
  means_of_ids: File[] | null;
  land_size: string | number;
  citta_id: string;
  payment_duration: string | number;
  payment_schedule: string | number;
  start_date: string;
  end_date: string;
  payable_amount: string | number;
  purpose: string;
  contract_purpose: string;
  contract_purpose_code: string;
  payment_plan: string;
  payment_method: string;
  payment_type: string;
  contract_branch_name: string;
  contract_branch_code: string;
  setSubscribeFormData: (
    details: Partial<
      Omit<SubscribeFormData, "setSubscribeFormData" | "resetSubscribeFormData">
    >
  ) => void;
  resetSubscribeFormData: () => void;
};

export const useSubscribeFormData = create<SubscribeFormData>((set) => ({
  marketID: "",
  soleOwner: "",
  initial_deposit: "",
  units: 1,
  total_amount: 0,
  contract_business_type: "",
  contract_business_type_code: "",
  contract_subscriber_name_1: "",
  contract_subscriber_name_2: "",
  contract_subscriber_name_3: "",
  contract_additional_name: "",
  contract_marital_status: "",
  contract_marital_status_code: "",
  contract_gender: "",
  contract_gender_code: "",
  contract_date_of_birth: "",
  contract_nationality: "",
  contract_residential_address: "",
  contract_title: "",
  contract_town: "",
  contract_state: "",
  contract_country: "",
  contract_country_code: "",
  contract_email: "",
  contract_sms: "",
  contract_employer_address: "",
  contract_occupation: "",
  contract_employer: "",
  contract_next_of_kin_phone: "",
  contract_next_of_kin: "",
  contract_next_of_kin_relationship: "",
  contract_next_of_kin_address: "",
  contract_profile_picture: null,
  contract_profile_picture2: null,
  means_of_ids: null,
  land_size: "",
  citta_id: "",
  payment_duration: "",
  payment_schedule: "",
  payable_amount: "",
  start_date: "",
  end_date: "",
  purpose: "",
  contract_purpose: "",
  contract_purpose_code: "",
  payment_plan: "",
  longitude: "",
  latitude: "",
  payment_method: "",
  payment_type: "",
  property_id: "",
  contract_branch_name: "",
  contract_branch_code: "",
  setSubscribeFormData: (details) => set((state) => ({ ...state, ...details })),

  resetSubscribeFormData: () =>
    set({
      marketID: "",
      soleOwner: "",
      initial_deposit: "",
      units: 1,
      total_amount: 0,
      contract_business_type: "",
      contract_business_type_code: "",
      contract_subscriber_name_1: "",
      contract_subscriber_name_2: "",
      contract_subscriber_name_3: "",
      contract_additional_name: "",
      contract_marital_status: "",
      contract_marital_status_code: "",
      contract_gender: "",
      contract_gender_code: "",
      contract_date_of_birth: "",
      contract_nationality: "",
      contract_residential_address: "",
      contract_title: "",
      contract_town: "",
      contract_state: "",
      contract_country: "",
      contract_country_code: "",
      contract_email: "",
      contract_sms: "",
      contract_employer_address: "",
      contract_occupation: "",
      contract_employer: "",
      contract_next_of_kin_phone: "",
      contract_next_of_kin: "",
      contract_next_of_kin_relationship: "",
      contract_next_of_kin_address: "",
      contract_profile_picture: null,
      contract_profile_picture2: null,
      means_of_ids: null,
      land_size: "",
      citta_id: "",
      payment_duration: "",
      payment_schedule: "",
      payable_amount: "",
      start_date: "",
      end_date: "",
      purpose: "",
      contract_purpose: "",
      contract_purpose_code: "",
      payment_plan: "",
      longitude: "",
      latitude: "",
      payment_method: "",
      payment_type: "",
      property_id: "",
      contract_branch_name: "",
      contract_branch_code: "",
    }),
}));
