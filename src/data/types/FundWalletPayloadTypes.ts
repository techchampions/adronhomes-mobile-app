export interface FundWalletPayload {
  amount: number;
  payment_method: string;
  bank_name: string;
  proof_of_payment?: File; // Add this
}
