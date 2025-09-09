import React from 'react';

// Icon import (you'll need to install react-icons or use your own)
import { MdLocationPin } from 'react-icons/md';

// Interface for the compact property card props
export interface CompactPropertyCardProps {
  // Image properties
  imageUrl: string;
  imageAlt: string;
  
  // Text properties
  title: string;
  location: string;
  
  // Styling properties
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  locationClassName?: string;
  locationIcon?: React.ReactNode;
}

const CompactPropertyCard: React.FC<CompactPropertyCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  location,
  className = '',
  imageClassName = '',
  titleClassName = '',
  locationClassName = '',
  locationIcon = <MdLocationPin className="text-[#272727] w-3 h-3" />,
}) => {
  return (
    <div className={`rounded-[15px] bg-white  p-3 max-w-[174px] min-w-[174px]${className}`}>
      <div className="mb-3">
        <img
          src={imageUrl}
          alt={imageAlt}
          className={`rounded-xl h-[104px] w-full object-cover ${imageClassName}`}
        />
      </div>
      <p className={`font-adron-mid text-xs leading-[16px] text-[#272727] ${titleClassName}`}>
        {title}
      </p>
      <div className="flex items-center">
        {locationIcon}
        <p className={`text-xs text-[#272727] font-[325] mt-1 ${locationClassName}`}>
          {location}
        </p>
      </div>
    </div>
  );
};

export default CompactPropertyCard;