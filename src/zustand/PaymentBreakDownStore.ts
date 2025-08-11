import { create } from "zustand";

type PaymentBreakDownStore = {
  initialDeposit: number;
  infrastructureFees: number;
  otherFees: number;
  weeklyAmount: number;
  totalAmount: number;
  propertyId: number | null;
  planId: number | null;
  propertyPrice: number;
  propertyName: string;
  marketerId: string;
  paymentType: string;
  propertyPurpose: string | null;
  paymentDuration: number | null;
  paymentSchedule: string;
  numberOfUnits: number;
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
    infrastructureFees: 0,
    otherFees: 0,
    weeklyAmount: 0,
    totalAmount: 0,
    propertyId: null,
    planId: null,
    propertyPrice: 0,
    propertyPurpose: "",
    propertyName: "",
    marketerId: "",
    numberOfUnits: 1,
    paymentType: "",
    paymentDuration: null,
    paymentSchedule: "",
    startDate: "",
    endDate: "",

    setPaymentDetails: (details) => set((state) => ({ ...state, ...details })),

    resetPaymentDetails: () =>
      set({
        initialDeposit: 0,
        infrastructureFees: 0,
        otherFees: 0,
        weeklyAmount: 0,
        totalAmount: 0,
        propertyId: null,
        planId: null,
        propertyPrice: 0,
        numberOfUnits: 1,
        propertyName: "",
        propertyPurpose: "",
        marketerId: "",
        paymentType: "",
        paymentDuration: null,
        paymentSchedule: "",
        startDate: "",
        endDate: "",
      }),
  })
);
