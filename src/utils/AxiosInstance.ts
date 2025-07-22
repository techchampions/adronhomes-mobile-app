import axios from "axios";
import { useUserStore } from "../zustand/UserStore";
export const baseURL = import.meta.env.VITE_BASE_URL;
export const identifier = import.meta.env.VITE_IDENTIFIER;

const apiClient = axios.create({
  // baseURL: "https://adron.microf10.sg-host.com/api", // Replace with your actual API URL
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    identifier: identifier,
  },
});

// Interceptor to attach token if available
apiClient.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
