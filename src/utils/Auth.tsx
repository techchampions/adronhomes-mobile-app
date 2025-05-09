// /utils/auth.tsx
import apiClient from "./AxiosInstance";
import { useUserStore } from "../zustand/UserStore";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { useToastStore } from "../zustand/useToastStore";

const { showToast } = useToastStore.getState();
const { setHasCompletedOnboarding, setStep } = useOnboardingStore.getState();
const { setToken, setIsLoggedIn, getUser } = useUserStore.getState();

const handleResendOTP = async () => {
  try {
    const response = await apiClient.post("/resend-otp");

    if (response.data.success) {
      showToast("OTP resent successfully!", "success");
      localStorage.setItem("otp", response.data.otp);
      console.log(response.data.otp);
    } else {
      throw new Error("Failed to resend OTP");
    }
  } catch (error) {
    showToast("Failed to resend OTP. Please try again.", "error");
  }
};

const login = async (
  values: {
    email: string;
    password: string;
  },
  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  try {
    const response = await apiClient.post("/login", {
      email: values.email,
      password: values.password,
    });

    if (response.data.success && response.data.otpVerified) {
      showToast("User LoggedIn successfully!", "success");
      setToken(response.data.token); // Save token in store
      await getUser();
      setHasCompletedOnboarding(true); // Set onboarding state in store
      setIsLoggedIn(true); // Set logged-in state in store
      setStep("onboarding complete");
    } else if (response.data.success && !response.data.otpVerified) {
      showToast(
        "User LoggedIn successfully!... please verify account",
        "success"
      );
      setToken(response.data.token); // Save token in store
      setIsLoggedIn(true); // Set logged-in state in store
      await getUser();
      handleResendOTP();
      setStep("verify OTP");
    } else if (response.data.errors) {
      const errorMessages = Object.values(response.data.errors)
        .flat()
        .join("\n"); // Combine errors into a readable string
      showToast(errorMessages, "error");
    } else if (response.data.message) {
      showToast(response.data.message, "error");
    }
  } catch (error: any) {
    if (error.response && error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors)
        .flat()
        .join("\n"); // Extract and format error messages
      showToast(errorMessages, "error");
    } else {
      showToast("An unexpected error occurred. Please try again.", "error");
    }
    console.error("Login failed:", error);
  } finally {
    setSubmitting(false);
  }
};

const register = async (
  values: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    marketerReferralCode: string;
  },
  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  try {
    const [firstName, lastName] = values.fullName.trim().split(" ");

    // If only one name is provided (i.e., no space), handle it as a single part name
    const userFirstName = firstName || "";
    const userLastName = lastName || "";

    const response = await apiClient.post("/register", {
      first_name: userFirstName,
      last_name: userLastName,
      email: values.email,
      phone_number: values.phone,
      password: values.password,
      referral_code: values.marketerReferralCode,
    });

    if (response.data.success) {
      setToken(response.data.token); // Save token in store
      showToast("User registered successfully!", "success");
      await getUser();
      // setEmail(response.data.user.email);
      // setFirstName(response.data.user.first_name);
      // setLastName(response.data.user.last_name);
      // setReferralCode(response.data.user.referral_code);
      // setPhoneNumber(response.data.user.phone_number);
      // setId(response.data.user.id);
      localStorage.setItem("otp", response.data.otp.otp);
      console.log(response.data.otp.otp); // Save OTP for verification
      setStep("verify OTP");
    } else if (response.data.errors) {
      const errorMessages = Object.values(response.data.errors)
        .flat()
        .join("\n"); // Combine errors into a readable string
      showToast(errorMessages, "error");
    }
  } catch (error: any) {
    if (error.response && error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors)
        .flat()
        .join("\n"); // Extract and format error messages
      showToast(errorMessages, error);
    } else {
      showToast("An unexpected error occurred. Please try again.", "error");
    }
    console.error("Signup failed:", error);
  } finally {
    setSubmitting(false);
  }
};

const logout = () => {
  useUserStore.getState().reset(); // Reset user store
  useOnboardingStore.getState().reset(); // Reset onboarding store

  localStorage.removeItem("user-state"); // Clear persisted user state
  localStorage.removeItem("onboarding-state"); // Clear persisted onboarding state

  window.location.reload(); // Optional: Refresh page to clear UI state
  showToast("Logged out successfully!", "success"); // Show logout success message
};

const handleResetPassword = async (
  values: {
    OTP: number;
    password: string;
    confirmPassword: string;
  },
  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  try {
    const response = await apiClient.post("/change-password", {
      otp: values.OTP,
      password: values.password,
      password_confirmation: values.confirmPassword,
    });

    if (response.data.success) {
      showToast("Password changed successfully", "success");
      setStep("login");
    } else if (response.data.errors) {
      const errorMessages = Object.values(response.data.errors)
        .flat()
        .join("\n"); // Combine errors into a readable string
      showToast(errorMessages, "error");
    } else if (response.data.message) {
      showToast(response.data.message, "error");
    }
  } catch (error: any) {
    if (error.response && error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors)
        .flat()
        .join("\n"); // Extract and format error messages
      showToast(errorMessages, "error");
    } else {
      showToast("Something went wrong. Please try again.", "error");
    }
    console.error("Password Reset Failed:", error);
  } finally {
    setSubmitting(false);
  }
};
const handleForgotpassword = async (
  values: {
    email: string;
  },
  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  try {
    const response = await apiClient.post("/forget-password", {
      email: values.email,
    });

    if (response.data.success) {
      showToast("OTP sent to email successfully", "success");
      setStep("reset password");
    } else if (response.data.errors) {
      const errorMessages = Object.values(response.data.errors)
        .flat()
        .join("\n"); // Combine errors into a readable string
      showToast(errorMessages, "error");
    } else if (response.data.message) {
      showToast(response.data.message, "error");
    }
  } catch (error: any) {
    if (error.response && error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors)
        .flat()
        .join("\n"); // Extract and format error messages
      showToast(errorMessages, "error");
    } else {
      showToast("Something went wrong. Please try again.", "error");
    }
    console.error("Password Reset Failed:", error);
  } finally {
    setSubmitting(false);
  }
};

// Login function
const Auth = {
  login,
  register,
  logout,
  handleResendOTP,
  handleResetPassword,
  handleForgotpassword,
};
export default Auth;
