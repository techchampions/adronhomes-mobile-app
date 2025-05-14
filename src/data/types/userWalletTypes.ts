import { Transaction } from "./userTransactionsTypes";

export type Status = 0 | 1 | 2;
export interface VirtualAccount {
  id: number;
  account_name: string;
  account_number: string;
  account_bank: string;
  account_balance: number;
  user_id: number;
  is_deactivated: Status;
  created_at: string;
  updated_at: string;
}
export interface UserWalletResponse {
  status: string;
  wallet_balance: number;
  total_property: number;
  total_invoice: number;
  total_amount_paid: number;
  user_transactions: Transaction[];
  virtual_account: VirtualAccount;
}
