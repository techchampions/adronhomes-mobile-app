import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useEffect } from "react";
import { useUserStore } from "../zustand/UserStore";
import { useToastStore } from "../zustand/useToastStore";
import {
  createPropertyPlan,
  deleteAccount,
  fetchPropertiesPageData,
  fetchSavedProperties,
  filterProperties,
  filterPropertiesnoauth,
  fundWallet,
  generateNewRef,
  getAllAccountDetails,
  getAllPropertyLocations,
  getAllPropertyType,
  getContact,
  getContractTransactions,
  getDashboardHomeData,
  getEstates,
  getFAQs,
  getFeaturedProperties,
  getIfUserExists,
  getNotificationByID,
  getNotifications,
  getPaymentReciept,
  getPropertyByID,
  getPropertyPlanByID,
  getSettings,
  getSliderByType,
  getTransactionByID,
  getUser,
  getUserPropertiesPlan,
  getUserPropertiesPlanPaymentHistory,
  getUserTransactions,
  getUserWallet,
  getWalletTransactionByID,
  getWalletTransactionReciept,
  infrastructurePayment,
  linkExistingContracts,
  makeEnquire,
  makePendingPropertyPlanPayment,
  payForContract,
  PropertyFilters,
  propertyPlanRepayment,
  requestStatement,
  resolveVirtualAccount,
  SearchParam,
  searchProperties,
  StatementPayload,
  StatementResponse,
  toggleSaveProperty,
  verifyMarketer,
} from "./api";
import apiClient from "./apiClient";
import { AccountDetailsResponse } from "./types/AccountDetailsTypes";
import { FAQResponse } from "./types/FAQTypes";
import { GetPropertyByIdResponse } from "./types/GetPropertyByIdResponse";
import { NotificationByIDResponse } from "./types/NotificationByIDTypes";
import { PropertyLocationResponse } from "./types/PropertyLocationTypes";
import { PlanPropertiesDetailResponse } from "./types/PropertyPlanDetailTypes";
import { PropertyPlanPaymentResponse } from "./types/PropertyPlanPaymentListTypes";
import { SavedPropertiesResponse } from "./types/SavedPropertiesResponse";
import { PropertiesSearchResultResponse } from "./types/SearchPropertiesResultTypes";
import { SettingsResponse } from "./types/SettingsTypes";
import { SliderByTypeResponse } from "./types/SliderByTypeTypes";
import { GetUserResponse } from "./types/UserProfileTypes";
import {
  ContactParams,
  ApiResponse as NonGenericApiResponse,
} from "./types/contractTypes";
import { UserDashboardResponseData } from "./types/dashboardHomeTypes";
import { estatePropertiesResponse } from "./types/estatePropertiesResponse";
import { NotificationsResponse } from "./types/notificationTypes";
import {
  PaginatedProperties,
  PropertiesResponse,
} from "./types/propertiesPageTypes";
import { PropertiesTypeResponse } from "./types/propertyTypes";
import { TransactionApiResponse, TransactionParams } from "./types/transaction";
import { UserPropertyPlanResponse } from "./types/userPropertiesTypes";
import {
  TransactionByIDResponse,
  TransactionRecieptResponse,
  WalletTransactionByIDResponse,
} from "./types/userTransactionByIDTypes";
import { UserTransactionResponse } from "./types/userTransactionsTypes";
import { UserWalletResponse } from "./types/userWalletTypes";

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

export const useGetAccounts = () => {
  const { setAccounts } = useUserStore();
  const queryResult = useQuery<AccountDetailsResponse>({
    queryKey: ["Accounts"],
    queryFn: getAllAccountDetails,
  });
  useEffect(() => {
    if (queryResult.data?.status) {
      setAccounts(queryResult.data.data);
    }
  }, [queryResult.data, setAccounts]);

  return queryResult;
};

