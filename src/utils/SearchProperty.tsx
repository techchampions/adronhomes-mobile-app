import { useSearchProperties } from "../data/hooks";

export const SearchProperties = (values: { search: string }) => {
  const search = { search: values.search };
  const {
    data: searchResults,
    isError,
    isLoading,
  } = useSearchProperties(search);
  console.log("Search results", values);

  return {
    searchResults,
    isError,
    isLoading,
  };
};
