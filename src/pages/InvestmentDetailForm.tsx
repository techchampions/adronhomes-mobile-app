import React from "react";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Tabs from "../components/InvestFormSCreenComponents/Tabs";
import { CustomerInfoForm } from "../components/InvestFormSCreenComponents/BasicInfoForm";
import Button from "../components/Button";
import { OtherInfoForm } from "../components/InvestFormSCreenComponents/OtherInfoForm";
import { NextofKinForm } from "../components/InvestFormSCreenComponents/NextofKinForm";
import { PassportPhotoForm } from "../components/InvestFormSCreenComponents/PassportPhotoForm";

const InvestmentDetailForm = () => {
  // import other tab components...

  const [activeTab, setActiveTab] = useState(0);

  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return (
          <CustomerInfoForm activeTab={activeTab} setActiveTab={setActiveTab} />
        );
      case 1:
        return (
          <OtherInfoForm activeTab={activeTab} setActiveTab={setActiveTab} />
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
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTab()}
    </div>
  );
};

export default InvestmentDetailForm;
