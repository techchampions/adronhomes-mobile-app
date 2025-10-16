import React from 'react';
import { MdLocationPin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Interface for props
export interface CompactPropertyCardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  location: string;
  id: any;

  // Optional props
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  locationClassName?: string;
  locationIcon?: React.ReactNode;
  loading?: any;
}

const CompactPropertyCard: React.FC<CompactPropertyCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  location,
  id,
  className = '',
  imageClassName = '',
  titleClassName = '',
  locationClassName = '',
  locationIcon = <MdLocationPin className="text-[#272727] w-5 h-5" />, // Even larger icon
  loading
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!loading) {
      navigate(`/dashboard/properties/${id}`);
    }
  };


  if (loading) {
    return (
      // Increased size for skeleton loader
      // Now a full-width card with increased height
      <div className={`rounded-[15px] bg-white p-5 w-full h-[280px] animate-pulse ${className}`}>
        <div className="mb-5">
          <div className="rounded-xl h-[180px] w-full bg-gray-300" />
        </div>
        <div className="h-5 w-3/4 bg-gray-300 rounded mb-2" />
        <div className="flex items-center">
          <div className="w-5 h-5 bg-gray-300 rounded-full mr-2" />
          <div className="h-5 w-1/2 bg-gray-300 rounded" />
        </div>
      </div>
    );
  }


  return (
    // Increased overall size of the card significantly
    // Now a full-width card with increased height
    <div className={`rounded-[15px] bg-white p-5 w-full h-[280px] flex-shrink-0 cursor-pointer ${className}`} onClick={handleCardClick}>
      <div className="mb-5">
        <img
          src={imageUrl}
          alt={imageAlt}
          // Increased image height significantly
          className={`rounded-xl h-[180px] w-full object-cover ${imageClassName}`}
        />
      </div>
      <p
        className={`font-adron-mid text-base leading-[22px] text-[#272727] truncate max-w-full block ${titleClassName}`} // Increased font size
        style={{ maxWidth: 'calc(100% - 0px)' }}
        title={title}
      >
        {title}
      </p>
      <div className="flex items-center mt-2"> {/* Increased top margin */}
        {locationIcon}
        <p
          className={`text-base text-[#272727] font-[325] truncate max-w-full block ${locationClassName}`} // Increased font size
          style={{ maxWidth: 'calc(100% - 28px)', marginLeft: '8px' }} // Adjusted margin for larger icon
          title={location}
        >
          {location}
        </p>
      </div>
    </div>
  );
};

export default CompactPropertyCard;