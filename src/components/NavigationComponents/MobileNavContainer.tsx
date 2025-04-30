import { FaHome, FaStore, FaPlus } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { RiAppsLine } from "react-icons/ri";
import MobileNavItem from "./MobileNavItem";
import { useState } from "react";
import Modal from "../DashboardComponents/Modal";
import Button from "../FormComponents/Button";

const BottomNav = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <nav className="fixed flex bottom-0  left-0 right-0 bg-white shadow-lg shadow-black py-4 px-2 md:hidden justify-around">
      <MobileNavItem
        label="Home"
        icon={<FaHome size={24} />}
        path="/dashboard"
      />
      <MobileNavItem
        label="Inventory"
        icon={<MdOutlineInventory size={24} />}
        path="/dashboard/inventory"
      />
      <button
        className="bg-brand text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg -mt-6"
        onClick={() => setShowModal(true)}
      >
        <FaPlus size={24} />
      </button>
      <MobileNavItem
        label="E-store"
        icon={<FaStore size={24} />}
        path="/dashboard/my-store"
        badgeCount={4} // Example badge for notifications
      />
      <MobileNavItem
        label="More"
        icon={<RiAppsLine size={24} />}
        path="/dashboard/more"
      />

      {/* Add Order Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        className="z-50"
      >
        <div className="flex flex-col items-center">
          <img src="/images/1171275266.png" alt="" className="w-[150px]" />
          <h2 className="text-2xl font-brand-bold mb-4 text-black">
            Create Order
          </h2>
          <p className="text-gray-600 mb-6">
            Please select if you are creating a new customer or existing
            customer order
          </p>
          <div className="flex flex-col justify-between w-full gap-2">
            <Button
              label="Existing User"
              className="bg-brand text-white px-4 py-2"
              onClick={() => {
                setShowModal(false);
                window.location.href = "/dashboard/add-order";
              }}
            />
            <Button
              label="New User"
              className="bg-brand-muted text-white px-4 py-2 w-full"
              onClick={() => {
                setShowModal(false);
                window.location.href = "/dashboard/add-order/existing";
              }}
            />
          </div>
        </div>
      </Modal>
    </nav>
  );
};

export default BottomNav;
