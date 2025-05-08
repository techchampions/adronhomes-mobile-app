import React from "react";
import SelectPaymentMethod from "../components/DashboardNewPropertyComponent/SelectPaymentMethod";
import PaymentBreakDown from "../components/DashboardNewPropertyComponent/PaymentBreakDown";

const PropertyPaymentMethod = () => {
  const renderPaymentMethod = () => {
    return (
      <div className="grid grid-col-1 md:grid-cols-3 py-10 bg-white rounded-3xl px-10 gap-12 md:gap-0 ">
        <div className="md:col-span-2 md:p-10">
          <SelectPaymentMethod amount={3000000} goBack={renderPaymentMethod} />
        </div>
        <PaymentBreakDown />
      </div>
    );
  };
  return <div>{renderPaymentMethod()}</div>;
};

export default PropertyPaymentMethod;
