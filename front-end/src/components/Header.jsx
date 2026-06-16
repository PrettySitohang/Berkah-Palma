import React from 'react';
import { HiOutlineBars3 } from "react-icons/hi2"; // Menggunakan hi2 untuk versi Bars3 terbaru
import { BsPersonCircle } from "react-icons/bs"; 
import Logo from '../../public/img/Logo.png'; 

export default function Header() {
  return (
    // 💡 sticky top-0 & shadow: Mengunci posisi di atas dengan efek bayangan melayang
    <div className="bg-[#294D29] text-white px-6 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] sticky top-0 z-50 flex justify-between items-center">
      
      {/* Tombol Navigasi Garis Tiga */}
      <button className="text-white text-2xl focus:outline-none" aria-label="Menu">
        <HiOutlineBars3 />
      </button>

      {/* Logo Gambar & Tulisan Berkah Palma */}
      <div className="flex items-center gap-2">
        {/* Mengganti lingkaran putih dengan tag img dari asset Logo */}
        <img 
          src={Logo} 
          alt="Logo Berkah Palma" 
          className="w-6 h-6 object-contain rounded-full" 
        />
        <span className="text-xs font-bold tracking-wider uppercase">
          BERKAH PALMA
        </span>
      </div>

      {/* Tombol Profil di Kanan (Menggunakan BsPersonCircle) */}
      <button className="text-white text-2xl focus:outline-none" aria-label="Profile">
        <BsPersonCircle />
      </button>

    </div>
  );
}