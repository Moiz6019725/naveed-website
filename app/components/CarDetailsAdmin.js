// components/CarDetailsClient.jsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MapPin } from "lucide-react";
export default function CarDetailsAdmin(props) {
  const car = JSON.parse(props.car);



  return (
    <div className="w-[97vw] relative overflow-x-hidden">
      <div className="shadow-md p-5 h-[90vh] max-[980px]:flex-col flex gap-3 rounded-md overflow-x-hidden border border-gray-200">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="w-1/2 max-[980px]:w-full h-96"
        >
          {car.imagePaths?.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Car ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="py-2 w-1/2 max-[980px]:w-full">
          <h1 className="text-3xl max-[980px]:text-xl font-bold text-gray-800 mb-2">
            {car.title}
          </h1>
          <span className="font-semibold flex items-center gap-2">
            <MapPin color="green" size={16} />
            {car.locationName}
          </span>
          <p className="text-gray-600 mb-7">{car.description}</p>
          <div className="text-gray-700 grid grid-cols-2">
            <p className="border border-gray-200">
              <strong className="bg-gray-300">Brand:</strong> {car.brand}
            </p>
            <p className="border border-gray-200">
              <strong className="bg-gray-300">Model:</strong> {car.model}
            </p>
            <p className="border border-gray-200">
              <strong className="bg-gray-300">Condition:</strong>{" "}
              {car.condition}
            </p>
            <p className="border border-gray-200">
              <strong className="bg-gray-300">Transmission:</strong>{" "}
              {car.transmission}
            </p>
            <p className="border border-gray-200">
              <strong className="bg-gray-300">Mileage:</strong> {car.mileage}
            </p>
            <p className="border border-gray-200">
              <strong className="bg-gray-300">Color:</strong> {car.color}
            </p>
            <p className="border border-gray-200">
              <strong className="bg-gray-300">Registered:</strong>{" "}
              {car.registered}
            </p>
            <p className="border border-gray-200">
              <strong className="bg-gray-300">Price:</strong> Rs. {car.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Edit Car | Admin Panel",
  description: "Edit existing car details in the admin dashboard.",
};
