// components/AccessCodeSection.tsx
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import AccessCodeList from "./AccessCodeList";
import GenerateAccessCode from "./GenerateAccessCode";

const AccessCodeSection: React.FC = () => {
  const context: CommunityOutletContext = useOutletContext();
  const codes = context.data?.active_access_codes.data || [];
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Access Codes</h3>
          <p className="text-sm text-gray-500 mt-1">
            Manage community access and security
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-[#79B833] to-[#8FD14F] text-white rounded-xl hover:shadow-lg hover:shadow-[#79B833]/30 transition-all duration-200 flex items-center space-x-2"
        >
          <FiPlus className="w-5 h-5" />
          <span>Generate Code</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-2xl font-bold text-gray-800">4</p>
          <p className="text-sm text-gray-500">Total Codes</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-2xl font-bold text-green-600">4</p>
          <p className="text-sm text-gray-500">Active</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-2xl font-bold text-yellow-600">4</p>
          <p className="text-sm text-gray-500">Expiring Soon</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-2xl font-bold text-red-600">4</p>
          <p className="text-sm text-gray-500">Expired</p>
        </div>
      </div>

      {/* Code List */}
      <AccessCodeList accessCodes={codes} />
      {/* Modal */}
      {showModal && <GenerateAccessCode setShowModal={setShowModal} />}
    </div>
  );
};

export default AccessCodeSection;
