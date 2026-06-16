import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiMenu, FiPlus } from 'react-icons/fi';
// Pastikan path gambarnya sesuai dengan di foldermu
import bgHero from '../../assets/foto_bibit_sawit.png'; 
import accountData from '../../data/accountData.json';

const ManajemenAkun = () => {
  const navigate = useNavigate();
  
  // State untuk data akun dan kata kunci pencarian
  const [accounts, setAccounts] = useState(accountData);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect untuk fitur Live Search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Jika input kosong, kembalikan ke data awal
      setAccounts(accountData);
    } else {
      // Filter berdasarkan nama atau username (case-insensitive)
      const filtered = accountData.filter((acc) => 
        acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setAccounts(filtered);
    }
  }, [searchTerm]); // useEffect akan berjalan setiap kali 'searchTerm' berubah

  // Fungsi toggle aktif/nonaktif
  const handleToggleStatus = (id) => {
    setAccounts(accounts.map(acc => 
      acc.id === id ? { ...acc, status: !acc.status } : acc
    ));
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-800 pb-20 overflow-hidden" style={{ fontFamily: '"Poppins", sans-serif' }}>
      
      {/* --- BACKGROUND SESUAI FIGMA --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* 1. Base Putih */}
        <div className="absolute inset-0 bg-white"></div>
        {/* 2. Gambar dengan Opacity 63% */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.63]" 
          style={{ backgroundImage: `url(${bgHero})` }}
        ></div>
        {/* 3. Linear Gradient dari Figma */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, 
              rgba(68, 96, 68, 0.72) 0%, 
              rgba(68, 96, 68, 0.46) 3%, 
              rgba(255, 255, 255, 0) 16%, 
              rgba(255, 196, 82, 0.22) 36%, 
              rgba(255, 255, 255, 0.62) 54%, 
              rgba(255, 255, 255, 0.95) 91%, 
              rgba(255, 255, 255, 1) 100%)`
          }}
        ></div>
      </div>

      {/* --- KONTEN UTAMA --- */}
      <div className="relative z-10">
        
        {/* HEADER */}
        <div className="bg-[#2a4530] rounded-bl-[3.5rem] px-6 pt-10 pb-10 text-white shadow-xl">
          <div className="max-w-3xl mx-auto">
            {/* Tombol Hamburger pemicu Sidebar */}
            <label htmlFor="sidebar-toggle" className="inline-block mb-6 text-white text-2xl cursor-pointer hover:text-emerald-200 transition-colors md:hidden">
              <FiMenu />
            </label>
            
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-[24px] md:text-3xl font-bold leading-tight">Manajemen<br/>Akun Staf</h1>
                <p className="text-[12px] md:text-sm text-emerald-100/70 mt-1 font-medium">Kelola akses operasional karyawan</p>
              </div>
              <button 
                onClick={() => navigate('/admin/akun/form')}
                className="bg-[#8ec28b] hover:bg-[#7ab077] active:scale-95 text-[#1e3223] font-bold text-sm py-2.5 px-5 rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                <FiPlus className="font-bold" /> Tambah
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="px-5 mt-8 max-w-3xl mx-auto space-y-5">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"><FiSearch /></span>
              
              {/* INPUT PENCARIAN DIHUBUNGKAN DENGAN STATE */}
              <input 
                type="text" 
                placeholder="Cari nama atau username..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-none bg-white shadow-sm text-sm focus:outline-none focus:ring-0 transition-all placeholder:text-slate-400" 
              />
            </div>
            <button className="p-3.5 bg-white rounded-2xl text-slate-500 hover:text-[#2a4530] shadow-sm transition-all text-lg">
              <FiFilter />
            </button>
          </div>

          {/* LIST AKUN */}
          <div className="grid gap-4">
            {/* Pesan jika data tidak ditemukan */}
            {accounts.length === 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-[1.5rem] p-6 text-center shadow-sm border border-white">
                <p className="text-slate-500 font-medium text-sm">Tidak ada akun yang sesuai dengan pencarian.</p>
              </div>
            )}

            {accounts.map((acc) => (
              <div key={acc.id} className="bg-white/80 backdrop-blur-sm rounded-[1.5rem] p-5 shadow-sm border border-white flex flex-col gap-4 hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base shadow-sm ${acc.color}`}>
                      {acc.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-[15px] leading-tight">{acc.name}</h3>
                      <p className="text-[12px] text-slate-400 font-medium">{acc.username}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg tracking-wider ${acc.status ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    {acc.role}
                  </span>
                </div>

                <div className="h-[1px] bg-slate-100 w-full"></div>

                <div className="flex justify-between items-center">
                  <div onClick={() => handleToggleStatus(acc.id)} className="flex items-center gap-3 cursor-pointer">
                    <div className={`w-10 h-5.5 flex items-center rounded-full p-1 transition-all ${acc.status ? 'bg-[#2a4530]' : 'bg-slate-300'}`}>
                      <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform ${acc.status ? 'translate-x-4.5' : 'translate-x-0'}`}></div>
                    </div>
                    <span className={`text-[12px] font-bold ${acc.status ? 'text-[#2a4530]' : 'text-slate-400'}`}>
                      {acc.status ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button className="w-9 h-9 flex items-center justify-center bg-slate-50 rounded-xl text-slate-400 hover:bg-emerald-50 hover:text-[#2a4530] transition-all">
                      <FiEdit2 />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center bg-slate-50 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all">
                      <FiTrash2 />
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
};

export default ManajemenAkun;