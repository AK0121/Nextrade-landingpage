"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, Shield, Clock } from "lucide-react";
import { ColourfulText } from "./ui/ColourfulText";
import Link from "next/link";

const ResultsSection = () => {
  const results = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Zero Brokerage = 100% Profit",
      description:
        "Keep every penny you earn. No hidden fees, no commissions, just pure profit in your pocket.",
      highlight: "Save ₹50,000+ annually",
      color: "from-green-400 to-green-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Execution",
      description:
        "Execute trades in milliseconds. Never miss a profitable opportunity again.",
      highlight: "0.02s execution time",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description:
        "Your money and data are protected with military-grade encryption and security protocols.",
      highlight: "99.9% uptime guarantee",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Trade 24/7 Anywhere",
      description:
        "Never miss the market. Trade from your phone, tablet, or desktop - anytime, anywhere.",
      highlight: "Available on all devices",
      color: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-900 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            ZERO BROKERAGE TRADING
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Enjoy Maximum Profits with
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <ColourfulText text="ZERO BROKERAGE" />
          </h1>

          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Trade like a boss, anywhere, anytime - no brokerage fees, no
            strings!
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative"
            >
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-blue-200/50 h-full">
                {/* Icon with gradient background */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${result.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {result.icon}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-center text-gray-900 group-hover:text-blue-600 transition-colors">
                    {result.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-center">
                    {result.description}
                  </p>

                  {/* Highlight badge */}
                  <h4
                    className={`flex w-52 lg:w-80 mx-auto items-center text-center justify-center bg-gradient-to-r ${result.color} text-white px-4 py-2 rounded-full text-sm font-medium`}
                  >
                    {result.highlight}
                  </h4>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 rounded-2xl transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-b from-blue-600 to-blue-900 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Maximize Your Profits?
            </h3>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of traders who&apos;ve already switched to zero
              brokerage trading
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
