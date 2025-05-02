import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "../utils/AxiosInstance";

type Item = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
};

type Order = {
  id: string;
  items: Item[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
};

type Service = {
  id: string;
  name: string;
  description?: string;
  price?: number;
};

type Store = {
  id: string;
  name: string;
  description?: string;
  country?: string;
  state?: string;
  address?: string;
  logoUrl?: string;
  createdAt?: string;
};

type Plan = {
  id: string | number;
  name: string;
  features: string;
  price: number;
  duration: string;
  created_at?: string | null;
  updated_at?: string | null;
};

type UserState = {
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  id: number;
  setId: (id: number) => void;

  email: string;
  setEmail: (email: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  planID: string;
  setPlanID: (planId: string) => void;

  referralCode: string;
  setReferralCode: (code: string) => void;

  token: string;
  setToken: (token: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;

  currentPlan: Plan | null;
  availablePlans: Plan[];
  planStartDate: string;
  planEndDate: string;
  loadPlans: () => Promise<void>;

  store: Store | null;
  loadStore: () => Promise<void>;
  setStore: (store: Partial<Store>) => void;

  items: Item[];
  loadItems: () => Promise<void>;
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;

  orders: Order[];
  loadOrders: () => Promise<void>;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;

  services: Service[];
  loadServices: () => Promise<void>;
  setServices: (services: Service[]) => void;
  addService: (service: Service) => void;
  removeService: (id: string) => void;

  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      id: null,
      setId: (id) => set({ id }),
      email: "",
      setEmail: (email) => set({ email }),
      firstName: "",
      setFirstName: (firstName) => set({ firstName }),
      lastName: "",
      setLastName: (lastName) => set({ lastName }),
      phoneNumber: "",
      setPhoneNumber: (phone) => set({ phoneNumber: phone }),
      planID: "",
      setPlanID: (planID) => set({ planID }),
      referralCode: "",
      setReferralCode: (code) => set({ referralCode: code }),
      token: "",
      setToken: (token) => set({ token }),
      isLoggedIn: false,
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),

      // PLANS
      currentPlan: null,
      availablePlans: [],
      planStartDate: "",
      planEndDate: "",
      loadPlans: async () => {
        try {
          const res = await apiClient.get("/plans");
          const { current, plans, start_date, end_date } = res.data;
          set({
            currentPlan: current,
            availablePlans: plans,
            planStartDate: start_date,
            planEndDate: end_date,
            email: res.data.email,
          });
        } catch (error) {
          console.error("Failed to load plans:", error);
        }
      },

      // STORE
      store: null,
      setStore: (storeUpdates) =>
        set((state) => ({
          store: {
            ...state.store,
            ...storeUpdates,
          },
        })),
      loadStore: async () => {
        try {
          const res = await apiClient.get("/user-profile");
          const uncleanLogoUrl = res.data.user.store.store_images; // String with escaped characters
          const parsedLogoUrl = JSON.parse(uncleanLogoUrl);
          const cleanLogoUrl = parsedLogoUrl[0].replace(/\\\//g, "/"); // Clean up URL
          set({
            store: {
              id: res.data.user.store.id,
              name: res.data.user.store.store_name,
              description: res.data.user.store.store_description,
              country: res.data.user.store.country,
              state: res.data.user.store.state,
              address: res.data.user.store.store_location,
              logoUrl: cleanLogoUrl,
              createdAt: res.data.user.store.created_at,
            },
          });
        } catch (error) {
          console.error("Failed to load store:", error);
        }
      },

      // ITEMS
      items: [],
      setItems: (items) => set({ items }),
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      loadItems: async () => {
        try {
          const res = await apiClient.get("/estore/get-item-service");
          set({ items: res.data.Items });
        } catch (error) {
          console.error("Failed to load items:", error);
        }
      },

      // ORDERS
      orders: [],
      setOrders: (orders) => set({ orders }),
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        })),
      loadOrders: async () => {
        try {
          const res = await apiClient.get("orders/processing");
          set({ orders: res.data });
        } catch (error) {
          console.error("Failed to load orders:", error);
        }
      },

      // SERVICES
      services: [],
      setServices: (services) => set({ services }),
      addService: (service) =>
        set((state) => ({ services: [...state.services, service] })),
      removeService: (id) =>
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        })),
      loadServices: async () => {
        try {
          const res = await apiClient.get("/service");
          set({ services: res.data });
        } catch (error) {
          console.error("Failed to load services:", error);
        }
      },

      // RESET
      reset: () =>
        set({
          id: null,
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          planID: "",
          referralCode: "",
          token: "",
          isLoggedIn: false,
          currentPlan: null,
          availablePlans: [],
          planStartDate: "",
          planEndDate: "",
          store: null,
          items: [],
          orders: [],
          services: [],
        }),
    }),
    {
      name: "user-state",
    }
  )
);
