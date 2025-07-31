"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropDown, setshowDropDown] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const sideBarRef = useRef();
  const pathname = usePathname();
  const linkClasses = (path) =>
    `block py-2 px-3 rounded-sm md:p-0 font-semibold ${
      pathname === path
        ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
    }`;

  return (
    <nav className="shadow-lg sticky top-0 bg-white z-10">
      <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/logo-transparent.png"
            height={32}
            width={82}
            alt="Flowbite Logo"
          />
        </Link>
        <button
          onClick={() => {
            const newValue = !showSideBar;
            setShowSideBar(newValue);

            if (sideBarRef.current) {
              sideBarRef.current.style.display = newValue ? "block" : "none";
            }
          }}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link href="/" className={linkClasses("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={linkClasses("/about")}>
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className={linkClasses("/services")}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className={linkClasses("/contact")}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {session && (
          <div className="hidden md:block relative text-left">
            <button
              onClick={() => {
                setshowDropDown(!showDropDown);
              }}
              id="dropdownDefaultButton"
              type="button"
              className="flex cursor-pointer items-center relative"
            >
              <img
                className="rounded-full"
                src={session.user.image}
                width={44}
                alt=""
              />
              <div className="p-1 bg-[#111] rounded-full absolute bottom-[-2px] right-0">
                <svg
                  className="w-2 h-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>
            </button>

            {/* DROPDOWN MENU */}
            <div
              id="dropdown"
              className={`z-10 ${
                showDropDown ? "" : "hidden"
              } absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {session.user.name}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${session.user.name}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {!session && (
          <button
            onClick={() => {
              signIn("google");
            }}
            type="button"
            className="hidden md:block cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Login with google
          </button>
        )}
      </div>
      {/* Sidebar Backdrop */}
      {showSideBar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setShowSideBar(false)}
        ></div>
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm z-20 bg-white backdrop-blur-lg shadow-2xl rounded-l-2xl transition-transform duration-300 ease-in-out md:hidden ${
          showSideBar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button
            onClick={() => setShowSideBar(false)}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold transition-all duration-200"
          >
            &times;
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-3 px-6 py-6 text-base text-gray-700 font-medium">
          <li>
            <Link
              href="/"
              onClick={() => setShowSideBar(false)}
              className={`block hover:text-blue-600 transition-all duration-150 ${
                pathname === "/" ? "text-blue-600" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => setShowSideBar(false)}
              className={`block hover:text-blue-600 transition-all duration-150 ${
                pathname === "/about" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              onClick={() => setShowSideBar(false)}
              className={`block hover:text-blue-600 transition-all duration-150 ${
                pathname === "/services" ? "text-blue-600" : ""
              }`}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setShowSideBar(false)}
              className={`block hover:text-blue-600 transition-all duration-150 ${
                pathname === "/contact" ? "text-blue-600" : ""
              }`}
            >
              Contact
            </Link>
          </li>

          {/* Auth Buttons */}
          {!session ? (
            <li className="mt-4">
              <button
                onClick={() => {
                  setShowSideBar(false);
                  signIn("google");
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-200"
              >
                Login with Google
              </button>
            </li>
          ) : (
            <>
              <li className="mt-4">
                <Link
                  href="/dashboard"
                  onClick={() => setShowSideBar(false)}
                  className="block text-gray-800 hover:text-blue-600 transition-all duration-150"
                >
                  signed in as {session.user.name}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setShowSideBar(false);
                    signOut();
                  }}
                  className="w-full text-left text-red-600 hover:text-red-700 font-medium transition-all duration-150"
                >
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
