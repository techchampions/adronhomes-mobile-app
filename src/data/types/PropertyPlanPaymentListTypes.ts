export interface PropertyPlanPaymentResponse {
  status: string;
  message: string;
  properties: Properties;
}

export interface Properties {
  current_page: number;
  data: PropertyPlanPayment[];
}

export interface PropertyPlanPayment {
  id: number;
  property_id: number;
  plan_id: number;
  status: number;
  amount: number;
  due_date: string;
  created_at: string;
  updated_at: string;
  property: Property;
  property_plan: PropertyPlan;
}

export interface Property {
  id: number;
  name: string;
  price: number;
  size: string;
  display_image: string;
  lga: string;
  state: string;
  is_saved: boolean;
  is_bought: boolean;
  total_amount: number;
}

export interface PropertyPlan {
  id: number;
  payment_percentage: number;
  repayment_schedule: string;
  next_payment_date: string;
  total_amount: number;
  paid_amount: number;
  remaining_balance: number;
  status: number;
  monthly_duration: string;
}
