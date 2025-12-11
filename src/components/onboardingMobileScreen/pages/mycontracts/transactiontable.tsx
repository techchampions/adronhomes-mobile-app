"use client";

import React, { useState } from "react";
import { useGetContact, useGetContractTransactions } from "../../../../data/hooks";
import { ReusableTable } from "../Table_one";
import Pagination from "../Pagination";
import { useParams } from "react-router-dom";
import { TransactionData } from "../../../../data/types/transaction";
import SmallLoader from "../../../SmallLoader";



export default function ContractsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { id } = useParams<{ id: string }>();
  const contractId=id
 const { data, isLoading } = useGetContractTransactions({
  contractId,
  page,
  search,
  per_page: 15,
  
});


  const transactions: TransactionData[] = data?.data?.data || [];
  const pagination = data?.data;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Transaction History
        </h1>

        <ReusableTable
          tabs={["Contract Transactions"]}
          activeTab="Contract Transactions"
          searchPlaceholder="Search by reference, description..."
          onSearch={handleSearch}
      shouldOpenModal={false}
        >
          {isLoading ? (
            <div className="text-center py-20">  <SmallLoader />;</div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-gray-200 h-full">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        SN
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Contract ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Reference
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        DR / CR
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Transaction Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 cursor-pointer">
                    {transactions.map((tx: TransactionData, index: number) => (
                      <tr
                        key={tx.id}
                        className="hover:bg-gray-50 transition duration-150"
                      >
                        {/* Serial Number */}
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {(page - 1) * 10 + index + 1}
                        </td>

                        {/* Contract ID */}
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {tx.ContractId}
                        </td>

                        {/* Reference */}
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {tx.TransactionReference}
                        </td>

                        {/* Description */}
                        <td
                          className="px-6 py-4 text-sm text-gray-900 max-w-48 truncate"
                          title={tx.TransactionDescription}
                        >
                          {tx.TransactionDescription}
                        </td>

                        {/* Amount */}
                        <td
                          className={`px-6 py-4 text-sm font-semibold ${
                            tx.TransactionAmount < 0
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          ₦{Math.abs(tx.TransactionAmount).toLocaleString()}
                        </td>

                        {/* DR / CR */}
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {tx.TransactionDRCR}
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(tx.TransactionDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {transactions.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No transactions found.
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
