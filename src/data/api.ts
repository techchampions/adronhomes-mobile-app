import apiClient from "./apiClient";
import { GetPropertyByIdResponse } from "./types/GetPropertyByIdResponse";
import { GetUserResponse } from "./types/UserProfileTypes";
import { PropertiesResponse } from "./types/propertiesPageTypes";
import { PropertyLocationResponse } from "./types/PropertyLocationTypes";
import { PropertiesTypeResponse } from "./types/propertyTypes";
import { UserTransactionResponse } from "./types/userTransactionsTypes";
import { UserDashboardResponseData } from "./types/dashboardHomeTypes";
import { UserWalletResponse } from "./types/userWalletTypes";
import { UserPropertyPlanResponse } from "./types/userPropertiesTypes";
import { PlanPropertiesDetailResponse } from "./types/PropertyPlanDetailTypes";
import { NotificationsResponse } from "./types/notificationTypes";
import { TransactionByIDResponse } from "./types/userTransactionByIDTypes";
import { NotificationByIDResponse } from "./types/NotificationByIDTypes";
import { number } from "yup";
import { PropertyPlanPayload } from "./types/CreatePropertyPayload";
import { PropertyPlanPaymentResponse } from "./types/PropertyPlanPaymentListTypes";

// Get User Profile
export const getUser = async (): Promise<GetUserResponse> => {
  const response = await apiClient.get("/user-profile");
  return response.data;
};

//Get Dashboard Home data
export const getDashboardHomeData =
  async (): Promise<UserDashboardResponseData> => {
    const response = await apiClient.get("/user/dashboard");
    return response.data;
  };

//Get user Transactions
export const getUserTransactions =
  async (): Promise<UserTransactionResponse> => {
    const response = await apiClient.get("/user/transactions");
    return response.data;
  };

// Get wallet data
export const getUserWallet = async (): Promise<UserWalletResponse> => {
  const response = await apiClient.get("/user/fund-wallet-data");
  return response.data;
};
// Get user Properties data
export const getUserPropertiesPlan =
  async (): Promise<UserPropertyPlanResponse> => {
    const response = await apiClient.get("/user/plan-properties");
    return response.data;
  };

//Get Properties Plan Datails by ID Data
export const getPropertyPlanByID = async (
  id: number | string
): Promise<PlanPropertiesDetailResponse> => {
  const response = await apiClient.get(`/user/plan-property/${id}`);
  return response.data;
};

// get User Properties Plan payment history
export const getUserPropertiesPlanPaymentHistory = async (
  id: number | string
): Promise<PropertyPlanPaymentResponse> => {
  const response = await apiClient.get(`/plan-payment-list/${id}`);
  return response.data;
};

// Get Transaction by ID
export const getTransactionByID = async (
  id: number | string
): Promise<TransactionByIDResponse> => {
  const res = await apiClient.get(`/user/transaction/${id}`);
  return res.data;
};

//get Notifications
export const getNotifications = async (): Promise<NotificationsResponse> => {
  const response = await apiClient.get("/notifications");
  return response.data;
};
// Get Transaction by ID
export const getNotificationByID = async (
  id: number | string
): Promise<NotificationByIDResponse> => {
  const res = await apiClient.get(`/notification/${id}`);
  return res.data;
};

//Get Properties
export const fetchPropertiesPageData = async (
  page: number,
  filters: Record<string, any> = {}
): Promise<PropertiesResponse> => {
  const hasFilters = Object.values(filters).some((v) => v !== "");
  const params = new URLSearchParams({
    page: String(page),
    ...(filters.state && { state: filters.state }),
    ...(filters.type && { type: filters.type }),
    ...(filters.minPrice && { minPrice: filters.minPrice }),
    ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
  });

  const endpoint = hasFilters
    ? `/filter-property?${params.toString()}`
    : `/properties-page?page=${page}`;

  const response = await apiClient.get(endpoint);
  return response.data;
};

// Get Saved Properties
export const fetchSavedProperties = async (): Promise<PropertiesResponse> => {
  const res = await apiClient.get("/user/saved-property");
  return res.data;
};

//Get Properties by ID Data
export const getPropertyByID = async (
  id: number | string
): Promise<GetPropertyByIdResponse> => {
  const response = await apiClient.get(`/property/${id}`);
  return response.data;
};

//Get all Property Locations Data
export const getAllPropertyLocations =
  async (): Promise<PropertyLocationResponse> => {
    const response = await apiClient.get("/property-locations");
    return response.data;
  };
//Get all Property Type Data
export const getAllPropertyType = async (): Promise<PropertiesTypeResponse> => {
  const response = await apiClient.get("/properties-type");
  return response.data;
};

// Toggle Save Property
export const toggleSaveProperty = async (propertyId: number): Promise<void> => {
  const formData = new FormData();
  formData.append("property_id", propertyId.toString());

  await apiClient.post("/user/save-property-toggle", formData);
};

// Fund Wallet
export const fundWallet = async ({
  amount,
  payment_method,
}: {
  amount: number;
  payment_method: string;
}): Promise<void> => {
  const formData = new FormData();
  formData.append("amount", amount.toString());
  formData.append("payment_method", payment_method);

  await apiClient.post("/user/fund-wallet", formData);
};

// Create Property Plan
export const createPropertyPlan = async (
  payload: Partial<PropertyPlanPayload>
): Promise<void> => {
  const formData = new FormData();

  if (payload.property_id !== undefined)
    formData.append("property_id", payload.property_id.toString());

  if (payload.payment_type !== undefined)
    formData.append("payment_type", payload.payment_type.toString());

  if (payload.monthly_duration !== undefined)
    formData.append("monthly_duration", payload.monthly_duration.toString());

  if (payload.repayment_schedule)
    formData.append("repayment_schedule", payload.repayment_schedule);

  if (payload.start_date) formData.append("start_date", payload.start_date);

  if (payload.end_date) formData.append("end_date", payload.end_date);

  if (payload.paid_amount !== undefined)
    formData.append("paid_amount", payload.paid_amount.toString());

  if (payload.payment_method)
    formData.append("payment_method", payload.payment_method);

  if (payload.marketer_code)
    formData.append("marketer_code", payload.marketer_code);

  if (payload.proof_of_payment)
    formData.append("proof_of_payment", payload.proof_of_payment);

  const res = await apiClient.post("/user/buy-property", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
