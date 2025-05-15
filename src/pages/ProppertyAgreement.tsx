import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GiStreetLight } from "react-icons/gi";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import PropertySummary from "../components/PropertySummary";
import SignaturePad from "../components/SignaturePad";

const ProppertyAgreement = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  return (
    <div>
      <div className=" ">
        <PropertySummary id={id} />
      </div>
      <div className="flex flex-col gap-7 mt-20">
        <h4 className="text-2xl">Property Agreement</h4>
        <article className="md:w-[80%] text-sm">
          This Property Agreement ("Agreement") is made and entered into on this
          [Date], by and between: Seller: [Seller's Full Name]Address: [Seller's
          Address]Phone Number: [Seller's Phone Number]Email Address: [Seller's
          Email Address] AND Buyer: [Buyer's Full Name]Address: [Buyer's
          Address]Phone Number: [Buyer's Phone Number]Email Address: [Buyer's
          Email Address] 1. PROPERTY DESCRIPTION The property being sold under
          this Agreement is located at: [Property Address] [Legal Description of
          Property] 2. SALE PRICE The total sale price of the property is:
          $[Sale Price] (the "Purchase Price"). 3. PAYMENT TERMS The Buyer
          agrees to pay the Purchase Price as follows: A deposit of $[Deposit
          Amount] to be paid on [Deposit Date], which will be held in escrow by
          [Escrow Agent Name]. The remaining balance of $[Remaining Amount] to
          be paid on or before [Closing Date] via [Method of Payment]. 4.
          CLOSING DATE The closing of the sale will take place on [Closing Date]
          at [Time], at which point the Buyer will receive ownership of the
          property, and the Seller will transfer title to the Buyer. 5.
          WARRANTIES AND REPRESENTATIONS The Seller warrants that they are the
          legal owner of the property and have the right to sell it. The Seller
          warrants that the property is free of any liens or encumbrances,
          except as disclosed in writing to the Buyer. The Buyer acknowledges
          that they have had an opportunity to inspect the property and are
          satisfied with its condition. 6. CONDITIONS PRECEDENT The obligations
          of the Buyer under this Agreement are subject to the following
          conditions: The property being free of any legal disputes or claims.
          Satisfactory results from a property inspection, which must be
          completed by [Date]. 7. DEFAULT AND REMEDIES If the Buyer defaults on
          this Agreement, the Seller may retain the deposit as liquidated
          damages. If the Seller defaults on this Agreement, the Buyer may seek
          specific performance or request a refund of any deposits made. 8.
          GOVERNING LAW This Agreement will be governed by the laws of
          [State/Country]. 9. ENTIRE AGREEMENT This Agreement constitutes the
          entire understanding between the parties regarding the subject matter
          herein and supersedes any prior agreements or understandings. 10.
          SIGNATURES
        </article>
        <div className="flex justify-end">
          <div className="w-full md:w-1/2">
            <SignaturePad />
          </div>
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
