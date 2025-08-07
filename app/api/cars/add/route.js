import { IncomingForm } from "formidable";
import { Readable } from "stream";
import path from "path";
import fs from "fs";
import { Car } from "@/models/Car";
import connectToDatabase from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

function streamToNodeRequest(request) {
  const readable = Readable.from(request.body);
  readable.headers = Object.fromEntries(request.headers.entries());
  readable.method = request.method;
  return readable;
}

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      multiples: true,
      uploadDir: path.join(process.cwd(), "/public/uploads"),
      keepExtensions: true,
    });

    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(request) {
  await connectToDatabase();

  try {
    const nodeReq = streamToNodeRequest(request);
    const { fields, files } = await parseForm(nodeReq);
    
    
    const uploadedFiles = Array.isArray(files.images)
      ? files.images
      : [files.images];

    const imagePaths = uploadedFiles.map((file) => `/uploads/${path.basename(file.filepath)}`);

    const newCar = new Car({
      title: fields.title?.[0],
      brand: fields.brand?.[0],
      model: fields.model?.[0],
      color: fields.color?.[0],
      condition: fields.condition?.[0],
      transmission: fields.transmission?.[0],
      mileage: Number(fields.mileage?.[0]),
      registered: fields.registered?.[0],
      year: Number(fields.year?.[0]),
      price: Number(fields.price?.[0]),
      description: fields.description?.[0],
      imagePaths,
      latitude: fields.latitude?.[0] ? parseFloat(fields.latitude?.[0]) : undefined,
      longitude: fields.longitude?.[0] ? parseFloat(fields.longitude?.[0]) : undefined,
      locationName: fields.locationName?.[0] || "",
    });

    await newCar.save();

    return NextResponse.json({
      status: 200,
      message: "Car added successfully",
      car: newCar,
    });
  } catch (error) {
    console.error("Error adding car:", error);
    return NextResponse.json({
      status: 500,
      message: "Server error while adding car",
    });
  }
}
