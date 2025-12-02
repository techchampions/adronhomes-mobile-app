"use client";

import React, { ReactNode, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface SortOption {
  value: number;
  name: string;
}

interface ReusableTableProps {
  tabs?: string[];
  activeTab: string;
  searchPlaceholder?: string;
  defaultSort?: number;
  children?: ReactNode;
  onTabChange?: (tab: string) => void;
  onSearch?: (query: string) => void;
  onSortChange?: (sortOption: SortOption) => void;
  sort?: boolean;
  showTabs?: boolean;
  showSearchandSort?: boolean;
}

// Validation Schema
const ValidationSchema = Yup.object().shape({
  customer_code: Yup.string().required("Customer code is required"),
  dob: Yup.string().required("Date of birth is required"),
});

export const ReusableTable: React.FC<ReusableTableProps> = ({
  tabs = ["All", "Approved", "Pending"],
  activeTab,
  searchPlaceholder = "Search",
  children,
  onTabChange,
  onSearch,
  showTabs = true,
  showSearchandSort = true,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    onTabChange?.(tab);

    // OPEN MODAL WHEN ACTIVE TAB IS CLICKED
    setModalOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className="bg-white rounded-[25px] w-full px-[20px] py-[20px] lg:px-[40px] lg:py-[30px]">

      {/* Header */}
      <div className="w-full flex flex-col gap-4 pb-[20px] lg:flex-row lg:justify-between lg:items-center lg:pb-[30px]">

        {/* Tabs */}
        {showTabs && (
          <div className="flex w-full overflow-x-auto gap-2 scrollbar-hide pb-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all
                  ${
                    activeTab === tab
                      ? "bg-[#79B833] text-white font-semibold"
                      : "bg-[#F2F2F2] text-[#6B6B6B]"
                  }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Search */}
        {showSearchandSort && (
          <div className="w-full lg:w-auto">
            <div className="relative h-[44px] w-full lg:w-[280px] rounded-full bg-[#F6F6F8] ">
              <IoSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-[#7A7A7A] text-[18px]" />

              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-full pl-12 pr-4 bg-transparent text-[15px] text-[#505050] placeholder:text-[#9E9E9E] focus:outline-none rounded-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Table Area */}
      <div className="w-full overflow-x-auto">{children}</div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[30px] w-full max-w-md p-6 relative">

            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4">Enter Customer Details</h2>

            <Formik
              initialValues={{ customer_code: "", dob: "" }}
              validationSchema={ValidationSchema}
              onSubmit={(values) => {
                console.log("Submitted:", values);
                setModalOpen(false);
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">

                  {/* Customer Code */}
                  <div>
                    <label className="block mb-1 text-sm font-medium">Customer Code</label>
                    <Field
                      name="customer_code"
                      type="text"
                      placeholder="PS120493"
                      className="w-full border rounded-full px-3 py-2 focus:outline-none"
                    />
                    {errors.customer_code && touched.customer_code && (
                      <p className="text-red-500 text-sm mt-1">{errors.customer_code}</p>
                    )}
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="block mb-1 text-sm font-medium">Date of Birth</label>
                    <Field
                      name="dob"
                      type="datetime-local"
                      className="w-full border rounded-full px-3 py-2 focus:outline-none"
                    />
                    {errors.dob && touched.dob && (
                      <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-2 rounded-full text-white font-semibold bg-[#79B833]"
                  >
                    Submit
                  </button>

                </Form>
              )}
            </Formik>

          </div>
        </div>
      )}
    </div>
  );
};
