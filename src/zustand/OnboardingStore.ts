import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "../utils/AxiosInstance";

type OnboardingState = {
  step:
    | "signup"
    | "login"
    | "verify OTP"
    | "forgot password"
    | "reset password"
    | "password reset success"
    | "signup completed"
    | "onboarding complete";
  setStep: (newStep: OnboardingState["step"]) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (newHasCompletedOnboarding: boolean) => void;
  reset: () => void;
};

// Persist step state in localStorage
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: "login", // Default step
      setStep: (newStep) => set({ step: newStep }),
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (newHasCompletedOnboarding) =>
        set({ hasCompletedOnboarding: newHasCompletedOnboarding }),

      reset: () =>
        set({
          step: "login",
          hasCompletedOnboarding: false,
        }),
    }),
    { name: "onboarding-state" } // Key for localStorage
  )
);
