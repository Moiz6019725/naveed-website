"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function View() {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
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

  const handleSelect = (id) => {
    setSelectedCars((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
    
  };

  const handleDeleteSelected = async () => {
    if (!selectedCars.length) return;

    if (!confirm("Are you sure you want to delete selected cars?")) return;

    try {
      const res = await fetch("/api/cars/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedCars }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Selected cars deleted");
        setCars((prev) => prev.filter((car) => !selectedCars.includes(car._id)));
        setSelectedCars([]);
      } else {
        toast.error(data.message || "Deletion failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

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
    <div className="p-6">
      {selectedCars.length > 0 && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleDeleteSelected}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition"
          >
            Delete Selected ({selectedCars.length})
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white relative shadow-lg rounded-2xl overflow-hidden border border-gray-200"
          >
            {/* Checkbox */}
            <div className="w-5 h-5 absolute top-3 left-3 z-10 shadow">
              <input
                type="checkbox"
                checked={selectedCars.includes(car._id)}
                onChange={() => handleSelect(car._id)}
                className="w-full h-full accent-gray-900"
              />
            </div>

            {/* Image */}
            <div className="h-52 overflow-hidden bg-gray-100">
              {car.imagePaths?.[0] ? (
                <img
                  src={car.imagePaths[0]}
                  alt={car.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                <Link href={`/admin/cars/${car._id}`}>{car.title}</Link>
              </h2>
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
    </div>
  );
}
