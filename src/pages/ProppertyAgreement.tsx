import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import PropertySummary from "../components/PropertySummary";
import { useGetPropertyByID } from "../data/hooks";
import { usePaymentBreakDownStore } from "../zustand/PaymentBreakDownStore";
import DOMPurify from "dompurify";

const ProppertyAgreement = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const { data } = useGetPropertyByID(id);
  const { numberOfUnits } = usePaymentBreakDownStore();
  const agreement = data?.data.properties[0].property_agreement || "";
  const sanitizedHTML = DOMPurify.sanitize(agreement);

  return (
    <div>
      <div className=" ">
        <PropertySummary id={id} units={numberOfUnits} />
      </div>
      <div className="flex flex-col gap-7 mt-20">
        <h4 className="text-2xl">Property Agreement</h4>
        <div className="text-gray-500 bg-white p-6 rounded-2xl">
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            // className="prose max-w-none rich-text-content"
            className="prose  prose-lg
            max-w-none prose-headings:font-bold prose-headings:text-gray-900 [&>h2]:!font-adron-bold [&>h1]:text-3xl [&>h2]:text-2xl [&>h3]:text-xl [&>p]:my-5 [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:text-xs [&>a]:text-blue-600 [&>a]:no-underline [&>a]:border-b-2 [&>a]:border-blue-300 [&>a]:hover:border-blue-600 [&>strong]:text-gray-900 [&>ul]:list-disc [&>ol]:list-decimal [&>li]:my-1 blockquote:border-l-4 blockquote:border-gray-300 blockquote:pl-4 blockquote:italic [&>img]:rounded-lg [&>img]:shadow-md [&>table]:border [&>table]:border-gray-200 [&>th]:bg-gray-50 [&>th]:p-2 [&>td]:p-2 "
          />{" "}
        </div>

        <div className="flex justify-end">
          <div className="w-full md:w-1/2">{/* <SignaturePad /> */}</div>
        </div>
      </div>
      <div className="flex justify-end mt-20">
        <Button
          label="Proceed to Payment"
          className="bg-adron-green px-6 !w-fit"
          onClick={() =>
            navigate(`/dashboard/property/${id}/payment-method`, {
              replace: true,
            })
          }
        />
      </div>
    </div>
  );
};

export default ProppertyAgreement;