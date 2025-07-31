"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 text-gray-800 px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Heading */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-blue-700">
              About Our Showroom
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Welcome to Zam Zam Motors, your trusted destination for
              buying, selling, and inspecting cars with complete confidence. We
              combine modern technology with traditional trust to deliver the
              best automotive experience.
            </p>
          </div>

          {/* Who we are */}
          <section className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Who We Are
              </h2>
              <p className="text-gray-600">
                Based in Pakistan, we are a team of car enthusiasts and experts
                dedicated to making vehicle buying and selling easier than ever.
                Whether you're looking for a brand new ride or a reliable used
                car, we've got you covered.
              </p>
              <p className="text-gray-600">
                With years of industry experience, a large variety of vehicles,
                and a commitment to transparency, we aim to bring you peace of
                mind — every step of the way.
              </p>
            </div>
            <img
              src="https://images.netdirector.co.uk/gforces-auto/image/upload/w_1920,h_549,q_auto,c_fill,f_auto,fl_lossy/auto-client/104c58512859192373c98148b1fb6c29/lahore_showroom_2.jpg"
              alt="Car Showroom"
              className="w-full max-h-80 object-cover rounded-xl shadow-md"
            />
          </section>

          {/* What we offer */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  Buy & Sell Cars
                </h3>
                <p className="text-gray-600">
                  Browse a wide range of verified vehicles and sell your car at
                  the best price with zero hassle.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  Car Inspection
                </h3>
                <p className="text-gray-600">
                  Our professional inspectors provide detailed car checkups to
                  help you make informed decisions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  Customer Support
                </h3>
                <p className="text-gray-600">
                  We're here to assist you before, during, and after your
                  purchase. Your satisfaction is our top priority.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center mt-10">
            <h2 className="text-2xl font-semibold text-gray-800">
              Visit Us or Browse Online
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Whether you're visiting our physical showroom or browsing online,
              we promise a smooth, transparent, and satisfying experience. Your
              next car is just a click or visit away!
            </p>
            <a
              href="/contact"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-200"
            >
              Contact Us
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
