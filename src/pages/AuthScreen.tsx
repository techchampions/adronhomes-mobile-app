// OnboardingScreen.tsx
import { Outlet, useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthComponents/AuthNav";
import Slideshow from "../components/AuthComponents/NewShildeshow";
import SmallLoader from "../components/SmallLoader";
import { useGetSlidersByType } from "../data/hooks";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { useUserStore } from "../zustand/UserStore";
import { useState } from "react";
import AccountSelect from "./AccountSelect";

const OnboardingScreen = () => {
  const { step: onboardingStep } = useOnboardingStore();
  const [loginStep, setLoginStep] = useState<"login" | "select">("login");
  const [userAccounts, setUserAccounts] = useState([]);
  const [authValues, setAuthValues] = useState({ email: "", password: "" });
  const { data: loginSlidesData, isLoading: isLoadingLogin } =
    useGetSlidersByType("login");
  const slides = loginSlidesData?.data || [];
  const navigate = useNavigate();

  const handleReset = () => {
    useUserStore.getState().reset();
    useOnboardingStore.getState().reset();
    localStorage.removeItem("user-state");
    localStorage.removeItem("onboarding-state");
    window.location.reload();
  };

  return (
    <div className="h-screen max-h-screen w-full grid grid-cols-1 md:grid-cols-2 fixed overflow-hidden">
      {/* Promo Section */}
      <div
        className="relative hidden md:block text-white h-screen bg-white overflow-hidden"
        onClick={handleReset}
      >
        {isLoadingLogin ? (
          <SmallLoader />
        ) : (
          <Slideshow slides={slides} isloading={isLoadingLogin} />
        )}
      </div>

      {/* Signup Form Section - This container now handles all scrolling */}
      <div className="bg-white flex flex-col h-screen max-h-screen overflow-y-auto">
        <div className="px-4 sm:px-6 pt-4 sm:pt-6 flex justify-center flex-shrink-0">
          <img
            src="/iconk.svg"
            alt="Logo"
            className="h-10 sm:h-12 md:h-14 w-auto max-w-[70%] sm:max-w-[180px]"
          />
        </div>

        {/* Conditionally render illustration based on step */}
        {loginStep === "login" && (
          <div className="flex justify-center px-4 sm:px-6 flex-shrink-0 mb-[-20%]">
            <img
              src="/loginh.svg"
              alt="Login Illustration"
              className="w-full max-w-[70%] sm:max-w-[60%] md:max-w-[60%] h-auto max-h-[60%] sm:max-h-[65%] object-contain"
            />
          </div>
        )}

        {/* Form content - removed overflow-y-auto to prevent double scrolling */}
        <div className="px-0 sm:px-6 lg:px-16 pb-8">
          {loginStep === "select" ? (
            <AccountSelect users={userAccounts} values={authValues} />
          ) : (
            <Outlet
              context={{
                onStepChange: setLoginStep,
                setUserAccounts,
                setAuthValues,
              }}
            />
          )}
        </div>

        <div className="w-full px-4 sm:px-6 pb-6 flex-shrink-0">
          {/* <AuthNavbar /> */}
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
