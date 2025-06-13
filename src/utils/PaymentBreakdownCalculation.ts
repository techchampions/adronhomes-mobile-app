// utils/paymentCalculations.ts

import { Property } from "../data/types/GetPropertyByIdResponse";

export const calculatePaymentDetails = (
  values: {
    paymentType: string;
    paymentDuration: string;
    paymentSchedule: string;
    units: number;
  },
  property?: Property
) => {
  const propertyFees =
    property?.details.reduce((sum, detail) => sum + detail.value, 0) ?? 0;
  const fees = propertyFees || 0;
  const units = values.units ? values.units : 1;
  const oneTimePrice = property?.price || 0;
  const oneTimeTotal = oneTimePrice * units;

  const installmentPrice = property?.initial_deposit || 0;
  const installmentPriceTotal = installmentPrice * units;
  const initialDeposit =
    values.paymentType === "One Time"
      ? oneTimeTotal
      : // ? property?.price || 0 * values.units
        installmentPriceTotal;
  // property?.initial_deposit || 0 * values.units;

  const remPrice = (property?.price || 0) - (property?.initial_deposit || 0);
  console.log(remPrice);

  const weeklyAmount =
    values.paymentSchedule === "Monthly"
      ? remPrice / Number(values.paymentDuration || 1)
      : values.paymentSchedule === "Quarterly"
      ? remPrice / (Number(values.paymentDuration || 1) / 3)
      : 0;

  const totalAmount =
    // values.paymentType === "One Time" ? initialDeposit :
    initialDeposit;

  return {
    fees,
    initialDeposit,
    remPrice,
    weeklyAmount,
    totalAmount,
  };
};
