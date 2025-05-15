export interface Property {
  id: number;
  name: string;
  price: number;
  size: string;
  display_image: string;
  lga: string;
  state: string;
}

export interface Plan {
  id: number;
  payment_percentage: number;
  repayment_schedule: string;
  next_payment_date: string;
  total_amount: number;
  paid_amount: number;
  remaining_balance: number;
  status: number;
  monthly_duration: string;
}

export interface Notification {
  id: number;
  title: string;
  content: string;
  is_read: number;
  created_at: string | null;
  updated_at: string | null;
  property_id: number;
  user_id: number;
  plan_id: number;
  property: Property;
  plan: Plan;
}

export interface NotificationByIDResponse {
  success: boolean;
  notification: Notification;
}
