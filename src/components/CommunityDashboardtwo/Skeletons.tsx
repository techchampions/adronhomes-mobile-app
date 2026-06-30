export const EstateInfoSkeletons = () => {
  return (
    <div className="bg-gray-200 rounded-2xl p-5 space-y-2">
      <div className="h-5 w-1/5 bg-gray-400 animate-pulse rounded-lg" />
      <div className="h-7 w-2/5 bg-gray-400 animate-pulse rounded-lg" />
      <div className="h-10 w-4/5 bg-gray-400 animate-pulse rounded-lg" />
      <div className="grid sm:grid-cols-4 gap-2">
        <div className="h-20 bg-gray-400 animate-pulse rounded-lg"></div>
        <div className="h-20 bg-gray-400 animate-pulse rounded-lg"></div>
        <div className="h-20 bg-gray-400 animate-pulse rounded-lg"></div>
        <div className="h-20 bg-gray-400 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
};
export const OutletSkeleton = () => {
  return (
    <div className="bg-gray-200 p-5 rounded-2xl space-y-3">
      <div className="bg-gray-400 animate-pulse rounded-lg h-40" />
      <div className="bg-gray-400 animate-pulse rounded-lg h-40" />
      <div className="bg-gray-400 animate-pulse rounded-lg h-40" />
      <div className="bg-gray-400 animate-pulse rounded-lg h-40" />
      <div className="bg-gray-400 animate-pulse rounded-lg h-40" />
    </div>
  );
};
