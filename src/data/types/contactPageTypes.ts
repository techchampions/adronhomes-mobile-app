export interface ContactPageResponse {
  status: string;
  message: string;
  data: {
    contact: {
      office_header: OfficeHeader[];
      office_info: OfficeInfo[];
    };
  };
}

export interface OfficeHeader {
  header: string;
  description: string;
  image: string;
}

export interface OfficeInfo {
  id: number;
  office_name: string;
  first_contact: string;
  second_contact: string;
  third_contact: string | null;
  office_address: string;
  email: string;
  created_at: string | null;
  updated_at: string | null;
}
