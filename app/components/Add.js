"use client";

import { useState, useRef } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationSelector({ setLocation }) {
  useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      try {
        const res = await fetch("/api/reverse-geocode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lat, lng }),
        });

        const data = await res.json();

        const locationName = data?.locationName || "Unknown location";

        setLocation({
          lat,
          lng,
          locationName,
        });
      } catch (error) {
        console.error("Reverse geocoding failed:", error);
      }
    },
  });

  return null;
}

export default function Add() {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    model: "",
    color: "",
    condition: "",
    transmission: "",
    mileage: "",
    registered: "",
    year: "",
    price: "",
    description: "",
    images: [],
    latitude: "",
    longitude: "",
    locationName: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState(null); // to control map programmatically

  const fileInputRef = useRef();
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const filesArray = Array.from(files);
      setFormData((prev) => ({ ...prev, images: filesArray }));
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    console.log(formData);
  };

  const handleSearchLocation = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(
        `/api/search-location?q=${encodeURIComponent(searchQuery)}`
      );
      const results = await res.json();

      if (results.length === 0) {
        alert("No location found.");
        return;
      }

      const { lat, lon, display_name } = results[0];

      // Update lat/lng
      setFormData((prev) => ({
        ...prev,
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        locationName: display_name, // Optional: user-readable location name
      }));
    } catch (error) {
      console.error("Location fetch failed:", error);
      alert("Something went wrong while fetching location.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === "images") {
        formData.images.forEach((file) => data.append("images", file));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch("http://localhost:3000/api/cars/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });

      const json = await res.json();

      if (res.ok) {
        toast.success(json.message, {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
          transition: Flip,
        });

        setFormData({
          title: "",
          brand: "",
          model: "",
          color: "",
          condition: "",
          transmission: "",
          mileage: "",
          registered: "",
          year: "",
          price: "",
          description: "",
          images: [],
          location: null,
        });
        setImagePreviews([]);
        if (fileInputRef.current) fileInputRef.current.value = null;
      } else {
        toast.error(json.message || "Failed to add car", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
          transition: Flip,
        });
      }
    } catch (err) {
      toast.error("Error adding car", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Flip,
      });
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Add New Car</h2>

      <div className="flex gap-4 max-[580px]:flex-col">
        {/* Image Preview */}
        <div className="w-1/2 max-[580px]:w-full p-2">
          <h3 className="font-semibold mb-2">Selected Images</h3>
          {imagePreviews.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className="w-28 h-28 object-cover rounded shadow"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No images selected</p>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-1/2 max-[580px]:w-full space-y-4 p-2"
        >
          {/* Existing fields */}
          <input
            type="text"
            name="title"
            placeholder="Car Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 outline-none rounded"
            required
          />
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 outline-none rounded"
            required
          >
            <option value="">Select Brand</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Kia">Kia</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Changan">Changan</option>
            <option value="Proton">Proton</option>
            <option value="Prince">Prince</option>
            <option value="MG">MG</option>
            <option value="DFSK">DFSK</option>
            <option value="Nissan">Nissan</option>
            <option value="FAW">FAW</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Daihatsu">Daihatsu</option>
            <option value="Haval">Haval</option>
            <option value="Peugeot">Peugeot</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Subaru">Subaru</option>
            <option value="Lexus">Lexus</option>
          </select>

          <input
            type="text"
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 outline-none rounded"
            required
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 outline-none rounded"
            required
          />
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 outline-none rounded"
            required
          >
            <option value="" disabled hidden>
              Select Car Condition
            </option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Registered">Registered</option>
            <option value="Unregistered">Unregistered</option>
            <option value="Imported">Imported</option>
          </select>

          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 outline-none rounded"
            required
          >
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          <input
            type="number"
            name="mileage"
            placeholder="Mileage"
            value={formData.mileage}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 outline-none rounded"
            required
          />
          <select
            name="registered"
            value={formData.registered}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 outline-none rounded"
            required
          >
            <option value="">Select Registration City</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Multan">Multan</option>
            <option value="Quetta">Quetta</option>
            <option value="Sialkot">Sialkot</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 outline-none rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 outline-none rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 outline-none rounded"
          />

          {/* Location Picker */}
          <div>
            <label className="font-semibold block mb-2">
              Select Location on Map
            </label>
            <div className="mb-4">
              <label className="font-semibold block mb-1">
                Search by Location
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter city or address"
                  className="flex-1 p-2 border border-gray-300 rounded"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
                <button
                  type="button"
                  onClick={handleSearchLocation}
                  className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-black cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="h-64 w-full rounded border border-gray-300 overflow-hidden">
              <MapContainer
                center={[33.6844, 73.0479]}
                zoom={6}
                style={{ height: "100%", width: "100%" }}
                whenCreated={(mapInstance) => setMap(mapInstance)}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors & CartoDB"
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <LocationSelector
                  setLocation={(loc) =>
                    setFormData((prev) => ({
                      ...prev,
                      latitude: loc.lat,
                      longitude: loc.lng,
                      locationName: loc.locationName,
                    }))
                  }
                />
                {formData.latitude && formData.longitude && (
                  <Marker position={[formData.latitude, formData.longitude]} />
                )}
              </MapContainer>
            </div>
            {formData.location && (
              <p className="text-sm text-gray-500 mt-2">
                Selected: Lat {formData.location[0]}, Lng {formData.location[1]}
              </p>
            )}
          </div>
          {formData.locationName && (
            <p className="text-sm text-gray-600 mt-1">
              Location: {formData.locationName}
            </p>
          )}

          {/* Image Upload */}
          <div className="w-full">
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center gap-2 px-4 py-3 text-white bg-gradient-to-r from-gray-800 to-black rounded-xl cursor-pointer shadow-lg hover:from-gray-900 hover:to-gray-950 transition-all duration-300"
            >
              Upload Images
            </label>
            <input
              id="file-upload"
              type="file"
              name="images"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 cursor-pointer rounded hover:bg-black"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
