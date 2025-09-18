import { PaginatedData } from "./PropertyRequestTypes";
import { Transaction } from "./userTransactionsTypes";

export interface Property {
  id: number;
  name: string;
  price: number;
  size: string;
  display_image: string;
  lga: string;
  state: string;
  slug: String;
}

// export interface PlanProperty {
//   id: number;
//   property_id: number;
//   user_id: number;
//   property_type: number;
//   total_amount: number;
//   paid_amount: number;
//   remaining_balance: number;
//   status: number;
//   payment_percentage: number;
//   payment_completed_at: string | null;
//   created_at: string;
//   updated_at: string;
//   monthly_duration: string;
//   payment_type: string;
//   end_date: string;
//   start_date: string;
//   payment_method: string | null;
//   repayment_schedule: string;
//   next_payment_date: string;
//   property: Property;
//   total_infrastructure_fee: number;
//   total_others_fee: number;
//   total_infrastructure_break_down: InfrastructureBreakDown[];
// }
type PlanProperty = {
  id: number;
  contract_id: number;
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
  number_of_unit: number;
  monthly_duration: string;
  payment_type: string;
  end_date: string | null;
  start_date: string | null;
  payment_method: string | null;
  repayment_schedule: string;
  next_payment_date: string;
  marketer_id: number;
  infrastructure_percentage: number;
  infrastructure_amount: number | null;
  other_percentage: number;
  other_amount: number | null;
  remaining_infrastructure_balance: number | null;
  remaining_other_balance: number | null;
  paid_infrastructure_amount: number;
  paid_other_amount: number;
  property: Property;
};

interface UserProperty {
  id: number;
  property_id: number;
  user_id: number;
  type: number;
  status: number;
}

interface PaymentDetail {
  id: number;
  property_id: number;
  user_id: number;
  property_plan_id: number;
  amount_paid: number;
  payment_type: string;
  status: number;
  reference: string;
  purpose: string;
}
type Repayment = {
  id: number;
  property_id: number;
  plan_id: number;
  status: number;
  amount: number;
  due_date: string;
  created_at: string;
  updated_at: string;
};

type FeeBreakdown = {
  id: number;
  name: string;
  value: number;
  property_id: number;
  created_at: string;
  updated_at: string;
  type: "infrastructure" | "others";
};
export interface InfrastructureBreakDown {
  id: number;
  name: string;
  value: number;
  property_id: number;
  created_at: string;
  updated_at: string;
  type: string;
}
export interface Contract {
  id: number;
  unique_contract_id: string;
}
export interface ContractDocument {
  id: number;
  plan_id: number;
  document_name: string;
  document_file: string;
  created_at: string;
  updated_at: string;
}
export interface PlanPropertiesDetailResponse {
  success: boolean;
  user_property: UserProperty;
  payment: PaymentDetail;
  plan_properties: PlanProperty;
  next_repayment: Repayment;
  total_infrastructure_fee: number;
  total_others_fee: number;
  infrastructure_break_down: FeeBreakdown[];
  others_fee_break_down: FeeBreakdown[];
  transactions: PaginatedData<Transaction>;
  contract: Contract;
  contract_documents: ContractDocument[];
}
