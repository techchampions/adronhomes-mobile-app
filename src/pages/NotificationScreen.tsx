// pages/NotificationsPage.tsx
import { useState } from "react";
import NotificationList from "../components/DashboardNotificationComponents/NotificationList";
import { useGetNotifications } from "../data/hooks";
import Pagination from "../components/Pagination";

const NotificationsPage = () => {
  const [page, setPage] = useState(1);

  const { data, isError, isLoading } = useGetNotifications(page);
  const totalPages = data?.notifications.last_page || 0;

  const notifications = data?.notifications.data ?? [];
  return (
    <div className="">
      <NotificationList
        data={notifications}
        isError={isError}
        isLoading={isLoading}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        hasPrev={!!data?.notifications.prev_page_url}
        hasNext={!!data?.notifications.next_page_url}
      />
    </div>
  );
};

export default NotificationsPage;
