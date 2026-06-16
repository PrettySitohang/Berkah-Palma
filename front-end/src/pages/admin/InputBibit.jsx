import React from 'react';
import { HiChevronLeft } from 'react-icons/hi2';
import { FiInfo } from 'react-icons/fi';
import Bg from '../../../public/img/foto_bibit_sawit_1.png';

export default function InputBibit() {
  return (
    <div 
      className="min-h-screen pb-12 font-sans selection:bg-[#2DAB80] selection:text-white relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      {/* Latar belakang transparan tipis agar background luar tetep estetik */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white/90 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* 🟩 HEADER HIJAU ASIMETRIS (Sisi kiri bawah melengkung oval besar) */}
        <div className="bg-[#294D29] text-white px-6 pt-8 pb-20 rounded-bl-[60px] rounded-br-[60px] shadow-md relative z-10">
          <div className="flex items-center gap-3">
            <button className="text-2xl focus:outline-none" aria-label="Kembali">
              <HiChevronLeft />
            </button>
            <div className="space-y-0.5">
              <h1 className="text-2xl font-bold tracking-wide">Input Varietas</h1>
              <p className="text-xs text-gray-300/90 font-medium">Master Data Varietas</p>
            </div>
          </div>
        </div>

        <div className="px-8 -mt-10 relative z-20 flex-1 w-full">
          
          <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-5 py-6 space-y-6">
            
            {/* ℹ️ BOX INFO / ALERT (Warna Hijau Keabuan Halus) */}
            <div className="bg-[#EAEFEA]/80 border-2 border-[#315631a0] rounded-2xl p-4 flex gap-3 items-start">
                <FiInfo className="text-[#294D29] text-lg mt-0.5 shrink-0" />
                <p className="text-[#435343] text-xs font-semibold leading-relaxed">
                Form ini digunakan untuk mendaftarkan jenis varietas baru. Untuk penambahan stok bibit, gunakan menu <span className="font-bold text-[#294D29]">Manajemen Stok</span>.
              </p>
            </div>

            {/* INPUT 1: Nama Varietas */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Nama Varietas <span className="text-[#F9303B]">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Contoh: PPKS Simalungun" 
                className="w-full bg-[#F9FBF9] border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all"
              />
            </div>

            {/* INPUT 2: Umur Bibit */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Umur Bibit <span className="text-[#F9303B]">*</span>
              </label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  placeholder="0" 
                  className="w-full bg-[#F9FBF9] border border-gray-200 rounded-xl pl-4 pr-20 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all"
                />
                {/* Badge BULAN di ujung kanan dalam input */}
                <span className="absolute right-3 bg-gray-100 text-gray-400 text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-lg border border-gray-200/50 pointer-events-none">
                  BULAN
                </span>
              </div>
            </div>

            {/* INPUT 3: Deskripsi Tambahan */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-[#020202] tracking-wide block">
                  Deskripsi Tambahan
                </label>
                <span className="bg-gray-200/60 text-gray-400 text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md">
                  OPSIONAL
                </span>
              </div>
              <textarea 
                rows="5"
                placeholder="Tuliskan keunggulan atau karakteristik varietas di sini..." 
                className="w-full bg-[#F9FBF9] border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* 🎯 BUTTON AKSI UTAMA */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-[#435343] hover:bg-[#294D29] text-white text-sm font-bold py-4 rounded-xl shadow-md transition-all focus:outline-none tracking-wide"
              >
                Simpan Varietas
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}