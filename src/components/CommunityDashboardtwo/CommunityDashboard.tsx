import { AlertTriangle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  FiCreditCard,
  FiFileText,
  FiGrid,
  FiKey,
  FiMessageCircle,
  FiTool,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { Outlet, useLocation } from "react-router-dom";
import {
  useGetEstateCommunity,
  useGetSingleEstateCommunity,
} from "../../hooks/estateCommunity/useEstateCommunity";
import EstateInfoSection from "./EstateInfo";
import EstateSelector, { EstateCardSkeleton } from "./EstateSelector";
import SectionRouteItem from "./SectionRouteItem";
import { EstateInfoSkeletons, OutletSkeleton } from "./Skeletons";

export type CommunitySection =
  | "overview"
  | "community"
  | "utilities"
  | "access"
  | "messages"
  | "payments"
  | "maintenance"
  | "documents";

interface CommunityDashboardProps {
  initialSection?: CommunitySection;
}

const sectionRoutes: Array<{
  id: CommunitySection;
  label: string;
  helper: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: "overview",
    label: "Overview",
    helper: "My estate, bills, notices",
    path: "/dashboard/estate",
    icon: FiGrid,
  },
  {
    id: "community",
    label: "Community",
    helper: "General estate chat",
    path: "/dashboard/estate/chat",
    icon: FiUsers,
  },
  {
    id: "messages",
    label: "Private Chats",
    helper: "Flat, plot, building chats",
    path: "/dashboard/estate/messages",
    icon: FiMessageCircle,
  },
  {
    id: "payments",
    label: "Payments",
    helper: "Property and dues",
    path: "/dashboard/estate/payments",
    icon: FiCreditCard,
  },
  {
    id: "utilities",
    label: "Utilities",
    helper: "Electricity, water, internet",
    path: "/dashboard/estate/utilities",
    icon: FiZap,
  },
  {
    id: "access",
    label: "Access Codes",
    helper: "Visitor and gate passes",
    path: "/dashboard/estate/access",
    icon: FiKey,
  },
  {
    id: "maintenance",
    label: "Maintenance",
    helper: "Repairs and service desk",
    path: "/dashboard/estate/maintenance",
    icon: FiTool,
  },
  {
    id: "documents",
    label: "Documents",
    helper: "Receipts, deeds, minutes",
    path: "/dashboard/estate/documents",
    icon: FiFileText,
  },
];

const CommunityDashboard: React.FC<CommunityDashboardProps> = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const outletContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetEstateCommunity();
  const userEstates = data?.data || [];
  const [selectedEstate, setSelectedEstate] = useState<CommunityEstate>(
    userEstates[0]
  );
  const { data: dashboardData, isLoading: isloadingDashboard } =
    useGetSingleEstateCommunity(selectedEstate?.id);
  const contextValue: CommunityOutletContext = {
    data: dashboardData?.data,
  };

  // Auto-scroll to outlet container when route changes
  // useEffect(() => {
  //   const container = document.getElementById("main-layout");

  //   if (!container || !outletContainerRef.current) return;

  //   const top = outletContainerRef.current.offsetTop - container.offsetTop - 20; // adjust for spacing

  //   container.scrollTo({
  //     top: 100,
  //     behavior: "smooth",
  //   });
  // }, [location.pathname]);
  const RenderContent = () => {
    if (isloadingDashboard) {
      return <OutletSkeleton />;
    }
    if (contextValue.data && dashboardData?.data) {
      return <Outlet context={contextValue} />;
    }
    return (
      <div className="p-10 text-center flex flex-col gap-2 items-center">
        <div className="p-4 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
          <AlertTriangle size={40} />
        </div>
        <div className="">
          {selectedEstate
            ? "Unable to get Estate details"
            : "No Estate Selected Yet"}
        </div>
      </div>
    );
  };
  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-5">
        {isLoading && (
          <div className="grid sm:grid-cols-3 gap-2">
            {[1, 2, 3].map(() => (
              <EstateCardSkeleton />
            ))}
          </div>
        )}
        {userEstates.length > 0 && (
          <EstateSelector
            estates={userEstates}
            selected={selectedEstate}
            setSelected={setSelectedEstate}
          />
        )}
        <div
          className={`overflow-hidden rounded-xl sm:rounded-2xl bg-white p-2 sm:p-5 ${
            scrolled ? "fixed top-15 w-[95%] mx-auto left-2 right-2" : ""
          } z-50 shadow-lg`}
        >
          <div className="flex overflow-x-scroll scrollbar-hide sm:grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4">
            {sectionRoutes.map((section, i) => (
              <SectionRouteItem section={section} key={i} />
            ))}{" "}
          </div>
        </div>

        {isloadingDashboard && <EstateInfoSkeletons />}
        {dashboardData?.data && (
          <EstateInfoSection estate={dashboardData.data} />
        )}

        <div
          ref={outletContainerRef}
          className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6"
        >
          <RenderContent />
          {/* {contextValue.data && dashboardData?.data ? (
            <Outlet context={contextValue} />
          ) : (
            "No Estate Selected Yet"
          )} */}
        </div>
      </div>
    </section>
  );
};

export default CommunityDashboard;
