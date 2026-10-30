import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "../../data/apiClient";
import { useToastStore } from "../../zustand/useToastStore";

export type TicketStatus = "open" | "closed";
export type TicketAuthorRole = "customer" | "support";

export interface TicketAuthor {
  id: number;
  first_name: string;
  last_name: string;
}

export interface TicketMessage {
  id: number;
  body: string;
  author_role: TicketAuthorRole;
  created_at: string;
  author?: TicketAuthor | null;
}

export interface SupportTicket {
  id: number;
  subject: string;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
  messages?: TicketMessage[];
  latest_message?: TicketMessage | null;
}

const listTickets = async (): Promise<ApiResponse<SupportTicket[]>> => {
  const res = await apiClient.get("/user/support-tickets");
  return res.data;
};

const getTicket = async (id: number): Promise<ApiResponse<SupportTicket>> => {
  const res = await apiClient.get(`/user/support-tickets/${id}`);
  return res.data;
};

export const useSupportTickets = () => {
  return useQuery({
    queryKey: ["support-tickets"],
    queryFn: listTickets,
  });
};

export const useSupportTicket = (id?: number) => {
  return useQuery({
    queryKey: ["support-ticket", id],
    queryFn: () => getTicket(id as number),
    enabled: !!id,
  });
};

function useTicketMutation<T>(mutationFn: (payload: T) => Promise<ApiResponse<SupportTicket>>) {
  const toast = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
      if (data.data?.id) {
        queryClient.invalidateQueries({ queryKey: ["support-ticket", data.data.id] });
      }
      if (data.success && data.message) toast.showToast(data.message, "success");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.message) {
        toast.showToast(error.response.data.message, "error");
      }
    },
  });
}

export const useCreateSupportTicket = () => {
  return useTicketMutation((payload: { subject: string; message: string }) =>
    apiClient.post("/user/support-tickets", payload).then((res) => res.data)
  );
};

export const useReplySupportTicket = () => {
  return useTicketMutation((payload: { id: number; message: string }) =>
    apiClient
      .post(`/user/support-tickets/${payload.id}/replies`, { message: payload.message })
      .then((res) => res.data)
  );
};
