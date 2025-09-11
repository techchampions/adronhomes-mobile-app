import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../data/apiClient';
import { useToastStore } from '../../../zustand/useToastStore';


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
  price: string | number;
  features: string[];
  id: number;
  loading?: boolean;
  isSavedInitial: boolean;
}

// Feature to icon mapping
const featureIcons: Record<string, { iconSrc: any; alt: string }> = {
  'Gym': {
    iconSrc: '_gym.svg',
    alt: 'Gym'
  },
  'Swimming Pool': {
    iconSrc: 'ruller.svg',
    alt: 'Swimming Pool'
  },
  'Drainage': {
    iconSrc: 'strtlight.svg',
    alt: 'Drainage'
  },
  'Super Market': {
    iconSrc: 'strtlight.svg',
    alt: 'Super Market'
  },
  'Cinema': {
    iconSrc: 'strtlight.svg',
    alt: 'Cinema'
  },
  'Streetlight': {
    iconSrc: 'strtlight.svg',
    alt: 'Streetlight'
  },
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  location,
  price,
  features,
  id,
  loading,
  isSavedInitial
}) => {
  const [isSaved, setIsSaved] = useState(isSavedInitial);
  const navigate = useNavigate();
 const { showToast } = useToastStore();
  const handleCardClick = () => {
    if (!loading) {
      navigate(`/dashboard/properties/${id}`);
    }
  };

  const toggleSaveProperty = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;

    try {
      const formData = new FormData();
      formData.append("property_id", String(id));
      const res = await apiClient.post("/user/save-property-toggle", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast(res.data.message, "success");
      setIsSaved(!isSaved);
    } catch (error) {
      showToast('Error saving property', "error");
    }
  };

  const formattedFeatures = features
    .filter(feature => featureIcons[feature])
    .slice(0, 2)
    .map(feature => ({
      ...featureIcons[feature],
      label: feature
    }));

  if (loading) {
    return (
      <div className="bg-[#FFFFFF] rounded-[20px] p-3 flex overflow-hidden animate-pulse">
        <div className="mr-3 flex-shrink-0">
          <div className="rounded-xl h-[104px] w-[120px] bg-gray-300" />
        </div>

        <div className="flex flex-col justify-between flex-1 min-w-0 space-y-2">
          <div className="h-3 w-1/2 bg-gray-300 rounded" />
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full" />
            <div className="h-3 w-1/3 bg-gray-300 rounded" />
          </div>
          <div className="h-3 w-1/4 bg-gray-300 rounded relative">
            <div className="absolute right-0 top-0 w-4 h-4 bg-gray-300 rounded" />
          </div>
          <div className="flex space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-300 rounded" />
              <div className="w-10 h-2 bg-gray-300 rounded" />
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-300 rounded" />
              <div className="w-10 h-2 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] rounded-[20px] p-3 flex overflow-hidden cursor-pointer" onClick={handleCardClick}>
      <div className="mr-3 flex-shrink-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="rounded-xl h-[104px] w-[120px] object-cover"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <p className="font-adron-mid text-xs leading-[16px] text-[#272727] truncate">
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

          <div
            className="absolute right-0 top-0 cursor-pointer"
            onClick={toggleSaveProperty}
          >
            {isSaved ? (
              <FaHeart className="w-4 h-4 text-red-500" />
            ) : (
              <FaRegHeart className="w-4 h-4" />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2 pr-2">
            {formattedFeatures.map((feature, index) => (
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