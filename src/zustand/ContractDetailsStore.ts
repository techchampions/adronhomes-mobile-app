import { create } from "zustand";

type ContractDeatilStore = {
  contract_business_type: string;
  contract_subscriber_name_1: string;
  contract_subscriber_name_2: string;
  contract_subscriber_name_3: string;
  contract_additional_name: string;
  contract_marital_status: string;
  contract_gender: string;
  contract_date_of_birth: string;
  contract_nationality: string;
  contract_residential_address: string;
  contract_town: string;
  contract_state: string;
  contract_country: string;
  contract_email: string;
  contract_sms: string;
  contract_employer_address: string;
  contract_occupation: string;
  contract_employer: string;
  contract_next_of_kin_phone: string;
  contract_next_of_kin_address: string;
  contract_next_of_kin: string;
  contract_next_of_kin_relationship: string;
  contract_profile_picture: File | null;
  contract_profile_picture2: File | null;
  contract_idFiles: File[] | null;
  setContractDetails: (
    details: Partial<
      Omit<ContractDeatilStore, "setContractDetails" | "resetContractDetails">
    >
  ) => void;
  resetContractDetails: () => void;
};

export const useContractDeatilStore = create<ContractDeatilStore>((set) => ({
  contract_business_type: "",
  contract_subscriber_name_1: "",
  contract_subscriber_name_2: "",
  contract_subscriber_name_3: "",
  contract_additional_name: "",
  contract_marital_status: "",
  contract_gender: "",
  contract_date_of_birth: "",
  contract_nationality: "",
  contract_residential_address: "",
  contract_town: "",
  contract_state: "",
  contract_country: "",
  contract_email: "",
  contract_sms: "",
  contract_employer_address: "",
  contract_occupation: "",
  contract_employer: "",
  contract_next_of_kin_phone: "",
  contract_next_of_kin_address: "",
  contract_next_of_kin: "",
  contract_next_of_kin_relationship: "",
  contract_profile_picture: null,
  contract_profile_picture2: null,
  contract_idFiles: null,

  setContractDetails: (details) => set((state) => ({ ...state, ...details })),

  resetContractDetails: () =>
    set({
      contract_business_type: "",
      contract_subscriber_name_1: "",
      contract_subscriber_name_2: "",
      contract_subscriber_name_3: "",
      contract_additional_name: "",
      contract_marital_status: "",
      contract_gender: "",
      contract_date_of_birth: "",
      contract_nationality: "",
      contract_residential_address: "",
      contract_town: "",
      contract_state: "",
      contract_country: "",
      contract_email: "",
      contract_sms: "",
      contract_employer_address: "",
      contract_occupation: "",
      contract_employer: "",
      contract_next_of_kin_phone: "",
      contract_next_of_kin_address: "",
      contract_next_of_kin: "",
      contract_next_of_kin_relationship: "",
      contract_profile_picture: null,
      contract_profile_picture2: null,
      contract_idFiles: null,
    }),
}));
