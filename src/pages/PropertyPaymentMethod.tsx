import SelectPaymentMethod from "../components/DashboardNewPropertyComponent/SelectPaymentMethod";
import PaymentBreakDown2 from "../components/DashboardNewPropertyComponent/PaymentBreakDownStatic";
import { usePaymentBreakDownStore } from "../zustand/PaymentBreakDownStore";
import { useNavigate } from "react-router-dom";

const PropertyPaymentMethod = () => {
  const { totalAmount } = usePaymentBreakDownStore();
  const navigate = useNavigate();
  const renderPaymentMethod = () => {
    return (
      <div className="grid grid-col-1 md:grid-cols-3 py-10 bg-white rounded-3xl px-10 gap-12 md:gap-0 ">
        <div className="md:col-span-2 md:p-10">
          <SelectPaymentMethod
            amount={totalAmount}
            goBack={() => navigate(-1)}
          />
        </div>
        <PaymentBreakDown2 />
      </div>
    );
  };
  return <div>{renderPaymentMethod()}</div>;
};

export default PropertyPaymentMethod;
