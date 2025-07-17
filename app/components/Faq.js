"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Shield,
  TrendingUp,
  CreditCard,
  Clock,
} from "lucide-react";
import Image from "next/image";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How secure are my investments with Nextrade?",
      answer:
        "Nextrade employs bank-grade security protocols with 256-bit SSL encryption, multi-factor authentication, and segregated client accounts. Your funds are protected by regulatory compliance and our comprehensive insurance coverage, ensuring your investment journey remains secure at every step.",
      icon: Shield,
      gradient: "from-blue-500 to-slate-900",
    },
    {
      question: "What does zero brokerage really mean?",
      answer:
        "Zero brokerage means no hidden fees, no commission charges, and no percentage cuts from your profits. Nextrade revolutionizes trading by eliminating traditional brokerage costs, allowing you to keep 100% of your gains and maximize your investment potential.",
      icon: TrendingUp,
      gradient: "from-blue-600 to-blue-900",
    },
    {
      question: "How do the 500x margin facilities work?",
      answer:
        "Our advanced margin system provides leverage up to 500x, amplifying your trading power while maintaining strict risk management protocols. This means you can control larger positions with smaller capital, potentially maximizing returns while our sophisticated algorithms help manage exposure.",
      icon: CreditCard,
      gradient: "from-slate-700 to-slate-900",
    },
    {
      question: "Is 24/7 deposit and withdrawal really available?",
      answer:
        "Absolutely. Our automated processing system operates around the clock, 365 days a year. Whether it's midnight or weekend, you have instant access to deposit funds or withdraw profits. Our real-time settlement system ensures your financial freedom is never constrained by time.",
      icon: Clock,
      gradient: "from-blue-700 to-slate-800",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden">
      {/* Blurred Background Pulses */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-slate-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-100/30 to-blue-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get answers to common questions about Nextrade's revolutionary
            trading platform
          </p>
        </motion.div>

        {/* Main Row: FAQs + Image */}
        <div className="flex flex-col lg:flex-row gap-10 items-start max-w-7xl mx-auto">
          {/* Image Section */}
          <div className="flex-1 flex justify-center lg:justify-end w-full min-h-[500px]">
            <Image
              src="/faq-img.svg"
              alt="faq-img"
              width={100}
              height={100}
              className="w-full max-w-sm lg:max-w-[40rem] object-contain"
            />
          </div>

          {/* FAQs Section */}
          <div className="flex-1 space-y-6 w-full">
            {faqs.map((faq, index) => {
              const IconComponent = faq.icon;
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <div
                    onClick={() => toggleFAQ(index)}
                    className={`relative bg-white backdrop-blur-sm cursor-pointer border border-slate-200 rounded-2xl overflow-hidden transition-all duration-500 hover:border-blue-300 shadow-lg hover:shadow-xl ${
                      isOpen ? "border-blue-400 shadow-xl" : ""
                    }`}
                  >
                    {/* Gradient Border Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${
                        faq.gradient
                      } opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
                        isOpen ? "opacity-5" : ""
                      }`}
                    ></div>

                    <button className="w-full p-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-inset">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${faq.gradient} bg-opacity-10`}
                          style={{ pointerEvents: "none" }}
                        >
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="faq-content"
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          exit={{ opacity: 0, scaleY: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="origin-top overflow-hidden px-6 pb-6 pl-20"
                        >
                          <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className="text-slate-700 leading-relaxed text-lg"
                          >
                            {faq.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 text-lg mb-6">
            Still have questions? Our support team is here to help.
          </p>
          <a
            href="#"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-slate-900 text-white font-semibold rounded-full hover:from-blue-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
