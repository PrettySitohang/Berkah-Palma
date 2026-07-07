import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineBars3 } from "react-icons/hi2"; 
import { BsPersonCircle } from "react-icons/bs"; 
import Logo from '../../public/img/Logo.png'; 

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Deteksi role dari URL yang aktif, sama seperti logic di Sidebar.jsx
  const isAdmin = location.pathname.startsWith('/admin');
  const prefix = isAdmin ? '/admin' : '/karyawan';

  const handleProfileClick = () => {
    navigate(`${prefix}/profile`);
  };

  return (
    <header className="bg-[#294D29] text-white px-6 md:px-12 py-4 shadow-lg sticky top-0 z-50 transition-all border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <label 
          htmlFor="sidebar-toggle" 
          className="text-white text-2xl focus:outline-none hover:text-[#C5A830] transition-colors cursor-pointer block md:hidden p-1 active:scale-90" 
          aria-label="Menu"
        >
          <HiOutlineBars3 />
        </label>

        <div 
          onClick={() => navigate(`${prefix}/dashboard`)}
          className="flex items-center gap-3 select-none cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300" />
            <img 
              src={Logo} 
              alt="Logo Berkah Palma" 
              className="w-8 h-8 object-contain rounded-full bg-white p-0.5 shadow-md relative z-10" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-black tracking-widest uppercase text-white group-hover:text-[#C5A830] transition-colors">
              BERKAH PALMA
            </span>
            <span className="text-[9px] text-gray-300 font-medium tracking-wider uppercase -mt-0.5 hidden md:block">
              Internal System
            </span>
          </div>
        </div>

        <button 
          onClick={handleProfileClick}
          className="flex items-center gap-2 group focus:outline-none text-white text-2xl md:text-3xl hover:text-[#C5A830] transition-all relative p-1 active:scale-95 cursor-pointer" 
          aria-label="Profile"
        >
          <BsPersonCircle className="drop-shadow-md group-hover:rotate-12 transition-transform" />
          <span className="hidden md:inline-block text-xs font-bold uppercase tracking-wider text-gray-200 group-hover:text-[#C5A830] transition-colors">
            {isAdmin ? 'Admin' : 'Karyawan'}
          </span>
        </button>

      </div>
    </header>
  );
}