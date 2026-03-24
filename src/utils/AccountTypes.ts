// src/utils/AccountTypes.ts

export interface AccountDetail {
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  profile_image?: string;
  is_default?: boolean;
}

export interface FetchAccountsResponse {
  success: boolean;
  accounts: AccountDetail[];
}

export interface SwitchAccountResponse {
  success: boolean;
  token: string;
  message: string;
  account: AccountDetail;
}