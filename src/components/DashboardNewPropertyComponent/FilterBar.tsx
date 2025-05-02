import { Formik, Form } from "formik";
import {
  FaBed,
  FaCheckCircle,
  FaFilter,
  FaLocationArrow,
} from "react-icons/fa";
import { IoPricetag } from "react-icons/io5";
import { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { TbLocationFilled } from "react-icons/tb";
import { useSearchParams } from "next/navigation";
import {
  useGetAllPropertyLocations,
  useGetAllPropertyTypes,
} from "../../data/hooks";
import SelectField from "../SelectField";
import InputField from "../InputField";
import Button from "../Button";
import Modal from "../Modal";

export default function FilterBar({
  onFilter,
  initialFilters,
}: {
  onFilter: (filters: any) => void;
  initialFilters: Record<string, any>;
}) {
  const {
    data: PropertyTypeData,
    isLoading: isLoadingPropertyTypes,
    isError: isPropertyTypesError,
  } = useGetAllPropertyTypes();

  const { data: locations } = useGetAllPropertyLocations();
  const searchParams = useSearchParams();
  const location = "";
  const [showModal, setShowModal] = useState(false);
  const propertyTypes = isLoadingPropertyTypes
    ? ["Loading..."]
    : PropertyTypeData?.propertiesType || [];
  if (isPropertyTypesError) return <div>Error loading property types.</div>;

  const stateNames = locations?.locations.map((loc) => loc.state_name);
  return (
    <Formik
      initialValues={{
        state: location || initialFilters.state || "",
        propertyType: initialFilters.type || "",
        bedrooms: initialFilters.bedrooms || "",
        status: initialFilters.status || "",
        min: initialFilters.minPrice || "",
        max: initialFilters.maxPrice || "",
      }}
      enableReinitialize
      onSubmit={(values) => {
        console.log("Filter values:", values);
        onFilter(values);
      }}
    >
      {({ values }) => (
        <>
          <Form className="hidden md:block">
            <div
              className={`bg-white px-8 py-6 rounded-3xl mb-8 md:grid grid-cols-2 sm:grid-cols-3 ${
                !location ? `md:grid-cols-6` : `md:grid-cols-5`
              } gap-4`}
            >
              {!location && (
                <div className="flex flex-col justify-between gap-4">
                  <label
                    htmlFor="location"
                    className="flex font-bold gap-2 items-center text-sm"
                  >
                    <TbLocationFilled /> Location
                  </label>
                  <SelectField
                    name="state"
                    placeholder="What are you looking?"
                    options={stateNames || []}
                  />
                </div>
              )}
              <div className="flex flex-col justify-between gap-4">
                <label
                  htmlFor="location"
                  className="flex font-bold gap-2 items-center text-sm"
                >
                  <GoHomeFill /> Property Type
                </label>

                <SelectField
                  name="propertyType"
                  placeholder="Property Type"
                  options={propertyTypes}
                />
              </div>
              <div className={`flex flex-col justify-between gap-4`}>
                <label
                  htmlFor="location"
                  className="flex font-bold gap-2 items-center text-sm"
                >
                  <FaBed /> No. of Bedrooms
                </label>

                <SelectField
                  name="bedrooms"
                  placeholder="Bedrooms"
                  options={["1", "2", "3", "4", "5+"]}
                />
              </div>
              <div className="flex flex-col justify-between gap-4">
                <label
                  htmlFor="location"
                  className="flex font-bold gap-2 items-center text-sm"
                >
                  <FaCheckCircle /> Availability status
                </label>

                <SelectField
                  name="status"
                  placeholder="Status"
                  options={["For Sale", "For Rent"]}
                />
              </div>
              <div className="flex flex-col justify-between gap-4">
                <label
                  htmlFor="location"
                  className="flex gap-2 font-bold items-center"
                >
                  {/* <IoPricetag /> */}
                  <img
                    src="/price-tag.svg"
                    width={20}
                    height={20}
                    alt="price tag"
                  />
                  Price ₦
                </label>
                <div className="flex justify-between gap-1">
                  <InputField
                    className="py-2.5 !text-xs"
                    placeholder="Min"
                    type="number"
                    name="min"
                  />
                  <InputField
                    className="py-2.5 !text-xs"
                    placeholder="Max"
                    type="number"
                    name="max"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className=""></div>
                <Button
                  label="Apply"
                  type="submit"
                  className="bg-adron-green py-3 text-xs"
                />
              </div>
            </div>
          </Form>
          <div className="flex w-full justify-end mb-4">
            <div
              className="flex md:hidden bg-white rounded-full w-fit items-center px-5 py-1 gap-2"
              onClick={() => setShowModal(true)}
            >
              Sort
              <FaFilter />
            </div>
          </div>

          <Form className="block md:hidden">
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <div className="flex flex-col gap-2">
                {!location && (
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="location"
                      className="flex gap-2 items-center"
                    >
                      <FaLocationArrow /> Location
                    </label>
                    <SelectField
                      name="state"
                      placeholder="What are you looking?"
                      options={stateNames || []}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="flex gap-2 items-center">
                    <GoHomeFill /> Property Type
                  </label>

                  <SelectField
                    name="propertyType"
                    placeholder="Property Type"
                    options={propertyTypes || []}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="flex gap-2 items-center">
                    <FaBed /> No. of Bedrooms
                  </label>

                  <SelectField
                    name="bedrooms"
                    placeholder="Bedrooms"
                    options={["1", "2", "3", "4", "5+"]}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="flex gap-2 items-center">
                    <FaCheckCircle /> Availability status
                  </label>

                  <SelectField
                    name="status"
                    placeholder="Status"
                    options={["For Sale", "For Rent"]}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="flex gap-2 items-center">
                    <IoPricetag /> Price
                  </label>
                  <div className="flex justify-between gap-2">
                    <InputField
                      className="py-4"
                      placeholder="Min"
                      type="number"
                      name="min"
                    />
                    <InputField
                      className="py-4"
                      placeholder="Max"
                      type="number"
                      name="max"
                    />
                  </div>
                </div>
                <Button
                  label="Apply"
                  type="submit"
                  className="bg-adron-green mt-8 py-4"
                />
              </div>
            </Modal>
          </Form>
        </>
      )}
    </Formik>
  );
}
