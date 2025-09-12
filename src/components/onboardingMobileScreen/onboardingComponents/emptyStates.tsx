export const EmptyFeaturedProperties = () => (
  <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <svg
        className="w-10 h-10 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    </div>
    <h3 className="font-adron-mid text-lg text-gray-600 mb-2">
      No Featured Properties
    </h3>
    <p className="text-gray-500 text-sm">
      Featured properties will appear here when available
    </p>
  </div>
);

export const EmptyEstates = () => (
  <div className="flex flex-col items-center justify-center py-8 px-4 text-center min-w-[200px]">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
      <svg
        className="w-8 h-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 21l18-18M3 3l18 18"
        />
      </svg>
    </div>
    <h3 className="font-adron-mid text-base text-gray-600 mb-1">
      No Estates Available
    </h3>
    <p className="text-gray-500 text-xs">Check back later for new estates</p>
  </div>)