import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { useUserStore } from "../zustand/UserStore";
import Loader from "../components/Loader";
import OnboardingScreen from "../pages/AuthScreen";
import ProtectedRoutes from "./protectedRoutes";
import HomeScreen from "../pages/HomeScreen";
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

const DashboardScreen = lazy(() => import("../pages/DashboardScreen"));

const AllRoutes = () => {
  const { message, type, hideToast } = useToastStore();
  const { hasCompletedOnboarding } = useOnboardingStore();
  const { isLoggedIn } = useUserStore();

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader className="h-[100px] w-[100px]" />}>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={isLoggedIn && hasCompletedOnboarding ? "/" : "/auth"}
                  replace
                />
              }
            />

            {/* Protected Routes - Dashboard */}
            <Route path="/" element={<ProtectedRoutes />}>
              <Route element={<DashboardScreen />}>
                <Route index element={<HomeScreen />} />
                <Route path="/wallet" element={<WalletScreen />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/my-properties" element={<MyPropertyScreen />} />
                <Route path="/new-properties" element={<NewPropertyScreen />} />
                <Route
                  path="/search-properties"
                  element={<PropertySearchResultScreen />}
                />
                <Route
                  path="/saved-properties"
                  element={<SavedPropertyScreen />}
                />
                <Route path="/my-profile" element={<MyProfileScreen />} />
                <Route path="/settings" element={<ProfileSettings />} />
                <Route path="/support" element={<SupportScreen />} />
                <Route
                  path="/properties/:id"
                  element={<PropertyDetail />}
                />{" "}
                <Route
                  path="/invest-property/:id"
                  element={<InvestmentForm />}
                />{" "}
                <Route
                  path="/property-agreement/:id"
                  element={<ProppertyAgreement />}
                />{" "}
                <Route
                  path="/property/:id/payment-method"
                  element={<PropertyPaymentMethod />}
                />{" "}
                <Route path="/my-property/:id" element={<MyPropertyDetail />} />
                <Route
                  path="/my-property/payment-list/:id"
                  element={<MyPropertyPaymentList />}
                />
                <Route path="/FAQs" element={<FAQAccordion />} />
              </Route>
            </Route>

            {/* Login Route */}
            <Route
              path="/auth"
              element={
                isLoggedIn && hasCompletedOnboarding ? (
                  <Navigate to="/" />
                ) : (
                  <OnboardingScreen />
                )
              }
            />

            {/* Catch-All Redirect */}
            {/* <Route path="*" element={<Navigate to="/auth" />} /> */}
          </Routes>
        </Suspense>
        {/* <Toast message={message} type={type} onClose={hideToast} /> */}
        <Toast />
        <Modal />
      </BrowserRouter>
    </>
  );
};

export default AllRoutes;
