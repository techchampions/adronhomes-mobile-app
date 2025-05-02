// pages/NotificationsPage.tsx
import React from "react";
import ReusableList, { ListItem } from "../components/ReusableList";

const notifications: ListItem[] = [
  {
    id: 1,
    title: "New update on Marikaba Property",
    subtitle: "Now on 20% sale discount...",
    date: "15th May, 2024 | 9:00PM",
  },
  // ...more
];

const NotificationsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Notifications</h1>
      <ReusableList items={notifications} />
    </div>
  );
};

export default NotificationsPage;
