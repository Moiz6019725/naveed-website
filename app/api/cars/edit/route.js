import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import { Car } from "@/models/Car";
import mongoose from "mongoose";

export async function PUT(req) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const {
      id,
      title,
      brand,
      model,
      color,
      condition,
      transmission,
      mileage,
      registered,
      year,
      price,
      description,
    } = body;

    // Check for valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid car ID" }, { status: 400 });
    }

    // Update the car document with all fields
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      {
        title,
        brand,
        model,
        color,
        condition,
        transmission,
        mileage,
        registered,
        year,
        price,
        description,
      },
      { new: true, runValidators: true } // Ensures updated doc is returned and validated
    );

    // Handle car not found
    if (!updatedCar) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }

    // Success response
    return NextResponse.json({
      message: "Car updated successfully",
      car: updatedCar,
    });
  } catch (err) {
    console.error("Edit error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
