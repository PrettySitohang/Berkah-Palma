import React from 'react';
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import logoBerkah from '../assets/logo_berkah.png'; 

const Sidebar = () => {
  // 1. Ambil data role user dari localStorage/sessionStorage saat login
  // Sediakan fallback 'karyawan' jika data belum terbaca
  const userRole = localStorage.getItem('role') || 'karyawan'; // Nilainya bisa: 'admin' atau 'karyawan'

  // 2. Helper classes untuk navigasi aktif/tidak aktif
  const navLinkClasses = ({ isActive }) => `
    flex items-center gap-3 px-4 py-3 font-bold tracking-wide text-xs uppercase transition-all duration-200 group relative
    ${isActive 
      ? 'bg-white/10 text-white shadow-sm border-l-4 border-[#C5A830] pl-3' 
      : 'text-emerald-100/60 hover:bg-white/5 hover:text-white hover:pl-5'
    }
  `;

  // 3. Otomatisasi prefix path URL berdasarkan role login
  const prefix = userRole === 'admin' ? '/admin' : '/karyawan';

  return (
    <>
      {/* Pure CSS Sidebar Toggle Trigger */}
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />
      
      {/* Overlay Backdrop Blur saat di Mobile */}
      <label 
        htmlFor="sidebar-toggle" 
        className="fixed inset-0 bg-slate-900/60 z-40 hidden peer-checked:block md:hidden cursor-pointer backdrop-blur-sm transition-all duration-300" 
      />

      <aside className="fixed top-0 left-0 bottom-0 w-[280px] z-50 bg-[#1e381e] transform -translate-x-full peer-checked:translate-x-0 md:translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl flex flex-col rounded-r-xl md:rounded-none border-r border-white/5">
        
        {/* ================= HEADER SIDEBAR ================= */}
        <div className="h-24 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-3 select-none">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 p-1 border border-white/10 shadow-inner">
              <img 
                src={logoBerkah} 
                alt="Logo Berkah Palma" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <h1 className="text-white font-black text-sm tracking-widest uppercase">BERKAH PALMA</h1>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block -mt-0.5">
                {userRole === 'admin' ? 'Admin Workspace' : 'Karyawan Workspace'}
              </span>
            </div>
          </div>
          
          {/* Tombol Close Mobile */}
          <label 
            htmlFor="sidebar-toggle" 
            className="md:hidden w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white text-lg cursor-pointer transition-colors active:scale-95"
          >
            <FiX />
          </label>
        </div>
        
        {/* ================= MENU NAVIGATION ================= */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-6 space-y-6">
          
          {/* Kelompok Menu 1: Core */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 block mb-2">Main Menu</span>
            
            {/* Dashboard (Akan mengarah ke /admin/dashboard atau /karyawan/dashboard) */}
            <NavLink to={`${prefix}/dashboard`} className={navLinkClasses}>
              <FiHome className="text-base group-hover:text-[#C5A830] transition-colors" /> 
              <span>Dashboard</span>
            </NavLink>
          </div>

          {/* ================= KHUSUS MENU ADMIN (MANAJEMEN AKUN) ================= */}
          {userRole === 'admin' && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 block mb-2">User Control</span>
              
              <NavLink to="/admin/akun" className={navLinkClasses}>
                <FiUsers className="text-base group-hover:text-[#C5A830] transition-colors" /> 
                <span>Manajemen Akun</span>
              </NavLink>
            </div>
          )}

          {/* Kelompok Menu 2: Management */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 block mb-2">Management Data</span>

            {/* Manajemen Bibit */}
            <NavLink to={`${prefix}/bibit`} className={navLinkClasses}>
              <FiBox className="text-base group-hover:text-[#C5A830] transition-colors" /> 
              <span>Manajemen Bibit</span>
            </NavLink>
          </div>

          {/* Kelompok Menu 3: Operasional */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 block mb-2">Transaksi</span>

            {/* Kelola Pesanan */}
            <NavLink to={`${prefix}/pesanan`} className={navLinkClasses}>
              <FiShoppingCart className="text-base group-hover:text-[#C5A830] transition-colors" /> 
              <span>Kelola Pesanan</span>
            </NavLink>
          </div>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;