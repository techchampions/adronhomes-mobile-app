import { ChevronRightCircle, Key } from "lucide-react";
import React from "react";
import { formatDate } from "../../data/utils";
import CopyButton from "../CopyButton";
interface Prop {
  accessCodes: AccessCode[];
}
const AccessCodeList: React.FC<Prop> = ({ accessCodes }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Active Access Codes</h3>
          <button className="text-sm text-[#79B833] hover:underline">
            View All
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {accessCodes.map((code, i) => (
          <div key={i} className="p-4 group hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full bg-purple-100`}>
                  <Key className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 capitalize">
                    {code.name}
                  </p>
                  <div className="font-semibold flex items-center gap-1 text-xs text-gray-500">
                    <span>Access Code: {code.code}</span>
                    <CopyButton text={code.code} />
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>Expires: {formatDate(code.expired_at)}</span>
                  </div>
                </div>
              </div>
              <div className="hidden group-hover:flex text-gray-400">
                <ChevronRightCircle />
              </div>
              {/* <div className="text-right">
                <div className="text-sm">Expires:</div>
                <p className="font-semibold text-xs text-gray-800">
                  {formatDate(code.expired_at)}
                </p>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessCodeList;
