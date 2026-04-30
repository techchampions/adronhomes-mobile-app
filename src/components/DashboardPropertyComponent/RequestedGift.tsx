// import { AlertCircle, CheckCircle2, Ellipsis, Gift } from "lucide-react";

// interface Prop {
//   gift_request: GiftRequest;
// }
// const RequestedGift: React.FC<Prop> = ({ gift_request }) => {
//   return (
//     <div className="bg-white mt-2 rounded-2xl px-4 py-8 w-sm">
//       <div className="text-2xl font-adron-bold">Your Requested Items</div>
//       <div
//         className={`${
//           gift_request.status === "approved" && "text-green-600 bg-green-500/50"
//         } ${
//           gift_request.status === "pending" &&
//           "text-yellow-600 bg-yellow-500/20"
//         } ${
//           gift_request.status === "rejected" && "text-red-600"
//         } flex items-center gap-2 p-2 rounded-lg`}
//       >
//         {gift_request.status === "approved" && (
//           <div className="p-1 rounded-full border">
//             <CheckCircle2 size={14} />
//           </div>
//         )}
//         {gift_request.status === "pending" && (
//           <div className="p-1 rounded-full border">
//             <Ellipsis size={14} />
//           </div>
//         )}
//         {gift_request.status === "rejected" && (
//           <div className="p-1 rounded-full border">
//             <AlertCircle size={14} />
//           </div>
//         )}
//         <div className="">Your request is {gift_request.status}</div>
//       </div>
//       <div className="grid gap-2 mt-8 divide-y divide-gray-300">
//         <div className="grid grid-cols-5 gap-2 px-4 font-adron-bold">
//           <div className=""></div>
//           <div className="">Qty</div>
//           <div className="col-span-3">Item</div>
//         </div>
//         <div className="">
//           {gift_request.items.map((item, i) => (
//             <div
//               className="grid grid-cols-5 gap-2 hover:bg-gray-100 px-4 py-1 rounded-lg"
//               key={i}
//             >
//               <Gift />
//               <div className="">{item.qty}</div>
//               <div className="col-span-3">{item.name}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestedGift;

import { AlertCircle, CheckCircle2, Ellipsis, Gift } from "lucide-react";

interface Prop {
  gift_request: GiftRequest;
}

const RequestedGift: React.FC<Prop> = ({ gift_request }) => {
  const getStatusConfig = () => {
    switch (gift_request.status) {
      case "approved":
        return {
          bg: "bg-gradient-to-r from-green-500/20 to-emerald-500/10",
          text: "text-green-400",
          border: "border-green-500/30",
          icon: <CheckCircle2 size={14} className="text-green-400" />,
        };
      case "pending":
        return {
          bg: "bg-gradient-to-r from-yellow-500/20 to-amber-500/10",
          text: "text-yellow-400",
          border: "border-yellow-500/30",
          icon: <Ellipsis size={14} className="text-yellow-400" />,
        };
      case "rejected":
        return {
          bg: "bg-gradient-to-r from-red-500/20 to-rose-500/10",
          text: "text-red-400",
          border: "border-red-500/30",
          icon: <AlertCircle size={14} className="text-red-400" />,
        };
      default:
        return {
          bg: "bg-gradient-to-r from-gray-500/20 to-gray-500/10",
          text: "text-gray-400",
          border: "border-gray-500/30",
          icon: null,
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="relative group">
      {/* Glassy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-adron-green/40 via-black/20 to-transparent rounded-2xl backdrop-blur-xl" />

      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-2xl pointer-events-none" />

      {/* Content */}
      <div className="relative px-6 py-8 w-sm">
        {/* Header with icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-500/20 to-white/20 rounded-xl border border-green-500/30">
            <Gift className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Your Requested Items
          </div>
        </div>

        {/* Status badge */}
        <div
          className={`${statusConfig.bg} ${statusConfig.text} flex items-center gap-2 p-3 rounded-xl border ${statusConfig.border} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]`}
        >
          <div
            className={`p-1 rounded-full border ${statusConfig.border} bg-black/20`}
          >
            {statusConfig.icon}
          </div>
          <div className="font-medium">
            Your request is{" "}
            <span className="font-bold capitalize">{gift_request.status}</span>
          </div>
        </div>

        {/* Items grid */}
        <div className="grid gap-3 mt-8">
          {/* Header row */}
          <div className="grid grid-cols-4 gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-sm font-semibold text-gray-300">
            <div className="col-span-3">Item</div>
            <div className="col-span-1">Qty</div>
          </div>

          {/* Items list */}
          <div className="space-y-1">
            {gift_request.items.map((item, i) => (
              <div
                className="grid grid-cols-4 gap-2 items-center group/item hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer backdrop-blur-sm"
                key={i}
              >
                <div className="col-span-3 text-gray-200 font-medium flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-green-500/20 to-orange-500/20 rounded-lg w-fit border border-green-500/30 group-hover/item:scale-110 transition-transform">
                    <Gift size={14} className="text-green-400" />
                  </div>
                  {item.name}
                </div>
                <div className="col-span-1 font-semibold text-white">
                  x{item.qty}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -z-10" />
      </div>
    </div>
  );
};

export default RequestedGift;
