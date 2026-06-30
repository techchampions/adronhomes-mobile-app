import { ReactNode, Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Loader from "../components/Loader";
import Modal from "../components/Modal2";
import Toast from "../components/Toast";
import { Layout } from "../components/onboardingMobileScreen/layout";
import { AdronSplashScreensWrapper } from "../components/onboardingMobileScreen/pages/Stepscreens";
import ProfileSettings from "../pages/AccountSettings";
import OnboardingScreen from "../pages/AuthScreen";
import FAQAccordion from "../pages/FAQScreen";
import ForgotPassword from "../pages/ForgotPassword";
import InvestmentForm from "../pages/InvestInProperty";
import InvestmentDetailForm from "../pages/InvestmentDetailForm";
import Login from "../pages/Login";
import MyProfileScreen from "../pages/MyProfileScreen";
import MyPropertyDetail from "../pages/MyPropertyDetail";
import MyPropertyPaymentList from "../pages/MyPropertyPaymentList";
import MyPropertyScreen from "../pages/MyPropertyScreen";
import NewPropertyScreen from "../pages/NewPropertyScreen";
import NotificationsPage from "../pages/NotificationScreen";
import OTPScreen from "../pages/OTPScreen";
import PropertyDetail from "../pages/PropertyDetail";
import PropertyPaymentMethod from "../pages/PropertyPaymentMethod";
import PropertySearchResultScreen from "../pages/PropertySearchResult";
import ProppertyAgreement from "../pages/ProppertyAgreement";
import ResetPassword from "../pages/ResetPassword";
import SavedPropertyScreen from "../pages/SavedPropertyScreen";
import SignUp from "../pages/SignUp";
import SupportScreen from "../pages/SupportScreen";
import TransactionsPage from "../pages/TransactionScreen";
import WalletScreen from "../pages/WalletScreen";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { useUserStore } from "../zustand/UserStore";
import { useToastStore } from "../zustand/useToastStore";
import AuthRoutes from "./authRoutes";
import ProtectedRoutes from "./protectedRoutes";
// import PropertiesPage from "../components/onboardingMobileScreen/pages";
import HomeScreen from "../pages/HomeScreen";
import ScrollToTop from "./ScrollToTop";
// import HomeNoLogin from "../components/onboardingMobileScreen/pages/homloginpage";
import communityRoutes from "../components/CommunityDashboardtwo/CommunityRoutes";
import AccountsPage from "../components/onboardingMobileScreen/accountsPage";
import { LoginHeader } from "../components/onboardingMobileScreen/onboardingComponents/loginheader";
import PropertiesPage from "../components/onboardingMobileScreen/pages";
import NewPropertyScreennoauth from "../components/onboardingMobileScreen/pages/NewPropertyScreen";
import HomeNoLogin from "../components/onboardingMobileScreen/pages/homloginpage";
import ContractDetailsPage from "../components/onboardingMobileScreen/pages/mycontracts/contractview";
import ContactPage from "../components/onboardingMobileScreen/pages/mycontracts/mycontracts";
import ContractsPage from "../components/onboardingMobileScreen/pages/mycontracts/transactiontable";
// import ScrollToTop from "./ScrollToTop";

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

// The main component that manages all routing logic
const AllRoutes = () => {
  const { hasCompletedOnboarding } = useOnboardingStore();
  const { isLoggedIn } = useUserStore();
  const { message, type, hideToast } = useToastStore();

  return (
    <BrowserRouter>
      <ScrollToTop /> 
      <Suspense fallback={<Loader className="h-[100px] w-[100px]" />}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} replace />}
          />

          {/* Protected Routes - Dashboard */}
          <Route path="/dashboard/*" element={<ProtectedRoutes />}>
            <Route
              element={
                <ProtectedLayout>
                  <Outlet />
                </ProtectedLayout>
              }
            >
              <Route index element={<PropertiesPage />} />

              <Route path="accounts" element={<AccountsPage />} />
              <Route path="home" element={<HomeScreen />} />
              <Route path="wallet" element={<WalletScreen />} />
              <Route path="payments" element={<TransactionsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="my-properties" element={<MyPropertyScreen />} />
              <Route path="new-properties" element={<NewPropertyScreen />} />
              <Route path="my-property/:id" element={<MyPropertyDetail />} />
              <Route
                path="search-properties"
                element={<PropertySearchResultScreen />}
              />

              <Route path="my-contracts" element={<ContactPage />} />
              <Route
                path="view-contract/:id"
                element={<ContractDetailsPage />}
              />
              <Route path="view-transacions/:id" element={<ContractsPage />} />

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
              <Route path="invest-property/:id" element={<InvestmentForm />} />
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
              {communityRoutes}
            </Route>
          </Route>

          {/* Login & Auth Routes */}
          <Route path="/" element={<AuthRoutes />}>
            <Route element={<LoginHeader />}>
              <Route index element={<HomeNoLogin />} />
              <Route
                path="adrone-properties/:id"
                element={<PropertyDetail />}
              />
              <Route
                path="all-properties"
                element={<NewPropertyScreennoauth />}
              />
              <Route
                path="/unauth/dashboard/properties/:id"
                element={<PropertyDetail />}
              />
            </Route>

            {/* Routes wrapped in OnboardingScreen */}
            <Route element={<OnboardingScreen />}>
              <Route path="/login" element={<Login />} />
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

const AppWrapper = () => {
  const [hasSeenSplash, setHasSeenSplash] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage to see if the splash screens have been seen
    const seenSplash = localStorage.getItem("hasSeenSplash") === "true";
    setHasSeenSplash(seenSplash);
    setIsLoading(false);
  }, []);

  // Show a full-page loader if the app is still initializing
  if (isLoading || hasSeenSplash === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-[100px] w-[100px]" />
      </div>
    );
  }

  // Show splash screens if the user hasn't seen them yet
  if (!hasSeenSplash) {
    return (
      <AdronSplashScreensWrapper
        setHasSeenSplash={() => {
          localStorage.setItem("hasSeenSplash", "true");
          setHasSeenSplash(true);
        }}
      />
    );
  }

  return <AllRoutes />;
};

export default AppWrapper;
