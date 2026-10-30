import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "../../data/apiClient";
import { useToastStore } from "../../zustand/useToastStore";
const getEstateCommunity = async (): Promise<
  ApiResponse<CommunityEstate[]>
> => {
  const res = await apiClient.get(`/user/estates`);
  return res.data;
};
const getSingleEstateCommunity = async (
  id: number
): Promise<EstateDashboardResponse> => {
  const res = await apiClient.get(`/user/estates/${id}/dashboard`);
  return res.data;
};
export const useGetEstateCommunity = () => {
  return useQuery({
    queryKey: ["user-estate-community"],
    queryFn: getEstateCommunity,
  });
};
export const useGetSingleEstateCommunity = (id: number) => {
  return useQuery({
    queryKey: ["estate-community-info", id],
    queryFn: () => getSingleEstateCommunity(id),
    enabled: !!id,
  });
};

// MAINTAINANCE
const sendMaintainaceRequest = async (payload: RequestPaylaod) => {
  const res = await apiClient.post(`/user/estates/maintenance`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
export const useSendRequest = () => {
  const toast = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMaintainaceRequest,
    onSuccess: (data) => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user-maintainance-requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["estate-community-info"],
      });
      if (data.success && data.message) {
        toast.showToast(data.message, "success");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        toast.showToast(error.response?.data.message, "error");
      }
    },
  });
};

// UTTILITIES
export interface ElectricityRate {
  id: number;
  name: string;
  unit_price: number;
}

const getElectricityRate = async (): Promise<ApiResponse<ElectricityRate>> => {
  const res = await apiClient.get(`/user/estates/utilities/electricity`);
  return res.data;
};

export const useElectricityRate = () => {
  return useQuery({
    queryKey: ["electricity-rate"],
    queryFn: getElectricityRate,
  });
};

const payForUtility = async (
  payload: UtitlityPayload
): Promise<UtilityPaymentResponse> => {
  const res = await apiClient.post(`/user/estates/utilities/pay`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
export const usePayUtitlity = () => {
  const toast = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: payForUtility,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["estate-community-info"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-wallet"],
      });
      if (data.success && data.message) {
        toast.showToast(data.message, "success");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        toast.showToast(error.response?.data.message, "error");
      }
    },
  });
};
// ACCESS CODES
const generateNewAccessCode = async (
  payload: AccessCodePayload
): Promise<UtilityPaymentResponse> => {
  const res = await apiClient.post(`/user/estates/security-codes`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const useGenerateNewAccessCode = () => {
  const toast = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generateNewAccessCode,
    onSuccess: (data) => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["estate-community-info"],
      });
      queryClient.invalidateQueries({
        queryKey: ["estate-access-codes"],
      });
      if (data.success && data.message) {
        toast.showToast(data.message, "success");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        toast.showToast(error.response?.data.message, "error");
      }
    },
  });
};

export type AccessCodeStatusFilter = "all" | "active" | "expiring_soon" | "expired";

const getEstateAccessCodes = async (
  estateId: number,
  status: AccessCodeStatusFilter
): Promise<ApiResponse<AccessCode[]>> => {
  const res = await apiClient.get(`/user/estates/${estateId}/security-codes`, {
    params: { status },
  });
  return res.data;
};

export const useEstateAccessCodes = (
  estateId?: number,
  status?: AccessCodeStatusFilter
) => {
  return useQuery({
    queryKey: ["estate-access-codes", estateId, status],
    queryFn: () => getEstateAccessCodes(estateId as number, status as AccessCodeStatusFilter),
    enabled: !!estateId && !!status,
  });
};

export type HouseholdKind = "family" | "staff";

export interface HouseholdMember {
  id: number;
  user_id: number;
  estate_id: number;
  kind: HouseholdKind;
  full_name: string;
  role_label: string;
  phone: string;
  email: string | null;
  profile_picture: string | null;
  created_at: string;
}

export interface HouseholdPayload {
  estate_id: number;
  kind: HouseholdKind;
  full_name: string;
  role_label: string;
  phone: string;
  email?: string;
  profile_picture?: File | null;
}

export interface HouseholdUpdatePayload {
  id: number;
  full_name: string;
  role_label: string;
  phone: string;
  email?: string;
  profile_picture?: File | null;
}

const getHousehold = async (
  estateId: number
): Promise<ApiResponse<HouseholdMember[]>> => {
  const res = await apiClient.get("/user/household", {
    params: { estate_id: estateId },
  });
  return res.data;
};

export const useHousehold = (estateId?: number) => {
  return useQuery({
    queryKey: ["estate-household", estateId],
    queryFn: () => getHousehold(estateId as number),
    enabled: !!estateId,
  });
};

const addHouseholdMember = async (payload: HouseholdPayload) => {
  const form = new FormData();
  form.append("estate_id", String(payload.estate_id));
  form.append("kind", payload.kind);
  form.append("full_name", payload.full_name);
  form.append("role_label", payload.role_label);
  form.append("phone", payload.phone);
  if (payload.email) form.append("email", payload.email);
  if (payload.profile_picture) form.append("profile_picture", payload.profile_picture);
  const res = await apiClient.post("/user/household", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const useAddHouseholdMember = () => {
  const toast = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addHouseholdMember,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["estate-household"] });
      if (data.success && data.message) {
        toast.showToast(data.message, "success");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        toast.showToast(error.response?.data.message, "error");
      }
    },
  });
};

