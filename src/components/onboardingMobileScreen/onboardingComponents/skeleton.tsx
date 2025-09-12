export const PropertyCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

export const CompactCardSkeleton = () => (
  <div className="animate-pulse flex-none w-32">
    <div className="bg-gray-200 h-24 rounded-lg mb-2"></div>
    <div className="space-y-1">
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
    </div>
  </div>
);