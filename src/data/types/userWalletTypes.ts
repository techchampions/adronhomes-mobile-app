export interface UserWalletResponse {
  status: string;
  wallet_balance: number;
  total_property: number;
  total_invoice: number;
  total_amount_paid: number;
  user_transactions: null;
  virtual_account: null;
}
