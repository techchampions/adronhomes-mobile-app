import React from "react";
import { FiCheckCircle, FiClock, FiUserCheck } from "react-icons/fi";
import MaintainaceRequestForm from "./MaintainaceRequestForm";
import MaintainaceRequestList from "./MaintainaceRequestList";

const trackingSteps = [
  {
    title: "Received",
    text: "Estate admin gets the request immediately",
    icon: FiClock,
  },
  {
    title: "Assigned",
    text: "A staff member or vendor takes ownership",
    icon: FiUserCheck,
  },
  {
    title: "Resolved",
    text: "Resident confirms completion",
    icon: FiCheckCircle,
  },
];

const MaintenanceSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Maintenance and Service Desk
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Report estate issues, upload evidence, and track who is handling it.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <MaintainaceRequestForm />
        <div className="rounded-xl border border-[#79B833]/20 bg-[#79B833]/5 p-5">
          <h4 className="font-semibold text-gray-800">How tracking works</h4>
          <div className="mt-4 space-y-3">
            {trackingSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex gap-3 rounded-xl bg-white p-3"
                >
                  <Icon className="mt-0.5 h-5 w-5 text-[#79B833]" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {step.title}
                    </p>
                    <p className="text-sm text-gray-500">{step.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <MaintainaceRequestList />
    </div>
  );
};

export default MaintenanceSection;
