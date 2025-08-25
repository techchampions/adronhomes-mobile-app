// import { Navigate, Outlet } from "react-router-dom";
// import { useUserStore } from "../zustand/UserStore";

// const ProtectedRoutes = () => {
//   const { isLoggedIn } = useUserStore();
//   // Redirect UNAUTHENTICATED users to login
//   return isLoggedIn ? <Outlet /> : <Navigate to="/auth" replace />;
// };

// export default ProtectedRoutes;
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "../zustand/UserStore";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useUserStore();

  const location = useLocation();
  const from = location.state?.from?.pathname;
  console.log(from);

  // Redirect UNAUTHENTICATED users to login with return URL
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

};

export default ProtectedRoutes;
