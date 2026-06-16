import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    // Memastikan layout pembungkus mengambil lebar dan tinggi layar penuh
    <div className="w-full min-h-screen m-0 p-0 overflow-hidden">
      <Outlet />
    </div>
  );
};

export default AuthLayout;