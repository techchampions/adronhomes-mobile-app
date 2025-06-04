import { create } from "zustand";
import { PropertiesSearchResultResponse } from "../data/types/SearchPropertiesResultTypes";
import { Property } from "../data/types/propertiesPageTypes";

type SearchStoreState = {
  searchResults: Property[];
  searchMessage: string;
  status: string;
  isLoading: boolean;

  setSearchResults: (response: PropertiesSearchResultResponse) => void;
  setLoading: (loading: boolean) => void;
  clearSearchResults: () => void;
};

export const useSearchStore = create<SearchStoreState>((set) => ({
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

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  clearSearchResults: () =>
    set({
      searchResults: [],
      searchMessage: "",
      status: "",
      isLoading: false,
    }),
}));
