// components/EstateSelector.tsx
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, MapPin, Users2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export interface EstateSelectorProps {
  estates: CommunityEstate[];
  selected: CommunityEstate;
  setSelected: (estate: CommunityEstate) => void;
}

export const EstateCardSkeleton = () => (
  <div className="flex-[0_0_40%] min-w-0">
    <div className="rounded-xl border border-[#79B833]/20 bg-white p-4 animate-pulse">
      <div className="mb-3 flex items-start justify-between">
        <div className="h-5 w-5 bg-gray-200 rounded-full flex-shrink-0" />
        <div className="flex-1 ml-3">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-2/3 mt-1" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg border border-green-500 p-3">
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
          <div className="h-3 bg-gray-200 rounded w-full mt-2" />
        </div>
        <div className="rounded-lg border border-green-500 p-3">
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
          <div className="h-3 bg-gray-200 rounded w-full mt-2" />
        </div>
      </div>
    </div>
  </div>
);

const EstateSelector: React.FC<EstateSelectorProps> = ({
  estates,
  selected,
  setSelected,
}) => {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!embla) return;

    const updateButtons = () => {
      setSelectedIndex(embla.selectedScrollSnap());
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());
    };

    updateButtons();
    embla.on("select", updateButtons);
    embla.on("reInit", updateButtons);

    return () => {
      embla.off("select", updateButtons);
      embla.off("reInit", updateButtons);
    };
  }, [embla]);

  const scrollPrev = () => embla?.scrollPrev();
  const scrollNext = () => embla?.scrollNext();

  return (
    <div className="relative overflow-hidden">
      <div className="font-adron-bold text-xl sm:text-3xl mb-2">
        Select Estate
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {estates.map((estate, i) => (
            <div
              key={i}
              // Show 2.5 items: each slide takes ~40% of container width
              className={`${
                estates.length > 1
                  ? "flex-[0_0_80%] sm:flex-[0_0_40%]"
                  : "flex-[0_0_100%] sm:flex-[0_0_40%]"
              } min-w-0 pl-2 first:pl-0 pr-2`}
            >
              <div
                className={`rounded-xl border p-4 cursor-pointer transition-all duration-300 ${
                  selected?.id === estate.id
                    ? "border-[#79B833] bg-gradient-to-tr from-adron-green to-gray-700 text-white shadow-lg"
                    : "border-[#79B833]/20 bg-white hover:bg-[#79B833]/10"
                }`}
                onClick={() => setSelected(estate)}
              >
                <div className="mb-3 flex items-start gap-2">
                  <div className="p-2 rounded-lg flex items-center justify-center bg-adron-green-200">
                    <MapPin className="h-5 w-5 text-adron-green flex-shrink-0" />
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-wide">
                      {estate.estate_name || "Property Group"}
                    </p>
                    <p className="mt-1 text-xs">
                      {
                        "Owners are grouped by estate, land area, building, or unit."
                      }
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="">
                        {estate.total_member} community members
                      </div>
                      <Users2 size={15} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {canScrollPrev && (
        <button
          className="absolute z-50 left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all backdrop-blur-sm"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {canScrollNext && (
        <button
          className="absolute z-50 right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all backdrop-blur-sm"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default EstateSelector;
