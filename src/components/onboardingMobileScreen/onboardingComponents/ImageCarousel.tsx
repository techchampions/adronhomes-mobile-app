import { useEffect, useState, useCallback } from "react";
import SmallLoader from "./SmallLoader";

interface CarouselImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  interval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<number>>(new Set());

  // Reset states when images change
  useEffect(() => {
    if (!images) return;
    setLoadedImages(new Set());
    setErrorImages(new Set());
    setCurrentIndex(0); // Reset to first slide when images change
  }, [images]);

  // Auto slide functionality - only when at least one image is loaded
  useEffect(() => {
    if (!images || images.length === 0) return;
    if (loadedImages.size === 0) return; // Don't auto-slide until images load
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);
    
    return () => clearInterval(timer);
  }, [images, interval, loadedImages.size]);

  // Handle image load
  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  }, []);

  // Handle image error
  const handleImageError = useCallback((index: number) => {
    setErrorImages(prev => new Set(prev).add(index));
  }, []);

  // Preload adjacent images for smoother experience
  useEffect(() => {
    if (!images || images.length === 0) return;
    
    // Preload next and previous images
    const preloadIndexes = [
      (currentIndex + 1) % images.length,
      (currentIndex - 1 + images.length) % images.length,
    ];
    
    preloadIndexes.forEach(index => {
      if (!loadedImages.has(index) && !errorImages.has(index)) {
        const img = new Image();
        img.src = images[index].src;
        img.onload = () => handleImageLoad(index);
        img.onerror = () => handleImageError(index);
      }
    });
  }, [currentIndex, images, loadedImages, errorImages, handleImageLoad, handleImageError]);

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    if (!images || images.length === 0) return;
    setCurrentIndex(index);
  }, [images]);

  const goToNext = useCallback(() => {
    if (!images || images.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images]);

  const goToPrev = useCallback(() => {
    if (!images || images.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images]);

  // If no images provided
  if (!images || images.length === 0) {
    return (
      <div className="mb-[32px] px-4">
        <div className="w-full min-h-[160px] md:min-h-[250px] lg:min-h-[400px] overflow-hidden rounded-[20px] bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 md:w-20 md:w-20 text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
                <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1" />
                <polyline points="21 15 16 10 5 21" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="text-gray-500 text-sm md:text-base">
              No images available
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Check if current slide image is loaded
  const isCurrentImageLoaded = loadedImages.has(currentIndex);
  const isCurrentImageError = errorImages.has(currentIndex);
  const showLoader = !isCurrentImageLoaded && !isCurrentImageError;

  // If no images provided or images is undefined, show empty state
  if (!images || images.length === 0) {
    return (
      <div className="mb-[32px] px-4">
        <div className="w-full min-h-[160px] md:min-h-[250px] lg:min-h-[400px] overflow-hidden rounded-[20px] bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 md:w-20 md:h-20 text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
                <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1" />
                <polyline points="21 15 16 10 5 21" strokeWidth="1.5" />
                <line x1="10" y1="9" x2="5" y2="14" strokeWidth="1.5" />
                <line x1="19" y1="5" x2="14" y2="10" strokeWidth="1.5" />
                <line x1="4" y1="4" x2="8" y2="8" strokeWidth="1.5" stroke="#ef4444" />
                <line x1="20" y1="20" x2="16" y2="16" strokeWidth="1.5" stroke="#ef4444" />
              </svg>
            </div>
            <span className="text-gray-500 text-sm md:text-base">
              No images available
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-[32px] px-4 relative group">
      <div className="w-full min-h-[160px] md:min-h-[250px] lg:min-h-[400px] overflow-hidden rounded-[20px] relative bg-gray-100">
        {/* Centered Loader - Only shows when current image is not loaded */}
        {showLoader && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100">
            <SmallLoader />
          </div>
        )}

        {/* Error State for Current Slide */}
        {isCurrentImageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 md:h-20 md:w-20 text-gray-400 mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
              <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1" />
              <polyline points="21 15 16 10 5 21" strokeWidth="1.5" />
              <line x1="4" y1="4" x2="8" y2="8" strokeWidth="1.5" stroke="#ef4444" />
              <line x1="20" y1="20" x2="16" y2="16" strokeWidth="1.5" stroke="#ef4444" />
            </svg>
            <span className="text-gray-500 text-sm md:text-base">
              Image unavailable
            </span>
          </div>
        )}
        
        {/* Carousel Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => {
            const isLoaded = loadedImages.has(index);
            const hasError = errorImages.has(index);
            
            return (
              <div key={index} className="w-full flex-shrink-0 h-full relative">
                {/* Image - always rendered but visibility controlled */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-full object-contain ${
                    isLoaded && !hasError ? 'opacity-100' : 'opacity-0 invisible'
                  }`}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
                  loading={index === 0 ? "eager" : "lazy"}
                  style={{ 
                    opacity: isLoaded && !hasError ? 1 : 0,
                    transition: 'opacity 0.2s ease-in-out',
                    visibility: isLoaded && !hasError ? 'visible' : 'hidden'
                  }}
                />
              </div>
            );
          })}
        </div>
        
        {/* Navigation arrows - only show when current image is loaded */}
        {isCurrentImageLoaded && !isCurrentImageError && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-20"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-20"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </>
        )}
      </div>
      
      {/* Dots indicator - only show when at least one image is loaded */}
      {loadedImages.size > 0 && (
        <div className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2 space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 md:w-3 md:h-3 ${
                index === currentIndex ? "bg-[#79B833] scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;