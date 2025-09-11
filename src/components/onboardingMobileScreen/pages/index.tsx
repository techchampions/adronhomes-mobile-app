import React, { useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { Navbar } from "../onboardingComponents/Bottomnavigation";
import PropertyCard from "../onboardingComponents/PropertyCard";
import CompactPropertyCard from "../onboardingComponents/CompactPropertyCard";
import DashboardCard from "../onboardingComponents/DashboardCard";
import { Layout } from "../layout";
import {
  useGetEstate,
  useGetFeatured,
  useGetUser,
  useGetUserWalletdata,
} from "../../../data/hooks";
import AddFundAmount from "../../DashboardHomeComponents/AddFundAmount";
import { useModalStore } from "../../../zustand/useModalStore";

const dashboardItems = [
  {
    imageSrc: "/q1.svg",
    imageAlt: "Dashboard",
    label: "Dashboard",
    url: "/dashboard/home",
  },
  {
    imageSrc: "/q2.svg",
    imageAlt: "Users",
    label: "Wallet",
    url: "/dashboard/wallet",
  },
  {
    imageSrc: "/q3.svg",
    imageAlt: "Reports",
    label: "Notifications",
    url: "/dashboard/notifications",
  },
  {
    imageSrc: "/q4.svg",
    imageAlt: "Payment",
    label: "Payment",
    url: "/dashboard/payments",
  },
  {
    imageSrc: "/q5.svg",
    imageAlt: "Saved Properties",
    label: "Saved Properties",
    url: "/dashboard/saved-properties",
  },
  {
    imageSrc: "/q6.svg",
    imageAlt: "Settings",
    label: "Settings",
    url: "/dashboard/settings",
  },
];

// Empty State Components
const EmptyFeaturedProperties = () => (
  <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <svg
        className="w-10 h-10 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    </div>
    <h3 className="font-adron-mid text-lg text-gray-600 mb-2">
      No Featured Properties
    </h3>
    <p className="text-gray-500 text-sm">
      Featured properties will appear here when available
    </p>
  </div>
);

const EmptyEstates = () => (
  <div className="flex flex-col items-center justify-center py-8 px-4 text-center min-w-[200px]">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
      <svg
        className="w-8 h-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 21l18-18M3 3l18 18"
        />
      </svg>
    </div>
    <h3 className="font-adron-mid text-base text-gray-600 mb-1">
      No Estates Available
    </h3>
    <p className="text-gray-500 text-xs">Check back later for new estates</p>
  </div>
);

// Loading Skeleton Components
const PropertyCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

const CompactCardSkeleton = () => (
  <div className="animate-pulse flex-none w-32">
    <div className="bg-gray-200 h-24 rounded-lg mb-2"></div>
    <div className="space-y-1">
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
    </div>
  </div>
);

const PropertiesPage = () => {
  const { data, isLoading, isError } = useGetFeatured();
  const openModal = useModalStore((state) => state.openModal);

  const startFundWallet = () => {
    openModal(<AddFundAmount goBack={startFundWallet} />);
  };

  const {
    data: dataestate,
    isLoading: isloadingestate,
    isError: iserrorestate,
  } = useGetEstate();
  const {
    data: dataTr,
    isLoading: isLoadingTr,
    isError: isErrorTr,
  } = useGetUserWalletdata();

  const FeaturedProp = data?.data || [];
  const estatedProp = dataestate?.properties?.data || [];
  const transactions = dataTr?.user_transactions ?? [];

  const [showAllFeatured, setShowAllFeatured] = useState(false);

  const features = [
    { iconSrc: "ruller.svg", alt: "rl", label: "648 SqM" },
    { iconSrc: "strtlight.svg", alt: "strt", label: "Str Lights" },
    { iconSrc: "_gym.svg", alt: "gym", label: "Gym" },
  ];

  return (
    <>
      <div className=" mb-[32px] px-4">
        <img
          src="/flag.svg"
          alt="User"
          className="w-full h-full object-cover max-h-[140px] rounded-[20px]"
        />
      </div>

      <div className="space-y-[30px]">
        {/* Featured Properties Section */}
        <div className="px-4">
          <div className="flex justify-between items-center mb-[10px]">
            <p className="font-adron-mid text-base">Featured</p>
            {!isLoading && FeaturedProp.length > 2 && (
              <button
                onClick={() => setShowAllFeatured((prev) => !prev)}
                className="font-adron-mid text-sm text-[#79B833]"
              >
                {showAllFeatured ? "Show Less" : "View All"}
              </button>
            )}
          </div>

          <div className="space-y-[10px]">
            {isLoading ? (
              <>
                <PropertyCardSkeleton />
                <PropertyCardSkeleton />
              </>
            ) : isError ? (
              <div className="text-center py-4 text-red-500">
                Error loading featured properties
              </div>
            ) : FeaturedProp.length === 0 ? (
              <EmptyFeaturedProperties />
            ) : (
              (showAllFeatured ? FeaturedProp : FeaturedProp.slice(0, 2)).map(
                (property, index) => (
                  <div key={property.id || index}>
                    <PropertyCard
                      id={property.id}
                      imageSrc={property.display_image}
                      imageAlt={property.name}
                      title={property.name}
                      location={`${property.lga}, ${property.state}`}
                      price={property.price}
                      features={property.features}
                      isSavedInitial={property.is_saved}
                      loading={false}
                    />
                  </div>
                )
              )
            )}
          </div>
        </div>

        {/* Estates Section */}
        <div className="pl-4">
          <div className="flex justify-between items-center mb-[10px] pr-4">
            <p className="font-adron-mid text-base">Estates</p>
          </div>

          <div className="flex overflow-x-auto space-x-3 py-2 scrollbar-hide items-center">
            {isloadingestate ? (
              // Loading skeletons for estates
              <>
                <CompactCardSkeleton />
                <CompactCardSkeleton />
                <CompactCardSkeleton />
              </>
            ) : iserrorestate ? (
              <div className="text-center py-4 text-red-500 px-4">
                Error loading estates
              </div>
            ) : estatedProp.length === 0 ? (
              <EmptyEstates />
            ) : (
              estatedProp.map((estate, index) => (
                <div className="flex-none" key={estate.id || index}>
                  <CompactPropertyCard
                    imageUrl={estate.display_image}
                    imageAlt={estate.name}
                    title={estate.name}
                    location={`${estate.lga}, ${estate.state}`}
                    id={estate.id}
                    loading={false}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div>
        <div className="flex justify-between items-center mb-[10px] pr-4 mt-8 px-4">
          <p className="font-adron-mid text-base">Quick Links</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-3 px-4">
          {dashboardItems.map((item, index) => (
            <DashboardCard
              key={index}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              label={item.label}
              url={item.url}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PropertiesPage;