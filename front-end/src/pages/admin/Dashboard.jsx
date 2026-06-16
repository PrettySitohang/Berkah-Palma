import { AiOutlineInbox } from "react-icons/ai"; 
import { CgDanger } from "react-icons/cg"; 
import React from 'react';
import Header from '../../components/Header'
import Bg from '../../../public/img/foto_bibit_sawit_1.png';

export default function Dashboard() {
  return (
    // Menggunakan background image statis dari asset
    <div 
      className="min-h-screen pb-10 font-sans selection:bg-[#2DAB80] selection:text-white relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white/95 pointer-events-none z-0" />

      <div className="relative z-10">
        
        <Header />

        <div className="bg-[#294D29] text-white px-6 pt-4 pb-20 rounded-bl-[60px] rounded-br-none shadow-md relative z-10 -mt-1">
          <h1 className="text-3xl font-bold tracking-wide">Overview</h1>
          <h2 className="text-3xl font-bold tracking-wide mt-1">Stok Bibit</h2>
          <p className="text-xs text-gray-300 mt-2 font-medium">Update: 1 Juni 2026, 10:38 WIB</p>
          
          <div className="flex gap-2 mt-5 overflow-x-auto no-scrollbar">
            <button className="bg-white text-[#294D29] text-xs font-bold px-5 py-2 rounded-full shadow-sm">
              Juni 2026
            </button>
            <button className="bg-white/10 text-white text-xs font-semibold px-5 py-2 rounded-full border border-white/10">
              Semua Waktu
            </button>
            <button className="bg-transparent text-white text-xs font-semibold px-5 py-2 rounded-full border border-white/20">
              Pilih Varietas
            </button>
          </div>
        </div>

        {/* 🟢 UBAHAN DI SINI: Mengubah '-mt-8' menjadi 'pt-4' agar kartu berada tepat di bawah area hijau */}
        <div className="px-5 pt-4 space-y-5">
          
          {/* Card Sisa Stok Keseluruhan */}
          <div className="bg-white/95 rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <span className="text-[#A8AFBB] font-bold text-sm tracking-wide">Sisa Stok Keseluruhan</span>
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                <span className="text-lg"><AiOutlineInbox /></span>
              </div>
            </div>
            <h3 className="text-5xl font-black text-[#020202] my-3 tracking-tight">12.500</h3>
            <div className="inline-block bg-[#ECFDF5] text-[#2DAB80] text-xs font-bold px-3 py-1.5 rounded-xl">
              +12% vs Bulan lalu
            </div>
          </div>

          {/* Grid MASUK & TERJUAL */}
          <div className="grid grid-cols-2 gap-4">
            {/* Card Masuk */}
            <div className="bg-white/95 rounded-2xl p-4 shadow-sm border border-gray-100 backdrop-blur-sm">
              <span className="text-[#A8AFBB] font-bold text-xs tracking-wider block uppercase">Masuk</span>
              <span className="text-3xl font-black text-[#020202] block mt-1">1.500</span>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#3c8bcc] h-full w-[60%]" />
              </div>
            </div>

            {/* Card Terjual */}
            <div className="bg-white/95 rounded-2xl p-4 shadow-sm border border-gray-100 backdrop-blur-sm">
              <span className="text-[#A8AFBB] font-bold text-xs tracking-wider block uppercase">Terjual</span>
              <span className="text-3xl font-black text-[#020202] block mt-1">800</span>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#3c8bcc]/60 h-full w-[45%]" />
              </div>
            </div>
          </div>

          {/* Peringatan Stok Kritis */}
          <div className="bg-white/95 rounded-3xl p-5 shadow-sm border-2 border-[#F9303B] flex gap-4 items-start backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
              <span className="text-[#F9303B] text-2xl font-bold"><CgDanger /></span>
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-[#F9303B] font-black text-base tracking-wide">Stok Kritis!!</h4>
              <p className="text-[#747474] text-xs font-medium leading-relaxed">
                Tenera Lonsum (3 Bulan) sisa 150 bibit. Harap mutasi kecambah
              </p>
              <button className="w-full bg-red-50 text-[#F9303B] text-xs font-bold py-2.5 rounded-xl mt-2 border border-red-100 hover:bg-red-100 transition-colors">
                Cek Detail
              </button>
            </div>
          </div>

          {/* --- DAFTAR KARTU VARIETAS (STATIS) --- */}

          {/* 1. Tenera PPKS */}
          <div className="bg-white/95 rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-extrabold text-[#020202] text-base tracking-tight">Tenera (DxP) PPKS</h5>
                <span className="text-[10px] font-bold text-[#A8AFBB] tracking-wider block mt-0.5">UMUR 6 BULAN</span>
              </div>
              <span className="text-xs font-bold px-4 py-1 rounded-lg border bg-emerald-50 text-[#2DAB80] border-emerald-100">
                Aman
              </span>
            </div>
            <hr className="border-gray-100" />
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <span className="text-[11px] font-bold text-[#A8AFBB] block mb-1">Awal</span>
                <span className="text-xs font-extrabold text-[#747474]">5.000</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#A8AFBB] block mb-1">Masuk</span>
                <span className="text-xs font-extrabold text-[#2DAB80]">+500</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#A8AFBB] block mb-1">Jual</span>
                <span className="text-xs font-extrabold text-[#747474]">-300</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#A8AFBB] block mb-1">Afkir</span>
                <span className="text-xs font-extrabold text-[#F9303B]">-10</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50/80">
              <span className="text-sm font-bold text-[#747474]">Sisa Stok :</span>
              <span className="text-base font-black text-[#020202]">5.190</span>
            </div>
          </div>

          {/* 2. Tenera Sriwijaya */}
          <div className="bg-white/95 rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-extrabold text-[#020202] text-base tracking-tight">Tenera (DxP) Sriwijaya</h5>
                <span className="text-[10px] font-bold text-[#A8AFBB] tracking-wider block mt-0.5">UMUR 4 BULAN</span>
              </div>
              <span className="text-xs font-bold px-4 py-1 rounded-lg border bg-emerald-50 text-[#2DAB80] border-emerald-100">
                Aman
              </span>
            </div>
            <hr className="border-gray-100" />
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <span className="text-[11px] font-bold text-[#A8AFBB] block mb-1">Awal</span>
                <span className="text-xs font-extrabold text-[#747474]">3.000</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#A8AFBB] block mb-1">Masuk</span>
                <span className="text-xs font-extrabold text-[#2DAB80]">+500</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#A8AFBB] block mb-1">Jual</span>
                <span className="text-xs font-extrabold text-[#747474]">-500</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#A8AFBB] block mb-1">Afkir</span>
                <span className="text-xs font-extrabold text-[#F9303B]">-35</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50/80">
              <span className="text-sm font-bold text-[#747474]">Sisa Stok :</span>
              <span className="text-base font-black text-[#020202]">3.465</span>
            </div>
          </div>

          {/* 3. Tenera Lonsum */}
          <div className="bg-white/95 rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-extrabold text-[#020202] text-base tracking-tight">Tenera (DxP) Lonsum</h5>
                <span className="text-[10px] font-bold text-[#A8AFBB] tracking-wider block mt-0.5">UMUR 3 BULAN</span>
              </div>
              <span className="text-xs font-bold px-4 py-1 rounded-lg border bg-red-50 text-[#F9303B] border-red-100">
                Kritis
              </span>
            </div>
            <hr className="border-gray-100" />
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <span className="text-[11px] font-bold text-[#A8AFBB] block mb-1">Awal</span>
                <span className="text-xs font-extrabold text-[#747474]">200</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#A8AFBB] block mb-1">Masuk</span>
                <span className="text-xs font-extrabold text-[#2DAB80]">+0</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#A8AFBB] block mb-1">Jual</span>
                <span className="text-xs font-extrabold text-[#747474]">-50</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#A8AFBB] block mb-1">Afkir</span>
                <span className="text-xs font-extrabold text-[#747474]">0</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-2xl bg-red-50/30">
              <span className="text-sm font-bold text-[#747474]">Sisa Stok :</span>
              <span className="text-base font-black text-[#F9303B]">150</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}