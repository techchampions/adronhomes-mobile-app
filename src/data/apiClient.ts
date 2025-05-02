import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
};

const apiClient: AxiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  baseURL: "http://adron.microf10.sg-host.com/api/",
  headers: {
    "Content-Type": "application/json",
    // "identifier": process.env.NEXT_PUBLIC_IDENTIFIER || "",
    identifier: "dMNOcdMNOPefFGHIlefFGHIJKLmno",
    // "device_id": process.env.NEXT_PUBLIC_X_DEVICE_ID || "",
    device_id: 1234567,
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
