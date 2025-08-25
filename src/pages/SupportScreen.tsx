import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const SupportScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full space-y-4">
      <div className=" flex flex-col justify-between items-start bg-white py-7 px-4 md:px-12 rounded-3xl gap-5">
        <div className="space-y-2">
          <p className="text-gray-400 text-sm">Help Line</p>
          <p className="font-bold text-md">+2348051011951 </p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-400 text-sm">Email</p>
          <p className="font-bold text-md">telesales@adronhomes </p>
        </div>
      </div>
      <div className=" flex flex-col md:flex-row gap-3 justify-between md:items-center bg-white py-4 px-4 md:px-12 rounded-3xl">
        <div className="flex flex-col w-full md:w-[60%]">
          <h4 className=" font-bold text-md">Live Chat</h4>
          <p className="text-gray-400 text-xs">
            Have a live chat with one of our support agents in real time to help
            with any difficulties you are going through.{" "}
          </p>
        </div>
        <Button
          label="Start Conversation"
          className="bg-black text-white font-bold !w-[155px] text-xs"
        />
      </div>
      <div className=" flex flex-col md:flex-row gap-3 justify-between md:items-center bg-white py-4 px-4 md:px-12 rounded-3xl">
        <div className="flex flex-col w-full md:w-[60%]">
          <h4 className=" font-bold text-md">FAQ</h4>
          <p className="text-gray-400 text-xs">
            See a list of frequently asked questions from our other clients to
            help make the best investment and understand how we operate.{" "}
          </p>
        </div>
        <Button
          label="See FAQs"
          className="bg-black text-white font-bold !w-[155px] text-xs"
          onClick={() => navigate("/dashboard/faqs")}
        />
      </div>
    </div>
  );
};

export default SupportScreen;
