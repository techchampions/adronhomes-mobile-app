import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";

export default function AdronSplashScreens() {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      id: "homes",
      title: "Homes for Every Lifestyle",
      description:
        "Browse through a diverse range of properties tailored to meet your unique preferences and budget. Your dream home is just a few clicks away!",
      imgUrl: "/page1.svg",
    },
    {
      id: "partner",
      title: "Your Trusted Property Partner",
      description:
        "From finding the perfect property to completing the paperwork, our team is here to guide you every step of the way with expert advice and support.",
      imgUrl: "/page2.svg",
    },
    {
      id: "trust",
      title: "A Journey Built on Trust",
      description:
        "Experience real estate with integrity. We ensure secure transactions and transparent processes to give you peace of mind throughout your journey.",
      imgUrl:"/page3.svg",
    },
  ];

  const nextScreen = () => {
    setCurrentScreen((prev) => (prev + 1) % screens.length);
  };

  const prevScreen = () => {
    setCurrentScreen((prev) => (prev - 1 + screens.length) % screens.length);
  };

  const current = screens[currentScreen];

  return (
    <div className=" px-4 bg-white  flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-[45px]">
        <div className="flex items-center w-full justify-center">
          <img src="/iconk.svg" />
        </div>
      </div>

      {/* Content Area */}
<div className="w-full justify-center flex bg-white">
    <img src={current.imgUrl} className=""/>
</div>
      {/* Bottom Content */}
      <div className=" pb-8">
        <h2 className="text-2xl font-bold text-[#090A0A] text-center mb-2 font-gotham">
          {current.title}
        </h2>
        <p className="text-[#545454] text-base text-center mb-8 leading-relaxed">
          {current.description}
        </p>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 space-x-4 ">
          {currentScreen > 0 && (
            <button
              onClick={prevScreen}
              className="flex-1 py-3 px-6  text-base font-adron-mid "
            >
              Back
            </button>
          )}
          <button
            onClick={nextScreen}
            className={`flex-1 py-3 px-6 bg-[#92C559] text-white rounded-full font-adron-mid `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}


