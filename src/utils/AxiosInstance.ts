import axios from "axios";
import { useUserStore } from "../zustand/UserStore";
import https from "https";
export const baseURL = import.meta.env.VITE_BASE_URL;
export const identifier = import.meta.env.VITE_IDENTIFIER;

// const agent = new https.Agent({
//   rejectUnauthorized: false, // This will bypass SSL validation
// });
// Create an Axios instance
const apiClient = axios.create({
  // baseURL: baseURL, // Replace with your actual API URL
  baseURL: "http://adron.microf10.sg-host.com/api", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
    identifier: identifier,
  },
  // httpsAgent: agent,
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
