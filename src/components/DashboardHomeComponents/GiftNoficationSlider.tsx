import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { UserProperty } from "../../data/types/dashboardHomeTypes";
import GiftNotification from "./GiftNotification";
interface Props {
  plan_with_gifts: UserProperty[];
}
const GiftNotificationSlider: React.FC<Props> = ({ plan_with_gifts }) => {
  // Embla Carousel Config
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
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
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-adron-green to-gray-800">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {plan_with_gifts.map((item, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 h-full">
              <GiftNotification item={item} />
            </div>
          ))}
        </div>
      </div>

      {canScrollPrev && (
        <button
          className="absolute z-50 left-1 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition-all"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {canScrollNext && (
        <button
          className="absolute z-50 right-1 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition-all"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default GiftNotificationSlider;
