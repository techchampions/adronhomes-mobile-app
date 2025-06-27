import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import PropertySummary from "../components/PropertySummary";
import { useGetPropertyByID } from "../data/hooks";

const ProppertyAgreement = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const { data, isError, isLoading } = useGetPropertyByID(id);
  const agreementUrl = data?.data?.properties?.[0]?.property_agreement;
  const viewerUrl = agreementUrl
    ? `${agreementUrl}#toolbar=0&navpanes=0&scrollbar=0`
    : "";

  return (
    <div>
      <div className=" ">
        <PropertySummary id={id} />
      </div>
      <div className="flex flex-col gap-7 mt-20">
        <h4 className="text-2xl">Property Agreement</h4>
        {viewerUrl ? (
          <div className="w-full overflow-hidden scrollbar-hide">
            <embed
              src={viewerUrl}
              type="application/pdf"
              className="w-full h-[600px] scrollbar-hide"
            />
          </div>
        ) : (
          <p className="text-gray-500">
            {data?.data.properties[0].property_agreement || ""}
          </p>
          // <p className="text-red-500">PDF not available.</p>
        )}

        <div className="flex justify-end">
          <div className="w-full md:w-1/2">{/* <SignaturePad /> */}</div>
        </div>
      </div>
      <div className="flex justify-end mt-20">
        <Button
          label="Proceed to Payment"
          className="bg-adron-green px-6 !w-fit"
          onClick={() => navigate(`/property/${id}/payment-method`)}
        />
      </div>
    </div>
  );
};

export default ProppertyAgreement;
