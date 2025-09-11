// import React, { useState } from "react";
// import { MdLocationPin } from "react-icons/md";
// import { FaRegHeart } from "react-icons/fa";
// import { Navbar } from "../onboardingComponents/Bottomnavigation";
// import PropertyCard from "../onboardingComponents/PropertyCard";
// import CompactPropertyCard from "../onboardingComponents/CompactPropertyCard";
// import DashboardCard from "../onboardingComponents/DashboardCard";
// import { Layout } from "../layout";
// import { useGetFeatured, useGetUser } from "../../../data/hooks";
// import Loader from "../../Loader";

// const dashboardItems = [
//   { imageSrc: "/q1.svg", imageAlt: "Dashboard", label: "Dashboard" },
//   { imageSrc: "/q2.svg", imageAlt: "Users", label: "Walllet" },
//   { imageSrc: "/q3.svg", imageAlt: "Reports", label: "Notifications" },
//   { imageSrc: "/q4.svg", imageAlt: "Settings", label: "Payment" },
//   { imageSrc: "/q5.svg", imageAlt: "Notifications", label: "Saved Properties" },
//   { imageSrc: "/q6.svg", imageAlt: "Settings", label: "Settings" },
// ];

// const PropertiesPage = () => {
//   const { data, isLoading, isError } = useGetFeatured();
//   const FeaturedProp = data?.data;
//   const [showAllFeatured, setShowAllFeatured] = useState(false);

//   const features = [
//     { iconSrc: "ruller.svg", alt: "rl", label: "648 SqM" },
//     { iconSrc: "strtlight.svg", alt: "strt", label: "Str Lights" },
//     { iconSrc: "_gym.svg", alt: "gym", label: "Gym" },
//   ];

//   return (
//     <Layout>
//       <div className="mt-[14px] mb-[32px] px-4">
//         <img
//           src="/flag.svg"
//           alt="User"
//           className="w-full h-full object-cover max-h-[140px] rounded-[20px]"
//         />
//       </div>

//       <div className="space-y-[30px]">
//         <div className="px-4">
//           <div className="flex justify-between items-center mb-[10px]">
//   <p className="font-adron-mid text-base">Featured</p>
//   <button
//     onClick={() => setShowAllFeatured(prev => !prev)}
//     className="font-adron-mid text-sm text-[#79B833]"
//   >
//     {showAllFeatured ? "Show Less" : "View All"}
//   </button>
// </div>

//          <div className="space-y-[10px]">
//   {(showAllFeatured ? FeaturedProp : FeaturedProp?.slice(0, 2))?.map((property, index) => (
//     <div key={index}>
//       <PropertyCard
//         imageSrc={property.display_image}
//         imageAlt={property.name}
//         title={property.name}
//         location={`${property.lga}, ${property.state}`}
//         price={property.price}
//         features={property.features}
//       />
//     </div>
//   ))}
// </div>

//         </div>

//         <div className="pl-4">
//           <div className="flex justify-between items-center mb-[10px] pr-4">
//             <p className="font-adron-mid text-base">Estates</p>
//             <p className="font-adron-mid text-sm text-[#79B833]">View All</p>
//           </div>
//           <div className="flex overflow-x-auto space-x-3 py-2 no-scrollbar">
//             <div className="flex-none">
//               <CompactPropertyCard
//                 imageUrl="/housing.svg"
//                 imageAlt="Modern house"
//                 title="Treasure Islands and Gardens Phantom"
//                 location="Ejigbo Wuse, Lagos"
//               />
//             </div>
//             <div className="flex-none">
//               <CompactPropertyCard
//                 imageUrl="/housing.svg"
//                 imageAlt="Modern house"
//                 title="Treasure Islands and Gardens Phantom"
//                 location="Ejigbo Wuse, Lagos"
//               />
//             </div>
//             <div className="flex-none">
//               <CompactPropertyCard
//                 imageUrl="/housing.svg"
//                 imageAlt="Modern house"
//                 title="Treasure Islands and Gardens Phantom"
//                 location="Ejigbo Wuse, Lagos"
//               />
//             </div>
//             <div className="flex-none pr-4">
//               <CompactPropertyCard
//                 imageUrl="/housing.svg"
//                 imageAlt="Modern house"
//                 title="Treasure Islands and Gardens Phantom"
//                 location="Ejigbo Wuse, Lagos"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         <div className="flex justify-between items-center mb-[10px] pr-4 mt-8 px-4">
//           <p className="font-adron-mid text-base">Estates</p>
//         </div>
//         <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-3 px-4">
//           {dashboardItems.map((item, index) => (
//             <DashboardCard
//               key={index}
//               imageSrc={item.imageSrc}
//               imageAlt={item.imageAlt}
//               label={item.label}
//             />
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default PropertiesPage;