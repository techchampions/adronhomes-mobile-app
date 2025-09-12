import { Outlet, useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthComponents/AuthNav";
import Slideshow from "../components/AuthComponents/NewShildeshow";
import SmallLoader from "../components/SmallLoader";
import { useGetSlidersByType } from "../data/hooks";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { useUserStore } from "../zustand/UserStore";

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
    <div className="h-screen max-h-screen w-full grid grid-cols-1 md:grid-cols-2 fixed overflow-hidden">
      {/* Promo Section */}
      <div
        className="relative hidden md:block text-white h-screen bg-white"
        onClick={handleReset}
      >
        {isLoadingLogin ? (
          <SmallLoader />
        ) : (
          <Slideshow slides={slides} isloading={isLoadingLogin} />
        )}
      </div>

      {/* Signup Form Section */}
      <div className="bg-white flex flex-col h-screen max-h-screen p4 justify-between overflow-hidden">
        <div className="px-4 sm:px-6  pt-4 sm:pt-6  flex justify-center">
          <img 
            src="/iconk.svg" 
            alt="Logo" 
            className="h-10 sm:h-12 md:h-14 w-auto max-w-[70%] sm:max-w-[180px]" 
          />
        </div>
        <div className=" flex justify-center  px-4 sm:px-6">
          <img 
            src="/loginh.svg" 
            alt="Login Illustration" 
            className="w-full max-w-[70%] sm:max-w-[300px] md:max-w-[350px] h-auto max-h-[30vh] sm:max-h-[35vh] object-contain" 
          />
        </div>
        <div className="px-0 sm:px-6 lg:px-16 overflow-y-auto">
          <Outlet />
        </div>
        <div className="w-full px-4 sm:px-6">
          <AuthNavbar />
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;