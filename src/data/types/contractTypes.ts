export interface ContractData {
  id: number;
  customerName: string;
  customerCode: string;
  dateOfBirth: string;
  userId: number;
  propertyId: number | null;
  contractId: string;
  customerAddress: string;
  contractDate: string | null;
  propertyEstate: string;
  propertyName: string;
  customerTown: string;
  customerState: string;
  customerEmail: string;
  customerPhone: string;
  customerSMSPhone: string;
  customerTitle: string;
  customerGender: string;
  customerMarital: string;
  fullPayment: string;
  fullPaymentDate: string | null;
  quantity: string;
  propertyCost: string;
  propertyDiscount: string;
  propertyNetValue: string;
  propertyTenor: number;
  firstPaymentDate: string | null;
  lastPaymentDate: string | null;
  propertyBranch: string;
  currentbalance: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  success: boolean;
  data: {
    current_page: number;
    data: ContractData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface ContactParams {
  page?: number;
  search?: string;
  per_page?: number;
    
}
