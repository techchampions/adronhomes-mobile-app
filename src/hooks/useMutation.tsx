import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import SuccessModal from "../components/SuccessModal";
import apiClient from "../data/apiClient";
import { useModalStore } from "../zustand/useModalStore";
import { useToastStore } from "../zustand/useToastStore";
interface Payload {
  promo_id: number;
  plan_id: number;
  reward_group_id: number;
  property_id: number;
  logic: "AND" | "OR";
  user_note: string;
  items: PayloadItem[];
}
interface PayloadItem {
  item_id: string;
  name: string;
  qty: number;
}

interface Response {
  success: boolean;
  message: string;
  data: {
    user_id: number;
    promo_id: number;
    property_id: number;
    reward_group_id: number;
    user_note: string;
    status: number;
    updated_at: string;
    created_at: string;
    id: number;
  };
}
interface ErrorResponse {
  message: string;
}
export const useMakeGiftRequest = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const { openModal } = useModalStore();

  return useMutation({
    mutationFn: async (payload: Payload): Promise<Response> => {
      const res = await apiClient.post(`/user/promo/request`, payload);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["property-plan-details"],
      });
      showToast(data.message, "success");
      openModal(<SuccessModal text={data.message} />);
    },
    onError(error: AxiosError<ErrorResponse>) {
      const errorMsg = error.response?.data.message || "Request Failed";
      showToast(errorMsg, "error");
    },
  });
};
