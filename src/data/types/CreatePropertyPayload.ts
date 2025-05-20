export interface PropertyPlanPayload {
  property_id: number;
  payment_type: number;
  monthly_duration: number;
  repayment_schedule: string;
  start_date: string;
  end_date: string;
  paid_amount: number;
  payment_method: string;
}
