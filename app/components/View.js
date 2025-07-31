"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function View() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/cars/view");
        const data = await res.json();
        if (res.ok) {
          setCars(data.cars);
        } else {
          console.error("Failed to fetch cars:", data.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl text-gray-500">
        Loading cars...
      </div>
    );
  }

  if (!cars.length) {
    return (
      <div className="text-center text-gray-500 mt-10">No cars found.</div>
    );
  }

  return (
    <div className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div
          key={car._id}
          className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200"
        >
          <div className="h-52 overflow-hidden bg-gray-100">
            {car.imagePaths?.[0] ? (
              <Link href={`/admin/cars/${car._id}`}>
              <img
                src={car.imagePaths[0]}
                alt={car.title}
                className="w-full h-full cursor-pointer object-cover hover:scale-105 transition-transform duration-300"
              />
              </Link>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800"><Link href={`/admin/cars/${car._id}`}>{car.title}</Link></h2>
            <p className="text-sm text-gray-500">
              {car.brand} • {car.model} • {car.year}
            </p>
            <p className="text-sm text-gray-700 mt-2">{car.description}</p>
            <div className="mt-3 text-green-600 font-bold text-lg">
              Rs. {car.price.toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
