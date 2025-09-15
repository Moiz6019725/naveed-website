"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import ChatWidget from "./ChatWidget";
import Script from "next/script";
import { useSession } from "next-auth/react"; // Import useSession

export default function CarListWithFilters() {
  const { data: session } = useSession(); // Get session data

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [socket, setSocket] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [filters, setFilters] = useState({
    brand: "",
    condition: "",
    transmission: "",
    registered: "",
  });

  const handleConnect = () => {
    if (socket) {
      // Toggle chat visibility if socket already connected
      setShowChat((prev) => !prev);
    } else if (window.io) {
      const newSocket = window.io("http://localhost:9000");
      setSocket(newSocket);
      console.log("Socket connection established");
      setShowChat(true);
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/cars/view");
        const data = await res.json();

        const carList = Array.isArray(data) ? data : data.cars || [];
        setCars(carList);
        setFilteredCars(carList);
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };

    fetchCars();
  }, []);

  // Cleanup socket on unmount
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        console.log("Socket disconnected");
      }
    };
  }, [socket]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const filtered = cars.filter((car) => {
      return (
        (!newFilters.brand || car.brand === newFilters.brand) &&
        (!newFilters.condition || car.condition === newFilters.condition) &&
        (!newFilters.transmission ||
          car.transmission === newFilters.transmission) &&
        (!newFilters.registered || car.registered === newFilters.registered)
      );
    });

    setFilteredCars(filtered);
  };

  return (
    <div className="md:px-4 py-1 max-w-screen-xl mx-auto">
      <h1 className="text-3xl max-[980px]:text-xl font-bold text-gray-800 mb-6 max-[980px]:mb-2 text-center">
        Explore Available Cars
      </h1>
      {/* Filters Section */}
      <div className="relative mb-4">
        <div className="flex flex-wrap gap-y-1 text-md max-[980px]:text-sm font-medium text-gray-900">
          {/* Brand Filter */}
          <div className="relative group hover:bg-white">
            <button className="flex items-center px-2 gap-1 h-12 cursor-pointer group-hover:text-blue-600">
              Brand <ChevronDown size={18} />
            </button>
            <div className="absolute z-10 hidden group-hover:block bg-white rounded shadow-lg w-48">
              <div
                onClick={() =>
                  handleFilterChange({ target: { name: "brand", value: "" } })
                }
                className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                All Brands
              </div>
              {["Suzuki", "Toyota", "Honda", "Kia", "Hyundai"].map((b) => (
                <div
                  key={b}
                  onClick={() =>
                    handleFilterChange({ target: { name: "brand", value: b } })
                  }
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Condition Filter */}
          <div className="relative group hover:bg-white">
            <button className="flex items-center gap-1 h-full px-2 cursor-pointer group-hover:text-blue-600">
              Condition <ChevronDown size={18} />
            </button>
            <div className="absolute z-10 hidden group-hover:block bg-white rounded shadow-lg w-48">
              <div
                onClick={() =>
                  handleFilterChange({
                    target: { name: "condition", value: "" },
                  })
                }
                className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                All Conditions
              </div>
              {["New", "Used"].map((c) => (
                <div
                  key={c}
                  onClick={() =>
                    handleFilterChange({
                      target: { name: "condition", value: c },
                    })
                  }
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Transmission Filter */}
          <div className="relative group hover:bg-white">
            <button className="flex items-center gap-1 h-full px-2 cursor-pointer group-hover:text-blue-600">
              Transmission <ChevronDown size={18} />
            </button>
            <div className="absolute z-10 hidden group-hover:block bg-white rounded shadow-lg w-48">
              <div
                onClick={() =>
                  handleFilterChange({
                    target: { name: "transmission", value: "" },
                  })
                }
                className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                All Types
              </div>
              {["Manual", "Automatic"].map((t) => (
                <div
                  key={t}
                  onClick={() =>
                    handleFilterChange({
                      target: { name: "transmission", value: t },
                    })
                  }
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Registered Filter */}
          <div className="relative group hover:bg-white">
            <button className="flex items-center gap-1 h-full px-2 cursor-pointer group-hover:text-blue-600">
              Registered In <ChevronDown size={18} />
            </button>
            <div className="absolute z-10 hidden group-hover:block bg-white rounded shadow-lg w-48">
              <div
                onClick={() =>
                  handleFilterChange({
                    target: { name: "registered", value: "" },
                  })
                }
                className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                All Cities
              </div>
              {["Islamabad", "Karachi", "Punjab"].map((r) => (
                <div
                  key={r}
                  onClick={() =>
                    handleFilterChange({
                      target: { name: "registered", value: r },
                    })
                  }
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  {r}
                </div>
              ))}
            </div>
          </div>
          <div className="relative group hover:bg-white">
            <button className="flex items-center gap-1 h-12 px-2 cursor-pointer group-hover:text-blue-600">
              Videos
            </button>
          </div>
          <div className="relative group hover:bg-white">
            <button className="flex items-center gap-1 h-12 px-2 cursor-pointer group-hover:text-blue-600">
              Forums
            </button>
          </div>
          <div className="relative group hover:bg-white">
            <button className="flex items-center gap-1 h-12 px-2 cursor-pointer group-hover:text-blue-600">
              Blogs
            </button>
          </div>
        </div>
      </div>

      {/* Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <Link key={car._id} href={`/cars/${car._id}`}>
              <div className="bg-white cursor-pointer rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden border-gray-50 border">
                {/* Car Image */}
                {car.imagePaths?.[0] ? (
                  <Image
                    src={car.imagePaths[0]}
                    alt={car.title}
                    width={400}
                    height={250}
                    className="w-full h-52 object-cover transition-transform hover:scale-105 duration-200"
                  />
                ) : (
                  <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* Car Info */}
                <div className="p-4 space-y-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {car.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    <strong>Brand:</strong> {car.brand}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Model:</strong> {car.model}
                  </p>
                  <p className="text-md font-bold text-blue-600 mt-2">
                    PKR {car.price?.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No cars found.
          </p>
        )}
      </div>

      {/* Show chat button and widget only if session exists */}
      {session && (
        <>
          <button
            onClick={handleConnect}
            className="p-4 fixed bottom-7 right-7 rounded-full cursor-pointer bg-black text-white"
            aria-label={showChat ? "Close chat" : "Open chat"}
          >
            <MessageCircle size={25} />
          </button>

          {showChat && socket && (
            <ChatWidget setShowChat={setShowChat} socket={socket} />
          )}
        </>
      )}

      <Script
        src="http://localhost:9000/socket.io/socket.io.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log("Socket.IO client loaded");
        }}
      />
    </div>
  );
}
