import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Area Konten: Di Desktop akan terdorong ke kanan sejauh 280px */}
      <main className="flex-1 w-full md:pl-[280px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;