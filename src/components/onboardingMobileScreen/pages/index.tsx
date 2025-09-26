import React, { useState } from "react";
import PropertyCard from "../onboardingComponents/PropertyCard";
import CompactPropertyCard from "../onboardingComponents/CompactPropertyCard";
import DashboardCard from "../onboardingComponents/DashboardCard";

import {
  useGetEstate,
  useGetFeatured,
  useGetSlidersByType,
  useGetUser,
  useGetUserWalletdata,
} from "../../../data/hooks";

import {
  EmptyEstates,
  EmptyFeaturedProperties,
} from "../onboardingComponents/emptyStates";
import {
  CompactCardSkeleton,
  PropertyCardSkeleton,
} from "../onboardingComponents/skeleton";
import ImageCarousel from "../onboardingComponents/ImageCarousel";
import { formatToNaira } from "../../../data/utils";

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

const PropertiesPage = () => {
  const { data, isLoading, isError } = useGetFeatured();
  const { data: dashboardSlider, isLoading: sliderLoading } =
    useGetSlidersByType("home");



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
    <>
      <ImageCarousel images={imgapi ?? carouselImages} interval={5000} />

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
                      location={`${property.state}`}
                      price={formatToNaira(property.price)}
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
        <div className="px-4">
          <div className="flex justify-between items-center mb-[10px] ">
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
              <div className="justify-center flext w-full">
                <EmptyEstates />
              </div>
            ) : (
              estatedProp.map((estate, index) => (
                <div className="flex-none" key={estate.id || index}>
                  <CompactPropertyCard
                    imageUrl={estate.display_image}
                    imageAlt={estate.name}
                    title={estate.name}
                    location={` ${estate.state??""}`}
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
