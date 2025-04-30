import React from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../Button";

const NavbarAddorder = () => {
  return (
    <div className="flex flex-col text-black text-left justify-center py-4 px-5 space-y-2 bg-brand-300 rounded-2xl">
      <div className="w-full text-[18px] font-brand-bold text-dark-purple">
        Let's Start
      </div>
      <p className="w-full text-xs text-gray-600">
        Creating or adding new orders couldn't be easier
      </p>
      <Button
        label="Add New Order"
        icon={<FaPlus />}
        className="rounded-lg flex flex-row justify-center items-center mt-[35px]"
      />
    </div>
  );
};

export default NavbarAddorder;
