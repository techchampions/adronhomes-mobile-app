import React from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import ReferAndEarn from "../ReferAndEarn";

const NavbarAddorder = () => {
  const { openModal } = useModalStore();
  return (
    <div
      className="relative flex flex-col text-white text-left justify-center py-7 px-5 space-y-2 bg-[#44691B] rounded-2xl"
      onClick={() => openModal(<ReferAndEarn />)}
    >
      <img
        src="/images/referNearn-bg.png"
        className="absolute inset-0 w-full h-full"
        alt=""
      />
      <p className="w-fit mx-auto text-[18px]">
        Refer and Earn <br />
        <span className="text-sm font-bold">₦500,000</span>
      </p>
      <img
        src="/images/gift.svg"
        alt=""
        className="absolute bottom-0 left-0 h-16 w-16"
      />
    </div>
  );
};

export default NavbarAddorder;
