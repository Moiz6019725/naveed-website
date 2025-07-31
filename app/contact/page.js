"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit the form data (e.g., via API or email)
    alert("Thank you! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[url(https://imrorwxhpjjolr5q-static.micyjz.com/cloud/lqBpiKplloSRjjnnrrjpio/automobile-exhibition-hall.jpg)] px-6 py-16 text-gray-800">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-blue-700">Get in Touch</h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Have questions about a car, want to schedule an inspection, or
              need help with selling your vehicle? We're here to assist you.
              Fill out the form or reach us directly.
            </p>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#ffffff0e] backdrop-blur-md p-8 rounded-2xl shadow-md space-y-6"
          >
            <div>
              <label htmlFor="name" className="block font-medium text-gray-900">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-[#A3ABAF] rounded-lg focus:outline-none"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-900"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-[#A3ABAF] rounded-lg focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-medium text-gray-900"
              >
                Message
              </label>
              <textarea
                name="message"
                required
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-[#A3ABAF] rounded-lg focus:outline-none"
                placeholder="Tell us how we can help..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition-all duration-200"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="text-center space-y-4">
            <p className="text-white">
              Or reach us directly at:{" "}
              <a
                href="mailto:support@yourshowroom.com"
                className="text-blue-600 hover:underline"
              >
                support@yourshowroom.com
              </a>
            </p>
            <p className="text-white">
              Call/WhatsApp:{" "}
              <a
                href="tel:+923001234567"
                className="text-blue-600 hover:underline"
              >
                +92 300 1234567
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
