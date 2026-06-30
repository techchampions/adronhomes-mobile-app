import React from "react";
import CompactPropertyCard from "../onboardingComponents/CompactPropertyCard"; // Use the modified card
import DashboardCard from "../onboardingComponents/DashboardCard";

import { useGetEstate, useGetSlidersByType } from "../../../data/hooks";

import { EmptyEstates } from "../onboardingComponents/emptyStates";
import { CompactCardSkeleton } from "../onboardingComponents/skeleton";
import ImageCarousel from "../onboardingComponents/ImageCarousel";
import { LoginHeader } from "../onboardingComponents/loginheader";
import { Link } from "react-router-dom";
import SwiperPropertyList from "./newexplorepage";
import NewPropertyScreen from "./explorepage";

const dashboardItems = [
  {
    imageSrc: "/q1.svg",
    imageAlt: "Dashboard",
    label: "Dashboard",
    url: "/login",
  },
  {
    imageSrc: "/q2.svg",
    imageAlt: "Users",
    label: "Wallet",
    url: "/login",
  },
  {
    imageSrc: "/q3.svg",
    imageAlt: "Reports",
    label: "Notifications",
    url: "/login",
  },
  {
    imageSrc: "/q4.svg",
    imageAlt: "Payment",
    label: "Payment",
    url: "/login",
  },
  {
    imageSrc: "/q5.svg",
    imageAlt: "Saved Properties",
    label: "Saved Properties",
    url: "/login",
  },
  {
    imageSrc: "/q6.svg",
    imageAlt: "Settings",
    label: "Settings",
    url: "/login",
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

  
  const imgapi = dashboardSlider?.data?.map((item) => ({
    src: item?.image,
    alt: "andron",
  }));

  return (
    <div className="pb-10 bg-[#F9F9F9] min-h-screen">


      <div className="pt-3 mb-6">
          {sliderLoading ? (
        <div className="mb-[32px] px-4">
          <div className="w-full min-h-[160px] md:min-h-[250px] lg:min-h-[400px] overflow-hidden rounded-[20px] bg-gray-100 animate-pulse" />
        </div>
      ) : (
        <ImageCarousel images={imgapi!} interval={5000} />
      )}

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
      <div className="space-y-[30px] mt-4">
        <div className="px-4">
          <div className="flex justify-between items-center mb-[15px]">
            <p className="font-adron-mid text-lg text-[#272727]">
              Explore Properties
            </p>
            {/* You could add a "View All" button here for estates if needed */}
            {/* <Link to="/all-properties" className="font-adron-mid text-sm text-[#79B833]">
              View All
            </Link> */}
          </div>

          <div className="flex overflow-x-auto space-x-4 py-2 scrollbar-hide">
            <NewPropertyScreen/>
            {/* {isloadingestate ? (
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
            )} */}
            {/* <SwiperPropertyList properties={[]} isLoading={false} isError={false} isSavePropertyList={false}/> */}
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default HomeNoLogin;
