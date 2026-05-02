'use client';

import { useState, useCallback, useEffect, memo } from 'react';
import { usePayment, PaymentStep } from './hooks/usePayment';
import { AmountStep } from './steps/AmountStep';
import { PaymentMethodStep } from './steps/PaymentMethodStep';
import { PaymentProcessingStep } from './steps/PaymentProcessingStep';
import { PaymentSuccessStep } from './steps/PaymentSuccessStep';
import { X } from 'lucide-react';
import { useToastStore } from '../../zustand/useToastStore';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractId?: number;
  userEmail?: string;
}

type StepProgress = Record<PaymentStep, number>;

const stepProgress: StepProgress = {
  'amount': 0,
  'method': 1,
  'processing': 2,
  'success': 3
};

const MemoizedAmountStep = memo(AmountStep);
const MemoizedPaymentMethodStep = memo(PaymentMethodStep);
const MemoizedPaymentProcessingStep = memo(PaymentProcessingStep);
const MemoizedPaymentSuccessStep = memo(PaymentSuccessStep);

export function PaymentModal({ isOpen, onClose, contractId = 23, userEmail = 'kadirid9@gmail.com' }: PaymentModalProps) {
  const { currentStep, paymentState, goToNextStep, goToPreviousStep, setPaymentState, resetPayment, refetchBalance } = usePayment();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { showToast } = useToastStore();

  // Initialize user email in payment state
  useEffect(() => {
    if (userEmail && !paymentState.userEmail) {
      setPaymentState({ userEmail });
    }
  }, [userEmail, paymentState.userEmail, setPaymentState]);

  useEffect(() => {
    setErrorMessage(null);
  }, [currentStep]);

  useEffect(() => {
    if (!isOpen) {
      resetPayment();
      setErrorMessage(null);
      setIsProcessingPayment(false);
    }
  }, [isOpen, resetPayment]);

  // Track when actual payment is being processed (not initialization)
  useEffect(() => {
    if (currentStep === 'processing' && paymentState.paymentMethod === 'interswitch') {
      setIsProcessingPayment(true);
    } else {
      setIsProcessingPayment(false);
    }
  }, [currentStep, paymentState.paymentMethod]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isProcessingPayment) {
        handleClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, isProcessingPayment]);

  const handleAmountSubmit = useCallback(
    (amount: number) => {
      if (amount <= 900) {
        showToast('Please enter a valid amount', 'error');
        return;
      }
      setPaymentState({ amount, contractId });
      goToNextStep('method');
    },
    [setPaymentState, goToNextStep, contractId, showToast]
  );

  const handleSelectWallet = useCallback(() => {
    if (isProcessingPayment) return;
    
    if (paymentState.isLoadingBalance) {
      showToast('Loading wallet balance, please wait...', 'success');
      return;
    }
    
    if (paymentState.balanceError) {
      showToast('Unable to check wallet balance. Please use Interswitch.', 'error');
      return;
    }
    
    if (paymentState.walletBalance < paymentState.amount) {
      showToast('Insufficient wallet balance', 'error');
      return;
    }
    
    setPaymentState({ paymentMethod: 'wallet' });
    goToNextStep('processing');
  }, [setPaymentState, goToNextStep, isProcessingPayment, paymentState, showToast]);

  const handleSelectInterswitch = useCallback(() => {
    if (isProcessingPayment) return;
    
    const emailToUse = paymentState.userEmail || userEmail;
    if (!emailToUse) {
      showToast('Email address is required for Interswitch payment. Please ensure you are logged in.', 'error');
      return;
    }
    
    setPaymentState({ paymentMethod: 'interswitch', userEmail: emailToUse });
    goToNextStep('processing');
  }, [setPaymentState, goToNextStep, isProcessingPayment, paymentState.userEmail, userEmail, showToast]);

  const handlePaymentSuccess = useCallback(() => {
    setIsProcessingPayment(false);
    goToNextStep('success');
  }, [goToNextStep]);

  const handlePaymentError = useCallback(
    (error: string) => {
      setErrorMessage(error);
      setIsProcessingPayment(false);
      showToast('Payment failed', 'error');
    },
    [showToast]
  );

  const handleComplete = useCallback(() => {
    showToast('Payment completed successfully!', 'success');
    resetPayment();
    setIsProcessingPayment(false);
    onClose();
  }, [resetPayment, onClose, showToast]);

  const handleBack = useCallback(() => {
    setErrorMessage(null);
    setIsProcessingPayment(false);
    goToPreviousStep();
  }, [goToPreviousStep]);

  const handleClose = useCallback(() => {
    // Only prevent closing if actual payment is being processed
    if (isProcessingPayment) {
      showToast('Please wait, payment is being processed', 'error');
      return;
    }
    
    resetPayment();
    setErrorMessage(null);
    setIsProcessingPayment(false);
    onClose();
  }, [isProcessingPayment, resetPayment, onClose, showToast]);

  const isStepCompleted = (stepIndex: number) => stepProgress[currentStep] >= stepIndex;

  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-labelledby="payment-modal-title"
      aria-describedby="payment-modal-description"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        // Allow closing when clicking outside only if not processing payment
        if (e.target === e.currentTarget && !isProcessingPayment) {
          handleClose();
        }
      }}
    >
      <div 
        className="rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
        style={{ backgroundColor: 'white' }}
      >
        {/* Header with Progress */}
        <div 
          className="sticky top-0 border-b px-6 py-4 flex items-center justify-between"
          style={{
            background: 'linear-gradient(135deg, var(--color-adron-green) 0%, #5a8c1a 100%)',
            borderBottomColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="flex-1">
            <h1 id="payment-modal-title" className="text-xl font-bold text-white">
              {currentStep === 'amount' && 'Payment'}
              {currentStep === 'method' && 'Payment Method'}
              {currentStep === 'processing' && 'Processing'}
              {currentStep === 'success' && 'Success'}
            </h1>
            {currentStep !== 'success' && (
              <div className="flex gap-2 mt-3">
                <div
                  className={`h-1 flex-1 rounded-full transition-all ${
                    isStepCompleted(0) ? 'bg-white' : 'bg-white/30'
                  }`}
                  aria-label="Step 1"
                ></div>
                <div
                  className={`h-1 flex-1 rounded-full transition-all ${
                    isStepCompleted(1) ? 'bg-white' : 'bg-white/30'
                  }`}
                  aria-label="Step 2"
                ></div>
                <div
                  className={`h-1 flex-1 rounded-full transition-all ${
                    isStepCompleted(2) ? 'bg-white' : 'bg-white/30'
                  }`}
                  aria-label="Step 3"
                ></div>
              </div>
            )}
          </div>
          <button
            onClick={handleClose}
            disabled={isProcessingPayment}
            className={`ml-4 p-2 rounded-lg transition-colors ${
              isProcessingPayment
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(215, 14, 14, 0.1)', border: '1px solid rgba(215, 14, 14, 0.2)' }}>
            <p className="text-sm" style={{ color: 'var(--color-adron-red)' }}>{errorMessage}</p>
          </div>
        )}

        {/* Email Missing Warning for Interswitch */}
        {currentStep === 'method' && (!paymentState.userEmail && !userEmail) && (
          <div className="mx-6 mt-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)', border: '1px solid rgba(255, 193, 7, 0.3)' }}>
            <p className="text-sm" style={{ color: 'var(--color-adron-yellow)' }}>
              ⚠️ Email address is required for Interswitch payment. Please ensure you are logged in.
            </p>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-8">
          {currentStep === 'amount' && (
            <MemoizedAmountStep 
              onNext={handleAmountSubmit} 
              initialAmount={paymentState.amount} 
            />
          )}

          {currentStep === 'method' && (
            <MemoizedPaymentMethodStep
              amount={paymentState.amount}
              walletBalance={paymentState.walletBalance}
              isLoadingBalance={paymentState.isLoadingBalance}
              balanceError={paymentState.balanceError}
              onSelectWallet={handleSelectWallet}
              onSelectInterswitch={handleSelectInterswitch}
              onBack={handleBack}
              onRetryBalance={refetchBalance}
            />
          )}

          {currentStep === 'processing' && paymentState.paymentMethod && (
            <MemoizedPaymentProcessingStep
              amount={paymentState.amount}
              paymentMethod={paymentState.paymentMethod}
              contractId={paymentState.contractId}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              onBack={handleBack} 
              userEmail={paymentState.userEmail || userEmail}
              onProcessingStateChange={setIsProcessingPayment}
            />
          )}

          {currentStep === 'success' && paymentState.paymentMethod && (
            <MemoizedPaymentSuccessStep
              amount={paymentState.amount}
              paymentMethod={paymentState.paymentMethod}
              onComplete={handleComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}