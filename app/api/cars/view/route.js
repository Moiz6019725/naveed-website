import connectToDatabase from "@/lib/dbConnect";
import {Car} from "@/models/Car";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase(); 

    const cars = await Car.find({}).sort({ createdAt: -1 }); // Optional: sort by newest first

    return NextResponse.json(
      { status: 200, message: "Cars fetched successfully", cars },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { status: 500, message: "Server error" },
      { status: 500 }
    );
  }
}
