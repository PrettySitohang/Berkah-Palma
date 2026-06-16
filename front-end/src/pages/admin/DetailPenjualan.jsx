import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

const DetailPenjualan = () => {
  const navigate = useNavigate();

  return (
    // pb-28 penting agar konten paling bawah tidak tertutup oleh tombol fixed
    <div className="min-h-screen bg-slate-50 pb-28 font-sans" style={{ fontFamily: '"Poppins", sans-serif' }}>
      
      {/* --- HEADER --- */}
      <div className="bg-[#2a4530] px-6 pt-10 pb-10 text-white rounded-b-[2rem] shadow-md relative z-10">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
            className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <div>
            <h1 className="text-[22px] md:text-2xl font-bold leading-tight">Detail Penjualan</h1>
            <p className="text-[11px] text-emerald-100/70 font-bold tracking-widest mt-1 uppercase">INVOICE: INV-260611-001</p>
          </div>
        </div>
      </div>

      {/* --- KONTEN UTAMA --- */}
      <div className="px-5 mt-6 max-w-3xl mx-auto space-y-4">
        
        {/* 1. Status Pesanan */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex justify-between items-center">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Status Pesanan</span>
          <span className="bg-orange-50 text-orange-500 font-bold px-3 py-1.5 rounded-lg text-[10px] tracking-wide">
            MENUNGGU KONFIRMASI
          </span>
        </div>

        {/* 2. Informasi Pembeli */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Informasi Pembeli</h3>
          <div className="h-[1px] bg-slate-50 w-full mb-3"></div>
          <h2 className="font-bold text-slate-800 text-[15px]">KUD Tani Makmur</h2>
          <p className="text-[12px] text-slate-500 mt-1">PJ: Bpk. Sudirman | 0812-3456-7890</p>
        </div>

        {/* 3. Daftar Bibit */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Daftar Bibit</h3>
          <div className="h-[1px] bg-slate-50 w-full mb-3"></div>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-slate-800 text-[14px]">PPKS Simalungun</h2>
              <p className="text-[12px] text-slate-400 mt-0.5">1.500 Pokok x Rp 45.000</p>
            </div>
            <span className="font-bold text-slate-800 text-[14px]">Rp 67.500.000</span>
          </div>
        </div>

        {/* 4. Total Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[13px] text-slate-500 font-medium">Subtotal</span>
            <span className="text-[13px] text-slate-500 font-medium">Rp 67.500.000</span>
          </div>
          <div className="h-[1px] bg-slate-50 w-full"></div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total Akhir</span>
            <span className="text-[18px] font-black text-[#2a4530]">Rp 67.500.000</span>
          </div>
        </div>

      </div>

      {/* --- ACTION BAR BAWAH --- */}
      {/* md:left-[280px] ini memastikan tombol tidak menabrak sidebar desktop */}
      <div className="fixed bottom-0 left-0 right-0 md:left-[280px] bg-white border-t border-slate-100 p-4 px-5 z-30">
        <div className="max-w-3xl mx-auto flex gap-3 w-full">
          <button className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors active:scale-95">
            TOLAK
          </button>
          <button className="flex-[2] py-3.5 rounded-xl bg-[#2a4530] text-white font-bold text-[13px] hover:bg-[#1e3223] transition-colors shadow-lg shadow-[#2a4530]/20 active:scale-95">
            KONFIRMASI PESANAN
          </button>
        </div>
      </div>

    </div>
  );
};

export default DetailPenjualan;