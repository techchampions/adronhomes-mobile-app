import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useMakeGiftRequest } from "../../hooks/useMutation";
import { useModalStore } from "../../zustand/useModalStore";
import Button from "../Button";
import CheckboxGroup from "../CheckboxGroup";
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
  };
  const validationSchema = Yup.object().shape({
    reward_group: Yup.string().required("Reward group is required"),
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
        user_note:
          values.user_note ||
          "I am buying this properties and I am interested in the gift",
      };
      mutate(payload);
    }
  };
  return (
    <div className="w-sm max-w-sm">
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

          return (
            <Form className="space-y-6">
              <div className="text-3xl font-adron-bold">Claim your gifts</div>
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
                  type="textarea"
                  rows={2}
                  className="rounded-xl"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={closeModal}
                  label="Cancel"
                  className="bg-gray-700 hover:bg-black"
                />

                <Button
                  label="Submit"
                  type="submit"
                  className="col-span-2"
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
