import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { useUserStore } from "../zustand/UserStore";
import { ApiError } from "./api";

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

// apiClient.interceptors.response.use(
//   (response: AxiosResponse<ApiResponse>) => {
//     return response;
//   },
//   (error: ApiError) => {
//     const errorMessage =
//       error?.response?.data?.message ||
//       error?.message ||
//       "Something went wrong";

//     console.error("API Error:", errorMessage);
//     console.error("API Error2:", error);
//     return Promise.reject(error);
//   }
// );

// Interceptor to attach token if available
apiClient.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
