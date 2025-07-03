import React from "react";
import { BsExclamationCircle } from "react-icons/bs";
interface Props {
  msg?: string;
  description?: string;
}
const NoPropertyFound: React.FC<Props> = ({ msg, description }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[300px] h-[40vh] mx-auto bg-red relative">
      <img
        src="/house-searching.svg"
        alt="No Property Found"
        width={300}
        height={300}
        className="w-[300px] h-[300px] object-cover"
      />
      <div className="">
        <div className="text-xl font-bold text-red-500 text-center justify-center mx-auto flex items-center gap-2">
          <BsExclamationCircle className="inline-block text-red-500" />{" "}
          {msg || "No Property Found"}
        </div>
        <p className="text-center">
          {description || "Please try again later."}
        </p>
      </div>
    </div>
  );
};
export default NoPropertyFound;
