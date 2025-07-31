import connectToDatabase from "@/lib/dbConnect";
import { Admin } from "@/models/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    
    await connectToDatabase();

    const existingUser = await Admin.findOne({ username: data.username.trim() });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found", status: 404 },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(data.password.trim(), existingUser.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials", status: 401 },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const response = NextResponse.json(
      { message: "Login successful", status: 200 },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { message: "Internal server error", status: 500 },
      { status: 500 }
    );
  }
}

