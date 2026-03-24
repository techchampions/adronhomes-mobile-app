// src/data/types/UserAccountTypes.ts

export interface UserAccount {
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  profile_image?: string;
  is_default?: boolean;
}

export interface FetchUserAccountsResponse {
  success: boolean;
  accounts: UserAccount[];
}

export interface SwitchUserAccountResponse {
  success: boolean;
  token: string;
  message: string;
  account: UserAccount;
}