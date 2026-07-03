import { FiTool } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import { formatDate } from "../../data/utils";

const MaintainaceRequestList = () => {
  const context: CommunityOutletContext = useOutletContext();
  const requests = context.data?.maintenance_requests.data || [];
  const statusStyles: Record<string, string> = {
    Assigned: "bg-blue-50 text-blue-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Resolved: "bg-green-50 text-green-700",
  };
  const PriorityStyles: Record<string, string> = {
    High: "bg-red-50 text-red-700",
    Low: "bg-yellow-50 text-yellow-700",
    Medium: "bg-green-50 text-green-700",
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white">
      <div className="border-b border-gray-100 p-5">
        <h4 className="font-semibold text-gray-800">Recent requests</h4>
      </div>
      <div className="divide-y divide-gray-100">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-start justify-between gap-3 p-4"
          >
            <div className="flex flex-1 gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-[#79B833]">
                <FiTool className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{request.title}</p>
                <p className="mt-1 text-sm text-gray-500">{request.content}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {request.status} • Updated{" "}
                  {formatDate(request.updated_at || "")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  PriorityStyles[request.priority || "Medium"]
                }`}
              >
                {request.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintainaceRequestList;
