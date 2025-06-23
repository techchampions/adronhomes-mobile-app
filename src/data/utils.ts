export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
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

export const getProgressPercent = Math.min(
  100,
  (40000000 / 700000000) * 100
).toFixed(1);
