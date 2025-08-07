"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { getSession } from "next-auth/react";
import { X } from "lucide-react";

let socket;

export default function ChatWidget({setShowChat}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const setupSocket = async () => {
      const session = await getSession();
      const userId = session?.user?.id;

      if (!userId) return;

      // Setup socket only once
      if (!socket) {
        socket = io("http://localhost:9000");
        socket.emit("register", userId);
      }

      // Fetch chat history
      const res = await fetch("/api/chat/getMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const previousMessages = await res.json();
      setMessages(previousMessages);

      // Listen for incoming messages
      socket.on("newMessage", (msg) => {
        // Prevent adding the same message twice
        setMessages((prev) => {
          // Check if this message already exists (compare by _id)
          const alreadyExists = prev.some((m) => m._id === msg._id);
          if (alreadyExists) return prev;
          return [...prev, msg];
        });
      });
    };

    setupSocket();

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!input.trim() || !userId) return;

    const msg = {
      senderId: userId,
      senderType: "user",
      receiverId: "687eeb4dfbf1e6217be81980", // admin ID
      receiverType: "admin",
      message: input,
    };

    // Emit to server (server will broadcast back)
    socket.emit("sendMessage", msg);

    // Do not update local state here to avoid duplication
    setInput("");
  };

  return (
    <div className="fixed bottom-22 right-4 w-80 bg-[#ebe8e850] backdrop-blur-3xl rounded-lg shadow-lg">
      <div className="bg-[#111] flex items-center justify-between text-white p-2">Chat with Admin <button className="cursor-pointer" onClick={()=>{
        setShowChat(false)
      }}><X/></button></div>
      <div className="h-60 overflow-y-scroll border-b p-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 w-full flex ${
              msg.senderType === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-[70%]">
              <div
                className={`px-3 py-2 rounded-md text-sm ${
                  msg.senderType === "user"
                    ? "bg-[#111] border-bl-2xl text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.message}
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 p-2">
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-400 outline-none rounded px-2"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-[#000000] text-white px-3 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
