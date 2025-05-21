import { Outlet, useLocation } from "react-router-dom";
import NavigationContainer from "../components/NavigationComponents/NavigationContainer";
import MobileNavContainer from "../components/NavigationComponents/MobileNavContainer";
import Header from "../components/Header";
import MobileNav from "../components/NavigationComponents/MobileNav";
import { useGetUser } from "../data/hooks";

const routeTitles = {
  "/": "Dashboard",
  "/wallet": "My Wallet",
  "/transactions": "Transactions",
  "/my-properties": "My Properties",
  "/my-property": "My Property",
  "/my-properties/:id/payment-list": "My Properties",
  "/new-properties": "New Properties",
  "/saved-properties": "Saved Properties",
  "/my-profile": "My Profile",
  "/notifications": "Notifications",
  "/settings": "Account Settings",
  "/support": "Support",
};
function getPageTitle(pathname) {
  if (pathname.startsWith("/my-properties/")) {
    return "My Property";
  }
  if (
    pathname.startsWith("/my-property/") &&
    pathname.includes("/payment-list")
  ) {
    return "Payment List";
  }
  if (pathname.startsWith("/my-property/")) {
    return "My Property";
  }

  return routeTitles[pathname] || "Dashboard";
}
function DashboardScreen() {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const { data, isLoading, isError } = useGetUser();
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="hidden w-[300px] bg-adron-body text-adron-black md:flex flex-col">
        <NavigationContainer />
      </aside>
      <aside className="flex flex-col md:hidden">
        <MobileNav />
      </aside>

      {/* Main Content */}
      <main className="pt-[70px] md:pt-0 flex-1 bg-adron-body overflow-y-auto mb-0 py-5 px-4 md:px-0 md:pr-4 scrollbar-hide">
        <Header pageTitle={pageTitle} />
        <Outlet />
      </main>
      {/* <div className="md:block fixed bottom-0 w-full">
        <MobileNavContainer />
      </div> */}
    </div>
  );
}

export default DashboardScreen;
