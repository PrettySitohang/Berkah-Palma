import React from 'react';
import { FiHome, FiUsers, FiBox, FiShoppingCart, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import logoBerkah from '../assets/logo_berkah.png'; 

const Sidebar = () => {
  return (
    <>
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />
      <label htmlFor="sidebar-toggle" className="fixed inset-0 bg-slate-900/60 z-40 hidden peer-checked:block md:hidden cursor-pointer backdrop-blur-sm transition-opacity" />

      <aside className="fixed top-0 left-0 bottom-0 w-[280px] z-50 bg-[#2a4530] transform -translate-x-full peer-checked:translate-x-0 md:translate-x-0 transition-transform duration-300 shadow-2xl flex flex-col rounded-r-2xl md:rounded-none border-r border-[#1e3223]">
        
        <div className="h-28 flex items-center justify-between px-6 bg-[#2a4530] rounded-tr-2xl md:rounded-none">
          <div className="flex items-center gap-3">
            <img 
              src={logoBerkah} 
              alt="Logo Berkah Palma" 
              className="w-10 h-10 object-contain bg-white rounded-full p-0.5" 
            />
            <h1 className="text-white font-bold text-lg tracking-wide">BERKAH PALMA</h1>
          </div>
          <label htmlFor="sidebar-toggle" className="md:hidden text-white/50 hover:text-white text-2xl cursor-pointer transition-colors">
            <FiX />
          </label>
        </div>
        
        <nav className="px-4 py-6 space-y-2 flex-1">
          {/* Dashboard */}
          <NavLink to="/admin/dashboard" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive ? 'bg-white/20 text-white shadow-inner' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'}`}>
            <FiHome /> Dashboard
          </NavLink>
          
          {/* Manajemen Akun */}
          <NavLink to="/admin/akun" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive ? 'bg-white/20 text-white shadow-inner' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'}`}>
            <FiUsers /> Manajemen Akun
          </NavLink>

          {/* Manajemen Bibit */}
          <NavLink to="/admin/bibit" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive ? 'bg-white/20 text-white shadow-inner' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'}`}>
            <FiBox /> Manajemen Bibit
          </NavLink>

          {/* Kelola Pesanan */}
          <NavLink to="/admin/pesanan" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive ? 'bg-white/20 text-white shadow-inner' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'}`}>
            <FiShoppingCart /> Kelola Pesanan
          </NavLink>
        </nav>

      </aside>
    </>
  );
};

export default Sidebar;