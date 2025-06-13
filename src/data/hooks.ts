import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPropertyPlan,
  fetchPropertiesPageData,
  fetchSavedProperties,
  fundWallet,
  getAllPropertyLocations,
  getAllPropertyType,
  getDashboardHomeData,
  getNotificationByID,
  getNotifications,
  getPropertyByID,
  getPropertyPlanByID,
  getTransactionByID,
  getUser,
  getUserPropertiesPlan,
  getUserPropertiesPlanPaymentHistory,
  getUserTransactions,
  getUserWallet,
  infrastructurePayment,
  PropertyFilters,
  propertyPlanRepayment,
  requestStatement,
  SearchParam,
  searchProperties,
  StatementPayload,
  StatementResponse,
  toggleSaveProperty,
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
import { UserPropertyPlanResponse } from "./types/userPropertiesTypes";
import { PlanPropertiesDetailResponse } from "./types/PropertyPlanDetailTypes";
import { NotificationsResponse } from "./types/notificationTypes";
import { TransactionByIDResponse } from "./types/userTransactionByIDTypes";
import { NotificationByIDResponse } from "./types/NotificationByIDTypes";
import { PropertyPlanPaymentResponse } from "./types/PropertyPlanPaymentListTypes";
import { PropertiesSearchResultResponse } from "./types/SearchPropertiesResultTypes";
import { useEffect } from "react";
import { SavedPropertiesResponse } from "./types/SavedPropertiesResponse";

//Query hook for User profile
export const useGetUser = () => {
  const { setUser, setIsLoggedIn } = useUserStore();
  const queryResult = useQuery<GetUserResponse, Error>({
    queryKey: ["user-profile"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (queryResult.data?.success) {
      setUser(queryResult.data.user);
      setIsLoggedIn(true);
    }
  }, [queryResult.data, setUser, setIsLoggedIn]);

  return queryResult;
};
// export const useGetUser = () => {
//   const { setUser, setIsLoggedIn } = useUserStore();
//   return useQuery<GetUserResponse, Error, GetUserResponse, ["user-profile"]>({
//     queryKey: ["user-profile"],
//     queryFn: getUser,
//     onSettled: (data: GetUserResponse) => {
//       if (data.success) {
//         setUser(data.user);
//         setIsLoggedIn(true);
//       }
//     },
//   });
//   useEffect(() => {
//     if (queryResult.data?.success) {
//       setUser(queryResult.data.user);
//       setIsLoggedIn(true);
//     }
//   }, [queryResult.data, setUser, setIsLoggedIn]);

//   return queryResult;
// };

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
// Query hook for user property plan data with
export const useGetUserPropertiesPlan = () => {
  return useQuery<UserPropertyPlanResponse>({
    queryKey: ["user-properties-plan"],
    queryFn: getUserPropertiesPlan,
  });
};

// Query hook for properties plan Deatil page data with
export const useGetPropertyPlanByID = (id: number | string) => {
  return useQuery<PlanPropertiesDetailResponse>({
    queryKey: ["property-plan-details", id], // include id in the key to avoid collisions
    queryFn: () => getPropertyPlanByID(id),
    enabled: !!id, // prevents the query from running if id is undefined/null
  });
};

// Query hook for user properties plan payment history
export const useGetUserPropertiesPlanPaymentHistory = (id: number | string) => {
  return useQuery<PropertyPlanPaymentResponse>({
    queryKey: ["user-properties-plan-payment-history", id],
    queryFn: () => getUserPropertiesPlanPaymentHistory(id),
    enabled: !!id,
  });
};

//Query hook to get user notifications
export const useGetNotifications = () => {
  return useQuery<NotificationsResponse>({
    queryKey: ["user-notifications"],
    queryFn: getNotifications,
  });
};

// Query hook for properties and filtering
export const usePropertiespage = (
  page: number,
  // filters?: Record<string, any>
  filters?: PropertyFilters // Use the defined type instead of `Record<string, any>`
) => {
  return useQuery<PropertiesResponse>({
    queryKey: ["properties-page", page, filters],
    queryFn: () => fetchPropertiesPageData(page, filters),
  });
};

// Query hook to search Properties
export const useSearchProperties = (filters?: SearchParam) => {
  return useQuery<PropertiesSearchResultResponse>({
    queryKey: ["search-properties-results"],
    queryFn: () => searchProperties(filters),
  });
};

// Query hook to get user Saved property
export const useGetSavedProperties = () => {
  return useQuery<SavedPropertiesResponse>({
    queryKey: ["saved-properties"],
    queryFn: fetchSavedProperties,
  });
};

// Query hook for properties page data with
export const useGetPropertyByID = (id?: number | string) => {
  return useQuery<GetPropertyByIdResponse>({
    queryKey: ["property", id], // include id in the key to avoid collisions
    queryFn: () => getPropertyByID(id),
    enabled: !!id, // prevents the query from running if id is undefined/null
  });
};

// Query hook for Transsaction by ID
export const useGetTransactionByID = (id: number | string) => {
  return useQuery<TransactionByIDResponse>({
    queryKey: ["tranaction", id],
    queryFn: () => getTransactionByID(id),
    enabled: !!id,
  });
};

// Query hook for Transsaction by ID
export const useGetNotificationByID = (id: number | string) => {
  return useQuery<NotificationByIDResponse>({
    queryKey: ["notification", id],
    queryFn: () => getNotificationByID(id),
    enabled: !!id,
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

export const useToggleSaveProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleSaveProperty,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["saved-properties"],
      });
      queryClient.invalidateQueries({
        queryKey: ["properties-page"],
      });
    },
  });
};
export const useFundWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fundWallet,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user-wallet"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-data"],
      });
    },
  });
};

// Query hook for creating a new property plan
export const useCreatePropertyPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPropertyPlan,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user-properties-plan"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-wallet"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-transactions"],
      });
    },
  });
};

// Query hook for a property plan repayment
export const usePropertyPlanRepayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertyPlanRepayment,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["property-plan-details"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-properties-plan"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-wallet"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-properties-plan-payment-history"],
      });
    },
  });
};

//Hook for Infrastructure Payment
export const useInfrastructurePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: infrastructurePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["property-plan-details"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-properties-plan"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-wallet"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-properties-plan-payment-history"],
      });
    },
  });
};

export const useRequestStatement = () => {
  return useMutation<StatementResponse, unknown, Partial<StatementPayload>>({
    mutationFn: requestStatement,
  });
};
