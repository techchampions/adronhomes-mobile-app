import React from "react";
import SelectPaymentMethod from "../components/DashboardNewPropertyComponent/SelectPaymentMethod";
import PaymentBreakDown from "../components/DashboardNewPropertyComponent/PaymentBreakDown";

const PropertyPaymentMethod = () => {
  const renderPaymentMethod = () => {
    return (
      <div className="grid grid-cols-3 py-10 bg-white rounded-3xl px-10">
        <div className="col-span-2 p-10">
          <SelectPaymentMethod amount={3000000} goBack={renderPaymentMethod} />
        </div>
        <PaymentBreakDown />
      </div>
    );
  };
  return <div>{renderPaymentMethod()}</div>;
};

export default PropertyPaymentMethod;
