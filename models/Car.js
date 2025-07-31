import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  condition: { type: String, required: true },
  transmission: { type: String, required: true },
  mileage: { type: Number, required: true },
  registered: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imagePaths: [String], // Store image file paths here
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  locationName: { type: String, required: false }, // e.g. "Lahore, Pakistan"

}, {
  timestamps: true,
});

export const Car = mongoose.models.Car || mongoose.model("Car", carSchema);
