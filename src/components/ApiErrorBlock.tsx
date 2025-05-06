import React from "react";

const ApiErrorBlock: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-[300px] h-[80vh] mx-auto bg-red relative">
      <img src="/500.svg" alt="error" className="h-full w-full" />
    </div>
  );
};

export default ApiErrorBlock;
