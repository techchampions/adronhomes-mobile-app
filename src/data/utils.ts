export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};
export const formatInputPrice = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
};
export const formatToNaira = (amount: number) => {
  if (!amount) return "";
  // const number = parseInt(amount.replace(/,/g, ""), 10);
  if (isNaN(amount)) return "";
  return "₦" + amount.toLocaleString("en-NG");
};
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // hour12: true,
  });
};

export const formatTimeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

  return `${Math.floor(diff / 86400)}d ago`;
};
export const formatTime = (date: string) => {
  const time = new Date(date).toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return time;
};

export const getProgressPercent = Math.min(
  100,
  (40000000 / 700000000) * 100
).toFixed(1);

export const getChannelDisplayName = (
  channel: Conversation,
  user_id?: number
) => {
  if (channel.sender === user_id) {
    return `${channel.receiver_first_name} ${channel.receiver_last_name}`.trim();
  }
  return `${channel.sender_first_name} ${channel.sender_last_name}`.trim();
};
export const getChannelImage = (channel: Conversation, user_id?: number) => {
  if (channel.sender === user_id) {
    return channel.receiver_profile_picture;
  }
  return channel.sender_profile_picture;
};
export const getChannelInitials = (channel: Conversation, user_id?: number) => {
  const name = getChannelDisplayName(channel, user_id);
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const isOwnMessage = (message: Message, user_id?: number) => {
  return message.sender === user_id; // Current user ID
};
export const getReceiver = (message: Message, user_id?: number) => {
  if (message.sender === user_id) {
    return message.receiver; // Current user ID
  }
  return message.sender; // Current user ID
};
