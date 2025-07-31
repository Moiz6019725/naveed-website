import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import { Car } from "@/models/Car";
import fs from "fs/promises";
import path from "path"; // ✅ You forgot this import

export async function POST(request) {
  try {
    const data = await request.json();

    if (!Array.isArray(data.ids) || data.ids.length === 0) {
      return NextResponse.json(
        { message: "No car IDs provided" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const carsToDelete = await Car.find({ _id: { $in: data.ids } });

    for (const car of carsToDelete) {
      if (Array.isArray(car.imagePaths)) {
        for (const imagePath of car.imagePaths) {
          try {
            const relativePath = imagePath.replace(/^\/+/, "");
            const fullPath = path.join(process.cwd(), "public", relativePath);
            await fs.unlink(fullPath);
          } catch (err) {
            console.warn(`⚠️ Failed to delete file: ${imagePath}`, err.message);
          }
        }
      }
    }

    const result = await Car.deleteMany({ _id: { $in: data.ids } });

    return NextResponse.json({
      message: `${result.deletedCount} car(s) deleted successfully`,
    });
  } catch (error) {
    console.error("❌ Delete error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
