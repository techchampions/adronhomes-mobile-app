import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/UserStore";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useUserStore();

  // Redirect UNAUTHENTICATED users to login
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoutes;
