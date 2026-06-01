'use client';

import { Button } from '../ui/Button';
import { CheckCircle, Copy } from 'lucide-react';
import { useState } from 'react';

interface PaymentSuccessStepProps {
  amount: number;
  paymentMethod: 'wallet' | 'paystack' | 'interswitch';
  onComplete: () => void;
  transactionId?: string;
}

export function PaymentSuccessStep({
  amount,
  paymentMethod,
  onComplete,
  transactionId: externalTransactionId,
}: PaymentSuccessStepProps) {
  const methodDisplay = {
    wallet: 'Virtual Wallet',
    paystack: 'Paystack',
    interswitch: 'Interswitch'
  }[paymentMethod];
  
  const transactionId = externalTransactionId || `TXN-${Date.now()}`;
  const [copied, setCopied] = useState(false);

  const copyTransactionId = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMethodIcon = () => {
    switch (paymentMethod) {
      case 'wallet':
        return (
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center animate-bounce"
            style={{ backgroundColor: 'rgba(121, 184, 51, 0.2)' }}
          >
            <CheckCircle className="w-12 h-12" style={{ color: 'var(--color-adron-green)' }} />
          </div>
        );
      case 'paystack':
        return (
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center animate-bounce"
            style={{ backgroundColor: 'rgba(0, 112, 186, 0.2)' }}
          >
            <CheckCircle className="w-12 h-12" style={{ color: '#0070ba' }} />
          </div>
        );
      case 'interswitch':
        return (
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center animate-bounce"
            style={{ backgroundColor: 'rgba(255, 107, 0, 0.2)' }}
          >
            <CheckCircle className="w-12 h-12" style={{ color: '#FF6B00' }} />
          </div>
        );
      default:
        return (
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center animate-bounce"
            style={{ backgroundColor: 'rgba(121, 184, 51, 0.2)' }}
          >
            <CheckCircle className="w-12 h-12" style={{ color: 'var(--color-adron-green)' }} />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        {getMethodIcon()}
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold" style={{ color: 'var(--color-adron-black)' }}>Payment Successful!</h2>
        <p className="text-sm" style={{ color: 'var(--color-adron-gray-400)' }}>
          Your payment has been processed successfully via {methodDisplay}.
        </p>
      </div>

      <div 
        className="rounded-xl p-6 space-y-4"
        style={{
          backgroundColor: 'var(--color-adron-gray-50)',
          border: '1px solid rgba(121, 184, 51, 0.2)'
        }}
      >
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--color-adron-gray-400)' }}>Amount Paid</span>
            <span className="text-2xl font-bold" style={{ color: 'var(--color-adron-green)' }}>₦{amount.toLocaleString()}</span>
          </div>
          <div className="h-px" style={{ backgroundColor: 'var(--color-adron-gray-200)' }}></div>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--color-adron-gray-400)' }}>Payment Method</span>
            <span className="font-semibold flex items-center gap-2" style={{ color: 'var(--color-adron-black)' }}>
              {paymentMethod === 'paystack' && (
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#0070ba' }}
                ></span>
              )}
              {paymentMethod === 'interswitch' && (
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#FF6B00' }}
                ></span>
              )}
              {paymentMethod === 'wallet' && (
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-adron-green)' }}
                ></span>
              )}
              {methodDisplay}
            </span>
          </div>
          <div className="h-px" style={{ backgroundColor: 'var(--color-adron-gray-200)' }}></div>
          <div className="flex justify-between items-center group">
            <span className="text-sm" style={{ color: 'var(--color-adron-gray-400)' }}>Transaction ID</span>
            <button
              onClick={copyTransactionId}
              className="font-mono text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 hover:opacity-80"
              style={{
                color: paymentMethod === 'paystack' ? '#0070ba' : paymentMethod === 'interswitch' ? '#FF6B00' : 'var(--color-adron-green)',
                backgroundColor: paymentMethod === 'paystack' ? 'rgba(0, 112, 186, 0.1)' : paymentMethod === 'interswitch' ? 'rgba(255, 107, 0, 0.1)' : 'rgba(121, 184, 51, 0.1)'
              }}
            >
              {transactionId.slice(0, 8)}...{transactionId.slice(-6)}
              <Copy className="w-3 h-3" />
            </button>
          </div>
          <div className="h-px" style={{ backgroundColor: 'var(--color-adron-gray-200)' }}></div>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--color-adron-gray-400)' }}>Status</span>
            <span className="font-semibold flex items-center gap-1" style={{ color: 'var(--color-adron-green)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-adron-green)' }}></span>
              Completed
            </span>
          </div>
        </div>
      </div>

      {copied && (
        <div 
          className="rounded-lg p-3 animate-fade-in"
          style={{
            backgroundColor: paymentMethod === 'paystack' ? 'rgba(0, 112, 186, 0.1)' : paymentMethod === 'interswitch' ? 'rgba(255, 107, 0, 0.1)' : 'rgba(121, 184, 51, 0.1)',
            border: paymentMethod === 'paystack' ? '1px solid rgba(0, 112, 186, 0.3)' : paymentMethod === 'interswitch' ? '1px solid rgba(255, 107, 0, 0.3)' : '1px solid rgba(121, 184, 51, 0.3)'
          }}
        >
          <p className="text-sm" style={{ 
            color: paymentMethod === 'paystack' ? '#0070ba' : paymentMethod === 'interswitch' ? '#FF6B00' : 'var(--color-adron-green)'
          }}>
            ✓ Transaction ID copied!
          </p>
        </div>
      )}

      <div 
        className="rounded-lg p-4"
        style={{
          backgroundColor: paymentMethod === 'paystack' ? 'rgba(0, 112, 186, 0.05)' : paymentMethod === 'interswitch' ? 'rgba(255, 107, 0, 0.05)' : 'rgba(121, 184, 51, 0.05)',
          border: paymentMethod === 'paystack' ? '1px solid rgba(0, 112, 186, 0.2)' : paymentMethod === 'interswitch' ? '1px solid rgba(255, 107, 0, 0.2)' : '1px solid rgba(121, 184, 51, 0.2)'
        }}
      >
        <p className="text-sm" style={{ 
          color: paymentMethod === 'paystack' ? '#0070ba' : paymentMethod === 'interswitch' ? '#FF6B00' : 'var(--color-adron-green)'
        }}>
          A confirmation email has been sent to your email address with the transaction details.
        </p>
      </div>
            <div className="sticky bottom-0 pt-4 pb-2 bg-white mt-4">
      <Button
        onClick={onComplete}
        className="w-full"
        style={{
          background: paymentMethod === 'paystack' ? 'linear-gradient(135deg, #0070ba 0%, #003087 100%)' : 
                     paymentMethod === 'interswitch' ? 'linear-gradient(135deg, #FF6B00 0%, #CC5500 100%)' : 
                     'linear-gradient(135deg, var(--color-adron-green) 0%, #5a8c1a 100%)'
        }}
      >
        Done
      </Button>
</div>
      <style >{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}