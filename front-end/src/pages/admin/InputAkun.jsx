import React, { useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi2';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Bg from '../../../public/img/foto_bibit_sawit_1.png';

export default function InputAkun() {
  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(true);

  return (
    <div 
      className="min-h-screen pb-10 font-sans selection:bg-[#2DAB80] selection:text-white relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      {/* 🟢 SEBELUMNYA from-white/40, SEKARANG DIUBAH JADI LEBIH PUTIH (transparan tipis-tipis sesuai Figma) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/95 to-white/98 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Header Tetap Aman */}
        <div className="bg-[#294D29] text-white px-4 py-5 flex items-center gap-3 shadow-md sticky top-0 z-50">
          <button className="text-2xl focus:outline-none" aria-label="Kembali">
            <HiChevronLeft />
          </button>
          <span className="text-lg font-bold tracking-wide">Input Akun Staf</span>
        </div>

        {/* 🟢 BACKDROP BLUR DI-SET TIPIS AGAR BACKGROUND TETAP MENGINTIP ESTETIK */}
        <div className="flex-1 px-6 pt-8 pb-24 space-y-8 bg-white/30 backdrop-blur-[1px]">
          
          {/* Data Profile Tetap Aman */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-black text-[#020202] tracking-tight">Data Profile</h2>
              <p className="text-[#747474] text-xs font-medium mt-1 leading-relaxed">
                Lengkapi form di bawah untuk menambahkan staf baru ke sistem.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Nama Lengkap <span className="text-[#F9303B]">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Masukkan nama..." 
                className="w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Username <span className="text-[#F9303B]">*</span>
              </label>
              <input 
                type="text" 
                placeholder="@budi.karyawan" 
                className="w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Hak Akses <span className="text-[#F9303B]">*</span>
              </label>
              <div className="relative">
                <select className="w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#020202] appearance-none focus:outline-none focus:border-[#294D29] focus:bg-white transition-all shadow-sm">
                  <option value="">Pilih akses...</option>
                  <option value="admin">Admin</option>
                  <option value="staf">Karyawan</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200/60" />

          {/* Keamanan Tetap Aman */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-[#020202] tracking-tight">Keamanan</h2>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Password <span className="text-[#F9303B]">*</span>
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Minimal 8 karakter" 
                  className="w-full bg-white/90 border border-gray-200 rounded-xl pl-4 pr-12 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all shadow-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 text-lg focus:outline-none"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="space-y-0.5">
                <span className="text-sm font-black text-[#020202] tracking-wide block">Aktifkan Akun</span>
                <span className="text-xs font-medium text-[#747474] block">Staf dapat langsung login</span>
              </div>
              
              <button 
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out focus:outline-none ${isActive ? 'bg-[#294D29]' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isActive ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* 🟢 UBAHAN UTAMA: Tombol Batal digeser ke ujung kiri pakai 'justify-between' */}
          <div className="flex items-center justify-between pt-10">
            <button 
              type="button" 
              className="text-[#747474]/80 hover:text-[#020202] text-sm font-bold tracking-wide focus:outline-none transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="bg-[#435343] hover:bg-[#294D29] text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-gray-200 transition-all focus:outline-none"
            >
              Simpan Data
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}