import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "../utils/constants";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-sm font-medium mb-3 uppercase tracking-wider">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Common questions
          </h2>
          <p className="text-gray-400 text-base">
            Everything you need to know about DevExchange
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`bg-gray-900/50 border rounded-xl overflow-hidden transition-all duration-200 ${
                openIndex === index ? "border-blue-500/30" : "border-white/[0.06]"
              }`}
            >
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-sm font-medium text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex-shrink-0 transition-colors ${
                    openIndex === index ? "text-blue-400" : "text-gray-500"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
