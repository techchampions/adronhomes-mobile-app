// src/components/Slideshow.tsx
import { useEffect, useState } from "react";

const images = ["/images/lemon-friday.png", "/treasure-park-bg.png"];

const Slideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
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

export default Slideshow;
