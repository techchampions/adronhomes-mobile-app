export type NotificationStatus = 0 | 1;
export interface Notification {
  id: number;
  title: string;
  content: string;
  is_read: NotificationStatus;
  created_at: string | null;
  updated_at: string | null;
  property_id: number;
  user_id: number;
  plan_id: number;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface NotificationsData {
  current_page: number;
  data: Notification[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface NotificationsResponse {
  success: boolean;
  unread: number;
  notifications: NotificationsData;
}
