import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 w-full md:pl-[280px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;