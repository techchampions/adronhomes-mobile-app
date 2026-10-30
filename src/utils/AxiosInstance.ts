import axios from "axios";
import { useUserStore } from "../zustand/UserStore";

const configuredBase = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_BASE_URL ||
  ""
).replace(/\/+$/, "");

export const baseURL = configuredBase.endsWith("/api")
  ? configuredBase
  : `${configuredBase}/api`;
export const identifier = import.meta.env.VITE_IDENTIFIER;

const apiClient = axios.create({
  baseURL,
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
