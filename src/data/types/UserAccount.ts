export interface UserAccount {
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  profile_image: string | null;
    is_default: boolean;
}