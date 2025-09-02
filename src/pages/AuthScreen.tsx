import { Outlet, useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthComponents/AuthNav";
import Slideshow from "../components/AuthComponents/NewShildeshow";
import SmallLoader from "../components/SmallLoader";
import { useGetSlidersByType } from "../data/hooks";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { useUserStore } from "../zustand/UserStore";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import OTPScreen from "./OTPScreen";
import ResetPassword from "./ResetPassword";
import SignUp from "./SignUp";

const OnboardingScreen = () => {
  const { step } = useOnboardingStore();
  const { data: loginSlidesData, isLoading: isLoadingLogin } =
    useGetSlidersByType("login");
  const slides = loginSlidesData?.data || [];
  const navigate = useNavigate();

  const handleReset = () => {
    useUserStore.getState().reset(); // Reset user store
    useOnboardingStore.getState().reset(); // Reset onboarding store

    localStorage.removeItem("user-state"); // Clear persisted user state
    localStorage.removeItem("onboarding-state"); // Clear persisted onboarding state

    window.location.reload(); // Optional: Refresh page to clear UI state
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 fixed w-full">
      {/* Promo Section */}
      <div
        className="relative hidden md:block text-white h-screen bg-white"
        onClick={handleReset}
      >
        {/* <FadeSlideshow /> */}
        {isLoadingLogin ? (
          <SmallLoader />
        ) : (
          <Slideshow slides={slides} isloading={isLoadingLogin} />
        )}
        {/* <img
          src="/images/lemon-friday.png"
          alt="Lemon Friday Promo"
          className="w-full h-full"
        /> */}
      </div>

      {/* Signup Form Section */}
      <div className="bg-white flex flex-col max-h-[100vh] p-4 justify-between overflow-y-scroll">
        <div className="text-center mt-5">
          <img
            src="/images/logo.svg"
            alt="Adron Logo"
            className="mx-auto w-full h-[60px]"
          />
        </div>
        <div className="px-0 lg:px-24 py-4">
          <Outlet />
        </div>
        {/* <div className="px-0 lg:px-24 py-4">{stepContainer()}</div> */}
        <div className="w-full">
          <AuthNavbar />
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
