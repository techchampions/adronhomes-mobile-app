export interface PropertiesResponse {
  status: string;
  message: string;
  properties_header: PropertiesHeader[];
  properties: PaginatedProperties;
}

export interface PropertiesHeader {
  header: string;
  description: string;
  list_description: string[];
}

export interface PaginatedProperties {
  current_page: number;
  data: Property[];
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

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Property {
  id: number;
  name: string;
  display_image: string;
  photos: string[];
  size: string;
  price: number;
  type: number;
  slug: string;
  features: string[];
  overview: string;
  description: string;
  street_address: string;
  country: string;
  state: string;
  lga: string;
  created_at: string | null;
  updated_at: string | null;
  area: string;
  subscriber_form: string | null;
  survey_plan_fee: number;
  legal_documention_fee: number;
  architectural_drawing_fee: number;
  structure_drawing_fee: number;
  m_e_free: number;
  developmental_fee: number;
  certification_fee: number;
  actual_total: number;
  building_approval: string;
  status: string;
}