const updateHouseholdMember = async (payload: HouseholdUpdatePayload) => {
  const form = new FormData();
  form.append("full_name", payload.full_name);
  form.append("role_label", payload.role_label);
  form.append("phone", payload.phone);
  if (payload.email) form.append("email", payload.email);
  if (payload.profile_picture) form.append("profile_picture", payload.profile_picture);
  const res = await apiClient.post(`/user/household/${payload.id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const useUpdateHouseholdMember = () => {
  const toast = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateHouseholdMember,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["estate-household"] });
      if (data.success && data.message) {
        toast.showToast(data.message, "success");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        toast.showToast(error.response?.data.message, "error");
      }
    },
  });
};

export interface MarketProduct {
  id: number;
  estate_id: number;
  name: string;
  category: string;
  price: string | number;
  stock: number;
  description: string;
  picture: string | null;
}

export type MarketOrderStatus = "pending" | "processing" | "completed" | "cancelled";

export interface MarketOrder {
  id: number;
  product_id: number;
  estate_id: number;
  product_name: string;
  quantity: number;
  unit_price: string | number;
  total_price: string | number;
  status: MarketOrderStatus;
  created_at: string;
  product?: { picture: string | null; category: string } | null;
}

interface Paged<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
}

const getMarketplaceProducts = async (
  estateId: number
): Promise<ApiResponse<Paged<MarketProduct>>> => {
  const res = await apiClient.get("/marketplace/products", {
    params: { estate_id: estateId, per_page: 24 },
  });
  return res.data;
};

export const useMarketplaceProducts = (estateId?: number) => {
  return useQuery({
    queryKey: ["marketplace-products", estateId],
    queryFn: () => getMarketplaceProducts(estateId as number),
    enabled: !!estateId,
  });
};

const getMarketplaceOrders = async (): Promise<ApiResponse<Paged<MarketOrder>>> => {
  const res = await apiClient.get("/user/marketplace/orders", {
    params: { per_page: 24 },
  });
  return res.data;
};

export const useMarketplaceOrders = (enabled: boolean) => {
  return useQuery({
    queryKey: ["marketplace-orders"],
    queryFn: getMarketplaceOrders,
    enabled,
  });
};

const placeMarketplaceOrder = async (productId: number, quantity: number) => {
  const res = await apiClient.post("/user/marketplace/orders", {
    product_id: productId,
    quantity,
  });
  return res.data;
};

export const usePlaceMarketplaceOrder = () => {
  const toast = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      placeMarketplaceOrder(productId, quantity),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-products"] });
      queryClient.invalidateQueries({ queryKey: ["marketplace-orders"] });
      queryClient.invalidateQueries({ queryKey: ["user-wallet"] });
      if (data.success && data.message) {
        toast.showToast(data.message, "success");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        toast.showToast(error.response?.data.message, "error");
      }
    },
  });
};
//MESSAGING
const getAllConversations = async (id?: number) => {
  const res = await apiClient.get(`/user/estates/conversations/${id}`);
  return res.data;
};
const getMessages = async (channel_id?: string) => {
  const res = await apiClient.get(
    `/user/estates/conversations/${channel_id}/messages`
  );
  return res.data;
};
const getGroupMessages = async (channel_id?: string) => {
  const res = await apiClient.get(`/community/messages/${channel_id}`);
  return res.data;
};
const sendMessage = async (payload: SendMessagePayload) => {
  const res = await apiClient.post(`/user/estates/chat/send`, payload);
  return res.data;
};
const sendGroupMessage = async (payload: SendGroupMessagePayload) => {
  const res = await apiClient.post(`/${payload.estate_id}/community/send`, {
    message: payload.message,
  });
  return res.data;
};
const markAsreadGroup = async (channel_id?: string) => {
  const res = await apiClient.get(`/community/mark-read/${channel_id}`);
  return res.data;
};
export const useGetAllConversations = (id?: number) => {
  return useQuery<ApiResponse<PaginatedResponse<Conversation>>>({
    queryKey: ["user-estate-conversations", id],
    queryFn: () => getAllConversations(id),
    enabled: !!id,
  });
};
export const useGetMessages = (channel_id?: string) => {
  return useQuery<ApiResponse<PaginatedResponse<Message>>>({
    queryKey: ["user-conversations-messages", channel_id],
    queryFn: () => getMessages(channel_id),
    enabled: !!channel_id,
  });
};
export const useGetGroupMessages = (channel_id?: string) => {
  return useQuery<ApiResponse<GroupMessageResponse>>({
    queryKey: ["user-group-messages", channel_id],
    queryFn: () => getGroupMessages(channel_id),
    enabled: !!channel_id,
  });
};
export const useMarkReadGroupMsg = (channel_id?: string) => {
  return useQuery<ApiResponse<GroupMessageResponse>>({
    queryKey: ["user-group-messages-unread", channel_id],
    queryFn: () => markAsreadGroup(channel_id),
    enabled: !!channel_id,
  });
};
export const useSendMessage = () => {
  const toast = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["estate-conversations-messages"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-estate-conversations"],
      });
      if (data.success && data.message) {
        toast.showToast(data.message, "success");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        toast.showToast(error.response?.data.message, "error");
      }
    },
  });
};
export const useSendGroupMessage = () => {
  const toast = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendGroupMessage,
    onSuccess: (data) => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user-group-messages"],
      });
      queryClient.invalidateQueries({
        queryKey: ["estate-community-info"],
      });
      if (data.success && data.message) {
        toast.showToast(data.message, "success");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        toast.showToast(error.response?.data.message, "error");
      }
    },
  });
};