// Query hook for Sliders
export const useGetSlidersByType = (type: string) => {
  return useQuery<SliderByTypeResponse>({
    queryKey: ["Sliders", type],
    queryFn: () => getSliderByType(type),
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
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
// Query hook for user property plan data with
export const useGetUserPropertiesPlan = (page: number) => {
  return useQuery<UserPropertyPlanResponse>({
    queryKey: ["user-properties-plan", page],
    queryFn: () => getUserPropertiesPlan(page),
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
export const useGetNotifications = (page: number) => {
  return useQuery<NotificationsResponse>({
    queryKey: ["user-notifications", page],
    queryFn: () => getNotifications(page),
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

export const useFilterProperties = (
  page: number,
  filters?: PropertyFilters
) => {
  return useQuery<PaginatedProperties>({
    queryKey: ["properties", page, filters],
    queryFn: () => filterProperties(page, filters),
  });
};
export const useFilterPropertiesnoauth = (
  page: number,
  p0: string, // is_auth?:any,
  filters?: PropertyFilters
) => {
  return useQuery<PaginatedProperties>({
    queryKey: ["properties", page, filters],
    queryFn: () => filterPropertiesnoauth(page, filters),
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
// Query hook for Wallet Transsaction by ID
export const useGetWalletTransactionByID = (id: number | string) => {
  return useQuery<WalletTransactionByIDResponse>({
    queryKey: ["wallet-tranaction", id],
    queryFn: () => getWalletTransactionByID(id),
    enabled: !!id,
  });
};
export const useGetTransactionReciept = (id: number | string) => {
  return useQuery<TransactionRecieptResponse>({
    queryKey: ["tranaction-reciept", id],
    queryFn: () => getWalletTransactionReciept(id),
    enabled: !!id,
  });
};
export const useGetPaymentReciept = (id: number | string) => {
  return useQuery<TransactionRecieptResponse>({
    queryKey: ["payment-reciept", id],
    queryFn: () => getPaymentReciept(id),
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
export const useGetUserTransactions = (page: number) => {
  return useQuery<UserTransactionResponse>({
    queryKey: ["user-transactions", page],
    queryFn: () => getUserTransactions(page),
  });
};
interface Response {
  status: boolean;
}
export const useToggleSaveProperty = () => {
  const queryClient = useQueryClient();
  const toast = useToastStore();
  return useMutation({
    mutationFn: toggleSaveProperty,
    onSuccess: (data) => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["property"],
      });
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
      queryClient.invalidateQueries({
        queryKey: ["saved-properties"],
      });
      queryClient.invalidateQueries({
        queryKey: ["properties-page"],
      });
      toast.showToast(data.message, "success");
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
// Query hook for creating a new property plan
export const useMakePropertyPlanPendingPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: makePendingPropertyPlanPayment,
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
      queryClient.invalidateQueries({
        queryKey: ["property-plan-details"],
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
export const useEnquireProperty = () => {
  return useMutation({
    mutationFn: makeEnquire,
  });
};

export const useGetFAQs = () => {
  return useQuery<FAQResponse>({
    queryKey: ["FAQs"],
    queryFn: getFAQs,
  });
};

export const useGetEquiryInfo = () => {
  return useQuery<SettingsResponse>({
    queryKey: ["settings", "enquiry"],
    queryFn: () => getSettings("enquiry"),
  });
};
export const useGetClientInfo = () => {
  return useQuery<SettingsResponse>({
    queryKey: ["settings", "client"],
    queryFn: () => getSettings("client"),
  });
};

export const useGetFeatured = () => {
  return useQuery<PropertiesResponse>({
    queryKey: ["featured-data"],
    queryFn: getFeaturedProperties,
  });
};

export const useGetEstate = () => {
  return useQuery<estatePropertiesResponse>({
    queryKey: ["estate-data"],
    queryFn: getEstates,
  });
};

export const useResolveVirtualAccount = () => {
  const { showToast } = useToastStore();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resolveVirtualAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-wallet"],
      });
      showToast("Generated Account successfully", "success");
    },
    onError: () => {
      showToast("Virtual Account Resolve Failed.", "error");
    },
  });
};

export const useGetContact = (params: ContactParams) => {
  return useQuery<NonGenericApiResponse, Error>({
    queryKey: ["get-contact", params],
    queryFn: () => getContact(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetContractTransactions = (params: TransactionParams) => {
  return useQuery<TransactionApiResponse, Error>({
    queryKey: ["contract-transactions", params],
    queryFn: () => getContractTransactions(params),
    placeholderData: keepPreviousData,
  });
};
// https://adron.microf10.sg-host.com/api/erp-contract/3000001759/transactions
export const useLinkExistingContracts = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: linkExistingContracts,
    onSuccess: (data) => {
      showToast("Contracts linked successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["erp-contracts"] });
    },
    onError: (error: any) => {
      console.error("Full error:", error.response?.data); // Log full error
      const msg =
        error?.response?.data?.message || "Failed to link contract. Try again.";
      showToast(msg, "error");
    },
  });
};

interface Payment {
  id: number;
  property_id: number;
  user_id: number;
  property_plan_id: number;
  order_id: number | null;
  amount_paid: number;
  purpose: string;
  payment_type: string;
  status: number;
  reference: string;
  is_coupon: number;
  created_at: string;
  updated_at: string;
  proof_of_payment: string | null;
  bank_name: string;
  description: string;
  marketer_id: number | null;
  director_id: number;
}

interface PaymentUpdateResponse {
  success: boolean;
  message: string;
  payment: Payment;
  merchant_code: string;
  payable_code: string;
}

export const useGenerateNewRef = (payment_id: number) => {
  return useQuery<PaymentUpdateResponse>({
    queryKey: ["new-payment-ref", payment_id],
    queryFn: () => generateNewRef(payment_id),
    enabled: !!payment_id,
  });
};

export const useIsUserExist = (email: string) => {
  return useQuery<UserExistsResponse>({
    queryKey: ["is_user_exist", email],
    queryFn: () => getIfUserExists(email),
    enabled: !!email,
    retry: false,
  });
};

export const useVerifyMarkerter = (id: string) => {
  return useQuery<VerifyMarketerResponse>({
    queryKey: ["verify-marketer", id],
    queryFn: () => verifyMarketer(id),
    enabled: !!id,
  });
};

export const useGetBusinessType = () => {
  return useQuery<ApiResponse<BusinessType[]>>({
    queryKey: ["citta-business-type"],
    queryFn: async () => {
      const res = await apiClient.get(`/citta/business-types`);
      return res.data;
    },
  });
};
export const useGetCittaGenders = () => {
  return useQuery<ApiResponse<BusinessType[]>>({
    queryKey: ["citta-genders"],
    queryFn: async () => {
      const res = await apiClient.get(`/citta/genders`);
      return res.data;
    },
  });
};
export const useGetCittaMaritalStatus = () => {
  return useQuery<ApiResponse<BusinessType[]>>({
    queryKey: ["citta-marital-statuses"],
    queryFn: async () => {
      const res = await apiClient.get(`/citta/marital-statuses`);
      return res.data;
    },
  });
};
export const useGetCittaCountries = () => {
  return useQuery<ApiResponse<BusinessType[]>>({
    queryKey: ["citta-countries"],
    queryFn: async () => {
      const res = await apiClient.get(`/citta/countries`);
      return res.data;
    },
  });
};
export const useGetCittaPurposes = () => {
  return useQuery<ApiResponse<BusinessType[]>>({
    queryKey: ["citta-purposes"],
    queryFn: async () => {
      const res = await apiClient.get(`/citta/purposes`);
      return res.data;
    },
  });
};
export const useGetCittaBranches = () => {
  return useQuery<ApiResponse<BusinessType[]>>({
    queryKey: ["citta-branches"],
    queryFn: async () => {
      const res = await apiClient.get(`/citta/branches`);
      return res.data;
    },
  });
};
export function usePayForContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payForContract,
    onSuccess: (data, variables) => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['erp-contracts'] });
      queryClient.invalidateQueries({ queryKey: ['user-wallet'] });
      queryClient.invalidateQueries({ queryKey: ['wallet-data'] });
      
      // You can also update cache directly if needed
      console.log('Payment successful:', data);
    },
    onError: (error: Error) => {
      console.error('Payment error:', error.message);
    },
  });
}
