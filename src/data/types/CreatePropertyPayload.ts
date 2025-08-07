export interface PropertyPlanPayload {
  property_id?: number;
  plan_id?: number;
  payment_type?: number;
  monthly_duration?: number;
  repayment_schedule?: string;
  start_date?: string;
  end_date?: string;
  paid_amount?: number;
  payment_method?: string;
  marketer_code?: string;
  purpose?: string;
  number_of_unit?: number;
  proof_of_payment?: File; // Add this
  bank_name?: string;
}
export interface PendingPropertyPlanPayload {
  user_property_id?: number;
  payment_type?: number;
  payment_method?: string;
  bank_name?: string;
  proof_of_payment?: File;
}

export interface NewPropertyPlanPayload {
  property_id?: number;
  plan_id?: number;
  payment_type?: number;
  monthly_duration?: number;
  repayment_schedule?: string;
  start_date?: string;
  end_date?: string;
  paid_amount?: number;
  payment_method?: string;
  marketer_code?: string;
  purpose?: string;
  number_of_unit?: number;
  proof_of_payment?: File;
  bank_name?: string;

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
  contract_profile_picture?: File;
  contract_profile_picture_2?: File;
  means_of_ids?: File[];
}
