export type TransactionStatus = 0 | 1 | 2;

export interface Property {
  id: number;
  name: string;
  price: number;
  size: string;
  display_image: string;
  lga: string;
  state: string;
}

export interface Transaction {
  id: number;
  property_id: number;
  user_id: number;
  plan_id: number;
  amount: number;
  transaction_type: string;
  created_at: string | null;
  updated_at: string | null;
  status: TransactionStatus;
  property: Property;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface UserTransactions {
  current_page: number;
  data: Transaction[];
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

export interface UserTransactionResponse {
  success: boolean;
  wallet_balance: number;
  total_invoice: number;
  total_amount_paid: number;
  user_transactions: UserTransactions;
}
