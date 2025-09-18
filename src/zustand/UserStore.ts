import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "../utils/AxiosInstance";
import { AccountDetail } from "../data/types/AccountDetailsTypes";

export type User = {
  id: number;
  contract_id?: string | null;
  unique_customer_id: string;
  email: string;
  phone_number: string;
  referral_code: string;
  first_name: string;
  last_name: string;
  role: number;
  country: string | null;
  state: string | null;
  lga: string | null;
  otp_verified_at: string | null;
  email_verified_at: string | null;
  profile_picture: string | null;
  gender: string | null;
  notification_enabled: number;
  device_id: string;
  address: string | null;
  created_at: string;
  updated_at: string;
};

type UserState = {
  user: User | null;
  accounts: AccountDetail[];
  acceptCookies: boolean;
  token: string;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  setIsLoggedIn: (status: boolean) => void;
  setUser: (user: User) => void; // 👈 add this  getUser: () => Promise<void>;
  setAccounts: (accounts: AccountDetail[]) => void;
  setAcceptCookies: (accept: boolean) => void;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      isLoggedIn: false,
      acceptCookies: false,

      setToken: (token) => set({ token }),
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      setAcceptCookies: (accept) => set({ acceptCookies: accept }),
      setUser: (user) => set({ user }), // 👈 add this below setIsLoggedIn

      getUser: async () => {
        try {
          const response = await apiClient.get("/user-profile");
          if (response.data.success) {
            const userData = response.data.user;

            set({
              user: {
                id: userData.id,
                contract_id: userData.contract_id,
                unique_customer_id: userData.unique_customer_id,
                email: userData.email,
                phone_number: userData.phone_number,
                referral_code: userData.referral_code,
                first_name: userData.first_name,
                last_name: userData.last_name,
                role: userData.role,
                country: userData.country,
                state: userData.state,
                lga: userData.lga,
                otp_verified_at: userData.otp_verified_at,
                email_verified_at: userData.email_verified_at,
                profile_picture: userData.profile_picture,
                gender: userData.gender,
                notification_enabled: userData.notification_enabled,
                device_id: userData.device_id,
                address: userData.address,
                created_at: userData.created_at,
                updated_at: userData.updated_at,
              },
              isLoggedIn: true,
            });
            return response.data;
          }
        } catch (error) {
          console.error("Failed to load user data:", error);
          throw error; // Rethrow the error to handle it in the component
        }
      },

      accounts: [],
      setAccounts(accounts) {
        set({ accounts });
      },

      reset: () =>
        set({
          user: null,
          token: "",
          isLoggedIn: false,
        }),
    }),
    {
      name: "user-state",
    }
  )
);
