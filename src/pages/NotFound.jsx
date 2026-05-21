import React from 'react';
import { HiArrowLeft } from "react-icons/hi"; // Opsional: menggunakan react-icons agar konsisten

export default function ErrorPage({ errorCode = "404", errorDescription = "Oops! Halaman Tidak Ditemukan." }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center bg-gray-50/50">
      
      {/* Kode Error - Menggunakan warna hijau brand */}
      <h1 className="text-[120px] md:text-[180px] font-black text-hijau leading-none tracking-tighter drop-shadow-sm">
        {errorCode}
      </h1>
      
      {/* Deskripsi Utama */}
      <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-gray-900">
        {errorDescription}
      </h2>
      
      {/* Sub-teks penjelasan (Sesuai gambar) */}
      <p className="mt-4 text-gray-500 max-w-md text-sm md:text-base leading-relaxed">
        Maaf, halaman yang Anda cari mungkin telah dihapus, <br />
        dipindahkan, atau memang tidak pernah ada.
      </p>
      
      {/* Tombol Kembali - Mengikuti style tombol "Add Menus" di Sidebar */}
      <a 
        href="/" 
        className="mt-10 flex items-center justify-center px-8 py-3 bg-hijau text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:opacity-90 transition-all active:scale-95"
      >
        <HiArrowLeft className="mr-2 text-lg" />
        Kembali ke Beranda
      </a>

      {/* Footer Dekoratif (Opsional, untuk konsistensi brand) */}
      <div className="mt-12 opacity-30 select-none">
        <span className="font-bold text-gray-400">Sedap Restaurant Admin</span>
      </div>
    </main>
  );
}