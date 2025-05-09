// import React, { useEffect, useState } from "react";

// const images = ["/images/lemon-friday.png", "/treasure-park-bg.png"];

// const FADE_DURATION = 1000;
// const DISPLAY_DURATION = 3000;

// const FadeSlideshow: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [fade, setFade] = useState(true);

//   useEffect(() => {
//     const fadeOutTimeout = setTimeout(() => {
//       setFade(false);
//     }, DISPLAY_DURATION);

//     const changeSlideTimeout = setTimeout(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//       setFade(true);
//     }, DISPLAY_DURATION + FADE_DURATION);

//     return () => {
//       clearTimeout(fadeOutTimeout);
//       clearTimeout(changeSlideTimeout);
//     };
//   }, [currentIndex]);

//   return (
//     <div className="relative w-full h-full overflow-hidden bg-transparent">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-${FADE_DURATION} ease-linear ${
//             index === currentIndex
//               ? fade
//                 ? "opacity-100"
//                 : "opacity-0"
//               : "opacity-0"
//           }`}
//           style={{ zIndex: index === currentIndex ? 1 : 0 }}
//         >
//           <img src={image} alt="Slide" className="w-full h-full object-cover" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FadeSlideshow;

import React, { useEffect, useState } from "react";

const images = ["/images/lemon-friday.png", "/treasure-park-bg.png"];

const FADE_DURATION = 5000;
const DISPLAY_DURATION = 5000;

const FadeSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, DISPLAY_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-${FADE_DURATION} ease-linear ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img src={image} alt="Slide" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default FadeSlideshow;
