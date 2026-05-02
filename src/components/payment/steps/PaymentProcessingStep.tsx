// steps/PaymentProcessingStep.tsx
'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, Loader } from 'lucide-react';
import { usePayForContract } from '../../../data/hooks';
import { Button } from '../ui/Button';
import { InterswitchStep } from './PayPalRedirectStep';
// import { InterswitchStep } from './InterswitchStep';

interface PaymentProcessingStepProps {
  amount: number;
  paymentMethod: 'wallet' | 'interswitch';
  contractId: number;
  userEmail: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  onBack: () => void;
  onPaymentDataReceived?: (data: any) => void;
  onProcessingStateChange?: (isProcessing: boolean) => void;
}

export function PaymentProcessingStep({
  amount,
  paymentMethod,
  contractId,
  userEmail,
  onSuccess,
  onError,
  onBack,
  onPaymentDataReceived,
  onProcessingStateChange,
}: PaymentProcessingStepProps) {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isActualPaymentProcessing, setIsActualPaymentProcessing] = useState(false);
  const { mutate, isPending, error, reset, data: mutationData } = usePayForContract();

  // Notify parent about payment processing state
  useEffect(() => {
    onProcessingStateChange?.(isActualPaymentProcessing);
  }, [isActualPaymentProcessing, onProcessingStateChange]);

  // First step: Submit form to get payment data (reference, merchant_code, payable_code)
  useEffect(() => {
    if (paymentMethod === 'interswitch' && !paymentData && !isInitializing) {
      setIsInitializing(true);
      mutate(
        {
          amount,
          payment_type: 'interswitch',
          contract_id: contractId,
        },
        {
          onSuccess: (data) => {
            setIsInitializing(false);
            if (data.success && data.data) {
              console.log('Payment initialization successful:', data);
              setPaymentData(data.data);
              onPaymentDataReceived?.(data.data);
            } else {
              onError(data.message || 'Failed to initialize payment');
              onBack(); // Go back to method selection on error
            }
          },
          onError: (err) => {
            setIsInitializing(false);
            onError(err.message);
            onBack(); // Go back to method selection on error
          },
        }
      );
    }
  }, [paymentMethod, amount, contractId, mutate, onError, paymentData, onPaymentDataReceived, isInitializing, onBack]);

  // Handle wallet payment directly
  useEffect(() => {
    if (paymentMethod === 'wallet') {
      setIsActualPaymentProcessing(true);
      mutate(
        {
          amount,
          payment_type: 'virtual_wallet',
          contract_id: contractId,
        },
        {
          onSuccess: (data) => {
            setIsActualPaymentProcessing(false);
            if (data.success) {
              onSuccess();
            } else {
              onError(data.message || 'Payment failed');
              onBack(); // Go back to method selection on error
            }
          },
          onError: (err) => {
            setIsActualPaymentProcessing(false);
            onError(err.message);
            onBack(); // Go back to method selection on error
          },
        }
      );
    }
  }, [paymentMethod, amount, contractId, mutate, onSuccess, onError, onBack]);

  // Show loading state while initializing Interswitch payment
  if (paymentMethod === 'interswitch' && isInitializing) {
    return (
      <div className="space-y-6 text-center py-12">
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            <div 
              className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: 'var(--color-adron-gray-200)' }}
            ></div>
            <div 
              className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: `var(--color-adron-green) transparent transparent transparent` }}
            ></div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold" style={{ color: 'var(--color-adron-black)' }}>
            Initializing Payment
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-adron-gray-400)' }}>
            Please wait while we prepare your Interswitch payment...
          </p>
        </div>
        <Button onClick={() => {
          setIsInitializing(false);
          onBack();
        }} variant="secondary" className="mt-4">
          Cancel
        </Button>
      </div>
    );
  }

  // Handle Interswitch payment flow after getting payment data
  if (paymentMethod === 'interswitch' && paymentData) {
    return (
      <InterswitchStep
        amount={amount}
        contractId={contractId}
        email={userEmail}
        reference={paymentData.reference}
        merchantCode={paymentData.merchant_code}
        paymentItemId={paymentData.payable_code}
        paymentId={paymentData.id}
        onApprove={(response) => {
          console.log('Interswitch payment completed:', response);
          setIsActualPaymentProcessing(false);
          onSuccess();
        }}
        onCancel={() => {
          // Clear payment data and go back to method selection
          setPaymentData(null);
          setIsActualPaymentProcessing(false);
          onBack();
        }}
        onError={(error) => {
          onError(error);
          // Clear payment data and go back to method selection
          setPaymentData(null);
          setIsActualPaymentProcessing(false);
          onBack();
        }}
        onProcessingStateChange={setIsActualPaymentProcessing}
      />
    );
  }

  // Show processing state for wallet payments
  if (isPending && paymentMethod === 'wallet') {
    return (
      <div className="space-y-6 text-center py-12">
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            <div 
              className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: 'var(--color-adron-gray-200)' }}
            ></div>
            <div 
              className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: `var(--color-adron-green) transparent transparent transparent` }}
            ></div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold" style={{ color: 'var(--color-adron-black)' }}>
            Processing Payment
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-adron-gray-400)' }}>
            Please wait while we process your Wallet payment of ₦{amount.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(215, 14, 14, 0.2)' }}
          >
            <AlertCircle className="w-8 h-8" style={{ color: 'var(--color-adron-red)' }} />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold" style={{ color: 'var(--color-adron-black)' }}>
            Payment Failed
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-adron-gray-400)' }}>
            We couldn&apos;t process your payment. Please try again or use a different payment method.
          </p>
          <p 
            className="text-sm font-mono p-3 rounded-lg"
            style={{
              color: 'var(--color-adron-red)',
              backgroundColor: 'rgba(215, 14, 14, 0.1)',
              border: '1px solid rgba(215, 14, 14, 0.2)'
            }}
          >
            {error.message}
          </p>
        </div>
       <div className="sticky bottom-0 pt-4 pb-2 bg-white mt-4 flex justify-between gap-4">
          <Button onClick={() => { reset(); onBack(); }} variant="secondary" className="flex-1">
            ← Try Different Method
          </Button>
          <Button
            onClick={() => {
              reset();
              if (paymentMethod === 'wallet') {
                mutate({
                  amount,
                  payment_type: 'virtual_wallet',
                  contract_id: contractId,
                });
              } else if (paymentMethod === 'interswitch') {
                setPaymentData(null);
                setIsInitializing(false);
                mutate({
                  amount,
                  payment_type: 'interswitch',
                  contract_id: contractId,
                });
              }
            }}
            className="flex-1"
          >
            Retry Payment
          </Button>
        </div>
      </div>
    );
  }

  return null;
}