// app/api/reverse-geocode/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { lat, lng } = await req.json();
    console.log(lat, lng);

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "MyApp/1.0 (moizurrehman01@gmail.com)",
        "Accept-Language": "en", // Optional: ensure English results
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from Nominatim");
    }

    const data = await response.json();
    console.log(data);
    

    const locationName = data.display_name || "Unknown location";

    return NextResponse.json({ locationName });
  } catch (err) {
    console.error("Reverse geocoding error:", err);
    return NextResponse.json(
      { error: "Failed to reverse geocode" },
      { status: 500 }
    );
  }
}
