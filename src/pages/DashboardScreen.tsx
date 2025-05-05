import { Outlet } from "react-router-dom";
import NavigationContainer from "../components/NavigationComponents/NavigationContainer";
import MobileNavContainer from "../components/NavigationComponents/MobileNavContainer";
import Header from "../components/Header";
import MobileNav from "../components/NavigationComponents/MobileNav";
function DashboardScreen() {
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
      <main className="pt-[70px] md:pt-0 flex-1 bg-adron-body overflow-y-auto mb-16 md:mb-0 py-5 px-4 md:px-0 md:pr-4 scrollbar-hide">
        <Header />
        <Outlet />
      </main>
      <div className="md:block fixed bottom-0 w-full">
        <MobileNavContainer />
      </div>
    </div>
  );
}

export default DashboardScreen;
