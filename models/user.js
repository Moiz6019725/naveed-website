import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  username: { type: String, required: true },
  profilePic: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
