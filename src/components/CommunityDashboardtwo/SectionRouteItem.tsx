import React from "react";
import { NavLink } from "react-router-dom";
interface Prop {
  section: SectionRouteType;
}
const SectionRouteItem: React.FC<Prop> = ({ section }) => {
  return (
    <NavLink
      to={section.path}
      end={true}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition sm:px-3 sm:py-3 ${
          isActive
            ? "border-[#79B833] bg-[#79B833] text-white shadow-sm"
            : "border-slate-200 bg-white text-slate-700 hover:border-[#79B833]/50 hover:bg-[#79B833]/5"
        }`
      }
    >
      <span className={`rounded-lg p-1.5 sm:p-2 bg-white/15`}>
        <section.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold sm:text-sm truncate">
          {section.label}
        </span>
      </span>
    </NavLink>
  );
};

export default SectionRouteItem;
