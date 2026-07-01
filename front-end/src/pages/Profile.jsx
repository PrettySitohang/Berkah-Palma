import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { FiMail, FiUser, FiBriefcase, FiLogOut } from 'react-icons/fi';
import logoBerkah from '../assets/logo_berkah.png'; 
import Bg from '../../../public/img/foto_bibit_sawit_1.png'; // Menggunakan asset gambar sawit yang sama agar konsisten

export default function Profile() {
  const navigate = useNavigate();

  // Murni Tanpa Context: Mengambil data user langsung dari localStorage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    // Bersihkan semua session login dari localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    
    // Redirect balik ke halaman login
    navigate('/login');
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Jika data user tidak sengaja hilang/kosong di localStorage
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#294D29]/5">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-sm border border-gray-100">
          <p className="text-gray-500 font-medium mb-5">Pengguna tidak ditemukan. Silakan login kembali.</p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-[#2DAB80] hover:bg-[#238c68] text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95"
          >
            Ke Halaman Login
          </button>
        </div>
      </div>
    );
  }

  const roleLabel = user.role === 'admin' ? 'Admin' : 'Karyawan';

  return (
    <div 
      className="min-h-screen pb-12 font-sans selection:bg-[#2DAB80] selection:text-white relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      {/* 🎯 OVERLAY UTAMA: Menggunakan warna hijau #294D29 transparan di seluruh latar belakang */}
      <div className="absolute inset-0 bg-[#294D29]/80 md:bg-[#294D29]/75 pointer-events-none z-0 backdrop-blur-sm" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-6">
        
        {/* ================= HEADER DENGAN TOMBOL BACK ================= */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center rounded-xl transition-all text-white text-xl active:scale-90"
            aria-label="Kembali"
          >
            <BiArrowBack />
          </button>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-widest">Profil Saya</h1>
            <p className="text-[10px] text-gray-300 font-semibold uppercase tracking-wider -mt-0.5">Informasi Akun Internal</p>
          </div>
        </div>

        {/* ================= CARD PROFILE PREMIUM ================= */}
        <div className="max-w-md mx-auto bg-white/95 rounded-[32px] shadow-2xl overflow-hidden border border-white/20 backdrop-blur-md mt-12">
          
          {/* Header Internal Card Background */}
          <div className="bg-gradient-to-br from-[#294D29] to-[#1e381e] h-28 relative">
            {/* Pola dekoratif lingkaran abstrak mini */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full" />
          </div>

          {/* Profile Content */}
          <div className="px-6 pb-8 relative">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center -mt-14 mb-6">
              <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 mb-3 group transition-transform duration-300 hover:scale-105">
                <img
                  src={logoBerkah}
                  alt="Logo Berkah Palma"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            {/* Nama & Role */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-[#020202] tracking-tight">{user.nama}</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                {/* Badge Emas jika Admin, Hijau jika Karyawan */}
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm ${
                  user.role === 'admin' 
                    ? 'bg-[#C5A830]/10 text-[#C5A830] border border-[#C5A830]/20' 
                    : 'bg-[#2DAB80]/10 text-[#2DAB80] border border-[#2DAB80]/20'
                }`}>
                  {roleLabel}
                </span>
              </div>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-2">Berkah Palma Nursery</p>
            </div>

            {/* Info Section (Menggunakan Ikon & Struktur Bersih) */}
            <div className="space-y-3 mb-6">
              
              {/* Username */}
              <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 shadow-inner">
                  <FiUser className="text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Username ID</span>
                  <span className="text-sm font-bold text-gray-800 block truncate">{user.username}</span>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 shadow-inner">
                  <FiMail className="text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Alamat Email</span>
                  <span className="text-sm font-bold text-gray-800 block truncate">{user.email}</span>
                </div>
              </div>

              {/* Posisi Kerja */}
              <div className="bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 shadow-inner">
                  <FiBriefcase className="text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Otoritas Akses</span>
                  <span className="text-sm font-bold text-gray-800 block truncate">{roleLabel} Panel</span>
                </div>
              </div>

            </div>

            {/* Logout Button (Gaya Tombol Merah Kritis Modern) */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-50 hover:bg-red-500 text-red-500 hover:text-white font-black text-xs uppercase tracking-wider py-4 px-4 rounded-xl flex items-center justify-center gap-2 border border-red-100 shadow-sm transition-all active:scale-[0.98]"
            >
              <FiLogOut className="text-sm" />
              Keluar dari Sistem
            </button>

            {/* Info Footer */}
            <p className="text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-6">
              Version 1.0.0 &copy; 2026
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}