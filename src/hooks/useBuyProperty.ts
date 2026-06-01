import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { InitiatePropertyPurchaseResponse } from "../data/api";
import apiClient from "../data/apiClient";
import { useToastStore } from "./../zustand/useToastStore";
export const buyProperty = async (
  payload: Partial<BuyPropertyPayload>
): Promise<InitiatePropertyPurchaseResponse> => {
  const response = await apiClient.post("/user/buy-property", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const subscribe = async (payload: Partial<GuestSubscribePayload>) => {
  const response = await apiClient.post("/subscribe", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const useBuyProperty = () => {
  const toast = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: buyProperty,
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
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        toast.showToast(error.response?.data.message, "error");
      }
    },
  });
};
export const useSubscribe = () => {
  const toast = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: subscribe,
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
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        toast.showToast(error.response?.data.message, "error");
      }
    },
  });
};
