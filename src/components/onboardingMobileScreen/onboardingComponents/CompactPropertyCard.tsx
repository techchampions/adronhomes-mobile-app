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
  locationIcon = <MdLocationPin className="text-[#272727] w-3 h-3" />,
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
      <div className={`rounded-[15px] bg-white p-3 max-w-[174px] min-w-[174px] animate-pulse ${className}`}>
        <div className="mb-3">
          <div className="rounded-xl h-[104px] w-full bg-gray-300" />
        </div>
        <div className="h-3 w-2/3 bg-gray-300 rounded mb-1" />
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 rounded-full mr-1" />
          <div className="h-3 w-1/2 bg-gray-300 rounded" />
        </div>
      </div>
    );
  }


  return (
    <div className={`rounded-[15px] bg-white p-3 max-w-[174px] min-w-[174px] cursor-pointer ${className}`} onClick={handleCardClick}>
      <div className="mb-3">
        <img
          src={imageUrl}
          alt={imageAlt}
          className={`rounded-xl h-[104px] w-full object-cover ${imageClassName}`}
        />
      </div>
      <p
        className={`font-adron-mid text-xs leading-[16px] text-[#272727] truncate max-w-full block ${titleClassName}`}
        style={{ maxWidth: 'calc(100% - 0px)' }}
        title={title}
      >
        {title}
      </p>
      <div className="flex items-center">
        {locationIcon}
        <p
          className={`text-xs text-[#272727] font-[325] mt-1 truncate max-w-full block ${locationClassName}`}
          style={{ maxWidth: 'calc(100% - 20px)', marginLeft: '4px' }}
          title={location}
        >
          {location}
        </p>
      </div>
    </div>
  );
};

export default CompactPropertyCard;
