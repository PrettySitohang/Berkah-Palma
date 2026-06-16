import React from 'react';
import { FiSearch, FiSliders, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { HiPlus } from 'react-icons/hi';
import Bg from '../../../public/img/foto_bibit_sawit_1.png';
import Header from '../../components/Header';

export default function ManajemenBibit() {
  const dataVarietas = [
    {
      id: 1,
      inisial: 'PP',
      nama: 'Tenera (DxP) PPKS',
      umur: '6 Bulan',
      deskripsi: 'Potensi produksi CPO tinggi, sangat adaptif di lahan mineral dengan ...',
      status: 'STANDAR',
    },
    {
      id: 2,
      inisial: 'SR',
      nama: 'Tenera (DxP) Sriwijaya',
      umur: '4 Bulan',
      deskripsi: 'Tahan terhadap cekaman kekeringan, laju pertumbuhan meninggi yang lambat.',
      status: 'STANDAR',
    },
    {
      id: 3,
      inisial: 'LO',
      nama: 'Tenera (DxP) Lonsum',
      umur: '3 Bulan',
      deskripsi: 'Pertumbuhan vegetatif sangat seragam dengan kualitas kecambah yang ...',
      status: 'STANDAR',
    },
  ];

  return (
    <div 
      className="min-h-screen pb-10 font-sans selection:bg-[#2DAB80] selection:text-white relative bg-fixed bg-cover bg-center z-0"
      style={{ backgroundImage: `url(${Bg})` }} // 👈 Gambar Bg dipasang di sini biar muncul latar belakangnya
    >
      {/* Overlay gradasi transparan */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#294D29]/10 via-white/80 to-white/95 pointer-events-none z-10" />

      {/* Konten utama */}
      <div className="relative z-20">
        
        {/* Area Hijau Atas (Header & Judul) */}
        <div className="bg-[#294D29] text-white rounded-bl-[60px] rounded-br-none shadow-md relative z-30 pb-20">
          
          {/* 🟢 NAVBAR ATAS BARU */}
          <Header /> {/* 👈 Komponen Header kamu sukses nangkring di sini dengan rapi, bos! */}

          {/* Bagian Judul dan Tombol Tambah */}
          <div className="px-6 pt-6 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold tracking-wide">Manajemen</h1>
              <h2 className="text-3xl font-bold tracking-wide mt-1">Bibit</h2>
              <p className="text-xs text-gray-300 mt-4 font-medium tracking-wide">Master Data Varietas</p>
            </div>
            
            <button className="bg-[#68B984] hover:bg-[#57a673] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1 transition-colors mt-2">
              <HiPlus className="text-base" /> Tambah Bibit
            </button>
          </div>

        </div>

        {/* Konten Utama (Form Pencarian & Daftar Kartu) */}
        <div className="px-5 -mt-8 relative z-30 space-y-4">
          
          {/* Bar Pencarian dan Filter */}
          <div className="bg-[#1E3A1E]/30 p-2.5 rounded-2xl flex gap-2 items-center backdrop-blur-md">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FiSearch className="text-lg" />
              </span>
              <input 
                type="text" 
                placeholder="Cari nama varietas..." 
                className="w-full bg-white/95 text-gray-700 placeholder-gray-400 text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none font-medium shadow-sm"
              />
            </div>
            <button className="bg-white/95 text-gray-500 p-2.5 rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
              <FiSliders className="text-lg rotate-90" />
            </button>
          </div>

          {/* Iterasi List Data Varietas */}
          <div className="space-y-4">
            {dataVarietas.map((varietas) => (
              <div 
                key={varietas.id} 
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/40 flex flex-col justify-between"
              >
                {/* Bagian Atas Kartu */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-[#D1F5E9] text-[#1E5641] font-bold text-base flex items-center justify-center shrink-0 shadow-inner">
                      {varietas.inisial}
                    </div>
                    <div>
                      <h4 className="text-[#020202] font-extrabold text-base tracking-tight">
                        {varietas.nama}
                      </h4>
                      <p className="text-gray-500 text-xs font-semibold mt-0.5">
                        Umur: {varietas.umur}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-[#E6F4EA] text-[#137333] px-3 py-1 rounded-full tracking-wider border border-green-100">
                    {varietas.status}
                  </span>
                </div>

                <hr className="border-gray-200/60 my-3" />

                {/* Bagian Bawah Kartu */}
                <div className="flex justify-between items-end gap-4">
                  <p className="text-gray-600 text-xs font-medium leading-relaxed max-w-[75%]">
                    {varietas.deskripsi}
                  </p>
                  
                  <div className="flex gap-2 shrink-0">
                    <button className="p-2 bg-white/80 text-gray-500 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors shadow-sm">
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button className="p-2 bg-white/80 text-gray-500 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors shadow-sm">
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}