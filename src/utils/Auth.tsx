// /utils/auth.tsx
import apiClient from "./AxiosInstance";
import { setIsLoggedIn, setToken, setEmail } from "../zustand/UserStore";

// Login function
export const login = async (
  email: string,
  password: string,
  setToast: Function,
  setIsLoggedIn: Function,
  setToken: Function,
  setEmail: Function
) => {
  try {
    const response = await apiClient.post("/login", { email, password });
    if (response.data.success) {
      setToken(response.data.token); // Save token in store
      setEmail(email);
      setIsLoggedIn(true);
      setToast("Login successful!", "success");
    } else {
      setToast(response.data.message, "error");
    }
  } catch (error) {
    setToast("Invalid credentials", "error");
    console.error("Login failed:", error);
  }
};

// Signup function
export const signup = async (
  fullName: string,
  email: string,
  phone: string,
  password: string,
  marketerReferralCode: string,
  setToast: Function
) => {
  console.log(fullName);
  try {
    const response = await apiClient.post("/register", {
      first_name: fullName,
      last_name: fullName,
      email: email,
      phone_number: phone,
      password: password,
      referral_code: marketerReferralCode,
    });
    if (response.data.success) {
      setToast("Signup successful!", "success");
    } else if (response.data.errors) {
      const errorMessages = Object.values(response.data.errors)
        .flat()
        .join("\n"); // Combine errors into a readable string
      setToast(errorMessages, "error");
    } else {
      setToast(response.data.message, "error");
    }
  } catch (error: any) {
    if (error.response && error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors)
        .flat()
        .join("\n"); // Extract and format error messages
      setToast(errorMessages, "error");
    } else {
      setToast("Something went wrong. Please try again.", "error");
    }
    console.error("Signup failed:", error);
  } finally {
    setToast("");
  }
};

// Reset password function (Example)
export const resetPassword = async (email: string, setToast: Function) => {
  try {
    const response = await apiClient.post("/reset-password", { email });
    if (response.data.success) {
      setToast("Password reset email sent!", "success");
    } else {
      setToast(response.data.message, "error");
    }
  } catch (error) {
    setToast("Error sending reset email", "error");
    console.error("Password reset failed:", error);
  }
};
