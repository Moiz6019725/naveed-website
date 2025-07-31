// app/api/chat/getUsers/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Chat from "@/models/Chat";
import  {User}  from "@/models/user"; // if you have a separate User model

export async function GET() {
  await connectToDatabase();

  const userIds = await Chat.distinct("senderId", { senderType: "user" });
  const users = await User.find({ _id: { $in: userIds } }).select("_id name email profilePic");
  
  return NextResponse.json(users);
  
}
