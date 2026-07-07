import React from "react";
import { FiHome, FiUsers, FiBox, FiShoppingCart, FiX } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import logoBerkah from "../assets/logo_berkah.png";

const Sidebar = () => {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");
  const prefix = isAdmin ? "/admin" : "/karyawan";

  const navLinkClasses = ({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all
    ${
      isActive
        ? "bg-white/20 text-white shadow-inner"
        : "text-emerald-100/70 hover:bg-white/10 hover:text-white"
    }
  `;

  return (
    <>
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />
      <label
        htmlFor="sidebar-toggle"
        className="fixed inset-0 bg-slate-900/60 z-40 hidden peer-checked:block md:hidden cursor-pointer backdrop-blur-sm transition-opacity"
      />

      <aside className="fixed top-0 left-0 bottom-0 w-[280px] z-50 bg-[#294D29] transform -translate-x-full peer-checked:translate-x-0 md:translate-x-0 transition-transform duration-300 shadow-2xl flex flex-col rounded-r-2xl md:rounded-none border-r border-[#1e3223]">
        <div className="h-28 flex items-center justify-between px-6 bg-[#294D29] rounded-tr-2xl md:rounded-none border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={logoBerkah}
              alt="Logo Berkah Palma"
              className="w-10 h-10 object-contain bg-white rounded-full p-0.5"
            />
            <div>
              <h1 className="text-white font-bold text-lg tracking-wide">
                BERKAH PALMA
              </h1>
              <span className="text-[10px] text-emerald-100/60 font-semibold uppercase tracking-wider block -mt-0.5">
                {isAdmin ? "Admin Workspace" : "Karyawan Workspace"}
              </span>
            </div>
          </div>
          <label
            htmlFor="sidebar-toggle"
            className="md:hidden text-white/50 hover:text-white text-2xl cursor-pointer transition-colors"
          >
            <FiX />
          </label>
        </div>

        <nav className="px-4 py-6 space-y-2 flex-1">
          <NavLink to={`${prefix}/dashboard`} className={navLinkClasses}>
            <FiHome /> Dashboard
          </NavLink>

          {/* Cuma nongol kalau lagi di /admin/* */}
          {isAdmin && (
            <NavLink to="/admin/akun" className={navLinkClasses}>
              <FiUsers /> Manajemen Akun
            </NavLink>
          )}

          <NavLink to={`${prefix}/bibit`} className={navLinkClasses}>
            <FiBox /> Manajemen Bibit
          </NavLink>

          <NavLink to={`${prefix}/pesanan`} className={navLinkClasses}>
            <FiShoppingCart /> Kelola Pesanan
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;