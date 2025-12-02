"use client";
import React, { useState } from "react";
import { useGetContact } from "../../../../data/hooks";
import { ReusableTable } from "../Table_one";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

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

  const { data, isLoading } = useGetContact({
    page,
    search,
    per_page: 10,
  });

  const contracts = data?.data?.data || [];
  const pagination = data?.data;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Contracts Management
        </h1>

        <ReusableTable
          tabs={["Link Existing Contracts"]}
          activeTab="Link Existing Contracts"
          searchPlaceholder="Search by contract ID or property name..."
          onSearch={handleSearch}
        >
          {isLoading ? (
            <div className="text-center py-20">Loading contracts...</div>
          ) : (
            <>
              <div
                className="overflow-x-auto  rounded-lg border border-gray-200 
               h-full"
              >
                <table className="min-w-full bg-">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        SN
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Contract ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Property Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Property Net Value
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Property Tenure
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Contract Date
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 cursor-pointer">
                    {contracts.map((contract, index) => (
                      <tr
                        key={contract.id}
                        className="hover:bg-gray-50 transition duration-150"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {(page - 1) * 10 + index + 1}
                        </td>
                        <td className="px-6 py-4">
                         
                            {contract.contractId}
                         
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                        <div
                            // to={`/contractview/${contract.id}`}
                            className="max-w-48 truncate"
                            title={contract.propertyName || "-"} // Shows full name on hover
                          >
                             <Link
                             className="text-blue-600 hover:text-blue-800 font-medium underline"
                            to={`/dashboard/properties/${contract.propertyId}`}
                           
                            title={contract.propertyName || "-"} // Shows full name on hover
                          >
                            {contract.propertyName || "-"}
                          </Link> 
                          </div>

                         
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          ₦
                          {parseFloat(
                            contract.propertyNetValue || "0"
                          ).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {contract.propertyTenor} months
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {contract.contractDate
                            ? new Date(
                                contract.contractDate
                              ).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-3">
                            <Link
                              to={`/dashboard/view-contract/${contract.id}`}
                              className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all text-white text-[10px]  font-medium  bg-gray-700 "
                            >
                              Contract Details
                            </Link>
                            <Link
                              to={`/transactions/${contract.id}`}
                              className=" px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all bg-[#79B833] items-center justify-center text-white  text-[10px]  font-medium   "
                            >
                              TNX History
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {contracts.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No contracts found.
                  </div>
                )}
              </div>

              {pagination && (
                <Pagination
                  pagination={{
                    currentPage: pagination.current_page,
                    totalPages: pagination.last_page,
                    perPage: pagination.per_page,
                  }}
                  onPageChange={(p: React.SetStateAction<number>) => setPage(p)}
                  className="mt-8"
                />
              )}
            </>
          )}
        </ReusableTable>
      </div>
    </div>
  );
}
