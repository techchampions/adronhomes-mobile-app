import { Form, Formik } from "formik";
import { Info, Store } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { STATES } from "../../data/constants";
import { useGetPickupStation } from "../../data/hooks";
import { useMakeGiftRequest } from "../../hooks/useMutation";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import CheckboxGroup from "../CheckboxGroup";
import { VendorListSkeleton } from "../CommunityDashboardtwo/Skeletons";
import InputField from "../InputField";
import RadioGroup from "../RadioGroup";
import SelectFieldInput from "../SelectFieldInput";
interface Prop {
  gift: EligibleGift;
  property_id: number;
  plan_id?: number;
}
const ClaimGift: React.FC<Prop> = ({ gift, property_id, plan_id }) => {
  const { closeModal } = useModalStore();
  const { mutate, isPending } = useMakeGiftRequest();
  const initialValues = {
    reward_group: "",
    user_note:
      "I have bought this property and I am interested in collecting my gifts.",
    gift: "",
    gifts: [] as string[],
    state: "",
    pickup_location: "",
  };
  const validationSchema = Yup.object().shape({
    reward_group: Yup.string().required("Reward group is required"),
    state: Yup.string().required("Select your state"),
    pickup_location: Yup.string().required("Select preferred pickup station"),
    gift: Yup.string().when("reward_group", (reward_group, schema) => {
      const selectedGroup = gift.reward_groups.find(
        (item) => Number(reward_group) === item.id
      );
      if (selectedGroup?.logic === "OR") {
        return schema.required("Please select a gift");
      }
      return schema.notRequired();
    }),
  });
  // Helper function to format items for payload
  const formatItemsForPayload = (items: RewardItem[]) => {
    return items.map(({ item_name, qty, item_id }) => ({
      name: item_name,
      qty,
      item_id,
    }));
  };
  const reward_group_option = gift.reward_groups.map((item) => ({
    value: item.id,
    label: `Reward group ${item.id}`,
  }));
  const handleSubmit = (values: typeof initialValues) => {
    const selected_reward_group = gift.reward_groups.find(
      (item) => Number(values.reward_group) === item.id
    );
    if (selected_reward_group && plan_id) {
      let items: RewardItem[] = [];
      if (selected_reward_group.logic === "AND") {
        // FIXED: Map through selected interests and find matching items
        items = values.gifts
          .map((selected_gift_id) => {
            return selected_reward_group.items.find(
              (i) => i.item_id === selected_gift_id
            );
          })
          .filter((item): item is RewardItem => item !== undefined); // Filter out undefined
      }
      if (selected_reward_group.logic === "OR") {
        items = selected_reward_group.items.filter(
          (i) => i.item_id === values.gift
        );
      }

      const payload = {
        promo_id: gift.promo_id,
        plan_id: plan_id,
        reward_group_id: selected_reward_group?.id,
        property_id: property_id,
        logic: selected_reward_group.logic,
        items: formatItemsForPayload(items),
        vendor_id: Number(values.pickup_location),
        user_note:
          values.user_note ||
          "I am buying this properties and I am interested in the gift",
      };
      mutate(payload);
    }
  };
  return (
    <div className="w-sm sm:w-2xl max-w-2xl max-h-[75vh] overflow-y-auto scrollbar-hide">
      <Formik
        initialValues={initialValues}
        validateOnMount
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isValid }) => {
          const selected_reward_group = gift.reward_groups.find(
            (item) => Number(values.reward_group) === item.id
          );
          const gift_options = selected_reward_group?.items.map((item) => ({
            value: String(item.item_id),
            label: `${item.qty} ${item.item_name}`,
          }));
          const { data, isLoading } = useGetPickupStation(values.state);
          const pickup_stations = data?.data || [];
          const options = pickup_stations.map((item) => ({
            value: item.id,
            label: ` ${item.address}, ${item.state} state - ${item.name} (${item.phone})`,
          }));

          return (
            <Form className="space-y-6">
              <div className="text-3xl font-adron-bold">Claim your gifts</div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <SelectFieldInput
                    options={reward_group_option}
                    label="Select Reward Group"
                    name="reward_group"
                    placeholder="Select Reward Group"
                  />
                  {selected_reward_group?.logic === "OR" && gift_options && (
                    <RadioGroup
                      options={gift_options}
                      name="gift"
                      label="Select a single Gift"
                    />
                  )}
                  {selected_reward_group?.logic === "AND" && gift_options && (
                    <CheckboxGroup
                      name="gifts"
                      label="Select your Gifts"
                      options={gift_options}
                      defaultSelectAll
                    />
                  )}
                  <InputField
                    name="user_note"
                    placeholder="Note"
                    label="Note to vendor"
                    type="textarea"
                    rows={2}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-4 border border-gray-200 rounded-lg p-2">
                  <div className="text-xl text-gray-700 font-adron-bold flex gap-1 border-b border-gray-200 p-1">
                    <Store />
                    Select Pickup Station
                  </div>
                  <SelectFieldInput
                    options={STATES}
                    name="state"
                    label="Select your state"
                  />
                  {isLoading ? (
                    <VendorListSkeleton />
                  ) : options.length < 1 ? (
                    <div className="flex flex-col text-gray-500 items-center gap-1 text-sm border border-gray-200 p-4 rounded-md">
                      <Info />
                      <div className="">No Pickup station in this State</div>
                    </div>
                  ) : (
                    <RadioGroup
                      options={options}
                      name="pickup_location"
                      label="Select preferred pickup stattion:"
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={closeModal}
                  label="Cancel"
                  className="bg-gray-700 hover:bg-black rounded-lg"
                />

                <Button
                  label="Submit"
                  type="submit"
                  className="col-span-2 rounded-lg"
                  isLoading={isPending}
                  loadingText="Requesting..."
                  disabled={isPending || !isValid}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ClaimGift;
