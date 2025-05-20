import { number } from "yup";
import { create } from "zustand";

type PaymentBreakDownStore = {
  initialDeposit: number;
  fees: number;
  weeklyAmount: number;
  totalAmount: number;
  propertyId: string | number;
  propertyPrice: number;
  propertyName: string;

  paymentType: string;
  paymentDuration: string;
  paymentSchedule: string;
  startDate: string;
  endDate: string;
  setPaymentDetails: (
    details: Partial<
      Omit<PaymentBreakDownStore, "setPaymentDetails" | "resetPaymentDetails">
    >
  ) => void;
  resetPaymentDetails: () => void;
};

export const usePaymentBreakDownStore = create<PaymentBreakDownStore>(
  (set) => ({
    initialDeposit: 0,
    fees: 0,
    weeklyAmount: 0,
    totalAmount: 0,
    propertyId: "",
    propertyPrice: 0,
    propertyName: "",

    paymentType: "",
    paymentDuration: "",
    paymentSchedule: "",
    startDate: "",
    endDate: "",

    setPaymentDetails: (details) => set((state) => ({ ...state, ...details })),

    resetPaymentDetails: () =>
      set({
        initialDeposit: 0,
        fees: 0,
        weeklyAmount: 0,
        totalAmount: 0,
        propertyId: "",
        propertyPrice: 0,
        propertyName: "",

        paymentType: "",
        paymentDuration: "",
        paymentSchedule: "",
        startDate: "",
        endDate: "",
      }),
  })
);
