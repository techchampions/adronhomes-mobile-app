// components/ReusableList.tsx
import React from "react";

export type ListItem = {
  id: string | number;
  title: string;
  subtitle?: string;
  status?: "Completed" | "Pending" | "Failed" | string;
  amount?: string;
  date?: string;
};

type Props = {
  items: ListItem[];
  renderRight?: (item: ListItem) => React.ReactNode;
};

const ReusableList: React.FC<Props> = ({ items, renderRight }) => {
  return (
    <div className="divide-y divide-gray-200 bg-white rounded-xl shadow">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center px-4 py-4 hover:bg-gray-50 transition"
        >
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">{item.title}</span>
            {item.subtitle && (
              <span className="text-sm text-gray-500">{item.subtitle}</span>
            )}
            {item.date && (
              <span className="text-xs text-gray-400 mt-1">{item.date}</span>
            )}
          </div>
          {renderRight && renderRight(item)}
        </div>
      ))}
    </div>
  );
};

export default ReusableList;
