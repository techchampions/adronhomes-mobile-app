import { create } from "zustand";
import { PropertiesSearchResultResponse } from "../data/types/SearchPropertiesResultTypes";

export const useSearchStore = create((set) => ({
  searchResults: [],
  searchMessage: "",
  status: "",
  isLoading: false,

  setSearchResults: (response: PropertiesSearchResultResponse) =>
    set({
      searchResults: response?.properties || [],
      searchMessage: response?.message || "",
      status: response?.status || "",
      isLoading: false,
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  clearSearchResults: () =>
    set({
      searchResults: [],
      searchMessage: "",
      status: "",
      isLoading: false,
    }),
}));
