import { Transaction, TransactionStatus } from "./userTransactionsTypes";
export interface WalletTransaction {
  id: number;
  property_id: number;
  user_id: number;
  plan_id: number;
  amount: number;
  amount_paid: number;
  description: string;
  transaction_type: string;
  payment_type: string;
  transaction_method: string;
  reference: string;
  created_at: string | null;
  updated_at: string | null;
  status: TransactionStatus | null;
  // property: Property;
  // bank_name: string;
  beneficiary_name: string;
  purpose: string;
}

export interface TransactionByIDResponse {
  success: boolean;
  user_transaction: Transaction;
}

export interface WalletTransactionByIDResponse {
  status: boolean;
  message: string;
  data: WalletTransaction;
}
