import Button from "../Button";
import { useGetNotificationByID } from "../../data/hooks";
import ApiErrorBlock from "../ApiErrorBlock";
import SmallLoader from "../SmallLoader";
import { formatDate, formatPrice } from "../../data/utils";
import PropertySummary from "../PropertySummary";
import NotificationPropertySummary from "./NotificationPropertySummary";
import { IoArrowDown } from "react-icons/io5";

const NotificationDetail = ({ id }: { id: number }) => {
  const { data, isLoading, isError } = useGetNotificationByID(id);
  if (isError) {
    return <ApiErrorBlock />;
  }
  if (isLoading) {
    return <SmallLoader />;
  }
  const propertyIDs = data?.notification.property_ids || [];
  console.log("IDs", propertyIDs);
  const viewProperty = () => {
    if (propertyIDs.length == 1) {
      window.location.href = `/properties/${propertyIDs[0]}`;
    } else {
      window.location.href = `/new-properties/`;
    }
  };
  return (
    <div className="space-y-5">
      <div className="absolute top-4 left-9 ">
        <h4 className="font-bold text-lg">{data?.notification.title}</h4>
        <p className="text-sm text-gray-400">
          {formatDate(data?.notification.created_at ?? "")}
        </p>
      </div>
      <div className="mt-10 text-sm space-y-4 max-h-[300px] overflow-y-scroll scrollbar-hide">
        <p className="">{data?.notification.content}</p>
        {propertyIDs.length >= 1 && (
          <>
            {propertyIDs.slice(0, 5).map((item) => (
              <div className="" key={item}>
                {/* <PropertySummary id={item} /> */}
                <NotificationPropertySummary id={item} />
              </div>
            ))}
            <p className="text-sm text-gray-400 flex justify-center items-center gap-3 text-right w-full mx-auto">
              {propertyIDs.length - 5} more <IoArrowDown />
            </p>
          </>
        )}
      </div>
      {propertyIDs.length >= 1 && (
        <div className="flex justify-between">
          <Button
            label={
              propertyIDs.length > 1 ? `View All Properties` : `View Property`
            }
            className="bg-black px-6 text-xs"
            onClick={viewProperty}
          />
        </div>
      )}
    </div>
  );
};
export default NotificationDetail;
