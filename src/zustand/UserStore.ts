// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import apiClient from "../utils/AxiosInstance";

// type UserState = {
//   firstName: string;
//   setFirstName: (firstName: string) => void;
//   lastName: string;
//   setLastName: (lastName: string) => void;
//   id: number;
//   setId: (id: number) => void;

//   email: string;
//   setEmail: (email: string) => void;
//   phoneNumber: string;
//   setPhoneNumber: (phone: string) => void;
//   role: string;
//   setRole: (role: string) => void;

//   gender: string;
//   setGender: (gender: string) => void;

//   referralCode: string;
//   setReferralCode: (code: string) => void;
//   country: string;
//   setCountry: (country: string) => void;
//   state: string;
//   setState: (state: string) => void;

//   lga: string;
//   setLga: (lga: string) => void;

//   token: string;
//   setToken: (token: string) => void;
//   isLoggedIn: boolean;
//   setIsLoggedIn: (status: boolean) => void;

//   createdAt: string;
//   setCreatedAt: (createdAt: string) => void;
//   updatedAt: string;
//   setUpdatedAt: (updatedAt: string) => void;

//   getUser: () => Promise<void>;

//   reset: () => void;
// };

// export const useUserStore = create<UserState>()(
//   persist(
//     (set, get) => ({
//       id: null,
//       setId: (id) => set({ id }),
//       email: "",
//       setEmail: (email) => set({ email }),
//       firstName: "",
//       setFirstName: (firstName) => set({ firstName: firstName }),
//       lastName: "",
//       setLastName: (lastName) => set({ lastName }),
//       phoneNumber: "",
//       setPhoneNumber: (phone) => set({ phoneNumber: phone }),
//       role: "",
//       setRole: (role) => set({ role }),
//       referralCode: "",
//       setReferralCode: (code) => set({ referralCode: code }),
//       country: "",
//       setCountry: (country) => set({ country }),
//       token: "",
//       setToken: (token) => set({ token }),
//       isLoggedIn: false,
//       setIsLoggedIn: (status) => set({ isLoggedIn: status }),

//       // GET USERS
//       getUser: async () => {
//         try {
//           const res = await apiClient.get("/plans");
//           set({
//             firstName: res.data.user.first_name,
//             lastName: res.data.user.last_name,
//             email: res.data.user.email,
//             phoneNumber: res.data.user.phone_number,
//             referralCode: res.data.user.referral_code,
//             role: res.data.user.role,
//           });
//         } catch (error) {
//           console.error("Failed to load plans:", error);
//         }
//       },

//       // RESET
//       reset: () =>
//         set({
//           id: null,
//           firstName: "",
//           lastName: "",
//           email: "",
//           phoneNumber: "",
//           role: "",
//           referralCode: "",
//           token: "",
//           isLoggedIn: false,
//           currentPlan: null,
//           availablePlans: [],
//           planStartDate: "",
//           planEndDate: "",
//           store: null,
//           items: [],
//           orders: [],
//           services: [],
//         }),
//     }),
//     {
//       name: "user-state",
//     }
//   )
// );
import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "../utils/AxiosInstance";

type User = {
  id: number;
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
  token: string;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  setIsLoggedIn: (status: boolean) => void;
  getUser: () => Promise<void>;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      isLoggedIn: false,

      setToken: (token) => set({ token }),
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),

      getUser: async () => {
        try {
          const response = await apiClient.get("/user-profile");
          if (response.data.success) {
            const userData = response.data.user;

            set({
              user: {
                id: userData.id,
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
        }
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
