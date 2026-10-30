import React from "react";
import { useOutletContext } from "react-router-dom";
import { formatDate } from "../../data/utils";
import CopyButton from "../CopyButton";
import AccessCodePass from "./AccessCodePass";

const statusLabel: Record<NonNullable<AccessCode["status"]>, string> = {
  active: "Active",
  expiring_soon: "Expiring Soon",
  expired: "Expired",
};

const statusClass: Record<NonNullable<AccessCode["status"]>, string> = {
  active: "bg-green-50 text-green-700",
  expiring_soon: "bg-yellow-50 text-yellow-700",
  expired: "bg-red-50 text-red-700",
};

function codeStatus(code: AccessCode): NonNullable<AccessCode["status"]> {
  if (code.status) return code.status;
  const expires = new Date(code.expired_at).getTime();
  if (expires <= Date.now()) return "expired";
  if (expires <= Date.now() + 7 * 24 * 60 * 60 * 1000) return "expiring_soon";
  return "active";
}

interface Prop {
  accessCodes?: AccessCode[];
  title?: string;
  layout?: "stack" | "grid";
  framed?: boolean;
}

const AccessCodeList: React.FC<Prop> = ({
  accessCodes = [],
  title,
  layout = "stack",
  framed = true,
}) => {
  const context: CommunityOutletContext = useOutletContext();
  const estateName = context.data?.estate_info.name;

  return (
    <div
      className={
        framed ? "overflow-hidden rounded-xl border border-gray-100 bg-white" : ""
      }
    >
      {title && (
        <div className="border-b border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      {accessCodes.length === 0 ? (
        <p className="p-5 text-sm text-gray-500">No access codes yet.</p>
      ) : (
        <div
          className={
            layout === "grid"
              ? "grid gap-4 p-4 md:grid-cols-2"
              : "flex flex-col gap-4 p-4"
          }
        >
          {accessCodes.map((code) => {
            const status = codeStatus(code);
            if (layout === "grid") {
              return (
                <article
                  key={code.id}
                  className="rounded-2xl border border-gray-100 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        {estateName || "Estate"}
                      </p>
                      <h4 className="mt-1 font-medium capitalize text-gray-800">
                        {code.name || "Untitled code"}
                      </h4>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[status]}`}
                    >
                      {statusLabel[status]}
                    </span>
                  </div>
                  <div className="mt-4">
                    <AccessCodePass
                      code={code.code}
                      name={code.name}
                      estateName={estateName}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F7F8F6] px-3 py-2">
                    <p className="font-mono text-lg tracking-[0.18em] text-[#032147]">
                      {code.code || "N/A"}
                    </p>
                    <CopyButton text={code.code} />
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    Expires {formatDate(code.expired_at)}
                  </p>
                </article>
              );
            }

            return (
              <article
                key={code.id}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:flex-row sm:items-center"
              >
                <AccessCodePass
                  code={code.code}
                  name={code.name}
                  estateName={estateName}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    {estateName || "Estate"}
                  </p>
                  <h4 className="mt-1 font-medium capitalize text-gray-800">
                    {code.name || "Untitled code"}
                  </h4>
                  <div className="mt-2 flex items-center gap-2">
                    <p className="font-mono text-sm tracking-[0.16em] text-[#032147]">
                      {code.code || "N/A"}
                    </p>
                    <CopyButton text={code.code} />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Expires {formatDate(code.expired_at)}
                  </p>
                </div>
                <span
                  className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[status]}`}
                >
                  {statusLabel[status]}
                </span>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AccessCodeList;
