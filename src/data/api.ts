import apiClient from "./apiClient";
import { GetPropertyByIdResponse } from "./types/GetPropertyByIdResponse";
import { GetUserResponse } from "./types/UserProfileTypes";
import {
  PaginatedProperties,
  PropertiesResponse,
} from "./types/propertiesPageTypes";
import { PropertyLocationResponse } from "./types/PropertyLocationTypes";
import { PropertiesTypeResponse } from "./types/propertyTypes";
import { UserTransactionResponse } from "./types/userTransactionsTypes";
import { UserDashboardResponseData } from "./types/dashboardHomeTypes";
import { UserWalletResponse } from "./types/userWalletTypes";
import { UserPropertyPlanResponse } from "./types/userPropertiesTypes";
import { PlanPropertiesDetailResponse } from "./types/PropertyPlanDetailTypes";
import { NotificationsResponse } from "./types/notificationTypes";
import {
  TransactionByIDResponse,

  TransactionRecieptResponse,

  WalletTransactionByIDResponse,
} from "./types/userTransactionByIDTypes";
import { NotificationByIDResponse } from "./types/NotificationByIDTypes";
import {
  NewPropertyPlanPayload,
  PendingPropertyPlanPayload,
  PropertyPlanPayload,
} from "./types/CreatePropertyPayload";
import { PropertyPlanPaymentResponse } from "./types/PropertyPlanPaymentListTypes";
import { FundWalletPayload } from "./types/FundWalletPayloadTypes";
import { PropertiesSearchResultResponse } from "./types/SearchPropertiesResultTypes";
import { SavedPropertiesResponse } from "./types/SavedPropertiesResponse";
import { FundWalletResponse } from "../components/DashboardHomeComponents/SelectPaymentMethod";
import { AccountDetailsResponse } from "./types/AccountDetailsTypes";
import { EnquirePayload } from "./types/EnquirePayload";
import { PropertiesRequestResponse } from "./types/PropertyRequestTypes";
import { SliderByTypeResponse } from "./types/SliderByTypeTypes";
import { FAQResponse } from "./types/FAQTypes";
import { SettingsResponse } from "./types/SettingsTypes";
import { estatePropertiesResponse } from "./types/estatePropertiesResponse";

export type ApiError = {
  response?: {
    data?: {
      errors?: Record<string, string[]>;
      message?: string;
    };
  };
  status: number;
  message?: string;
};
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
export const getUserTransactions = async (
  page: number
): Promise<UserTransactionResponse> => {
  const response = await apiClient.get(`/user/transactions?page=${page}`);
  return response.data;
};

