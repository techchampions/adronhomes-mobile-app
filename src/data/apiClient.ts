import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { useUserStore } from "../zustand/UserStore";
import { ApiError } from "./api";
import Auth from "../utils/Auth";

type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
};

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://adron.microf10.sg-host.com/api/",
  headers: {
    "Content-Type": "application/json",
    identifier: "dMNOcdMNOPefFGHIlefFGHIJKLmno",
    device_id: 1234567,
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: ApiError) => {
    if (error.status === 401) {
      Auth.logout();
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
