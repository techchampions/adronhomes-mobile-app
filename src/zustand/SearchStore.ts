import { PropertiesSearchResultResponse } from "./../data/types/SearchPropertiesResultTypes";
import { create } from "zustand";

export const useSearchStore = create((set) => ({
  searchResults: [],
  searchMessage: "",
  status: "",

  setSearchResults: (response: PropertiesSearchResultResponse) =>
    set({
      searchResults: response?.properties || [],
      searchMessage: response?.message || "",
      status: response?.status || "",
    }),

  clearSearchResults: () =>
    set({
      searchResults: [],
      searchMessage: "",
      status: "",
    }),
}));
