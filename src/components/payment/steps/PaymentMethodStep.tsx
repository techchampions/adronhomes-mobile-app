'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { AlertCircle, Check, CreditCard, Loader, Shield } from 'lucide-react';

interface PaymentMethodStepProps {
  amount: number;
  walletBalance: number;
  isLoadingBalance?: boolean;
  balanceError?: string | null;
  onSelectWallet: () => void;
  onSelectInterswitch: () => void;
  onBack: () => void;
  onRetryBalance?: () => void;
}

export function PaymentMethodStep({
  amount,
  walletBalance,
  isLoadingBalance = false,
  balanceError = null,
  onSelectWallet,
  onSelectInterswitch,
  onBack,
  onRetryBalance,
}: PaymentMethodStepProps) {
  const [selectedMethod, setSelectedMethod] = useState<'wallet' | 'interswitch' | null>(null);
  const hasInsufficientFunds = !isLoadingBalance && !balanceError && amount > walletBalance;

  const handleWalletClick = () => {
    if (!hasInsufficientFunds && !isLoadingBalance && !balanceError) {
      setSelectedMethod('wallet');
      onSelectWallet();
    }
  };

  const handleInterswitchClick = () => {
    setSelectedMethod('interswitch');
    onSelectInterswitch();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-adron-black)' }}>
          Select Payment Method
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-adron-gray-400)' }}>
          Choose how you&apos;d like to pay{' '}
          <span className="font-semibold" style={{ color: 'var(--color-adron-green)' }}>
            ₦{amount.toLocaleString()}
          </span>
        </p>
      </div>

      {isLoadingBalance && (
        <div 
          className="rounded-lg p-4 flex gap-3 items-center"
          style={{
            backgroundColor: 'rgba(121, 184, 51, 0.1)',
            border: '1px solid rgba(121, 184, 51, 0.2)'
          }}
        >
          <Loader className="w-5 h-5 animate-spin" style={{ color: 'var(--color-adron-green)' }} />
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--color-adron-green)' }}>
              Loading Wallet Balance
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-adron-gray-500)' }}>
              Please wait while we fetch your wallet balance...
            </p>
          </div>
        </div>
      )}

      {balanceError && (
        <div 
          className="rounded-lg p-4 flex gap-3 items-start"
          style={{
            backgroundColor: 'rgba(215, 14, 14, 0.1)',
            border: '1px solid rgba(215, 14, 14, 0.3)'
          }}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-adron-red)' }} />
          <div className="flex-1">
            <p className="font-semibold text-sm" style={{ color: 'var(--color-adron-red)' }}>
              Unable to Load Wallet Balance
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-adron-gray-500)' }}>
              {balanceError}. You can still use Interswitch for your payment.
            </p>
            {onRetryBalance && (
              <button
                onClick={onRetryBalance}
                className="text-xs font-semibold mt-2 transition-colors"
                style={{ color: 'var(--color-adron-green)' }}
              >
                ↻ Retry
              </button>
            )}
          </div>
        </div>
      )}

      {!isLoadingBalance && !balanceError && hasInsufficientFunds && (
        <div 
          className="rounded-lg p-4 flex gap-3"
          style={{
            backgroundColor: 'rgba(215, 14, 14, 0.1)',
            border: '1px solid rgba(215, 14, 14, 0.3)'
          }}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-adron-red)' }} />
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--color-adron-red)' }}>
              Insufficient Wallet Balance
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-adron-gray-500)' }}>
              Your wallet balance (₦{walletBalance.toLocaleString()}) is less than the amount needed (₦{amount.toLocaleString()}). 
              Please use Interswitch instead.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {/* Wallet Card */}
        <button
          onClick={handleWalletClick}
          disabled={hasInsufficientFunds || isLoadingBalance || !!balanceError}
          className={`w-full p-5 rounded-xl border transition-all group text-left ${
            (hasInsufficientFunds || isLoadingBalance || !!balanceError)
              ? 'cursor-not-allowed opacity-50'
              : 'hover:shadow-md'
          }`}
          style={{
            backgroundColor: selectedMethod === 'wallet' ? 'rgba(121, 184, 51, 0.1)' : 'var(--color-adron-gray-50)',
            borderColor: selectedMethod === 'wallet' ? 'var(--color-adron-green)' : 'var(--color-adron-gray-200)',
            borderWidth: selectedMethod === 'wallet' ? '2px' : '1px'
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 text-left">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, var(--color-adron-green) 0%, #5a8c1a 100%)'
                }}
              >
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--color-adron-black)' }}>Virtual Wallet</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--color-adron-gray-400)' }}>
                  Balance:{' '}
                  {isLoadingBalance ? (
                    <span className="inline-flex items-center gap-1">
                      <Loader className="w-3 h-3 animate-spin" />
                      <span>Loading...</span>
                    </span>
                  ) : balanceError ? (
                    <span style={{ color: 'var(--color-adron-red)' }}>Unavailable</span>
                  ) : (
                    <span className="font-semibold" style={{ color: 'var(--color-adron-green)' }}>
                      ₦{walletBalance.toLocaleString()}
                    </span>
                  )}
                </p>
                {!hasInsufficientFunds && !isLoadingBalance && !balanceError && (
                  <span 
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      color: 'var(--color-adron-green)',
                      backgroundColor: 'rgba(121, 184, 51, 0.2)'
                    }}
                  >
                    ✓ Ready to pay
                  </span>
                )}
                {hasInsufficientFunds && (
                  <span 
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      color: 'var(--color-adron-red)',
                      backgroundColor: 'rgba(215, 14, 14, 0.2)'
                    }}
                  >
                    ⚠ Insufficient balance
                  </span>
                )}
              </div>
            </div>
            <div 
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                selectedMethod === 'wallet' ? 'bg-[var(--color-adron-green)] border-[var(--color-adron-green)]' : ''
              }`}
              style={{
                borderColor: selectedMethod === 'wallet' ? 'var(--color-adron-green)' : 'var(--color-adron-gray-300)'
              }}
            >
              {selectedMethod === 'wallet' && <Check className="w-4 h-4 text-white" />}
            </div>
          </div>
        </button>

        {/* Interswitch Card */}
        <button
          onClick={handleInterswitchClick}
          className="w-full p-5 rounded-xl border transition-all group text-left hover:shadow-md"
          style={{
            backgroundColor: selectedMethod === 'interswitch' ? 'rgba(121, 184, 51, 0.1)' : 'var(--color-adron-gray-50)',
            borderColor: selectedMethod === 'interswitch' ? 'var(--color-adron-green)' : 'var(--color-adron-gray-200)',
            borderWidth: selectedMethod === 'interswitch' ? '2px' : '1px'
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 text-left">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 shadow"
                style={{
                  // background: 'linear-gradient(135deg, #FF6B00 0%, #CC5500 100%)'
                }}
              >
                <InterswitchLogo className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--color-adron-black)' }}>Interswitch</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--color-adron-gray-400)' }}>Secure payment with cards, internet banking, and USSD</p>
                <span 
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    color: 'var(--color-adron-green)',
                    backgroundColor: 'rgba(121, 184, 51, 0.2)'
                  }}
                >
                  ✓ Card, Internet Banking, USSD
                </span>
              </div>
            </div>
            <div 
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                selectedMethod === 'interswitch' ? 'bg-[var(--color-adron-green)] border-[var(--color-adron-green)]' : ''
              }`}
              style={{
                borderColor: selectedMethod === 'interswitch' ? 'var(--color-adron-green)' : 'var(--color-adron-gray-300)'
              }}
            >
              {selectedMethod === 'interswitch' && <Check className="w-4 h-4 text-white" />}
            </div>
          </div>
        </button>
      </div>


            <div className="sticky bottom-0 pt-4 pb-2 bg-white mt-4 flex justify-between gap-4">
        <Button onClick={onBack} variant="secondary" className="flex-1">
          ← Back
        </Button>
        <Button
          onClick={() => {
            if (selectedMethod === 'wallet') handleWalletClick();
            else if (selectedMethod === 'interswitch') handleInterswitchClick();
          }}
          disabled={!selectedMethod || (selectedMethod === 'wallet' && (hasInsufficientFunds || isLoadingBalance || !!balanceError))}
          className="flex-1"
        >
          Continue →
        </Button>
      </div>
    </div>
  );
}


<img src="/Interswitch.svg" alt="Interswitch Logo" className="w-6 h-6" />

// Option 2: If you need it as a component
export const InterswitchLogo = ({ className = "w-6 h-6" }) => (
  <img src="/Interswitch.svg" alt="Interswitch Logo" className={className} />
);