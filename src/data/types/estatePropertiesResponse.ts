export interface estatePropertiesResponse {
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
  no_of_bedroom: number | null;
  slug: string;
  features: string[];
  overview: string;
  description: string;
  street_address: string;
  country: string;
  state: string;
  lga: string;
  created_at: string;
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
  payment_schedule: string[];
  category: string;
  is_discount: boolean;
  discount_name: string | null;
  discount_percentage: number | null;
  discount_units: string | null;
  discount_start_date: string | null;
  discount_end_date: string | null;
  parking_space: number | null;
  number_of_bathroom: number | null;
  number_of_unit: number;
  property_agreement: string;
  payment_type: string;
  location_type: string;
  purpose: string[];
  year_built: number | null;
  shape: string;
  topography: string;
  title_document_type: string;
  road_access: string;
  director_id: number;
  unit_available: number;
  unit_sold: number;
  property_view: number;
  property_requests: number;
  video_link: string | null;
  video_file: string | null;
  nearby_landmarks: string | null;
  gated_estate: string;
  fencing: string;
  contact_number: string;
  whatsapp_link: string;
  rent_duration: number | null;
  toilets: number | null;
  building_condition: string | null;
  fees_charges: string | null;
  is_featured: number;
  category_id: number;
  is_offer: number;
  total_amount: number;
}