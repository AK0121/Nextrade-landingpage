"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { TrendingUp, Zap, Eye, Brain, Target, BarChart3 } from "lucide-react";
import Link from "next/link";

const TradingHighlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 100]),
    springConfig
  );
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -100]),
    springConfig
  );

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    <section className="relative min-h-screen pt-10 bg-gray-950 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: yBackground }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-green-500/10 rounded-full blur-2xl"></div>
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full blur-sm"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-32 w-3 h-3 bg-green-400 rounded-full blur-sm"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-32 left-40 w-2 h-2 bg-purple-400 rounded-full blur-sm"
        animate={{
          y: [0, -10, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">

        {/* Main Heading */}
        <motion.h2
          className="text-5xl text-center sm:text-6xl lg:text-7xl font-bold leading-tight"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="block text-white">See the Market</span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            Like a Pro
          </span>
        </motion.h2>
        <div className="min-h-screen pt-5 flex flex-col-reverse lg:flex-row items-center gap-16">
          {/* Text Content */}
          <motion.div
            className="w-full lg:w-1/2 text-white space-y-8"
            style={{ y: yContent }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium"
            >
              <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
              PROFESSIONAL TRADING INTERFACE
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-300 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Dive into crystal-clear visuals of real-time trading trends,
              backed by powerful AI insights. Whether you're a seasoned trader
              or just starting out, Nextrade helps you spot opportunities fast.
            </motion.p>

            {/* Feature Highlights */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${highlight.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                  >
                    {highlight.icon}
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {highlight.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Try it now
            </Link>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            style={{ y: yImage }}
          >
            <div className="relative">
              {/* Glowing border effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-3xl blur-2xl opacity-60"></div>

              {/* Main image container */}
              <motion.div
                className="relative rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl backdrop-blur-sm"
                style={{
                  rotateX: mousePosition.y * 2,
                  rotateY: mousePosition.x * 2,
                  scale: scale,
                }}
                whileHover={{
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.02,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 z-10"></div>

                {/* Scanning line effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent z-20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <Image
                  src="/trading-img.png"
                  alt="Professional trading interface with real-time data"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </motion.div>

              {/* Floating data points */}
              <motion.div
                className="absolute -top-4 -left-4 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg px-3 py-2 text-green-400 text-sm font-bold"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                +24.7%
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TradingHighlight;
