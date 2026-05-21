"use client";

import React, { useState } from "react";
import { FiMail, FiPhone, FiUser, FiMessageCircle, FiStar, FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";

const ContactFeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    feedback: "",
    rating: 0,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Valid email is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Message is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "", feedback: "", rating: 0 });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleRating = (rate) => {
    setFormData((prev) => ({ ...prev, rating: rate }));
  };

  return (
    <div className="min-h-[30vh] bg-gradient-to-br from-[#fcfcfc] via-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase mb-3 animate-fade-in">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-900">
              Touch
            </span>
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto text-base font-medium">
            Have questions or want to share your facility experience? We'd love to hear from you. Drop us a message anytime!
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 animate-slide-down">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <FiCheck size={18} className="text-white" />
            </div>
            <div>
              <p className="text-green-800 font-semibold">Message sent successfully!</p>
              <p className="text-green-700 text-sm">We'll get back to you soon.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 animate-slide-down">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <FiAlertCircle size={18} className="text-white" />
            </div>
            <div>
              <p className="text-red-800 font-semibold">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            {/* Contact Card */}
            <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Contact Info
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">Email</p>
                    <a href="mailto:support@turfcraft.com" className="text-sm font-semibold hover:text-blue-300 transition">
                      support@turfcraft.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FiPhone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-green-200 uppercase tracking-wider font-bold">Phone</p>
                    <a href="tel:+8801322699296" className="text-sm font-semibold hover:text-green-300 transition">
                      +880 132 2699296
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold mb-4 text-slate-900 flex items-center gap-2">
                <FiMessageCircle size={20} className="text-blue-600" />
                Operating Hours
              </h3>

              <ul className="space-y-3">
                <li className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Mon - Fri</span>
                  <span className="text-slate-900 font-bold bg-blue-100 px-3 py-1 rounded-lg text-sm">
                    09:00 - 20:00
                  </span>
                </li>
                <li className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Saturday</span>
                  <span className="text-slate-900 font-bold bg-green-100 px-3 py-1 rounded-lg text-sm">
                    10:00 - 17:00
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Sunday</span>
                  <span className="text-white font-bold bg-red-500 px-3 py-1 rounded-lg text-sm">
                    Closed
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1">
                    <span className="text-red-500">*</span> Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-600 transition">
                      <FiUser size={18} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-500 focus:bg-white text-sm font-medium transition"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1">
                    <span className="text-red-500">*</span> Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-600 transition">
                      <FiMail size={18} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-500 focus:bg-white text-sm font-medium transition"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1">
                    <span className="text-red-500">*</span> Phone
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-600 transition">
                      <FiPhone size={18} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+880..."
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-500 focus:bg-white text-sm font-medium transition"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1">
                    <span className="text-red-500">*</span> Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Tell us what's on your mind..."
                    className="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-500 focus:bg-white text-sm font-medium resize-none transition"
                  ></textarea>
                </div>

                {/* Feedback Textarea */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-700">Your Experience</label>
                  <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Share your feedback or suggestions..."
                    className="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-500 focus:bg-white text-sm font-medium resize-none transition"
                  ></textarea>
                </div>

                {/* Rating System */}
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-2">
                    <FiStar size={16} />
                    Rate Your Experience
                  </label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        className={`w-12 h-12 rounded-xl font-bold text-lg transition-all transform hover:scale-110 ${
                          formData.rating >= star
                            ? "bg-yellow-400 text-white shadow-lg"
                            : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        }`}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full h-13 ${
                      loading
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-xl hover:shadow-blue-500/30"
                    } text-white rounded-2xl text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactFeedbackPage;