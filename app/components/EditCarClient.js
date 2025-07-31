"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCarClient({ car }) {
  car = JSON.parse(car);

  const router = useRouter();

  const [formData, setFormData] = useState({
    title: car.title || "",
    brand: car.brand || "",
    model: car.model || "",
    color: car.color || "",
    condition: car.condition || "",
    transmission: car.transmission || "",
    mileage: car.mileage || "",
    registered: car.registered || "",
    year: car.year || "",
    price: car.price || "",
    description: car.description || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/cars/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: car._id, ...formData }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Car updated!");
        router.push("/admin");
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="w-1/2 max-[1024px]:w-10/12 p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Car</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          "title",
          "brand",
          "model",
          "color",
          "condition",
          "transmission",
          "mileage",
          "registered",
          "year",
          "price",
          "description",
        ].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type={field === "price" || field === "year" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded-md"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-black text-white px-6 py-2  cursor-pointer rounded-md hover:bg-gray-900"
        >
          Update
        </button>
      </form>
    </div>
  );
}
