"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    setIsSubmitting(true);
    let request = await fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
    });
    setIsSubmitting(false);
    let res = await request.json();
    if (res.status === 200) {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } else {
      toast.error(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }

    e.target.reset();
  };
  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(".loginBox", {
      y: -200,
      opacity: 0,
      duration: 1,
    });
    tl.from(
      ".child1",
      {
        opacity: 0,
        duration: 1,
      },
      "anim"
    );
    tl.from(
      ".child2",
      {
        x: 200,
        ease: "elastic.inOut",
        duration: 1,
      },
      "anim"
    );
  });

  return (
    <>
      <ToastContainer />
      <div className="loginBox flex w-7/12 h-[70vh] max-[580px]:flex-col max-[580px]:h-[90%] max-[580px]:w-11/12 overflow-hidden bg-[#d8d6d646] shadow-2xl rounded-2xl backdrop-blur-md border border-gray-200">
        <div className="child1 w-full grow">
          <img
            className="h-full w-full object-cover"
            src="../logo.png"
            alt=""
          />
        </div>
        <div className="child2 w-full grow">
          <form
            method="POST"
            onSubmit={handleSubmit}
            className="rounded-xl p-4 shadow-2xl font-sora h-full w-full"
          >
            <h1 className="text-center font-bold text-3xl my-4">Admin Login</h1>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Username<span className="text-red-700">*</span>
              </label>
              <input
                type="username"
                name="username"
                className="bg-gray-50 border outline-orange-600 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Please enter here your username"
                required
              />
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Your password<span className="text-red-700">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                name="password"
                placeholder="Please enter your password"
                className="bg-gray-50 border outline-orange-600 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
              <button
                className="absolute right-2 bottom-1.5"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                ></i>
              </button>
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  name="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded-sm"
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-500"
              >
                Remember me
              </label>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-black text-white rounded-lg px-4 py-2 w-full block cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
