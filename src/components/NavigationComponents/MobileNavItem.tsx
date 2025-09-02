import { NavLink } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

interface NavItemProps {
  label: string;
  icon: JSX.Element;
  path: string;
  badgeCount?: number;
}

const MobileNavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  path,
  badgeCount,
}) => {
  return (
    <NavLink
      to={path}
      end={true}
      className={({ isActive }) =>
        `flex flex-col items-center min-w-14 ${
          isActive ? "text-adron-green" : " text-gray-500"
        }`
      }
    >
      <div className={`relative `}>
        {icon}
        {badgeCount && badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {badgeCount}
          </span>
        )}
      </div>
      <span className="text-xs truncate">{label}</span>
    </NavLink>
  );
};

export default MobileNavItem;
