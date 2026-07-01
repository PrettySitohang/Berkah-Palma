import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineBars3 } from "react-icons/hi2"; 
import { BsPersonCircle } from "react-icons/bs"; 
import Logo from '../../public/img/Logo.png'; 

export default function Header() {
  const navigate = useNavigate();


  const handleProfileClick = () => {
    navigate('/profile');
  };



  return (
    <header className="bg-[#294D29]/90 md:bg-[#294D29]/80 text-white px-6 md:px-12 py-4 shadow-lg backdrop-blur-md sticky top-0 z-50 transition-all border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* ================= SISI KIRI: HAMBURGER (MOBILE ONLY) ================= */}
        {/* Menggunakan label untuk pure CSS sidebar toggle yang dipertahankan */}
        <label 
          htmlFor="sidebar-toggle" 
          className="text-white text-2xl focus:outline-none hover:text-[#C5A830] transition-colors cursor-pointer block md:hidden p-1 active:scale-90" 
          aria-label="Menu"
        >
          <HiOutlineBars3 />
        </label>

        {/* ================= SISI TENGAH/KIRI: BRANDING ================= */}
        <div 
          onClick={() => navigate('/dashboard')}
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

        

        {/* ================= SISI KANAN: TOMBOL PROFIL ================= */}
        <button 
          onClick={handleProfileClick}
          className="flex items-center gap-2 group focus:outline-none text-white text-2xl md:text-3xl hover:text-[#C5A830] transition-all relative p-1 active:scale-95" 
          aria-label="Profile"
        >
          <BsPersonCircle className="drop-shadow-md group-hover:rotate-12 transition-transform" />
          {/* Label nama mini tersembunyi yang muncul di layar desktop */}
          <span className="hidden md:inline-block text-xs font-bold uppercase tracking-wider text-gray-200 group-hover:text-[#C5A830] transition-colors">
            Admin
          </span>
        </button>

      </div>
    </header>
  );
}