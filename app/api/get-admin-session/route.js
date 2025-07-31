import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth"; // adjust path if needed
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore =await cookies();
    const token =  cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    const session = verifyToken(token);

    return NextResponse.json({
      isAdmin: true,
      adminId: session.id, // send ID for message sender
    });
  } catch (err) {
    return NextResponse.json({ isAdmin: false }, { status: 403 });
  }
}
