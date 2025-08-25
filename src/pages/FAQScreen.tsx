import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useGetFAQs } from "../data/hooks";
import SmallLoader from "../components/SmallLoader";
import ApiErrorBlock from "../components/ApiErrorBlock";

const FAQAccordion = () => {
  const { data, isError, isLoading } = useGetFAQs();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  if (isLoading) {
    return <SmallLoader />;
  }
  if (isError) {
    return <ApiErrorBlock />;
  }

  const faqData = data?.data || [];
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-6 rounded-3xl mx-auto divide-y divide-gray-300">
      <div className="">
        <div className="flex gap-1 items-center mb-4">
          <div className="h-8 w-1 bg-orange-500"></div>
          <h4 className="text-lg font-semibold text-gray-800">FAQs</h4>
        </div>
        <h4 className="text-3xl text-gray-900 mb-10">
          Answers to your common questions
        </h4>
      </div>
      <div className="divide-y divide-gray-300">
        {faqData.map((faq, index) => (
          <div key={index} className="py-4">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center py-3 text-left focus:outline-none"
            >
              <span
                className={`font-semibold ${
                  openIndex === index ? "text-green-600" : "text-gray-800"
                }`}
              >
                {faq.question}
              </span>
              {openIndex === index ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Plus className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {openIndex === index && (
              <div className="py-2 text-gray-700 text-sm">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
