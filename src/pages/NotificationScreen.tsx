// pages/NotificationsPage.tsx
import NotificationList from "../components/DashboardNotificationComponents/NotificationList";
import { useGetNotifications } from "../data/hooks";

const NotificationsPage = () => {
  const { data, isError, isLoading } = useGetNotifications();
  const notifications = data?.notifications.data ?? [];
  return (
    <div className="">
      <NotificationList
        data={notifications}
        isError={isError}
        isLoading={isLoading}
      />
    </div>
  );
};

export default NotificationsPage;
