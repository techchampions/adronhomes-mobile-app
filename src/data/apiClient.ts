import axios, { AxiosInstance } from "axios";
import { useUserStore } from "../zustand/UserStore";
import { ApiError } from "./api";
import Auth from "../utils/Auth";
import { baseURL, identifier } from "../utils/AxiosInstance";

type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
};

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    identifier,
    device_id: 1234567,
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: ApiError) => {
    if (error.status === 401) {
      Auth.sessionExpire();
    }
    return Promise.reject(error);
  }
);

// Interceptor to attach token if available
apiClient.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
