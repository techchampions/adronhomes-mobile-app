import { useSearchProperties } from "../data/hooks";

export const SearchProperties = (values: { search: string }) => {
  const {
    data: searchResults,
    isError,
    isLoading,
  } = useSearchProperties(values.search);
  console.log("Search results", values);

  return {
    searchResults,
    isError,
    isLoading,
  };
};
