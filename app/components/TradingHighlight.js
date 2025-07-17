"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { TrendingUp, Zap, Eye, Brain, Target, BarChart3 } from "lucide-react";
import Link from "next/link";

const TradingHighlight = () => {
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const highlights = [
    {
      icon: <Eye className="w-5 h-5" />,
      text: "Real-time market visualization",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      text: "AI-powered trading insights",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: "Precision entry/exit signals",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      text: "Advanced analytics dashboard",
      color: "from-orange-400 to-red-400",
    },
  ];

  return (
    <section id="highlight" className="relative py-20 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        {/* Heading */}
        <motion.h2
          className="text-4xl text-center sm:text-5xl lg:text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="block text-white">See the Market</span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            Like a Pro
          </span>
        </motion.h2>

        <div className="pt-12 flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Text */}
          <motion.div
            className="w-full lg:w-1/2 text-white space-y-8"
            style={{ y: yContent }}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
              PROFESSIONAL TRADING INTERFACE
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              Dive into crystal-clear visuals of real-time trading trends with powerful AI insights. Nextrade helps you spot opportunities fast — whether you're a seasoned trader or just starting out.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${highlight.color} flex items-center justify-center text-white`}
                  >
                    {highlight.icon}
                  </div>
                  <span className="text-gray-300">{highlight.text}</span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-base hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
            >
              <Zap className="w-5 h-5 mr-2" />
              Try it now
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            className="w-full lg:w-1/2"
            style={{ y: yImage }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl backdrop-blur-sm">
              <Image
                src="/trading-img.png"
                alt="Professional trading interface with real-time data"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TradingHighlight;
