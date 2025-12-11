export interface TransactionData {
  id: number;
  propertyId: number | null;
  userId: number;
  ContractId: string;
  TransactionDate: string;
  TransactionReference: string;
  TransactionAmount: number;
  TransactionDRCR: string;
  TransactionDescription: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionApiResponse {
  success: boolean;
  data: {
    current_page: number;
    data: TransactionData[];
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

export interface TransactionParams {
  contractId: any;
  page?: number;
    search?: string;
  per_page?: number;

}
