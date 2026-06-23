import React from 'react';
import { HiOutlineBars3 } from "react-icons/hi2"; 
import { BsPersonCircle } from "react-icons/bs"; 
import Logo from '../../public/img/Logo.png'; 

export default function Header() {
  return (
    <div className="bg-[#294D29] text-white px-6 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] sticky top-0 z-50 flex justify-between items-center">
      
      {/* 🎯 SEKARANG TOMBOL INI JADI LABEL UNTUK MEMICU TOGGLE SIDEBAR JALUR PURE CSS */}
      <label 
        htmlFor="sidebar-toggle" 
        className="text-white text-2xl focus:outline-none hover:text-emerald-200 transition-colors cursor-pointer block md:hidden" 
        aria-label="Menu"
      >
        <HiOutlineBars3 />
      </label>

      {/* Logo Gambar & Tulisan Berkah Palma */}
      <div className="flex items-center gap-2 select-none">
        <img 
          src={Logo} 
          alt="Logo Berkah Palma" 
          className="w-6 h-6 object-contain rounded-full" 
        />
        <span className="text-xs font-bold tracking-wider uppercase">
          BERKAH PALMA
        </span>
      </div>

      {/* Tombol Profil di Kanan */}
      <button className="text-white text-2xl focus:outline-none" aria-label="Profile">
        <BsPersonCircle />
      </button>

    </div>
  );
}