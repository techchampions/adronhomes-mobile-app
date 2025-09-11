import { ReactNode, Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { useUserStore } from "../zustand/UserStore";
import Loader from "../components/Loader";
import OnboardingScreen from "../pages/AuthScreen";
import ProtectedRoutes from "./protectedRoutes";
import WalletScreen from "../pages/WalletScreen";
import Toast from "../components/Toast";
import { useToastStore } from "../zustand/useToastStore";
import TransactionsPage from "../pages/TransactionScreen";
import NotificationsPage from "../pages/NotificationScreen";
import MyPropertyScreen from "../pages/MyPropertyScreen";
import NewPropertyScreen from "../pages/NewPropertyScreen";
import SavedPropertyScreen from "../pages/SavedPropertyScreen";
import MyProfileScreen from "../pages/MyProfileScreen";
import SupportScreen from "../pages/SupportScreen";
import Modal from "../components/Modal2";
import ProfileSettings from "../pages/AccountSettings";
import PropertyDetail from "../pages/PropertyDetail";
import InvestmentForm from "../pages/InvestInProperty";
import ProppertyAgreement from "../pages/ProppertyAgreement";
import PropertyPaymentMethod from "../pages/PropertyPaymentMethod";
import MyPropertyDetail from "../pages/MyPropertyDetail";
import MyPropertyPaymentList from "../pages/MyPropertyPaymentList";
import FAQAccordion from "../pages/FAQScreen";
import PropertySearchResultScreen from "../pages/PropertySearchResult";
import InvestmentDetailForm from "../pages/InvestmentDetailForm";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AuthRoutes from "./authRoutes";
import OTPScreen from "../pages/OTPScreen";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import { Layout } from "../components/onboardingMobileScreen/layout";
// import AdronSplashScreens, { AdronSplashScreensWrapper } from "../components/onboardingMobileScreen/pages/Stepscreens";
import PropertiesPage from "../components/onboardingMobileScreen/pages";
import { AdronSplashScreensWrapper } from "../components/onboardingMobileScreen/pages/Stepscreens";

const DashboardScreen = lazy(() => import("../pages/DashboardScreen"));

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const location = useLocation();
  const dash = location.pathname === "/dashboard";
  const prop = location.pathname.startsWith("/dashboard/properties");
  const paddingClass = dash || prop ? "px-0 md:px-4" : "px-4";
  
  return (
    <Layout>
      <div className={paddingClass}>{children}</div>
    </Layout>
  );
};



const AllRoutes = () => {
  const { message, type, hideToast } = useToastStore();
  const { hasCompletedOnboarding } = useOnboardingStore();
  const { isLoggedIn } = useUserStore();

  // Splash state
  const [hasSeenSplash, setHasSeenSplash] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage to see if the splash screens have been seen
    const seenSplash = localStorage.getItem("hasSeenSplash") === "true";
    setHasSeenSplash(seenSplash);
    setIsLoading(false);
  }, [isLoading,isLoggedIn]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-[100px] w-[100px]" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader className="h-[100px] w-[100px]" />}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={
                  isLoggedIn && hasCompletedOnboarding
                    ? "/dashboard"
                    : "/login"
                }
                replace
              />
            }
          />

          {/* Protected Routes - Dashboard */}
          <Route path="/dashboard/*" element={<ProtectedRoutes />}>
            <Route
              element={
                // Show splash screens if user is logged in and hasn't seen them yet
                isLoggedIn && !hasSeenSplash ? (
                  <AdronSplashScreensWrapper setHasSeenSplash={setHasSeenSplash} />
                ) : (
                  <ProtectedLayout>
                    <Outlet />
                  </ProtectedLayout>
                )
              }
            >
              <Route index element={<PropertiesPage />} />
              <Route path="wallet" element={<WalletScreen />} />
              <Route path="payments" element={<TransactionsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="my-properties" element={<MyPropertyScreen />} />
              <Route path="new-properties" element={<NewPropertyScreen />} />
              <Route
                path="search-properties"
                element={<PropertySearchResultScreen />}
              />
              <Route
                path="saved-properties"
                element={<SavedPropertyScreen />}
              />
              <Route path="my-profile" element={<MyProfileScreen />} />
              <Route path="settings" element={<ProfileSettings />} />
              <Route path="support" element={<SupportScreen />} />
              <Route path="properties/:id" element={<PropertyDetail />} />
              <Route
                path="invest-property-form/:id"
                element={<InvestmentDetailForm />}
              />
              <Route
                path="invest-property/:id"
                element={<InvestmentForm />}
              />
              <Route
                path="property-agreement/:id"
                element={<ProppertyAgreement />}
              />
              <Route
                path="property/:id/payment-method"
                element={<PropertyPaymentMethod />}
              />
              <Route path="my-property/:id" element={<MyPropertyDetail />} />
              <Route
                path="my-property/payment-list/:id"
                element={<MyPropertyPaymentList />}
              />
              <Route path="FAQs" element={<FAQAccordion />} />
            </Route>
          </Route>

          {/* Login & Auth Routes */}
          <Route path="/" element={<AuthRoutes />}>
            <Route path="/" element={<OnboardingScreen />}>
              <Route path="/login" index element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/verify-otp" element={<OTPScreen />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <Toast />
      <Modal />
    </BrowserRouter>
  );
};

export default AllRoutes;