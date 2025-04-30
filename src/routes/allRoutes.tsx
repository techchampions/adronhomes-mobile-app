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

const DashboardScreen = lazy(() => import("../pages/DashboardScreen"));

const AllRoutes = () => {
  const { show, message, type, hideToast } = useToastStore();
  const { hasCompletedOnboarding } = useOnboardingStore();
  const { isLoggedIn } = useUserStore();

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader className="h-[100px] w-[100px]" />}>
          <Routes>
            {/* Onboarding Logic */}
            {/* <Route
            path="/"
            element={
              !hasCompletedOnboarding ? (
                <OnboardingScreen />
              ) : isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          /> */}
            <Route
              path="/"
              element={<Navigate to={isLoggedIn ? "/" : "/auth"} replace />}
            />

            {/* Protected Routes - Dashboard */}
            <Route path="/" element={<ProtectedRoutes />}>
              <Route element={<DashboardScreen />}>
                <Route index element={<HomeScreen />} />
                <Route path="/wallet" element={<WalletScreen />} />
              </Route>
            </Route>

            {/* Login Route */}
            <Route
              path="/auth"
              element={isLoggedIn ? <Navigate to="/" /> : <OnboardingScreen />}
            />

            {/* Catch-All Redirect */}
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toast message={message} type={type} onClose={hideToast} />
    </>
  );
};

export default AllRoutes;
