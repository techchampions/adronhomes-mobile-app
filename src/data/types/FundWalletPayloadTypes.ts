export interface FundWalletPayload {
  amount: number;
  payment_method: string;
  sender_name: string;
  proof_of_payment?: File; // Add this
}
