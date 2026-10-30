// components/AccessCodeSection.tsx
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import { AccessCodeStatusFilter } from "../../hooks/estateCommunity/useEstateCommunity";
import AccessCodeList from "./AccessCodeList";
import AccessCodesModal from "./AccessCodesModal";
import GenerateAccessCode from "./GenerateAccessCode";

const AccessCodeSection: React.FC = () => {
  const context: CommunityOutletContext = useOutletContext();
  const codes = context.data?.active_access_codes.data || [];
  const counts = context.data?.access_code_counts;
  const [showModal, setShowModal] = useState(false);
  const [viewStatus, setViewStatus] = useState<AccessCodeStatusFilter | null>(
    null
  );
  const stats: Array<{
    label: string;
    value: number;
    valueClass: string;
    status: AccessCodeStatusFilter;
    title: string;
  }> = [
    {
      label: "Total Codes",
      value: counts?.total ?? 0,
      valueClass: "text-gray-800",
      status: "all",
      title: "All Access Codes",
    },
    {
      label: "Active",
      value: counts?.active ?? 0,
      valueClass: "text-green-600",
      status: "active",
      title: "Active Access Codes",
    },
    {
      label: "Expiring Soon",
      value: counts?.expiring_soon ?? 0,
      valueClass: "text-yellow-600",
      status: "expiring_soon",
      title: "Codes Expiring Soon",
    },
    {
      label: "Expired",
      value: counts?.expired ?? 0,
      valueClass: "text-red-600",
      status: "expired",
      title: "Expired Access Codes",
    },
  ];
  const openView = stats.find((stat) => stat.status === viewStatus);

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
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-4 rounded-xl border border-gray-100"
          >
            <p className={`text-2xl font-bold ${stat.valueClass}`}>{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <button
              type="button"
              onClick={() => setViewStatus(stat.status)}
              className="mt-3 text-sm font-semibold text-[#79B833] hover:underline"
            >
              View codes
            </button>
          </div>
        ))}
      </div>

      {/* Code List */}
      <AccessCodeList accessCodes={codes} title="Active Access Codes" />
      {/* Modal */}
      {showModal && <GenerateAccessCode setShowModal={setShowModal} />}
      {openView && (
        <AccessCodesModal
          estateId={context.data?.estate_info.id}
          status={openView.status}
          title={openView.title}
          onClose={() => setViewStatus(null)}
        />
      )}
    </div>
  );
};

export default AccessCodeSection;
