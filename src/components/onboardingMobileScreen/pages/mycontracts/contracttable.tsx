"use client";
import React, { useState, useCallback } from "react";
import { useGetContact } from "../../../../data/hooks";
import { ReusableTable } from "../Table_one";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import SmallLoader from "../../../SmallLoader";
import { useModalStore } from "../../../../zustand/useModalStore";
import { PaymentModal } from "../../../payment";
import { useUserStore } from "../../../../zustand/UserStore";
import {
  EyeIcon,
  HistoryIcon,
  CreditCardIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"; // or your preferred icon library

interface ContractData {
  id: number;
  contractId: string;
  propertyName: string;
  propertyNetValue: string;
  propertyTenor: number;
  contractDate: string | null;
}

export default function ContractsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loadingAction, setLoadingAction] = useState<number | null>(null);

  const { data, isLoading, refetch } = useGetContact({
    page,
    search,
    per_page: 10,
  });

  const contracts = data?.data?.data || [];
  const pagination = data?.data;
  const { user } = useUserStore();
  const { openModal, closeModal } = useModalStore();

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handlePayForContract = useCallback(
    async (contractId: number) => {
      if (!user?.email) {
        console.error("User email not available");
        return;
      }

      setLoadingAction(contractId);

      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));

      openModal(
        <PaymentModal
          isOpen={true}
          onClose={() => {
            closeModal();
            refetch(); // Refresh data after modal closes
          }}
          contractId={contractId}
          userEmail={user.email}
        />,
      );

      setLoadingAction(null);
    },
    [user?.email, openModal, closeModal, refetch],
  );

  const formatCurrency = (value: string) => {
    const num = parseFloat(value || "0");
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  //   // const { openModal,closeModal } = useModalStore();
  // const handlePayForContract = (contractId: number) => {
  //   const userData=useUserStore()
  //   openModal(
  //     <PaymentModal 
  //       isOpen={true} 
  //       onClose={() => {closeModal()}} 
  //       contractId={contractId}
  //       userEmail={userData.user?.email || ""} // Pass user email from store or default to empty string
  //     />
  //   );
  // };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Contracts Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and track all your property contracts
          </p>
        </div>

        <ReusableTable
          tabs={["Link Existing Contracts"]}
          activeTab="Link Existing Contracts"
          searchPlaceholder="Search by contract ID or property name..."
          onSearch={handleSearch}
          showTabs={false}
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <SmallLoader />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        SN
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contract ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Property Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Property Net Value
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Property Tenure
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contract Date
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {contracts.map((contract, index) => (
                      <tr
                        key={contract.id}
                        className="hover:bg-gray-50 transition-colors duration-200 group"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-500">
                          {(page - 1) * 10 + index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {contract.contractId}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-48">
                            <Link
                              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                              to={`/dashboard/properties/${contract.propertyId}`}
                              title={contract.propertyEstate || "-"}
                            >
                              {contract.propertyEstate || "-"}
                            </Link>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(contract.propertyNetValue || "0")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {contract.propertyTenor} months
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(contract.contractDate)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex  justify-center gap-2">
                            <Link
                              to={`/dashboard/view-contract/${contract.id}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium 
                                       bg-gray-700 text-white hover:bg-gray-800 
                                       transition-all duration-200 transform hover:scale-105
                                       shadow-sm hover:shadow-md"
                            >
                              <EyeIcon className="w-3.5 h-3.5" />
                              Details
                            </Link>

                            <Link
                              to={`/dashboard/view-transacions/${contract.contractId}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium 
                                       bg-[#79B833] text-white hover:bg-[#6aa32d] 
                                       transition-all duration-200 transform hover:scale-105
                                       shadow-sm hover:shadow-md"
                            >
                              <HistoryIcon className="w-3.5 h-3.5" />
                              History
                            </Link>

                            <button
                              onClick={() => handlePayForContract(contract.id)}
                              disabled={loadingAction === contract.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                                       bg-gradient-to-r from-green-600 to-green-500 text-white
                                       hover:from-green-700 hover:to-green-600
                                       transition-all duration-200 transform hover:scale-105
                                       shadow-sm hover:shadow-md
                                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                              {loadingAction === contract.id ? (
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <CreditCardIcon className="w-3.5 h-3.5" />
                              )}
                              {loadingAction === contract.id
                                ? "Processing..."
                                : "Pay Now"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {contracts.length === 0 && (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <SearchIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">No contracts found</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Try adjusting your search criteria
                    </p>
                  </div>
                )}
              </div>

              {pagination && pagination.last_page > 1 && (
                <div className="mt-8">
                  <Pagination
                    pagination={{
                      currentPage: pagination.current_page,
                      totalPages: pagination.last_page,
                      perPage: pagination.per_page,
                    }}
                    onPageChange={(p: React.SetStateAction<number>) =>
                      setPage(p)
                    }
                    className="mt-8"
                  />
                </div>
              )}
            </>
          )}
        </ReusableTable>
      </div>
    </div>
  );
}
