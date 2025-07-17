"use client";

import { motion } from "framer-motion";
import StockChart from "./StockChart";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "./ui/MovingBorder";
import Link from "next/link";

export default function Hero() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section id="hero" className="relative pt-16 pb-20 overflow-hidden">
      <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/10" />

      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center justify-center min-h-screen">
          {/* Text Content - Centered at top */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center max-w-4xl gap-2"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-blue-700 capitalize">
                Trade smart grow fast
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight capitalize">
              <span className="text-gray-900">Trade with low brokerage</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                and 1000X margin
              </span>
            </h1>

            <h2 className="text-6xl text-indigo-950 font-medium leading-relaxed">
              <Typewriter
                words={["US Stocks", "Bitcoin", "Crypto", "Forex"]}
                loop={0}
                cursor={true}
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mt-7">
              <Link href="/contact">
                <Button
                  borderRadius="1.75rem"
                  className="bg-[#020b1e] text-xl cursor-pointer text-white border-neutral-200 hover:scale-105 transition-all duration-75 ease-in"
                >
                  Get Started
                  <ArrowRight className="pl-1.5 pt-0.5 text-xl" />
                </Button>
              </Link>
              <Button
                whiletap={{ scale: 0.95 }}
                onClick={() => scrollToSection("features")}
                borderRadius="1.75rem"
                className="bg-blue-50 text-black border-neutral-200 text-xl cursor-pointer hover:scale-105 transition-all duration-75 ease-in"
              >
                Why Nextrade?
              </Button>
            </div>
          </motion.div>

          {/* Chart Section - Centered below with gap */}
          <div className="w-full mx-auto mt-12">
            <StockChart />
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </motion.div>
    </section>
  );
}
