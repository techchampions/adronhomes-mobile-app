import React from 'react';

export interface DashboardCardProps {
  imageSrc: string;
  imageAlt: string;
  label: string;
  className?: string;
  imageClassName?: string;
  labelClassName?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  imageSrc,
  imageAlt,
  label,
  className = '',
  imageClassName = '',
  labelClassName = '',
}) => {
  return (
    <div className={`rounded-[20px] bg-white px-7 py-5 flex flex-col items-center justify-center ${className}`}>
      <div className="w-full flex justify-center">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`w-8 h-8 object-cover ${imageClassName}`}
        />
      </div>
      <p className={`text-sm mt-[10px] text-center ${labelClassName}`}>{label}</p>
    </div>
  );
};

export default DashboardCard;
