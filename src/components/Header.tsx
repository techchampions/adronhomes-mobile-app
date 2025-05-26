import { FaSearch, FaUser } from "react-icons/fa";
import InputField from "./InputField";
import Button from "./Button";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../zustand/UserStore";
import { useQueryClient } from "@tanstack/react-query";
import { searchProperties } from "../data/api";
import { useSearchStore } from "../zustand/SearchStore";

const Header = ({ pageTitle }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { setSearchResults, setLoading } = useSearchStore();
  const queryClient = useQueryClient();
  const newProperty = () => {
    navigate("/new-properties");
  };
  const goTpProfile = () => {
    navigate("/my-profile");
  };
  return (
    <div className="hidden md:flex justify-between items-center bg-white rounded-3xl p-8 mb-5">
      <div className="text-2xl">{pageTitle}</div>
      <div className="">
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            setLoading(true); // ✅ Start loading

            try {
              const data = await queryClient.fetchQuery({
                queryKey: ["search-properties-results", values.search],
                queryFn: () => searchProperties({ name: values.search }),
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
              className="!w-[400px] text-adron-black"
            />
            <button type="submit">
              <FaSearch />
            </button>
          </Form>
        </Formik>
      </div>
      <div className="flex items-center gap-4">
        <img
          src="/images/notifications-rounded.svg"
          alt=""
          className="h-7 w-7"
          onClick={() => navigate("/notifications")}
        />
        <Button
          label="New Property"
          className="bg-adron-green text-sm px-4"
          onClick={newProperty}
        />
        <div className="p-2 bg-adron-body rounded-full" onClick={goTpProfile}>
          {user?.profile_picture ? (
            <img
              src={user?.profile_picture}
              alt="profile"
              className="w-14 h-7 object-cover rounded-full"
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
