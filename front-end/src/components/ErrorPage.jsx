import React from 'react';
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function ErrorPage({ errorCode, errorDescription, errorImage }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-transparent">
      
      {errorImage && (
        <img 
          src={errorImage} 
          alt={`Error ${errorCode}`} 
          className="w-64 h-64 mb-8 object-contain drop-shadow-md" 
        />
      )}
      
      <h1 className="text-[100px] md:text-[150px] font-black text-hijau leading-none tracking-tighter">
        {errorCode || "404"}
      </h1>
      
      <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-gray-800">
        {errorDescription || "Halaman Tidak Ditemukan"}
      </h2>
      
      <p className="mt-4 text-gray-500 max-w-md text-sm md:text-base">
        Maaf, sepertinya terjadi kesalahan atau halaman yang Anda tuju 
        sedang tidak tersedia saat ini.
      </p>
      
      <Link 
        to="/" 
        className="mt-10 flex items-center justify-center px-8 py-3 bg-hijau text-white font-bold rounded-xl shadow-lg shadow-green-100 hover:brightness-95 transition-all active:scale-95"
      >
        <HiArrowLeft className="mr-2 text-lg" />
        Kembali ke Beranda
      </Link>

      <div className="mt-12 opacity-20 select-none">
        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">
          Sedap Restaurant Admin System
        </span>
      </div>
    </main>
  );
}