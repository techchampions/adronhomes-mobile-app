import Button from "./Button";
import { useModalStore } from "../zustand/useModalStore";
import { useToastStore } from "../zustand/useToastStore";

const Confirmation = () => {
  const { closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const confirm = () => {
    closeModal();
    showToast("Password changed successfully", "success");
  };
  return (
    <div className="flex flex-col gap-20 text-center p-5">
      <p>Are you sure</p>
      <div className="flex w-full justify-center gap-4">
        <Button
          label="No, cancel"
          className="!w-fit px-6 text-xs bg-transparent !text-red-500"
          onClick={closeModal}
        />
        <Button
          label="Yes, confirm"
          className="!w-fit px-6 bg-adron-black text-xs"
          onClick={confirm}
        />
      </div>
    </div>
  );
};

export default Confirmation;
