import { useQuery } from "@tanstack/react-query";
import {
  fetchPropertiesPageData,
  getAllPropertyLocations,
  getAllPropertyType,
  getDashboardHomeData,
  getPropertyByID,
  getUserTransactions,
  getUserWallet,
} from "./api";
import { PropertiesResponse } from "./types/propertiesPageTypes";
import { GetPropertyByIdResponse } from "./types/GetPropertyByIdResponse";
import { PropertyLocationResponse } from "./types/PropertyLocationTypes";
import { PropertiesTypeResponse } from "./types/propertyTypes";
import { GetUserResponse } from "./types/UserProfileTypes";
import { useUserStore } from "../zustand/UserStore";
import { UserTransactionResponse } from "./types/userTransactionsTypes";
import { UserDashboardResponseData } from "./types/dashboardHomeTypes";
import { UserWalletResponse } from "./types/userWalletTypes";

//Query hook for User profile
export const useGetUser = () => {
  const { getUser } = useUserStore();
  return useQuery<GetUserResponse>({
    queryKey: ["user-profile"],
    queryFn: getUser,
  });
};

// Query hook for homepage data with
export const useGetUserDashboardData = () => {
  return useQuery<UserDashboardResponseData>({
    queryKey: ["dashboard-data"],
    queryFn: getDashboardHomeData,
  });
};
// Query hook for wallet data with
export const useGetUserWalletdata = () => {
  return useQuery<UserWalletResponse>({
    queryKey: ["user-wallet"],
    queryFn: getUserWallet,
  });
};
export const usePropertiespage = (
  page: number,
  filters?: Record<string, any>
) => {
  return useQuery<PropertiesResponse>({
    queryKey: ["properties-page", page, filters],
    queryFn: () => fetchPropertiesPageData(page, filters),
  });
};

// Query hook for properties page data with
export const useGetPropertyByID = (id: number | string) => {
  return useQuery<GetPropertyByIdResponse>({
    queryKey: ["property", id], // include id in the key to avoid collisions
    queryFn: () => getPropertyByID(id),
    enabled: !!id, // prevents the query from running if id is undefined/null
  });
};
// Query hook for properties Locations data with
export const useGetAllPropertyLocations = () => {
  return useQuery<PropertyLocationResponse>({
    queryKey: ["property-locations"],
    queryFn: () => getAllPropertyLocations(),
  });
};
// Query hook for properties types data with
export const useGetAllPropertyTypes = () => {
  return useQuery<PropertiesTypeResponse>({
    queryKey: ["property-types"],
    queryFn: getAllPropertyType,
  });
};

// Query hook for getting user transactions
export const useGetUserTransactions = () => {
  return useQuery<UserTransactionResponse>({
    queryKey: ["user-transactions"],
    queryFn: getUserTransactions,
  });
};
