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
}

export interface PropertyTypeBreakdown {
  type_id: number;
  type_name: string;
  count: number;
}

export interface TotalProperty {
  total: number;
  breakdown: PropertyTypeBreakdown[];
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface UserProperties {
  current_page: number;
  data: UserProperty[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface UserPropertyPlanResponse {
  success: boolean;
  total_property: TotalProperty;
  total_invoice: number;
  total_amount_paid: number;
  user_properties: UserProperties;
}
