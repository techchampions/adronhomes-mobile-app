import React from "react";
import { FiX } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import {
  AccessCodeStatusFilter,
  useEstateAccessCodes,
} from "../../hooks/estateCommunity/useEstateCommunity";
import InlineLoading from "../InlineLoading";
import AccessCodeList from "./AccessCodeList";

interface Prop {
  estateId?: number;
  status: AccessCodeStatusFilter;
  title: string;
  onClose: () => void;
}

const AccessCodesModal: React.FC<Prop> = ({
  estateId,
  status,
  title,
  onClose,
}) => {
  const context: CommunityOutletContext = useOutletContext();
  const estateName = context.data?.estate_info.name;
  const { data, isLoading, isError } = useEstateAccessCodes(estateId, status);
  const codes = data?.data || [];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            {estateName && (
              <p className="mt-1 text-sm text-gray-500">{estateName}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100"
          >
            <FiX className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto">
          {isLoading && <InlineLoading text="Loading codes..." />}
          {isError && (
            <p className="text-sm text-red-600">Could not load access codes.</p>
          )}
          {!isLoading && !isError && (
            <AccessCodeList accessCodes={codes} layout="grid" framed={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessCodesModal;
