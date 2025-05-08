export interface VirtualTourResponse {
  status: string;
  message: string;
  data: {
    virtual_header: VirtualHeader[];
    virtual_properties: VirtualProperty[];
  };
}

export interface VirtualHeader {
  header: string;
  description: string;
  list_description: string[];
}

export interface VirtualProperty {
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
}
