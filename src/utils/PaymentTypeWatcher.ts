// utils/Watcher.ts

export const paymentTypeWatcher = (values: {
  paymentType: string;
  paymentDuration: string;
  paymentSchedule: string;
}) => {
  const SelectedPaymentType = values.paymentType;

  return {
    SelectedPaymentType,
  };
};
