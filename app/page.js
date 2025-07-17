"use client";

import {
  motion,
} from "framer-motion";
import {
  CheckCircle,
  Star,
  Award, 
  Clock,
  Globe,
} from "lucide-react";
import Header from "./components/Header.js"
import Hero from "./components/Hero.js";
import Image from "next/image.js";
import Features from "./components/Features.js";
import TradingHighlight from "./components/TradingHighlight.js";
import FAQ from "./components/Faq.js";

const Home = () => {

  const whyChooseReasons = [
    {
      icon: <Award className="w-12 h-12" />,
      title: "Industry Leader",
      description: "Trusted by Fortune 500 companies worldwide",
      stat: "500+ Companies",
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "10+ Years Experience",
      description: "Decade of proven success in financial technology",
      stat: "Since 2014",
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global Reach",
      description: "Operating in 50+ countries with local support",
      stat: "50+ Countries",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, FinanceFlow Inc.",
      content:
        "Nextrade transformed our trading operations. The ROI was immediate and substantial.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Investment Director, Capital Ventures",
      content:
        "The most reliable trading platform we've ever used. Exceptional support team.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Whatsapp Floating Button */}
      <a
        href="https://wa.me/123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-2 z-10"
      >
          <Image
            className="filter saturate-150 hover:scale-110 transition-all duration-75 ease-in-out"
            src="/whatsapp-logo.png"
            alt="Whatsapp"
            width={55}
            height={55}
          />
      </a>

      {/* Features Section */}
      <Features />

      {/* Why Choose Nextrade */}
      <section id="why-choose" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Nextrade?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the thousands of traders who trust us with their success
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {whyChooseReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {reason.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-600 mb-4">{reason.description}</p>
                <div className="text-3xl font-bold text-blue-600">
                  {reason.stat}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl text-white"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-lg mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-blue-200">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
          {/* FAQ */}
         <FAQ />

      {/* Trading Highlight */}
      <TradingHighlight />

      {/* Footer */}
      <footer className="bg-[#060314] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <span className="text-2xl font-bold text-white">Nextrade</span>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing trading with AI-powered solutions trusted by
                professionals worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Algorithmic Trading
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Market Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Risk Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Portfolio Optimization
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Nextrade. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
