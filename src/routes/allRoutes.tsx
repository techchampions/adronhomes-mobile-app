import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { useUserStore } from "../zustand/UserStore";
import Loader from "../components/Loader";
import OnboardingScreen from "../pages/AuthScreen";
import ProtectedRoutes from "./protectedRoutes";
import HomeScreen from "../pages/HomeScreen";

const DashboardScreen = lazy(() => import("../pages/DashboardScreen"));

const AllRoutes = () => {
  const { hasCompletedOnboarding } = useOnboardingStore();
  const { isLoggedIn } = useUserStore();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader className="h-[100px] w-[100px]" />}>
        <Routes>
          {/* Onboarding Logic */}
          <Route
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
          />

          {/* Protected Routes - Dashboard */}
          <Route path="/" element={<ProtectedRoutes />}>
            <Route element={<DashboardScreen />}>
              <Route index element={<HomeScreen />} />
            </Route>
          </Route>

          {/* Login Route */}
          <Route path="/auth" element={<OnboardingScreen />} />

          {/* Catch-All Redirect */}
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AllRoutes;
