import React from "react";
import CompactPropertyCard from "../onboardingComponents/CompactPropertyCard"; // Use the modified card
import DashboardCard from "../onboardingComponents/DashboardCard";

import { useGetEstate, useGetSlidersByType } from "../../../data/hooks";

import { EmptyEstates } from "../onboardingComponents/emptyStates";
import { CompactCardSkeleton } from "../onboardingComponents/skeleton";
import ImageCarousel from "../onboardingComponents/ImageCarousel";
import { LoginHeader } from "../onboardingComponents/loginheader";
import { Link } from "react-router-dom";

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

const HomeNoLogin = () => {
  // Removed useGetFeatured hook as it's no longer used
  // const { data, isLoading, isError } = useGetFeatured();
  const { data: dashboardSlider, isLoading: sliderLoading } =
    useGetSlidersByType("home");

  const {
    data: dataestate,
    isLoading: isloadingestate,
    isError: iserrorestate,
  } = useGetEstate();

  // Removed useGetUserWalletdata and related transaction state
  // const {
  //   data: dataTr,
  //   isLoading: isLoadingTr,
  //   isError: isErrorTr,
  // } = useGetUserWalletdata();

  // Removed FeaturedProp
  // const FeaturedProp = data?.data || [];
  const estatedProp = dataestate?.properties?.data || [];
  // Removed transactions
  // const transactions = dataTr?.user_transactions ?? [];

  // Removed showAllFeatured state as featured section is gone
  // const [showAllFeatured, setShowAllFeatured] = useState(false);

  const carouselImages = [
    { src: "/flag.svg", alt: "Featured property" },
    { src: "/dot3.svg", alt: "Demo property 1" },
    { src: "/dot2.svg", alt: "Demo property 2" },
  ];

  const imgapi = dashboardSlider?.data?.map((item) => ({
    src: item?.image,
    alt: "andron",
  }));

  return (
    <div className="pb-10 bg-[#F9F9F9] min-h-screen">


      <div className="pt-3 mb-6">
        <ImageCarousel images={imgapi ?? carouselImages} interval={5000} />
      </div>

      <div className="space-y-[30px]">
        <div className="px-4">
          <div className="flex justify-between items-center mb-[15px]">
            <p className="font-adron-mid text-lg text-[#272727]">
              Explore Properties
            </p>
            {/* You could add a "View All" button here for estates if needed */}
            <Link to="/login" className="font-adron-mid text-sm text-[#79B833]">
              View All
            </Link>
          </div>

          <div className="flex overflow-x-auto space-x-4 py-2 scrollbar-hide">
            {isloadingestate ? (
              <>
                <CompactCardSkeleton />
                <CompactCardSkeleton />
                <CompactCardSkeleton />
              </>
            ) : iserrorestate ? (
              <div className="text-center py-4 text-red-500 px-4 w-full">
                Error loading properties
              </div>
            ) : estatedProp.length === 0 ? (
              <div className="flex justify-center w-full">
                <EmptyEstates />
              </div>
            ) : (
              estatedProp.map((estate, index) => (
                <div className="flex-none" key={estate.id || index}>
                  <CompactPropertyCard
                    imageUrl={estate.display_image}
                    imageAlt={estate.name}
                    title={estate.name}
                    location={` ${estate.state ?? ""}`}
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
        <div className="flex justify-between items-center mb-[15px] pr-4 mt-8 px-4">
          <p className="font-adron-mid text-lg text-[#272727]">Quick Access</p>
        </div>
        <div className="grid grid-cols-3 gap-y-6 gap-x-3 px-4">
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
    </div>
  );
};

export default HomeNoLogin;
