"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { ...errors };

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    if (!interest.trim()) {
      newErrors.interest = "Please select your interest";
      isValid = false;
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    const payloads = {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      interest,
      message,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloads),
      });

      const data = await res.json(); // Always parse the response

      if (!res.ok) {
        console.error("Server Error:", data); // Log detailed error
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Message sent!", {
        style: {
          border: "1px solid #2dd4bf",
          padding: "12px 16px",
          color: "#fff",
          background: "#1e293b",
        },
        iconTheme: {
          primary: "#2dd4bf",
          secondary: "#fff",
        },
      });
      // Clear form...
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setInterest("");
      setMessage("");
    } catch (error) {
      console.error("Submission Error:", error); // Log full error
      toast.error(
        errors.firstName ||
          errors.lastName ||
          errors.email ||
          errors.phone ||
          errors.interest ||
          errors.message,
        {
          style: {
            border: "1px solid #ef4444",
            padding: "12px 16px",
            color: "#fff",
            background: "#1e293b",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        }
      ); // Show actual error message
    }
    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden"
      style={{ backgroundImage: "url('/contact-img.png')" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Join thousands of successful traders and transform your trading
            experience today
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-blue-900/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-blue-200" />
                  <span className="text-white">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-blue-200" />
                  <span className="text-white">contact@nextrade.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-blue-200" />
                  <span className="text-white">New York, NY 10001</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Why Start Today?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">30-day free trial</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">No setup fees</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">Dedicated support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">Cancel anytime</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-blue-900/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Start Your Free Trial
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setErrors({ ...errors, firstName: "" });
                    }}
                    className={`w-full px-4 py-3 bg-black/10 backdrop-blur-sm border ${
                      errors.firstName ? "border-red-500" : "border-white/30"
                    } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60 transition-all duration-300`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.firstName}
                    </motion.p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setErrors({ ...errors, lastName: "" });
                    }}
                    className={`w-full px-4 py-3 bg-black/10 backdrop-blur-sm border ${
                      errors.lastName ? "border-red-500" : "border-white/30"
                    } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60 transition-all duration-300`}
                    placeholder="Doe"
                  />
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.lastName}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: "" });
                  }}
                  className={`w-full px-4 py-3 bg-black/10 backdrop-blur-sm border ${
                    errors.email ? "border-red-500" : "border-white/30"
                  } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60 transition-all duration-300`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors({ ...errors, phone: "" });
                  }}
                  className={`w-full px-4 py-3 bg-black/10 backdrop-blur-sm border ${
                    errors.phone ? "border-red-500" : "border-white/30"
                  } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60 transition-all duration-300`}
                  placeholder="Enter you phone number"
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Interest
                </label>
                <input
                  type="text"
                  value={interest}
                  onChange={(e) => {
                    setInterest(e.target.value);
                    setErrors({ ...errors, interest: "" });
                  }}
                  className={`w-full px-4 py-3 bg-black/10 backdrop-blur-sm border ${
                    errors.interest ? "border-red-500" : "border-white/30"
                  } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60 transition-all duration-300`}
                  placeholder="Your Interest"
                />
                {errors.interest && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.interest}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setErrors({ ...errors, message: "" });
                  }}
                  className={`w-full px-4 py-3 bg-black/10 backdrop-blur-sm border ${
                    errors.message ? "border-red-500" : "border-white/30"
                  } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60 transition-all duration-300 resize-none`}
                  placeholder="Tell us about your trading goals..."
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                disabled={loading}
                className={`w-full bg-gray text-white cursor-pointer px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/20 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
