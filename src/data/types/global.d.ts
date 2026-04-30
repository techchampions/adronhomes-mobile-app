interface EligibleGift {
  promo_id: number;
  promo_name: string;
  tier_id: number;
  is_claimed: boolean;
  gift_request: GiftRequest;
  unlocked_by: string; // Formatted currency string (e.g., "₦10,000")
  reward_groups: RewardGroup[];
}
interface GiftRequest {
  id: number;
  user_id: number;
  promo_id: number;
  property_id: number;
  user_note: string;
  status: "pending" | "approved" | "rejected"; // Add other statuses as needed
  processed_at: string | null;
  created_at: string;
  updated_at: string;
  reward_group_id: number;
  items: GiftRequestItem[];
  logic: "AND" | "OR";
}

interface GiftRequestItem {
  item_id: string;
  name: string;
  qty: number;
}
interface RewardItem {
  item_id: string;
  name: string;
  item_name: string;
  qty: number;
}

// Reward group containing multiple items with logic
interface RewardGroup {
  id: number;
  logic: "AND" | "OR"; // Logic operator for combining items
  items: RewardItem[];
}
