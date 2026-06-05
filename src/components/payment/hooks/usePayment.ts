import { useState, useCallback, useEffect } from 'react';
import { useGetUserWalletdata } from '../../../data/hooks';

export type PaymentStep = 'amount' | 'method' | 'processing' | 'success';

export interface PaymentState {
  amount: number;
  paymentMethod: 'wallet' | 'interswitch' | null;
  walletBalance: number;
  contractId: number;
  isLoadingBalance: boolean;
  balanceError: string | null;
  userEmail?: string;
  paymentData?: {
    reference: string;
    merchant_code: string;
    payable_code: string;
    payment_id?: number;
  };
}

interface UsePaymentReturn {
  currentStep: PaymentStep;
  paymentState: PaymentState;
  goToNextStep: (step: PaymentStep) => void;
  goToPreviousStep: () => void;
  setPaymentState: (state: Partial<PaymentState>) => void;
  resetPayment: () => void;
  refetchBalance: () => void;
}

export function usePayment(): UsePaymentReturn {
  const [currentStep, setCurrentStep] = useState<PaymentStep>('amount');
  const [paymentState, setPaymentStateInternal] = useState<PaymentState>({
    amount: 0,
    paymentMethod: null,
    walletBalance: 0,
    contractId: 23,
    isLoadingBalance: true,
    balanceError: null,
    userEmail: '',
    paymentData: undefined,
  });

  // Fetch wallet data
  const { data, isLoading, isError, error, refetch } = useGetUserWalletdata();

  // Update wallet balance when data loads
  useEffect(() => {
    if (isLoading) {
      setPaymentStateInternal((prev) => ({
        ...prev,
        isLoadingBalance: true,
        balanceError: null,
      }));
    } else if (isError) {
      setPaymentStateInternal((prev) => ({
        ...prev,
        isLoadingBalance: false,
        balanceError: error?.message || 'Failed to load wallet balance',
        walletBalance: 0,
      }));
    } else if (data) {
      setPaymentStateInternal((prev) => ({
        ...prev,
        isLoadingBalance: false,
        balanceError: null,
        walletBalance: data?.wallet_balance ?? 0,
      }));
    }
  }, [data, isLoading, isError, error]);

  const goToNextStep = useCallback((step: PaymentStep) => {
    const validTransitions: Record<PaymentStep, PaymentStep[]> = {
      'amount': ['method'],
      'method': ['processing'],
      'processing': ['success'],
      'success': []
    };
    
    if (validTransitions[currentStep]?.includes(step)) {
      setCurrentStep(step);
    } else {
      console.warn(`Invalid transition from ${currentStep} to ${step}`);
    }
  }, [currentStep]);

  const goToPreviousStep = useCallback(() => {
    const validBackTransitions: Record<PaymentStep, PaymentStep> = {
      'method': 'amount',
      'processing': 'method',
      'amount': 'amount',
      'success': 'success'
    };
    
    setCurrentStep(validBackTransitions[currentStep]);
  }, [currentStep]);

  const setPaymentState = useCallback((state: Partial<PaymentState>) => {
    setPaymentStateInternal((prev) => {
      if (state.amount !== undefined && state.amount <= 0) {
        console.error('Invalid amount:', state.amount);
        return prev;
      }
      
      if (state.paymentMethod !== undefined && !['wallet', 'interswitch', null].includes(state.paymentMethod)) {
        console.error('Invalid payment method:', state.paymentMethod);
        return prev;
      }
      
      return { ...prev, ...state };
    });
  }, []);

  const resetPayment = useCallback(() => {
    setCurrentStep('amount');
    setPaymentStateInternal((prev) => ({
      ...prev,
      amount: 0,
      paymentMethod: null,
      contractId: 23,
      paymentData: undefined,
    }));
  }, []);

  const refetchBalance = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    currentStep,
    paymentState,
    goToNextStep,
    goToPreviousStep,
    setPaymentState,
    resetPayment,
    refetchBalance,
  };
}