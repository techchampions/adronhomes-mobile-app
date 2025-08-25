import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/UserStore";
import { useOnboardingStore } from "../zustand/OnboardingStore";

const AuthRoutes = () => {
  const { isLoggedIn } = useUserStore();
  const { hasCompletedOnboarding } = useOnboardingStore();

  return !isLoggedIn && !hasCompletedOnboarding ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};
export default AuthRoutes;
