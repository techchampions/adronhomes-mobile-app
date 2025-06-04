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

export interface PlanProperty {
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
  total_infrastructure_fee: number;
  total_others_fee: number;
  total_infrastructure_break_down: InfrastructureBreakDown[];
}
export interface NextPayment {
  amount: number;
  due_date: string;
}
export interface InfrastructureBreakDown {
  id: number;
  name: string;
  value: number;
  property_id: number;
  created_at: string;
  updated_at: string;
  type: string;
}
// export interface Transaction {
//   id: number;
//   property_id: number;
//   user_id: number;
//   plan_id: number;
//   amount: number;
//   transaction_type: string;
//   created_at: string | null;
//   updated_at: string | null;
//   status: number;
//   property: Property;
// }

export interface PlanPropertiesDetailResponse {
  success: boolean;
  plan_properties: PlanProperty;
  next_repayment: NextPayment;
  transactions: Transaction[];
}
