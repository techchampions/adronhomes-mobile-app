import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useGetFAQs } from "../data/hooks";
import SmallLoader from "../components/SmallLoader";
import ApiErrorBlock from "../components/ApiErrorBlock";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl mx-auto w-full max-w-3xl shadow-sm divide-y divide-gray-200">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-4">
          <div className="h-8 w-1 bg-orange-500 rounded-full" />
          <h4 className="text-base sm:text-lg font-semibold text-gray-800 tracking-tight">
            FAQs
          </h4>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          Answers to Your Common Questions
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {faqData.map((faq, index) => (
          <div key={index} className="py-3 sm:py-4">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center py-2 sm:py-3 text-left focus:outline-none focus:ring-2 focus:ring-orange-200 rounded-lg transition-all"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span
                className={`text-sm sm:text-base md:text-lg font-semibold transition-colors ${
                  openIndex === index ? "text-orange-600" : "text-gray-800"
                }`}
              >
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {openIndex === index ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                ) : (
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                )}
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="py-2 sm:py-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;