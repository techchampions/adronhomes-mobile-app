/** A single property-request record */
export interface PropertyRequest {
  id: number;
  name: string;
  country: string;
  state: string;
  lga: string;
  price: number;
  total_requests: number;
  total_pending_requests: number;
}

/** One “Previous / 1 / Next” style nav link */
export interface PaginationLink {
  url: string | null;
  label: string; // e.g. "1", "« Previous", "Next »"
  active: boolean;
}

/** Generic pagination container (Laravel style) */
export interface PaginatedData<TItem> {
  current_page: number;
  data: TItem[];
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

/** Full API response for the properties-requests endpoint */
export interface PropertiesRequestResponse {
  success: boolean;
  data: PaginatedData<PropertyRequest>;
}
