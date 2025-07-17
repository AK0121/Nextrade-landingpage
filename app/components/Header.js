"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "faq", "highlight", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: "features", label: "Features" },
    { id: "faq", label: "FAQ" },
    { id: "highlight", label: "Highlights" },
  ];
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Nextrade</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Link href="/contact" passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer inline-block text-center"
              >
                Contact Us
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "-100%" }}
            className="md:hidden h-screen w-full bg-gradient-to-b from-white to-blue-100 absolute top-[4.1rem] left-0 z-50"
          >
            <div className="flex flex-col items-center gap-4 py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full py-2 text-gray-700 hover:text-blue-600 cursor-pointer text-2xl"
                >
                  {item.label}
                </button>
              ))}
              <Link
                href="/contact"
                className="w-7/12 mx-auto text-center bg-blue-600 text-white text-xl p-4 rounded-lg mt-4 cursor-pointer"
              >
                Contact Us
              </Link>
              <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/nav-image.svg"
                  alt="Nav Image"
                  width={200}
                  height={200}
                  className="w-10/12 mx-auto mt-24"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
