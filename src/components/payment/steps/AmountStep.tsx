'use client';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from '../ui/Button';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface AmountStepProps {
  onNext: (amount: number) => void;
  initialAmount?: number;
}

const MINIMUM_AMOUNT = 1000;

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(MINIMUM_AMOUNT, `Minimum amount is ₦${MINIMUM_AMOUNT.toLocaleString()}`)
    .required('Amount is required')
    .typeError('Please enter a valid amount'),
});

export function AmountStep({ onNext, initialAmount = 0 }: AmountStepProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-adron-black)' }}>
          Enter Payment Amount
        </h2>
        <p className="text-xs sm:text-sm" style={{ color: 'var(--color-adron-gray-400)' }}>
          How much would you like to pay?
        </p>
      </div>

      <Formik
        initialValues={{ amount: initialAmount || MINIMUM_AMOUNT }}
        validationSchema={validationSchema}
        onSubmit={(values) => onNext(values.amount)}
      >
        {({ isSubmitting, values, errors, touched, setFieldValue }) => (
          <Form className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label 
                className="block text-xs sm:text-sm font-medium" 
                style={{ color: 'var(--color-adron-gray-500)' }}
              >
                Amount to Pay
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-adron-gray-400)' }}>
                  <span className="text-lg sm:text-xl font-bold">₦</span>
                </div>
                <Field name="amount">
                  {({ field }: any) => (
                    <input
                      {...field}
                      type="number"
                      inputMode="numeric"
                      placeholder={MINIMUM_AMOUNT.toString()}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value === '' ? '' : Number(e.target.value);
                        setFieldValue('amount', value);
                      }}
                      className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl focus:outline-none focus:ring-2 transition-all text-base sm:text-lg ${
                        errors.amount && touched.amount
                          ? 'border-red-500 focus:ring-red-500'
                          : 'focus:ring-[var(--color-adron-green)]'
                      }`}
                      style={{
                        backgroundColor: 'var(--color-adron-gray-50)',
                        borderColor: errors.amount && touched.amount ? '#D70E0E' : 'var(--color-adron-gray-200)',
                        color: 'var(--color-adron-black)'
                      }}
                    />
                  )}
                </Field>
              </div>
              
              <div className="flex gap-2 mt-3 flex-wrap">
                {[5000, 10000, 25000, 50000].map((suggestedAmount) => (
                  <button
                    key={suggestedAmount}
                    type="button"
                    onClick={() => setFieldValue('amount', suggestedAmount)}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 [touch-action:manipulation]"
                    style={{
                      backgroundColor: values.amount === suggestedAmount ? 'var(--color-adron-green)' : 'var(--color-adron-gray-50)',
                      color: values.amount === suggestedAmount ? 'white' : 'var(--color-adron-gray-600)',
                      border: `1px solid ${values.amount === suggestedAmount ? 'var(--color-adron-green)' : 'var(--color-adron-gray-200)'}`
                    }}
                  >
                    ₦{suggestedAmount.toLocaleString()}
                  </button>
                ))}
              </div>
              
              {!errors.amount && (
                <div className="flex items-center gap-2 mt-2">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--color-adron-gray-400)' }} />
                  <p className="text-xs" style={{ color: 'var(--color-adron-gray-400)' }}>
                    Minimum amount: ₦{MINIMUM_AMOUNT.toLocaleString()}
                  </p>
                </div>
              )}
              
              {errors.amount && touched.amount && (
                <p className="text-xs animate-in slide-in-from-left-2 duration-300" style={{ color: 'var(--color-adron-red)' }}>
                    {errors.amount}
                </p>
              )}
            </div>

            {values.amount >= MINIMUM_AMOUNT && (
              <div 
                className="rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(121, 184, 51, 0.1) 0%, rgba(121, 184, 51, 0.05) 100%)',
                  border: '1px solid rgba(121, 184, 51, 0.3)'
                }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-sm sm:text-base" style={{ color: 'var(--color-adron-gray-500)' }}>Total Amount:</span>
                  <span 
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: 'var(--color-adron-green)' }}
                  >
                    ₦{values.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {values.amount > 0 && values.amount < MINIMUM_AMOUNT && (
              <div 
                className="rounded-lg p-4 flex gap-3 items-start animate-in slide-in-from-left-2 duration-300"
                style={{
                  backgroundColor: 'rgba(215, 14, 14, 0.1)',
                  border: '1px solid rgba(215, 14, 14, 0.3)'
                }}
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-adron-red)' }} />
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-adron-red)' }}>
                    Amount Below Minimum
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-adron-gray-500)' }}>
                    Minimum payment amount is ₦{MINIMUM_AMOUNT.toLocaleString()}. Please increase the amount to continue.
                  </p>
                </div>
              </div>
            )}

            <div 
              className="rounded-lg p-3 sm:p-4"
              style={{
                backgroundColor: 'rgba(121, 184, 51, 0.1)',
                border: '1px solid rgba(121, 184, 51, 0.2)'
              }}
            >
              <p className="text-xs sm:text-sm" style={{ color: 'var(--color-adron-green)' }}>
                💡 You can pay using your wallet or Interswitch. If your wallet balance is insufficient, we&apos;ll recommend Interswitch.
              </p>
            </div>

            <div className="sticky bottom-0 pt-4 pb-2 bg-white mt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !values.amount || values.amount < MINIMUM_AMOUNT}
                isLoading={isSubmitting}
                className="w-full text-base sm:text-lg py-3 sm:py-4 [touch-action:manipulation]"
                style={{
                  backgroundColor: 'var(--color-adron-green)',
                  color: 'white'
                }}
              >
                Continue to Payment Method
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
