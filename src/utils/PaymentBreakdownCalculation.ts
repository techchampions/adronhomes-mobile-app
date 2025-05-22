// utils/paymentCalculations.ts

import { Property } from "../data/types/GetPropertyByIdResponse";

export const calculatePaymentDetails = (
  values: {
    paymentType: string;
    paymentDuration: string;
    paymentSchedule: string;
  },
  property?: Property
) => {
  const propertyFees =
    property?.details.reduce((sum, detail) => sum + detail.value, 0) ?? 0;
  const fees = propertyFees || 0;
  const initialDeposit =
    values.paymentType === "One Time"
      ? property?.price || 0
      : property?.initial_deposit || 0;

  const remPrice = (property?.price || 0) - (property?.initial_deposit || 0);

  const weeklyAmount =
    values.paymentSchedule === "Monthly"
      ? remPrice / Number(values.paymentDuration || 1)
      : values.paymentSchedule === "Quarterly"
      ? remPrice / (Number(values.paymentDuration || 1) / 3)
      : 0;

  const totalAmount =
    // values.paymentType === "One Time" ? initialDeposit :
    initialDeposit + fees;

  return {
    fees,
    initialDeposit,
    remPrice,
    weeklyAmount,
    totalAmount,
  };
};
