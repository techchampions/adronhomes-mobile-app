// pages/NotificationsPage.tsx
import React from "react";
import NotificationList, {
  NotificationItem,
} from "../components/DashboardNotificationComponents/NotificationList";

const notifications: NotificationItem[] = [
  {
    id: 1,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Read",
  },
  {
    id: 2,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Read",
  },
  {
    id: 3,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Read",
  },
  {
    id: 4,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Unread",
  },
  {
    id: 5,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Read",
  },
  {
    id: 6,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Unread",
  },
  // ...more
  {
    id: 7,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Read",
  },
  {
    id: 8,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Unread",
  },
  {
    id: 9,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Read",
  },
  {
    id: 10,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Unread",
  },
  {
    id: 11,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Read",
  },
  {
    id: 12,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Unread",
  },
  {
    id: 13,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Read",
  },
  {
    id: 14,
    title: "New update on Marikaba Property",
    desc: "Markaba Property is now on 20% sale discount with 7 plots going for as low as...",
    date: "15th May, 2024 | 9:00PM",
    status: "Unread",
  },
];

const NotificationsPage = () => {
  return (
    <div className="">
      <NotificationList data={notifications} />
    </div>
  );
};

export default NotificationsPage;
