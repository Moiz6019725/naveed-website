"use client";

import { useState, useRef } from "react";
import View from "../components/View";
import Add from "../components/Add";
import Edit from "../components/Edit";
import Delete from "../components/Delete";
import { logout } from "@/lib/logout";
import {
  LogOut,
  User,
  Eye,
  PlusCircle,
  Edit2,
  Trash2,
  MessageCircleMore,
} from "lucide-react";
import Image from "next/image";
import AdminChat from "./AdminChat";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function ClientAdminPanel({ session }) {
  const [activeTab, setActiveTab] = useState("view");

  // Strict + reliable targeting
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);
  const listRef = useRef(null);
  const liRefs = useRef([]); // array of <li> refs

  const renderContent = () => {
    switch (activeTab) {
      case "view":
        return <View />;
      case "add":
        return <Add />;
      case "edit":
        return <Edit />;
      case "delete":
        return <Delete />;
      case "chat":
        return <AdminChat />;
      default:
        return <View />;
    }
  };

  const tabs = [
    { id: "view", label: "View", icon: <Eye size={16} /> },
    { id: "add", label: "Add", icon: <PlusCircle size={16} /> },
    { id: "edit", label: "Edit", icon: <Edit2 size={16} /> },
    { id: "delete", label: "Delete", icon: <Trash2 size={16} /> },
    { id: "chat", label: "Chat", icon: <MessageCircleMore size={16} /> },
  ];

  useGSAP(
    () => {
      // Make sure nodes exist (dev StrictMode mounts twice)
      const items =
        liRefs.current.filter(Boolean) ||
        (listRef.current
          ? Array.from(listRef.current.querySelectorAll("li"))
          : []);

      if (!sidebarRef.current || items.length === 0) return;

      // Optional: set initial state to avoid FOUC
      gsap.set(items, { opacity: 0, y: -14 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(sidebarRef.current, { x: -300, duration: 0.45 })
        .from(
          items,
          {
            opacity: 0,
            x: 100,
            duration: 0.28,
            stagger: 0.2,
            clearProps: "all",
          },
          "<0.08"
        );
    },
    { scope: containerRef } // scope everything to this component
  );

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-16px)] m-2 w-full bg-gray-100 flex flex-col lg:flex-row"
    >
      {/* Sidebar (Desktop) / Topbar (Mobile) */}
      <aside
        ref={sidebarRef}
        className="leftSideBar w-full lg:w-64 bg-gray-50 m-2 shadow-md z-10 sticky top-0 lg:static"
      >
        <div className="p-4 border-b flex items-center justify-between lg:justify-between">
          <Image
            src="/logo-transparent.png"
            width={80}
            height={80}
            alt="Site Logo"
          />
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                {session?.username?.[0]?.toUpperCase() || "A"}
              </div>
              <span className="font-semibold text-sm lg:hidden">
                {session?.username}
              </span>
            </div>
            <button
              onClick={logout}
              className="lg:hidden text-sm text-red-500 cursor-pointer hover:underline flex items-center gap-1"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        <ul
          ref={listRef}
          className="flex lg:flex-col flex-row justify-start lg:justify-start lg:items-start p-2 gap-2 text-sm font-medium"
        >
          {tabs.map(({ id, label, icon }, idx) => (
            <li
              key={id}
              ref={(el) => (liRefs.current[idx] = el)}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md w-full transition-all
                ${
                  activeTab === id
                    ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              {icon} <span>{label}</span>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex justify-between items-center p-4 text-sm border-t mt-auto">
          <div className="flex items-center gap-2 text-gray-600">
            <User size={16} />
            {session?.username || "Admin"}
          </div>
          <button
            onClick={logout}
            className="text-red-500 cursor-pointer hover:underline flex items-center gap-1"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 my-2 overflow-y-auto bg-gray-50">
        {renderContent()}
      </main>
    </div>
  );
}
