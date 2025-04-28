import axios from "axios";
import { useUserStore } from "../zustand/UserStore";
export const baseURL = import.meta.env.VITE_BASE_URL;
export const identifier = import.meta.env.VITE_IDENTIFIER;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "https://microf10.sg-host.com/api", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
    identifier: identifier,
  },
});

// Interceptor to attach token if available
apiClient.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  // const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
