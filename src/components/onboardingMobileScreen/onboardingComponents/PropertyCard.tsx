import React from 'react';
import { IconType } from 'react-icons';
import { FaRegHeart } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';

// Define interfaces for props
interface Feature {
  iconSrc: string;
  alt: string;
  label: string;
}

interface PropertyCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  location: string;
  price: string;
  features: Feature[];
}

// Reusable PropertyCard component
const PropertyCard: React.FC<PropertyCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  location,
  price,
  features,
}) => {
  return (
    <div className="bg-[#FFFFFF]  rounded-[20px] p-3 flex overflow-hidden ">
      {/* Image */}
      <div className="mr-3 flex-shrink-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="rounded-xl h-[104px] w-[120px] object-cover"
        />
      </div>
      {/* Properties */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <p className="font-adron-mid text-xs leading-[16px] text-[#272727] truncate ">
          {title}
        </p>
        <div className="flex items-center">
          <MdLocationPin className="text-[#272727] w-3 h-3" />
          <p className="text-xs text-[#272727] font-[325] truncate">
            {location}
          </p>
        </div>
        <div className="relative">
          <p className="font-adron-mid text-xs leading-[16px] text-[#272727] truncate">
            {price}
          </p>
          <div className="absolute right-0 top-0">
            <FaRegHeart className="w-4 h-4" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 pr-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <img
                  src={feature.iconSrc}
                  alt={feature.alt}
                  className="w-3 h-3 mr-1"
                />
                <p className="font-adron-mid text-[10px] text-[#717171]">
                  {feature.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;