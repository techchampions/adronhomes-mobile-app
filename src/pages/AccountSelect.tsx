import { ArrowLeft, User2 } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/Auth";
import { UserAccount } from "../data/types/UserAccount";
interface Prop {
  users: UserAccount[];
  values: { email: string; password: string };
}
const AccountSelect: React.FC<Prop> = ({ users, values }) => {
  const navigate = useNavigate();
  const handleClick = (customer_code: string) => {
    Auth.loginStep2(values, customer_code, navigate);
  };
  return (
    <div>
      <div className="p-5">
        <div className="flex items-center gap-2">
          <Link
            to={"/"}
            className="border h-8 w-8 border-gray-300 rounded-full flex justify-center items-center"
          >
            <ArrowLeft />
          </Link>
          <div className="">Go back to Login</div>
        </div>
        <h2 className="text-2xl font-black mt-4">Select your account</h2>
        <div className="mt-4 border border-gray-200 rounded-xl divide-y overflow-hidden divide-gray-200">
          {users.map((user, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleClick(user.customer_code)}
            >
              <div className="bg-adron-green text-white h-15 w-15 rounded-full flex items-center justify-center">
                <User2 />
              </div>
              <div className="">
                <div className="">
                  {user.first_name} {user.last_name}
                </div>
                <em className="text-gray-700">
                  {user.customer_code || "No customer code assigned!"}
                </em>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountSelect;