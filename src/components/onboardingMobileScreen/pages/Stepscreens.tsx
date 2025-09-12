import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";

// Wrapper component for the splash screens
export const AdronSplashScreensWrapper = ({ setHasSeenSplash }: { setHasSeenSplash: (value: boolean) => void }) => {
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
      imgUrl: "/page3.svg",
    },
  ];

  const nextScreen = () => {
    if (currentScreen === screens.length - 1) {
      localStorage.setItem("hasSeenSplash", "true");
      setHasSeenSplash(true);
    } else {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }
  };

  const prevScreen = () => {
    setCurrentScreen((prev) => (prev - 1 + screens.length) % screens.length);
  };

  const skipScreens = () => {
    localStorage.setItem("hasSeenSplash", "true");
    setHasSeenSplash(true);
  };

  const current = screens[currentScreen];

  return (
    <div className="px-4 bg-white flex flex-col min-h-screen ">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 flex justify-center">
        <img src="/iconk.svg" alt="Logo" className="max-h-16 w-auto" />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <img
          src={current.imgUrl}
          alt={current.title}
          className="w-full max-w-md h-auto object-contain"
        />
      </div>

      {/* Page Indicators */}
      <div className="flex justify-center space-x-2 mb-6">
        {screens.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentScreen ? "bg-[#579A0C]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Bottom Content */}
      <div className="pb-8 px-4">
        <h2 className="text-2xl font-bold text-[#090A0A] text-center mb-2 font-gotham">
          {current.title}
        </h2>
        <p className="text-[#545454] text-base text-center mb-8 leading-relaxed">
          {current.description}
        </p>
 {/* Skip Button */}
        <div className="flex justify-center mt-6 mb-5">
          <button
            onClick={skipScreens}
            className="text-xl text-[#92C559] underline font-medium"
          >
            Skip
          </button>
        </div>
        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          {currentScreen > 0 && (
            <button
              onClick={prevScreen}
              className="flex-1 py-3 px-6 text-base font-adron-mid text-[#090A0A] border border-[#579A0C] rounded-full"
            >
              Back
            </button>
          )}
          <button
            onClick={nextScreen}
            className="flex-1 py-3 px-6 bg-[#92C559] text-white rounded-full font-adron-mid"
          >
            {currentScreen === screens.length - 1 ? "Finish" : "Next"}
          </button>
        </div>

       
      </div>
    </div>
  );
};
