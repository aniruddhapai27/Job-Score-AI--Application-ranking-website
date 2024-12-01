// src/components/Sidebar.jsx
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

const Sidebar = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility on small screens
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative h-full">
      {/* Hamburger Button for Mobile */}
      <button
        className="lg:hidden text-gray-800 p-3 fixed top-2 left-4 z-50 bg-gray-100 rounded-full shadow-md focus:outline-none"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay for mobile sidebar */}
      <div
        className={`sticky inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } lg:hidden`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 w-64 bg-gray-900 text-white shadow-lg z-50 lg:z-auto transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 h-screen`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button
            className="lg:hidden text-gray-300 p-2 rounded-full focus:outline-none hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            ✕
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-6 space-y-2 px-4">
          <li>
            <NavLink
              to={`/dashboard/${user?._id}/profile`}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-md transition-colors ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-800"
                }`
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/${user?._id}/search`}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-md transition-colors ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-800"
                }`
              }
            >
              Search
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
