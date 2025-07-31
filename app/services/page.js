"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Services = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 text-gray-800 px-6 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-blue-700">Our Services</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At Zam Zam Motors, we offer a complete set of automotive services
              designed to provide a smooth, secure, and satisfying car buying
              and selling experience.
            </p>
          </div>

          {/* Services Grid */}
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Buy a Car
              </h2>
              <p className="text-gray-600">
                Explore a wide selection of new and used vehicles. Every car is
                quality-checked and priced competitively for your satisfaction.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Sell Your Car
              </h2>
              <p className="text-gray-600">
                Get the best value for your vehicle through our hassle-free
                selling process. Instant evaluation, secure transaction, no
                hidden fees.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Car Inspection
              </h2>
              <p className="text-gray-600">
                Let our trained technicians perform a detailed inspection so you
                can buy or sell with full confidence.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Financing Options
              </h2>
              <p className="text-gray-600">
                We provide flexible car financing and installment plans in
                partnership with leading banks to make car ownership easier for
                you.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                After-Sales Support
              </h2>
              <p className="text-gray-600">
                Enjoy dedicated customer support, documentation help, and
                transfer assistance even after the deal is done.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Car Verification
              </h2>
              <p className="text-gray-600">
                We help you verify registration, ownership, and legal status of
                any vehicle using government-backed verification tools.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold text-gray-800">
              Need Help Choosing the Right Service?
            </h2>
            <p className="text-gray-600 mt-2">
              Reach out to our expert team and let us guide you through the
              process.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Services;
