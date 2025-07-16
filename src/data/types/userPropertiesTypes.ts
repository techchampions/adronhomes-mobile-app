export interface Property {
  id: number;
  name: string;
  display_image: string;
  photos: string[];
  size: string | null;
  price: number;
  type: number;
  no_of_bedroom: number | null;
  slug: string;
  features: string[];
  overview: string;
  description: string;
  street_address: string;
  country: string;
  state: string;
  lga: string;
  created_at: string | null;
  updated_at: string;
  area: string | null;
  property_map: string | null;
  property_video: string | null;
  virtual_tour: string | null;
  subscriber_form: string | null;
  status: string;
  initial_deposit: number;
  is_sold: number;
  is_active: number;
  property_duration_limit: number;
  payment_schedule: string | null;
  category: string;
  is_discount: boolean;
  discount_name: string | null;
  discount_percentage: number | null;
  discount_units: number | null;
  discount_start_date: string | null;
  discount_end_date: string | null;
  parking_space: string | null;
  number_of_bathroom: number | null;
  number_of_unit: number | null;
  property_agreement: string | null;
  payment_type: string;
  location_type: string;
  purpose: string;
  year_built: number | null;
  shape: string | null;
  topography: string | null;
  title_document_type: string | null;
  road_access: string | null;
  director_id: number | null;
  unit_available: number;
  unit_sold: number;
  property_view: number;
  property_requests: number;
  total_amount: number;
}

export interface Plan {
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
  monthly_duration: string | null;
  payment_type: number;
  end_date: string | null;
  start_date: string | null;
  payment_method: string;
  repayment_schedule: string | null;
  next_payment_date: string | null;
  marketer_id: number | string | null;
  infrastructure_percentage: number;
  infrastructure_amount: number | null;
  other_percentage: number;
  other_amount: number | null;
  remaining_infrastructure_balance: number | null;
  remaining_other_balance: number | null;
  paid_infrastructure_amount: number;
  paid_other_amount: number;
  contract_id: string | null;
  number_of_unit: number;
  initial_payment_percentage: number;
}

// export interface UserProperty {
//   id: number;
//   plan_id: number;
//   property_id: number;
//   user_id: number;
//   property_type: number;
//   total_amount: number;
//   paid_amount: number;
//   remaining_balance: number;
//   number_of_unit: number;
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
// }
export interface UserProperty {
  id: number;
  user_id: number;
  property_id: number;
  created_at: string;
  updated_at: string;
  type: number;
  status: number;
  plan_id: number;
  marketer_id: number | string | null;
  property: Property;
  plan: Plan;
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
  pending_user_properties: UserProperties;
  completed_user_properties: UserProperties;
}
