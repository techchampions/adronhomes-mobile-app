// src/components/Slideshow.tsx
import React, { useEffect, useState } from "react";
import { useGetSlidersByType } from "../../data/hooks";
import Loader from "../Loader";
import { SliderByTypeData } from "../../data/types/SliderByTypeTypes";

// const images = ["/images/lemon-friday.png", "/treasure-park-bg.png"];
type Props = {
  slides: SliderByTypeData[];
  isloading: boolean;
};
const Slideshow: React.FC<Props> = ({ slides, isloading }) => {
  const [current, setCurrent] = useState(0);
  // const { data: loginSlidesData, isLoading: isLoadingLogin } =
  //   useGetSlidersByType("login");
  // const slides = loginSlidesData?.data || [];

  const renderSlideShow = () => {
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 2500);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={`Slide ${index}`}
            className={`
            absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
          />
        ))}
      </div>
    );
  };
  if (isloading) {
    return <Loader />;
  }
  return renderSlideShow();
};

export default Slideshow;
