"use client";

import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Home, User, Phone, Mail, MapPin, Calendar, DollarSign, Building } from "lucide-react";
import { useGetContact } from "../../../../data/hooks"; // Your existing hook
import { BsBank } from "react-icons/bs";

interface ContractDetails {
  id: number;
  customerName: string;
  customerCode: string;
  contractId: string;
  propertyName: string;
  propertyEstate: string;
  propertyCost: string;
  propertyDiscount: string;
  propertyNetValue: string;
  propertyTenor: number;
  quantity: string;
  fullPayment: string;
  fullPaymentDate: string | null;
  contractDate: string | null;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  customerGender: string;
  dateOfBirth: string;
  currentbalance: string;
  created_at: string;
  updated_at: string;
}

// Skeleton Loading Components
const CustomerInfoSkeleton = () => (
  <div className="lg:col-span-2 bg-white rounded-xl -sm border border-gray-200 p-6">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-gray-200 rounded-full animate-pulse">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      </div>
      <div className="h-7 w-48 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i}>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);

const PaymentSummarySkeleton = () => (
  <div className="bg-white rounded-xl -sm border border-gray-200 p-6">
    <div className="h-7 w-40 bg-gray-200 rounded mb-4 animate-pulse"></div>
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-5 w-28 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="border-t pt-4">
        <div className="h-5 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

const PropertyDetailsSkeleton = () => (
  <div className="bg-white rounded-xl -sm border border-gray-200 p-6">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-7 w-40 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i}>
          <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);

const FinancialDetailsSkeleton = () => (
  <div className="bg-white rounded-xl -sm border border-gray-200 p-6">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-7 w-40 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i}>
          <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className={`h-${i === 2 ? '8' : '7'} w-40 bg-gray-200 rounded animate-pulse`}></div>
        </div>
      ))}
    </div>
  </div>
);

const TimelineSkeleton = () => (
  <div className="bg-white rounded-xl -sm border border-gray-200 p-6">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i}>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);

const HeaderSkeleton = () => (
  <div className="mb-8 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-gray-200 rounded-full animate-pulse">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      </div>
      <div>
        <div className="h-9 w-64 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function ContractDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetContact({});
  const contracts: ContractDetails[] = data?.data?.data || [];
  const contract = contracts.find((c) => c.id === Number(id));

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount || "0");
    return `₦${num.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  };

  const getAmountColor = (amount: string) => {
    const num = parseFloat(amount || "0");
    if (num < 0) return "text-red-600";
    if (num > 0) return "text-green-600";
    return "text-gray-900";
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Not set";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <HeaderSkeleton />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CustomerInfoSkeleton />
            <PaymentSummarySkeleton />
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PropertyDetailsSkeleton />
            <FinancialDetailsSkeleton />
          </div>

          <div className="mt-6">
            <TimelineSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Contract not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="lg:mx-6 mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* <Link
              to="/dashboard/my-contracts"
              className="p-2 hover:bg-gray-200 rounded-full transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link> */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contract Details</h1>
              <p className="text-gray-600">Contract ID: {contract.contractId}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Card */}
          <div className="lg:col-span-2 bg-white rounded-xl -sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold">Customer Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-lg font-medium text-gray-900">{contract.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer Code</p>
                <p className="text-lg font-medium text-gray-900">{contract.customerCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-lg font-medium text-gray-900">{contract.customerGender || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-lg font-medium text-gray-900">
                  {contract.dateOfBirth ? contract.dateOfBirth.split("/").reverse().join("-") : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone
                </p>
                <p className="text-lg font-medium text-gray-900">{contract.customerPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </p>
                <p className="text-lg font-medium text-gray-900 lowercase">{contract.customerEmail}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Address
                </p>
                <p className="text-lg font-medium text-gray-900">{contract.customerAddress || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-xl -sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold mb-4">Payment Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${contract.fullPayment === "Y" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {contract.fullPayment === "Y" ? "Fully Paid" : "Installment"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Balance</span>
                <span className={`font-bold text-lg ${getAmountColor(contract.currentbalance)}`}>
                  {formatCurrency(contract.currentbalance)}
                </span>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">Full Payment Date</p>
                <p className="font-medium">{formatDate(contract.fullPaymentDate)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Property & Financial */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl -sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold">Property Details</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Estate</p>
                <p className="font-medium">{contract.propertyEstate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Property Name</p>
                <p className="font-medium text-gray-900 break-words">
                  {contract.propertyName.split("/").slice(0, -2).join(" / ")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Size</p>
                <p className="font-medium">{contract.propertyName.split("/")[2] || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium">{parseFloat(contract.quantity).toFixed(0)} plot(s)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl -sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <BsBank className="w-6 h-6 text-purple-300-600" />
              <h2 className="text-xl font-semibold">Financial Details</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Original Cost</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(contract.propertyCost)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Discount</p>
                <p className="text-xl font-bold text-green-600">-{formatCurrency(contract.propertyDiscount)}</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">Net Value</p>
                <p className={`text-2xl font-bold ${getAmountColor(contract.propertyNetValue)}`}>
                  {formatCurrency(contract.propertyNetValue)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tenor</p>
                <p className="text-xl font-bold">{contract.propertyTenor} months</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-6 bg-white rounded-xl -sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Timeline</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Contract Date</p>
              <p className="font-medium">{formatDate(contract.contractDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="font-medium">{new Date(contract.created_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">{new Date(contract.updated_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}