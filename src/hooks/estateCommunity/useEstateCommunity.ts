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
      // Refetch relevant data if needed
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
