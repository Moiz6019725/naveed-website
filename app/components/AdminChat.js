"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { ArrowLeft } from "lucide-react";

let socket;

export default function AdminChatPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [adminId, setAdminId] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const init = async () => {
      const adminRes = await fetch("/api/get-admin-session");
      const data = await adminRes.json();
      setAdminId(data.adminId);

      const res = await fetch("/api/chat/getUsers");
      const usersList = await res.json();
      setUsers(usersList);

      if (!socket) {
        socket = io("http://localhost:9000");
        socket.emit("register", data.adminId);
      }

      socket.on("newMessage", (msg) => {
        if (
          msg.senderId === selectedUser?._id ||
          msg.receiverId === selectedUser?._id
        ) {
          setMessages((prev) => [...prev, msg]);
        }
      });
    };

    init();
    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async (user) => {
    setSelectedUser(user);
    const res = await fetch("/api/chat/getMessages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id }),
    });

    const data = await res.json();
    setMessages(data);
  };

  const handleSend = () => {
    if (!input.trim() || !selectedUser || !adminId) return;

    const msg = {
      senderId: adminId,
      senderType: "admin",
      receiverId: selectedUser._id,
      receiverType: "user",
      message: input,
    };

    socket.emit("sendMessage", msg);
    setInput("");
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      {!selectedUser && (
        <div className="w-full bg-white border-r border-r-gray-300 overflow-y-auto">
          <h2 className="p-4 text-lg font-semibold bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 border-b border-b-gray-300 text-white">
            Users
          </h2>
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center border-b border-gray-100 hover:bg-gray-100 cursor-pointer"
              onClick={() => loadMessages(user)}
            >
              <img
                src={user.profilePic}
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover mx-4"
              />
              <div className="flex-1 py-3">
                <p className="font-medium">{user.name || user.email}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Panel */}
      {selectedUser && (
        <div className="w-full flex flex-col bg-gray-50">
          {/* Header */}
          <div className="px-4 py-4 bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 text-white font-semibold shadow flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-300 cursor-pointer py-1 rounded text-sm"
              >
                <ArrowLeft size={18}/>
              </button>
              <img
                src={selectedUser.profilePic}
                alt=""
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover"
              />
              <span>{selectedUser.name || selectedUser.email}</span>
            </span>
            <button
              onClick={() => setSelectedUser(null)}
              className="bg-white text-blue-600 px-3 cursor-pointer py-1 rounded text-sm"
            >
              Back
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.senderType === "admin" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
                    msg.senderType === "admin"
                      ? "bg-[#111] text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-t-gray-300 flex gap-3 items-center">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-[#111] text-white px-5 py-2 rounded-full hover:bg-black transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
