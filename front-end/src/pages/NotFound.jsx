import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiChevronLeft } from 'react-icons/bi';
import { RiSeedlingLine } from 'react-icons/ri';

export default function NotFound({ errorCode = "404", errorDescription = "Halaman Tidak Ditemukan" }) {
  const location = useLocation();

  // Menentukan arah tombol kembali yang cerdas berdasarkan URL saat ini
  const getBackPath = () => {
    if (location.pathname.startsWith('/admin')) return '/admin/dashboard';
    if (location.pathname.startsWith('/karyawan')) return '/karyawan/dashboard';
    return '/customer'; // Kembali ke Landing Page / Katalog jika diakses publik
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center bg-gray-50/30 selection:bg-[#2DAB80] selection:text-white relative overflow-hidden">
      
      {/* Efek Dekoratif Background Daun/Sertifikat (Gaya Modern Abstract) */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#294D29]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-[#C5A830]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Kontainer Ikon Ilustrasi Kecil */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#294D29]/5 border border-[#294D29]/10 text-[#C5A830] mb-4 shadow-inner animate-pulse">
        <RiSeedlingLine className="text-3xl" />
      </div>
      
      {/* Kode Error - Menggunakan warna hijau utama Berkah Palma */}
      <h1 className="text-[110px] md:text-[160px] font-extrabold text-[#294D29] leading-none tracking-tighter drop-shadow-sm font-sans select-none">
        {errorCode}
      </h1>
      
      {/* Batas Detail */}
      <div className="w-16 h-1 bg-[#C5A830] rounded-full my-2 mx-auto" />
      
      {/* Deskripsi Utama */}
      <h2 className="mt-4 text-xl md:text-2xl font-black text-gray-800 tracking-wide uppercase">
        {errorDescription}
      </h2>
      
      {/* Sub-teks penjelasan */}
      <p className="mt-3 text-gray-500 max-w-sm text-xs md:text-sm leading-relaxed font-medium">
        Maaf, rute atau halaman yang Anda tuju mungkin telah dihapus, 
        mengalami perubahan alamat, atau belum ter-bagikan di sistem.
      </p>
      
      {/* Tombol Kembali - Menggunakan Link React Router agar tidak reload halaman */}
      <Link 
        to={getBackPath()} 
        className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-[#294D29] hover:bg-[#1f3a1f] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-[#294D29]/20 hover:shadow-xl transition-all duration-200 active:scale-95 group"
      >
        <BiChevronLeft className="text-xl -ml-1 mr-1 group-hover:-translate-x-0.5 transition-transform" />
        Kembali ke Dashboard
      </Link>

      {/* Footer Branding Selaras */}
      <div className="mt-16 opacity-40 select-none flex items-center gap-1.5">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Berkah Palma Internal System
        </span>
      </div>
    </main>
  );
}