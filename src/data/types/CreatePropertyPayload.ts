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
