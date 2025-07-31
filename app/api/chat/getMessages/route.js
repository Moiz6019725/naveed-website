import connectToDatabase from "@/lib/dbConnect";
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();
  const body = await req.json();
  const { userId } = body;

  const messages = await Chat.find({
    $or: [
      { senderId: userId },
      { receiverId: userId }
    ]
  }).sort({ createdAt: 1 });

  return NextResponse.json(messages);
}
