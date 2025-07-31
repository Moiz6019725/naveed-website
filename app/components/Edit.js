"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function View() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    return <div className="text-center text-gray-500 mt-10">No cars found.</div>;
  }

  return (
    <div className="p-3 space-y-6">
  {cars.map((car) => (
    <div
      key={car._id}
      className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 flex items-start gap-4 p-4"
    >
      {/* Car Image */}
      <div className="w-28 sm:w-32 md:w-40 h-24 sm:h-28 md:h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
        {car.imagePaths?.[0] ? (
          <img
            src={car.imagePaths[0]}
            alt={car.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Car Info */}
      <div className="flex-1 min-w-0">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
          {car.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 truncate">
          {car.brand} • {car.model} • {car.year}
        </p>
        <p className="text-xs sm:text-sm text-gray-700 mt-1 line-clamp-2">
          {car.description}
        </p>
        <div className="text-green-600 font-bold text-sm sm:text-base mt-2">
          Rs. {car.price.toLocaleString()}
        </div>
      </div>

      {/* Edit Button */}
      <div className="self-start">
        <button
          onClick={() => router.push(`/admin/cars/edit/${car._id}`)}
          className="bg-black text-white px-3 cursor-pointer py-1.5 text-sm rounded-md hover:bg-gray-900 transition"
        >
          Edit
        </button>
      </div>
    </div>
  ))}
</div>

  );
}
