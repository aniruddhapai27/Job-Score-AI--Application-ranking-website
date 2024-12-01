// src/components/Dashboard.jsx
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className=" w-full h-screen sm:m-5 lg:mt-5 p-5 pt-7 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
