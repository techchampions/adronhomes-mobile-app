// export interface GetPropertyByIdResponse {
//   status: string;
//   message: string;
//   data: {
//     properties: Property[];
//   };
// }

import { Property as P } from "./propertiesPageTypes";

// export interface Property {
//   id: number;
//   name: string;
//   display_image: string;
//   photos: string[];
//   size: string;
//   price: number | null;
//   initial_deposit: number | null;
//   type: number;
//   slug: string;
//   features: string[];
//   overview: string;
//   description: string;
//   street_address: string;
//   country: string;
//   state: string;
//   lga: string;
//   created_at: string | null;
//   updated_at: string | null;
//   total_amount: number | null;
//   is_bought: boolean;
//   is_saved: boolean;
// }

export interface GetPropertyByIdResponse {
  status: string;
  message: string;
  data: {
    properties: Property;
    similar_property_user: P[];
  };
}

export interface Property {
  id: number;
  name: string;
  display_image: string;
  photos: string[];
  size: string;
  price: number;
  initial_deposit: number | null;
  type: PropertyType; // changed from number to object
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
  total_amount: number | null;
  is_bought: boolean;
  is_saved: boolean;
  is_discount: boolean;
  discount_name: string;
  discount_percentage: number | string;
  no_of_bedroom: number;
  number_of_bathroom: number;
  year_built: string;
  parking_space: string | number;
  area: string;
  property_map: string | null;
  property_video: string | null;
  virtual_tour: string | null;
  subscriber_form: string;
  status: string;
  property_duration_limit: number;
  payment_schedule: string[];
  payment_type: string;
  is_sold: number;
  is_active: number;
  details: PropertyDetail[];
  saved_property: SavedProperty | null;
  bought_property: BoughtProperty | null;
  number_of_unit: number;
  unit_available: number;
  property_agreement: string;
  whatsapp_link: string;
  video_link: string;
  contact_number: string;
  topography: string;
  road_access: string;
  gated_estate: string;
  fencing: string;
  category: string;
  purpose: string[] | null;
  nearby_landmarks: string[] | null;
  title_document_type: string | null;
  property_files:any
}

export interface PropertyType {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface PropertyDetail {
  id: number;
  name: string;
  value: number;
  type: string;
  purpose: string;
  property_id: number;
  created_at: string;
  updated_at: string;
}

export interface SavedProperty {
  id: number;
  property_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface BoughtProperty {
  id: number;
  user_id: number;
  property_id: number;
  created_at: string;
  updated_at: string;
  type: number;
  status: number;
  plan_id: number;
  marketer_id: number | null;
}
