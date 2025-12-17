import { useState } from "react";
import Tabs from "../components/InvestFormSCreenComponents/Tabs";
import { NextofKinForm } from "../components/InvestFormSCreenComponents/NextofKinForm";
import { PassportPhotoForm } from "../components/InvestFormSCreenComponents/PassportPhotoForm";
import { CustomerForm } from "../components/InvestFormSCreenComponents/CustomerForm";
import { BasicInfoForm } from "../components/InvestFormSCreenComponents/BasicInfoForm";
import { IdInfoForm } from "../components/InvestFormSCreenComponents/IdInfoForm";
import { useGetPropertyByID } from "../data/hooks";
import { useParams } from "react-router-dom";
import SmallLoader from "../components/SmallLoader";
import { Home, Ticket } from "lucide-react";

const InvestmentDetailForm = () => {
  const params = useParams();
  const id = params?.id;

  const { data, isError, isLoading } = useGetPropertyByID(id || 0);

  const [activeTab, setActiveTab] = useState(0);
  if (isLoading) return <SmallLoader />;

  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return (
          <CustomerForm activeTab={activeTab} setActiveTab={setActiveTab} />
        );
      case 1:
        return (
          <BasicInfoForm activeTab={activeTab} setActiveTab={setActiveTab} />
          // <OtherInfoForm activeTab={activeTab} setActiveTab={setActiveTab} />
        );
      case 2:
        return (
          <NextofKinForm activeTab={activeTab} setActiveTab={setActiveTab} />
        );
      case 3:
        return (
          <PassportPhotoForm
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      case 4:
        return <IdInfoForm activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="text-lg md:text-2xl font-adron-bold flex items-start md:items-center gap-2">
        <Home size={30} />
        <div className="">Subscribe to {data?.data.properties.name}</div>
      </div>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTab()}
    </div>
  );
};

export default InvestmentDetailForm;