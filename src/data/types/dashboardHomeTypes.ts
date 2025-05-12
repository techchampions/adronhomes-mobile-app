import { Transaction } from "./userTransactionsTypes";

export interface Property {
  id: number;
  name: string;
  price: number;
  size: string;
  display_image: string;
  lga: string;
  state: string;
}

export interface UserProperty {
  id: number;
  property_id: number;
  user_id: number;
  property_type: number;
  total_amount: number;
  paid_amount: number;
  remaining_balance: number;
  status: number;
  payment_percentage: number;
  payment_completed_at: string | null;
  created_at: string;
  updated_at: string;
  monthly_duration: string;
  payment_type: string;
  end_date: string;
  start_date: string;
  payment_method: string | null;
  repayment_schedule: string;
  next_payment_date: string;
  property: Property;
  property_plan: null;
}

export interface PropertyBreakdown {
  type_id: number;
  type_name: string;
  count: number;
}

export interface TotalProperty {
  total: number;
  breakdown: PropertyBreakdown[];
}

export interface UserDashboardResponseData {
  success: boolean;
  wallet_balance: number;
  total_property: TotalProperty;
  total_invoice: number;
  total_amount_paid: number;
  user_properties: UserProperty[];
  user_transactions: Transaction[];
}
