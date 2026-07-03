declare module "*.css";
// src/global.d.ts

// export {};

// declare global {
//   interface Window {
//     Tawk_API?: {
//       showWidget: () => void;
//       hideWidget: () => void;
//       maximize: () => void;
//       minimize: () => void;
//       toggle: () => void;
//       popup: () => void;
//       onLoad: (callback: () => void) => void;
//       // Add other methods you plan to use
//     };
//     Tawk_LoadStart?: Date;
//   }
// }

interface SectionRouteType {
  id: string;
  label: string;
  helper: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}
interface CommunityOutletContext {
  data?: EstateDashboardData;
}
interface CommunityEstate {
  id: number;
  estate_name: string;
  property_slug: string;
  is_operating: number;
  total_member: number;
  created_at: string;
}

// types/estate-dashboard.types.ts

// ============ Estate Info ============
interface EstateInfo {
  id: number;
  name: string;
  slug: string;
  group_unread: number;
  total_unread: number;
  total_members: number;
  is_operating: number; // 0 or 1
}

// ============ User Info ============
interface UserInfo {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
}

// ============ Ownership and Balances ============
interface OwnershipAndBalances {
  property_type: number;
  payment_type: string; // "1", "2", etc.
  remaining_balance: number;
  paid_amount: number;
}

// ============ Payment ============
interface EstatePayment {
  id: number;
  user_id: number;
  estate_id: number;
  description: string;
  payment_method: string;
  payment_type: string;
  reference: string;
  status: number; // 0 = pending, 1 = success, etc.
  purpose: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  chargeable_id: number;
  user_first_name: string;
  user_last_name: string;
  user_profile_picture: string | null;
}

// ============ Pagination Links ============
interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

// ============ Paginated Response ============
interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

// ============ Access Code ============
interface AccessCode {
  id: number;
  estate_id: number;
  name: string;
  code: string;
  expired_at: string; // ISO datetime string
  limit: number;
  total_used: number;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  user_id: number;
}

// ============ Conversation ============
interface Conversation {
  id: number;
  type: string; // "admin", "user", etc.
  estate_id: number;
  last_message: string;
  channel: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  sender: number;
  receiver: number;
  sender_first_name: string;
  sender_last_name: string;
  sender_profile_picture: string | null;
  receiver_first_name: string;
  receiver_last_name: string;
  receiver_profile_picture: string | null;
}
interface Message {
  id: number;
  type: string; // "admin", "user", etc.
  estate_id: number;
  message: string;
  channel: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  sender: number;
  receiver: number;
  sender_first_name: string;
  sender_last_name: string;
  sender_profile_picture: string | null;
  receiver_first_name: string;
  receiver_last_name: string;
  receiver_profile_picture: string | null;
}

// ============ Utility ============
interface Utility {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
}

// ============ Maintenance Request ============
interface MaintenanceRequest {
  id: number;
  title?: string;
  content?: string;
  priority?: "High" | "Medium" | "Low";
  status?: "Pending" | "Assigned" | "Resolved";
  created_at?: string;
  updated_at?: string;
}
interface GroupConversation {
  channel: string;
  created_at: string;
  estate_id: string;
  id: number;
  last_message: string;
  updated_at: string;
}
// ============ Complete Dashboard Data ============
interface EstateDashboardData {
  estate_info: EstateInfo;
  user_info: UserInfo;
  ownership_and_balances: OwnershipAndBalances;
  recent_payments: PaginatedResponse<EstatePayment>;
  active_access_codes: PaginatedResponse<AccessCode>;
  maintenance_requests: PaginatedResponse<MaintenanceRequest>;
  conversations: PaginatedResponse<Conversation>;
  group_conversation: GroupConversation;
  utilities: Utility[];
}

// ============ Complete API Response ============
type EstateDashboardResponse = ApiResponse<EstateDashboardData>;

// ============ For use in components ============
interface EstateDashboardProps {
  estateId: number;
  data?: EstateDashboardData;
  isLoading?: boolean;
  error?: string | null;
}

// ============ Helper Types for Filters ============
interface DashboardFilters {
  page?: number;
  per_page?: number;
  payment_type?: string;
  status?: number;
  from_date?: string;
  to_date?: string;
}

// ============ Statistics Summary ============
interface DashboardStatistics {
  totalMembers: number;
  totalPaid: number;
  remainingBalance: number;
  totalAccessCodes: number;
  activeAccessCodes: number;
  totalConversations: number;
  unreadConversations: number;
  totalMaintenanceRequests: number;
  pendingMaintenanceRequests: number;
}

// ============ Chart/Graph Data ============
interface PaymentChartData {
  labels: string[]; // months or dates
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

interface PaymentSummary {
  total_paid: number;
  total_remaining: number;
  payment_status: {
    completed: number;
    pending: number;
    failed: number;
  };
  recent_payments: Payment[];
}
interface RequestPaylaod {
  estate_id?: number;
  title: string;
  content: string;
  priority: string;
  attached: File | null;
}
interface UtitlityPayload {
  estate_id: number;
  payment_type: string;
  payment_method: string;
  chargeable_id: string;
}
interface AccessCodePayload {
  estate_id: number;
  access_type: string;
  expiry_date: string;
}

interface UtilityPaymentResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    estate_id: number;
    description: string;
    payment_method: string;
    payment_type: string;
    reference: string;
    status: number;
    purpose: string;
    created_at: string;
    updated_at: string;
    chargeable_id: number;
    user_first_name: string;
    user_last_name: string;
    user_profile_picture: string;
  };
}

interface SendMessagePayload {
  receiver_id: number;
  estate_id: number;
  message: string;
}
interface SendGroupMessagePayload {
  estate_id: number;
  message: string;
}
interface GroupMessage {
  channel: string;
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  message: string;
  user_id: number;
  profile_picture: string;
}
interface GroupMessageResponse {
  conversation: GroupConversation;
  messages: PaginatedResponse<GroupMessage>;
}
