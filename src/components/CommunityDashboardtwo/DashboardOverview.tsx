// components/DashboardOverview.tsx
import { MessageCircle, MessagesSquare } from "lucide-react";
import React from "react";
import {
  FiCreditCard,
  FiFileText,
  FiHome,
  FiKey,
  FiMessageCircle,
  FiTool,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { Link, useOutletContext } from "react-router-dom";
import { useUserStore } from "../../zustand/UserStore";
import AccessCodeList from "./AccessCodeList";
import type { CommunitySection } from "./CommunityDashboard";
import PaymentList from "./PaymentList";

const DashboardOverview = () => {
  const context: CommunityOutletContext = useOutletContext();

  const { user } = useUserStore();
  const stats = [
    {
      label: "Properties",
      value: "3",
      icon: FiHome,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Community Members",
      value: context.data?.estate_info.total_members,
      icon: FiUsers,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Unread Group Messages",
      value: context.data?.estate_info.group_unread,
      icon: MessagesSquare,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Unread Chat",
      value: context.data?.estate_info.total_unread,
      icon: MessageCircle,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const quickActions: Array<{
    label: string;
    description: string;
    section: CommunitySection;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      label: "Pay outstanding bill",
      description: "Property installment, dues, or utility bill",
      section: "payments",
      icon: FiCreditCard,
    },
    {
      label: "Buy electricity units",
      description: "Enter meter number and token amount",
      section: "utilities",
      icon: FiZap,
    },
    {
      label: "Create visitor code",
      description: "One-time, scheduled, or recurring access",
      section: "access",
      icon: FiKey,
    },
    {
      label: "Report an issue",
      description: "Track repairs with photos and status",
      section: "maintenance",
      icon: FiTool,
    },
    {
      label: "Open community chat",
      description: "General estate or land-owner messages",
      section: "community",
      icon: FiMessageCircle,
    },
    {
      label: "View documents",
      description: "Receipts, allocation letters, meeting minutes",
      section: "documents",
      icon: FiFileText,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-gray-800">
              What do you want to do?
            </h3>
            <p className="text-sm text-gray-500">
              Plain-language shortcuts for non-technical property owners.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                type="button"
                to={action.section}
                className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-left transition hover:border-[#79B833]/50 hover:bg-[#79B833]/5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#79B833]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-gray-800">{action.label}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {context.data?.recent_payments.data && (
        <div className="grid sm:grid-cols-2 gap-2">
          <PaymentList payments={context.data?.recent_payments.data} />
          <AccessCodeList
            accessCodes={context.data?.active_access_codes.data}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
