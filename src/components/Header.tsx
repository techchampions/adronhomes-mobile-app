import React from "react";
import { FaUser } from "react-icons/fa";
import InputField from "./InputField";
import Button from "./Button";
import { Formik } from "formik";

const Header = () => {
  return (
    <div className="hidden md:flex justify-between items-center bg-white rounded-3xl p-8 mb-5">
      <div className="text-2xl">Dashboard</div>
      <div className="">
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values) => {
            console.log(values.search);
          }}
        >
          <InputField
            name="search"
            type="text"
            placeholder="Search..."
            className="!w-[400px] text-adron-black"
          />
        </Formik>
      </div>
      <div className="flex items-center gap-4">
        <img
          src="/images/notifications-rounded.svg"
          alt=""
          className="h-7 w-7"
        />
        <Button label="New Property" className="bg-adron-green text-sm px-4" />
        <div className="p-2 bg-adron-body rounded-full">
          <FaUser className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default Header;
