export interface PayForContractRequest {
  amount: number;
  payment_type: 'interswitch' | 'virtual_wallet';
  contract_id: any;
}

export interface PayForContractResponse {
  success: boolean;
  message: string;
  data?: {
    transaction_id?: string;
    reference?: string;
    [key: string]: any;
  };
}
