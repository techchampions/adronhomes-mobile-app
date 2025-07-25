import { FaArrowLeft, FaSearch, FaUser } from "react-icons/fa";
import InputField from "./InputField";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../zustand/UserStore";
import { useQueryClient } from "@tanstack/react-query";
import { searchProperties } from "../data/api";
import { useSearchStore } from "../zustand/SearchStore";
import CopyButton from "./CopyButton";
import { useGetNotifications } from "../data/hooks";
import Button from "./Button";
import { useModalStore } from "../zustand/useModalStore";
import AddFundAmount from "./DashboardHomeComponents/AddFundAmount";

const Header = ({ pageTitle }: { pageTitle: string }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { openModal } = useModalStore();
  const { setSearchResults, setLoading } = useSearchStore();
  const { data: notificationData } = useGetNotifications(1);
  const unReadCount = notificationData?.unread || 0;
  const queryClient = useQueryClient();
  const goToProfile = () => {
    navigate("/my-profile");
  };
  const goBack = () => {
    navigate(-1);
  };
  const handleFundWallet = () => {
    return openModal(<AddFundAmount goBack={goBack} />);
  };
  const handleBuyProperty = () => {
    navigate("/dashboard/new-property");
  };
  return (
    <div className="hidden lg:flex justify-between items-center bg-white rounded-3xl p-8 mb-5">
      <FaArrowLeft className="cursor-pointer" onClick={goBack} />
      <div className="text-2xl">{pageTitle}</div>
      <div className="">
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            setLoading(true); // ✅ Start loading

            try {
              const data = await queryClient.fetchQuery({
                queryKey: ["search-properties-results", values.search],
                queryFn: () => searchProperties({ search: values.search }),
              });

              setSearchResults(data);
              navigate("/search-properties");
            } catch (error) {
              console.error("Search error:", error);
              setLoading(false); // ✅ Stop loading on error
            }
          }}
        >
          <Form className="flex items-center gap-2">
            <InputField
              name="search"
              type="text"
              placeholder="Search..."
              className="!w-[300px] text-adron-black"
            />
            <button type="submit">
              <FaSearch />
            </button>
          </Form>
        </Formik>
      </div>
      <div className="flex items-center gap-4">
        <div
          className="w-7 h-7 relative cursor-pointer"
          onClick={() => navigate("/notifications")}
        >
          <img
            src="/images/notifications-rounded.svg"
            alt=""
            className="h-full w-full"
            onClick={() => navigate("/notifications")}
          />
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unReadCount}
          </span>
        </div>
        {/* <div className="">
          <Button
            label="Fund Wallet"
            className="px-6 text-sm"
            onClick={handleFundWallet}
          />
        </div> */}
        <div className="border border-adron-body rounded-xl px-4 py-1 gap-1 flex flex-col">
          <div className="flex justify-between w-full gap-4">
            <p className="text-[10px] text-gray-400">Contract ID</p>
            <CopyButton text={user?.contract_id} />
          </div>
          <p className="text-xs">{user?.contract_id || "No contract ID"}</p>
        </div>
        <div
          className="p-2 bg-adron-body rounded-full cursor-pointer"
          onClick={goToProfile}
        >
          {user?.profile_picture ? (
            <img
              src={user?.profile_picture}
              alt="profile"
              className="w-7 h-7 object-cover rounded-full"
            />
          ) : (
            <FaUser className="h-4 w-4" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
