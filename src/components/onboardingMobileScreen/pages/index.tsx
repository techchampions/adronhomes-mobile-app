import React from "react";
import { MdLocationPin } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { Navbar } from "../onboardingComponents/Bottomnavigation";
import PropertyCard from "../onboardingComponents/PropertyCard";
import CompactPropertyCard from "../onboardingComponents/CompactPropertyCard";
import DashboardCard from "../onboardingComponents/DashboardCard";
import { Layout } from "../layout";



const dashboardItems = [
  { imageSrc: "/q1.svg", imageAlt: "Dashboard", label: "Dashboard" },
  { imageSrc: "/q2.svg", imageAlt: "Users", label: "Walllet" },
  { imageSrc: "/q3.svg", imageAlt: "Reports", label: "Notifications" },
  { imageSrc: "/q4.svg", imageAlt: "Settings", label: "Payment" },
  { imageSrc: "/q5.svg", imageAlt: "Notifications", label: "Saved Properties" },
  { imageSrc: "/q6.svg", imageAlt: "Settings", label: "Settings" },
];

// The rest of your PropertiesPage component remains the same
const PropertiesPage = () => {
  const features = [
    { iconSrc: "ruller.svg", alt: "rl", label: "648 SqM" },
    { iconSrc: "strtlight.svg", alt: "strt", label: "Str Lights" },
    { iconSrc: "_gym.svg", alt: "gym", label: "Gym" },
  ];

  return (
    <Layout>
      <div className="mt-[14px] mb-[32px] px-4">
        <img
          src="/flag.svg"
          alt="User"
          className="w-full h-full object-cover max-h-[140px] rounded-[20px]"
        />
      </div>

      <div className="space-y-[30px]">
        <div className="px-4">
          <div className="flex justify-between items-center mb-[10px]">
            <p className="font-adron-mid text-base">Featured</p>
            <p className="font-adron-mid text-sm text-[#79B833]">View All </p>
          </div>
          <div className="space-y-[10px]">
            <PropertyCard
              imageSrc="/housing.svg"
              imageAlt="house"
              title="Treasure Islands and Gardens Phantom Treasure Islands and Gardens Phantom"
              location="Ejigbo Wuse, Lagos"
              price="₦120,000,000"
              features={features}
            />
            <PropertyCard
              imageSrc="/housing.svg"
              imageAlt="house"
              title="Treasure Islands and Gardens Phantom"
              location="Ejigbo Wuse, Lagos"
              price="₦120,000,000"
              features={features}
            />
          </div>
        </div>

        <div className="pl-4">
          <div className="flex justify-between items-center mb-[10px] pr-4">
            <p className="font-adron-mid text-base">Estates</p>
            <p className="font-adron-mid text-sm text-[#79B833]">View All</p>
          </div>
          <div className="flex overflow-x-auto space-x-3 py-2 no-scrollbar">
            <div className="flex-none">
              <CompactPropertyCard
                imageUrl="/housing.svg"
                imageAlt="Modern house"
                title="Treasure Islands and Gardens Phantom"
                location="Ejigbo Wuse, Lagos"
              />
            </div>
            <div className="flex-none">
              <CompactPropertyCard
                imageUrl="/housing.svg"
                imageAlt="Modern house"
                title="Treasure Islands and Gardens Phantom"
                location="Ejigbo Wuse, Lagos"
              />
            </div>
            <div className="flex-none">
              <CompactPropertyCard
                imageUrl="/housing.svg"
                imageAlt="Modern house"
                title="Treasure Islands and Gardens Phantom"
                location="Ejigbo Wuse, Lagos"
              />
            </div>
            <div className="flex-none pr-4">
              <CompactPropertyCard
                imageUrl="/housing.svg"
                imageAlt="Modern house"
                title="Treasure Islands and Gardens Phantom"
                location="Ejigbo Wuse, Lagos"
              />
            </div>
          </div>
        </div>
      
      </div>
     <div>
       <div className="flex justify-between items-center mb-[10px] pr-4  mt-8 px-4">
            <p className="font-adron-mid text-base">Estates</p>
            {/* <p className="font-adron-mid text-sm text-[#79B833]">View All</p> */}
          </div>
   <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-3 px-4">
      {dashboardItems.map((item, index) => (
        
        <DashboardCard
    
          key={index}
          imageSrc={item.imageSrc}
          imageAlt={item.imageAlt}
          label={item.label}
        />
      ))}
    </div>
     </div>
    </Layout>
  );
};

export default PropertiesPage;
