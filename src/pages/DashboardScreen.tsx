import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavigationContainer from "../components/NavigationComponents/NavigationContainer";
import MobileNavContainer from "../components/NavigationComponents/MobileNavContainer";
import Header from "../components/Header";
function DashboardScreen() {
  const [showModal, setShowModal] = useState(false);
  //   useEffect(() => {
  //     loadEverything();
  //   }, []);

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="hidden w-[300px] bg-adron-body text-adron-black md:flex flex-col">
        <NavigationContainer />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-adron-body overflow-y-auto mb-16 md:mb-0 py-5 px-4 md:px-0 md:pr-4 scrollbar-hide">
        <Header />
        <Outlet />
      </main>
      <div className="md:block fixed bottom-0 w-full">
        <MobileNavContainer />
      </div>
      {/* {showModal && (
        // <Modal show={showModal} onClose={() => setShowModal(false)}>
        //   <div className="text-2xl text-black">
        //     Create Order for New user or Existing user
        //   </div>
        // </Modal>
      )} */}
    </div>
  );
}

export default DashboardScreen;
