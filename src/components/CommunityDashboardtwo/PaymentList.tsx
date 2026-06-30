import React from "react";
import { FiCreditCard } from "react-icons/fi";
import { formatPrice } from "../../data/utils";
interface Prop {
  payments: EstatePayment[];
}
const PaymentList: React.FC<Prop> = ({ payments }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Recent Payments</h3>
          <button className="text-sm text-[#79B833] hover:underline">
            View All
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {payments.map((item, i) => (
          <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full bg-purple-100`}>
                  <FiCreditCard className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base text-gray-800 capitalize">
                    {item.purpose} Payment
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.user_first_name} • {item.payment_method}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  {formatPrice(15000)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentList;
