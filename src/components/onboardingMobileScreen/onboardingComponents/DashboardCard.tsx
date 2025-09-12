import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface DashboardCardProps {
  imageSrc: string;
  imageAlt: string;
  label: string;
  url: string; // 👈 Add this
  className?: string;
  imageClassName?: string;
  labelClassName?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  imageSrc,
  imageAlt,
  label,
  url,
  className = '',
  imageClassName = '',
  labelClassName = '',
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-[20px] bg-white px-7 py-5 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition ${className}`}
    >
      <div className="w-full flex justify-center">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`w-8 h-8 object-cover ${imageClassName}`}
        />
      </div>
      <p className={`text-[10px] mt-[10px] text-center ${labelClassName}`}>{label}</p>
    </div>
  );
};

export default DashboardCard;