// Get wallet data
export const getUserWallet = async (): Promise<UserWalletResponse> => {
  const response = await apiClient.get("/user/fund-wallet-data");
  return response.data;
};
// Get user Properties data
export const getUserPropertiesPlan = async (
  page: number
): Promise<UserPropertyPlanResponse> => {
  const response = await apiClient.get(`/user/plan-properties?page=${page}`);
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
// Get Wallet Transaction by ID
export const getWalletTransactionByID = async (
  id: number | string
): Promise<WalletTransactionByIDResponse> => {
  const res = await apiClient.get(`/user/wallet-transaction/${id}`);
  return res.data;
};
export const getWalletTransactionReciept = async (
  id: number | string
): Promise<TransactionRecieptResponse> => {
  const res = await apiClient.get(`/get-receipt/transaction/${id}`);
  return res.data;
};
export const getPaymentReciept = async (
  id: number | string
): Promise<TransactionRecieptResponse> => {
  const res = await apiClient.get(`/get-receipt/payment/${id}`);
  return res.data;
};

//get Notifications
export const getNotifications = async (
  page: number
): Promise<NotificationsResponse> => {
  const response = await apiClient.get(`/notifications?page=${page}`);
  return response.data;
};
// Get Transaction by ID
export const getNotificationByID = async (
  id: number | string
): Promise<NotificationByIDResponse> => {
  const res = await apiClient.get(`/notification/${id}`);
  return res.data;
};

// types.ts (or at the top of your file)
//Get Properties
// export const fetchPropertiesPageData = async (
//   page: number,
//   filters: Record<string, any> = {}
// ): Promise<PropertiesResponse> => {
//   const hasFilters = Object.values(filters).some((v) => v !== "");
//   const params = new URLSearchParams({
//     page: String(page),
//     ...(filters.state && { state: filters.state }),
//     ...(filters.type && { type: filters.type }),
//     ...(filters.minPrice && { minPrice: filters.minPrice }),
//     ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
//   });

//   const endpoint = hasFilters
//     ? `/filter-property?${params.toString()}`
//     : `/properties-page?page=${page}`;

//   const response = await apiClient.get(endpoint);
//   return response.data;
// };
export interface PropertyFilters {
  state?: string;
  propertyType?: string;
  status?: string;
  bedrooms?: string;
  min?: string | number;
  max?: string | number;
}
export const fetchPropertiesPageData = async (
  page: number,
  filters: PropertyFilters = {} // Use the defined type
): Promise<PropertiesResponse> => {
  const hasFilters = Object.values(filters).some(
    (v) => v !== "" && v !== undefined
  );
  const params = new URLSearchParams({
    page: String(page),
    state: String(filters.state),
    type: String(filters.propertyType),
    minPrice: String(filters.min),
    maxPrice: String(filters.max),
    status: String(filters.status),
  });

  const endpoint = hasFilters
    ? `/filter-property?${params.toString()}`
    : `/properties-page?page=${page}`;

  const response = await apiClient.get(endpoint);
  return response.data;
};

export const filterProperties = async (
  page: number,
  filters: PropertyFilters = {} // Use the defined type
): Promise<PaginatedProperties> => {
  const params = new URLSearchParams({
    is_auth: String(1),
    page: String(page),
  });
  if (filters.state) {
    params.append("state", String(filters.state));
  }
  if (filters.propertyType) {
    params.append("type", String(filters.propertyType));
  }
  if (filters.status) {
    params.append("status", String(filters.status));
  }
  if (filters.bedrooms) {
    params.append("no_of_bedrooms", String(filters.bedrooms));
  }
  if (filters.max) {
    params.append("maxPrice", String(filters.max));
  }
  if (filters.min) {
    params.append("minPrice", String(filters.min));
  }

  const endpoint = `/filter-property?${params.toString()}`;

  const response = await apiClient.get(endpoint);
  return response.data;
};

export interface SearchParam {
  search?: string;
}
//Search Properties
export const searchProperties = async (
  // filters: Record<string, any>
  filters: SearchParam = {}
): Promise<PropertiesSearchResultResponse> => {
  const params = new URLSearchParams({
    ...(filters.search && { name: filters.search }),
  });

  const endpoint = `/search?${params.toString()}`;

  const response = await apiClient.post(endpoint);
  return response.data;
};

// Get Saved Properties
export const fetchSavedProperties =
  async (): Promise<SavedPropertiesResponse> => {
    const res = await apiClient.get("/user/saved-property");
    return res.data;
  };

//Get Properties by ID Data
export const getPropertyByID = async (
  id?: number | string
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
interface SavedStatusResponse {
  status: boolean;
  message: string;
}
export const toggleSaveProperty = async (
  propertyId: number
): Promise<SavedStatusResponse> => {
  const formData = new FormData();
  formData.append("property_id", propertyId.toString());

  const response = await apiClient.post("/user/save-property-toggle", formData);
  return response.data;
};

// Fund Wallet
export const fundWallet = async (
  payload: Partial<FundWalletPayload>
): Promise<FundWalletResponse> => {
  const formData = new FormData();
  if (payload.payment_method !== undefined)
    formData.append("payment_method", payload.payment_method);

  if (payload.bank_name !== undefined)
    formData.append("bank_name", payload.bank_name);

  if (payload.amount !== undefined)
    formData.append("amount", payload.amount.toString());

  if (payload.proof_of_payment && payload.proof_of_payment instanceof File) {
    formData.append("proof_of_payment", payload.proof_of_payment);
  } else {
    console.warn("proof_of_payment is not a File:", payload.proof_of_payment);
  }
  const res = await apiClient.post("/user/fund-wallet", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export type InitiatePropertyPurchaseResponse = {
  success: boolean;
  message: string;
  plan: {
    id: number;
    payment_type: string; // "2" as a string — you can also type it more strictly if needed
    monthly_duration: string;
    repayment_schedule: string;
    start_date: string | null; // ISO date or null
    end_date: string | null; // ISO date or null
    property_id: number;
    user_id: number;
    property_type: number;
    total_amount: number;
    paid_amount: string;
    marketer_id: number;
    remaining_balance: number;
    next_payment_date: string; // ISO date string
    payment_percentage: number;
    updated_at: string;
    created_at: string;
  };
  payment: {
    id: number;
    user_id: number;
    property_id: number;
    property_plan_id: number;
    amount_paid: string;
    reference: string;
    payment_type: "Paystack" | string;
    purpose: "property" | string;
    proof_of_payment: string | null;
    updated_at: string;
    created_at: string;
  };
  total_amount: number;
};

// Create Property Plan
export const createPropertyPlan = async (
  payload: Partial<NewPropertyPlanPayload>
): Promise<InitiatePropertyPurchaseResponse> => {
  const formData = new FormData();
  console.log("buy property payload:", payload);
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
  if (payload.purpose) formData.append("purpose", payload.purpose);

  if (payload.marketer_code)
    formData.append("marketer_code", payload.marketer_code);

  if (payload.bank_name) formData.append("bank_name", payload.bank_name);

  if (payload.number_of_unit)
    formData.append("number_of_unit", payload.number_of_unit.toString());

  if (payload.proof_of_payment)
    formData.append("proof_of_payment", payload.proof_of_payment);

  // Append contract details fields
  if (payload.contract_business_type)
    formData.append("contract_business_type", payload.contract_business_type);
  if (payload.contract_subscriber_name_1)
    formData.append(
      "contract_subscriber_name_1",
      payload.contract_subscriber_name_1
    );
  if (payload.contract_subscriber_name_2)
    formData.append(
      "contract_subscriber_name_2",
      payload.contract_subscriber_name_2
    );
  if (payload.contract_subscriber_name_3)
    formData.append(
      "contract_subscriber_name_3",
      payload.contract_subscriber_name_3
    );
  if (payload.contract_additional_name)
    formData.append(
      "contract_additional_name",
      payload.contract_additional_name
    );
  if (payload.contract_marital_status)
    formData.append("contract_marital_status", payload.contract_marital_status);
  if (payload.contract_gender)
    formData.append(
      "contract_gender",
      payload.contract_gender.toLocaleLowerCase()
    );
  if (payload.contract_date_of_birth)
    formData.append("contract_date_of_birth", payload.contract_date_of_birth);
  if (payload.contract_nationality)
    formData.append("contract_nationality", payload.contract_nationality);
  if (payload.contract_residential_address)
    formData.append(
      "contract_residential_address",
      payload.contract_residential_address
    );
  if (payload.contract_town)
    formData.append("contract_town", payload.contract_town);
  if (payload.contract_state)
    formData.append("contract_state", payload.contract_state);
  if (payload.contract_country)
    formData.append("contract_country", payload.contract_country);
  if (payload.contract_email)
    formData.append("contract_email", payload.contract_email);
  if (payload.contract_sms)
    formData.append("contract_sms", payload.contract_sms);
  if (payload.contract_employer_address)
    formData.append(
      "contract_employer_address",
      payload.contract_employer_address
    );
  if (payload.contract_occupation)
    formData.append("contract_occupation", payload.contract_occupation);
  if (payload.contract_employer)
    formData.append("contract_employer", payload.contract_employer);
  if (payload.contract_next_of_kin_phone)
    formData.append("next_of_kin_phone", payload.contract_next_of_kin_phone);
  if (payload.contract_next_of_kin_address)
    formData.append(
      "contract_next_of_kin_address",
      payload.contract_next_of_kin_address
    );
  if (payload.contract_next_of_kin)
    formData.append("contract_next_of_kin", payload.contract_next_of_kin);
  if (payload.contract_next_of_kin_relationship)
    formData.append(
      "contract_next_of_kin_relationship",
      payload.contract_next_of_kin_relationship
    );

  if (payload.contract_profile_picture) {
    formData.append(
      "contract_profile_picture",
      payload.contract_profile_picture
    );
  }
  if (payload.contract_profile_picture_2) {
    formData.append(
      "contract_profile_picture_2",
      payload.contract_profile_picture_2
    );
  }
  if (payload.means_of_ids)
    payload.means_of_ids.forEach((file, index) => {
      formData.append(`means_of_ids[${index}]`, file);
    });

  const res = await apiClient.post("/user/buy-property", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const makePendingPropertyPlanPayment = async (
  payload: Partial<PendingPropertyPlanPayload>
): Promise<InitiatePropertyPurchaseResponse> => {
  const formData = new FormData();

  if (payload.user_property_id !== undefined)
    formData.append("user_property_id", payload.user_property_id.toString());

  if (payload.payment_type !== undefined)
    formData.append("payment_type", payload.payment_type.toString());

  if (payload.payment_method)
    formData.append("payment_method", payload.payment_method);
  if (payload.bank_name) formData.append("bank_name", payload.bank_name);

  if (payload.proof_of_payment)
    formData.append("proof_of_payment", payload.proof_of_payment);

  const res = await apiClient.post("/user/make-pending-payment", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Propperty Plan Repayment
export const propertyPlanRepayment = async (
  payload: Partial<PropertyPlanPayload>
): Promise<void> => {
  const formData = new FormData();

  if (payload.plan_id !== undefined)
    formData.append("plan_id", payload.plan_id.toString());

  if (payload.payment_method)
    formData.append("payment_method", payload.payment_method);

  if (payload.paid_amount !== undefined)
    formData.append("amount", payload.paid_amount.toString());

  if (payload.bank_name) formData.append("bank_name", payload.bank_name);

  if (payload.proof_of_payment)
    formData.append("proof_of_payment", payload.proof_of_payment);

  const res = await apiClient.post("/user/repayment", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const infrastructurePayment = async (
  payload: Partial<PropertyPlanPayload>
): Promise<void> => {
  const formData = new FormData();
  if (payload.plan_id !== undefined)
    formData.append("plan_id", payload.plan_id.toString());
  if (payload.payment_method)
    formData.append("payment_method", payload.payment_method);
  if (payload.paid_amount !== undefined)
    formData.append("paid_amount", payload.paid_amount.toString());
  if (payload.purpose) formData.append("purpose", payload.purpose);
  if (payload.bank_name) formData.append("bank_name", payload.bank_name);

  if (payload.proof_of_payment)
    formData.append("proof_of_payment", payload.proof_of_payment);
  const res = await apiClient.post("/user/pay-for-infrastructure", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export interface StatementPayload {
  start_date: string;
  end_date: string;
}

export interface StatementResponse {
  success: boolean;
  message: string;
  file: string;
}
export const requestStatement = async (
  payload: Partial<StatementPayload>
): Promise<StatementResponse> => {
  const res = await apiClient.post("/user/send-account-statement", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

//Get All Account Details
export const getAllAccountDetails =
  async (): Promise<AccountDetailsResponse> => {
    const response = await apiClient.get("/account-details");
    return response.data;
  };

export const makeEnquire = async (payload: Partial<EnquirePayload>) => {
  const formData = new FormData();
  if (payload.name !== undefined)
    formData.append("name", payload.name.toString());
  if (payload.email !== undefined)
    formData.append("email", payload.email.toString());
  if (payload.phone !== undefined)
    formData.append("phone", payload.phone.toString());
  if (payload.interest_option !== undefined)
    formData.append("interest_option", payload.interest_option.toString());
  if (payload.property_id !== undefined)
    formData.append("property_id", payload.property_id.toString());
  if (payload.description !== undefined)
    formData.append("description", payload.description.toString());

  const response = await apiClient.post("/enquiry-request", formData, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getPropertyRequests =
  async (): Promise<PropertiesRequestResponse> => {
    const response = await apiClient.get("/properties-requests");
    return response.data;
  };

//Get Sliders By Type
export const getSliderByType = async (
  type: string
): Promise<SliderByTypeResponse> => {
  const endpoint = `/sliders?type=${type.toString()}`;
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const getFAQs = async (): Promise<FAQResponse> => {
  const response = await apiClient.get("/faqs");
  return response.data;
};
export const getSettings = async (type: string): Promise<SettingsResponse> => {
  const response = await apiClient.get(`/settings?type=${type}`);
  return response.data;
};
export const getFeaturedProperties = async (): Promise<PropertiesResponse> => {
  const response = await apiClient.get("/filter-property?page=1&is_featured=1&is_auth=1");
  return response.data;
};

export const getEstates = async (): Promise<estatePropertiesResponse> => {
  const response = await apiClient.get("/property-estate");
  return response.data;
};


