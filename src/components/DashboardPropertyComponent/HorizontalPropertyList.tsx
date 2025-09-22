import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import PropertyCard from "../PropertyCard";
import { Property } from "../../data/types/propertiesPageTypes";

interface Props {
  title: string;
  properties: Property[];
}
const HorizontalPropertyList: React.FC<Props> = ({ title, properties }) => {
  const navigate = useNavigate();
  const handleMoreProducts = () => {
    navigate("/dashboard/new-properties");
  };
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!embla) return;
    const updateButtons = () => {
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());
    };

    updateButtons();
    embla.on("select", updateButtons);
    embla.on("reInit", updateButtons);
  }, [embla]);

  const scrollPrev = () => embla?.scrollPrev();
  const scrollNext = () => embla?.scrollNext();

  return (
    <div className="w-full my-7">
      <div className="flex items-center justify-between">
        <h4 className="font-bold">{title}</h4>
        <Button
          label="More Properties"
          rightIcon={<FiChevronRight />}
          onClick={handleMoreProducts}
          className="!bg-transparent border-1 border-adron-green-300 !text-adron-green !w-fit px-5 text-sm hover:!bg-adron-green-300"
        />
      </div>
      <div className="relative w-full mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex space-x-4 p-4 gap-4">
            {properties.map((property, index) => (
              <PropertyCard
                key={index}
                id={property.id}
                image={property.display_image}
                title={property.name}
                price={property.price}
                streetAddress={property.street_address}
                state={property.state}
                lga={property.lga}
                country={property.country}
                //   location={address}
                squareFeet={property.size}
                hasLights={property.hasLights}
                hasGym={property.hasGym}
                isLand={property.isLand} 
                slug={property.slug}/>
            ))}
          </div>
        </div>

        {canScrollPrev && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-4 rounded-full shadow-md"
            onClick={scrollPrev}
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {canScrollNext && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-4 rounded-full shadow-md"
            onClick={scrollNext}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalPropertyList;