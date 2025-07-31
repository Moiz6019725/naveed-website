const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const Chat = require("./models/Chat"); // use relative path
require("dotenv").config();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect("mongodb://localhost:27017/", {
    dbName: "admin",
  })
  .then(() => console.log("MongoDB connected"));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 👉 Register user to their own room
  socket.on("register", (userId) => {
    socket.join(userId); // This creates a room with the user's ID
    console.log(`User ${userId} joined their room.`);
  });

  // ✅ Save message and emit it only to receiver and sender
  socket.on("sendMessage", async (data) => {
    const { senderId, senderType, receiverId, receiverType, message } = data;

    const newMessage = new Chat({
      senderId,
      senderType,
      receiverId,
      receiverType,
      message,
    });
    await newMessage.save();

    // ✅ Send to receiver only
    io.to(receiverId).emit("newMessage", newMessage);

    // ✅ Also send to sender (for instant UI update)
    io.to(senderId).emit("newMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

server.listen(9000, () => {
  console.log("Server listening on port 9000");
});
