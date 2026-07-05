import { AiOutlineInbox, AiOutlineSearch } from "react-icons/ai"; 
import { CgDanger } from "react-icons/cg"; 
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header'
import Bg from '../../../public/img/foto_bibit_sawit_1.png';
import Logo from "../../../public/img/Logo.png";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  const [data, setData] = useState({
    total_stok_keseluruhan: 0,
    total_masuk: 0,
    total_terjual: 0,
    rincian_varietas: [],
    alert_kritis: null
  });
  const [loading, setLoading] = useState(true);
  
  // State untuk mengontrol input pencarian
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Jalankan fetch data saat halaman dimuat
    fetch('http://localhost:8000/api/dashboard') // Sesuaikan dengan URL API Laravel kamu
      .then(res => res.json())
      .then(resData => {
        // PERBAIKAN 1: Memastikan jika API mengembalikan data kosong atau null, fallback ke array kosong
        setData({
          total_stok_keseluruhan: resData?.total_stok_keseluruhan || 0,
          total_masuk: resData?.total_masuk || 0,
          total_terjual: resData?.total_terjual || 0,
          rincian_varietas: resData?.rincian_varietas || [],
          alert_kritis: resData?.alert_kritis || null
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal mengambil data stok:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#294D29] text-white flex items-center justify-center font-sans">Memuat Data Stok...</div>;
  }

  // PERBAIKAN 2: Menggunakan Optional Chaining (?.) agar filter tidak error jika array bernilai undefined/null
  const filteredVarietas = (data?.rincian_varietas || []).filter((varietas) => {
    const query = searchQuery.toLowerCase();
    return (
      (varietas?.nama?.toLowerCase() || "").includes(query) ||
      (varietas?.umur?.toString() || "").includes(query) ||
      (varietas?.status?.toLowerCase() || "").includes(query)
    );
  });

  return (
    <div 
      className="min-h-screen pb-16 font-sans selection:bg-[#2DAB80] selection:text-white relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
        <Sidebar/>
      {/* Overlay Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-white/80 to-gray-50/95 pointer-events-none z-0" />

      <div className="relative z-10">
        <Header />

        {/* --- SECTION 1: RESPONSIVE HEADER AREA --- */}
        <div className="bg-[#294D29]/95 text-white px-6 md:px-12 pt-6 pb-24 md:pb-28 rounded-bl-[40px] md:rounded-bl-[80px] shadow-lg relative z-10 -mt-1 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            
            {/* Sisi Kiri: Branding & Info */}
            <div className="flex items-center gap-4 border-b md:border-b-0 border-white/10 pb-4 md:pb-0">
              <img 
                src={Logo} 
                alt="Logo" 
                className="w-12 h-12 object-contain rounded-full bg-white p-1 shadow-md"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-black tracking-widest uppercase">Berkah Palma</h1>
                <p className="text-[11px] text-gray-300 font-medium uppercase tracking-wider">Internal Stok Management</p>
              </div>
            </div>

            {/* Sisi Kanan: Judul Menu & Update */}
            <div className="text-left md:text-right space-y-1">
              <div className="flex items-baseline md:justify-end gap-2">
                <h2 className="text-3xl font-black tracking-tight">Overview</h2>
                <span className="text-xl font-light text-gray-300">Stok</span>
              </div>
              <p className="text-xs text-gray-300 font-medium bg-white/10 inline-block px-4 py-1.5 rounded-full backdrop-blur-sm">
                Terakhir Diperbarui: 1 Juni 2026, 10:38 WIB
              </p>
            </div>

          </div>
        </div>

        {/* --- MAIN CONTAINER (GRID RESPONSIF) --- */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 md:-mt-14 relative z-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            
            {/* KOLOM UTAMA & DAFTAR VARIETAS */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Card Sisa Stok Keseluruhan */}
              <div className="bg-white/95 rounded-[32px] p-6 md:p-8 shadow-xl border border-gray-100 relative overflow-hidden backdrop-blur-sm group hover:border-[#2DAB80]/30 transition-all">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#2DAB80]/10 rounded-full group-hover:scale-110 transition-transform duration-500" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <span className="text-[#A8AFBB] font-bold text-xs md:text-sm tracking-wider uppercase block">
                      Sisa Stok Keseluruhan
                    </span>
                    <h3 className="text-5xl md:text-6xl font-black text-[#020202] tracking-tighter py-2">
                      {(data?.total_stok_keseluruhan || 0).toLocaleString('id-ID')} <span className="text-lg md:text-xl text-gray-400 font-medium tracking-normal">Pokok</span>
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-inner">
                    <span className="text-2xl text-[#2DAB80]"><AiOutlineInbox /></span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-[#ECFDF5] text-[#2DAB80] text-xs font-bold px-4 py-2 rounded-full relative z-10 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#2DAB80] animate-pulse"></span>
                  +12% vs Bulan lalu
                </div>
              </div>

              {/* Utility Bar (Search & Filter) */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <AiOutlineSearch className="text-lg" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Cari varietas, umur bibit, atau status..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white rounded-full text-sm text-black shadow-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2DAB80]/40 transition-shadow"
                  />
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="flex-1 sm:flex-initial bg-white text-[#294D29] text-xs font-bold px-6 py-3.5 rounded-full shadow-md hover:bg-gray-50 border border-gray-100 active:scale-95 transition-all">
                    Juni 2026
                  </button>
                  <button className="flex-1 sm:flex-initial bg-[#C5A830] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-md hover:bg-[#A88E25] active:scale-95 transition-all whitespace-nowrap">
                    Pilih Varietas
                  </button>
                </div>
              </div>

              {/* DAFTAR VARIETAS DARI DATABASE */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pl-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rincian Per Varietas</h4>
                  <span className="text-xs text-gray-500 font-medium hidden sm:block">
                    Total: {filteredVarietas.length} Varietas Ditemukan
                  </span>
                </div>

                {filteredVarietas.map((varietas, index) => (
                  <div 
                    key={index}
                    className={`bg-white/95 rounded-[24px] p-6 shadow-md backdrop-blur-sm group hover:shadow-xl transition-all duration-300 border ${
                      varietas?.status === 'Kritis' ? 'border-2 border-red-200' : 'border-gray-100 hover:border-[#2DAB80]/20'
                    }`}
                  >
                    <div className="md:flex md:items-center md:justify-between gap-6">
                      <div className="md:w-1/3 space-y-1">
                        <h5 className={`font-extrabold text-lg tracking-tight transition-colors ${
                          varietas?.status === 'Kritis' ? 'text-red-950' : 'text-[#020202] group-hover:text-[#294D29]'
                        }`}>
                          {varietas?.nama}
                        </h5>
                        <span className="text-[10px] font-bold text-[#A8AFBB] tracking-wider uppercase bg-gray-100 px-2.5 py-0.5 rounded-md inline-block">
                          UMUR {varietas?.umur} BULAN
                        </span>
                      </div>
                      
                      <div className={`grid grid-cols-4 gap-2 text-center my-4 md:my-0 flex-1 md:border-x md:px-6 ${
                        varietas?.status === 'Kritis' ? 'border-red-100' : 'border-gray-100'
                      }`}>
                        <div>
                          <span className="text-[10px] font-semibold text-gray-400 block uppercase">Awal</span>
                          <span className="text-sm font-bold text-gray-700">{(varietas?.awal || 0).toLocaleString('id-ID')}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold text-gray-400 block uppercase">Masuk</span>
                          <span className={`text-sm font-bold ${varietas?.status === 'Kritis' ? 'text-gray-700' : 'text-[#2DAB80]'}`}>
                            {varietas?.masuk > 0 ? `+${varietas.masuk.toLocaleString('id-ID')}` : '0'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold text-gray-400 block uppercase">Jual</span>
                          <span className="text-sm font-bold text-gray-700">-{(varietas?.jual || 0).toLocaleString('id-ID')}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold text-gray-400 block uppercase">Afkir</span>
                          <span className="text-sm font-bold text-[#F9303B]">-{(varietas?.afkir || 0).toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                      
                      <div className={`flex md:flex-col justify-between items-center md:items-end gap-3 md:w-1/4 pt-3 md:pt-0 border-t md:border-t-0 ${
                        varietas?.status === 'Kritis' ? 'border-red-100' : 'border-gray-100'
                      }`}>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm md:order-2 ${
                          varietas?.status === 'Kritis' ? 'bg-red-50 text-[#F9303B] border-red-100' : 'bg-emerald-50 text-[#2DAB80] border-emerald-100'
                        }`}>
                          {varietas?.status}
                        </span>
                        <div className="text-right md:order-1">
                          <span className="text-[10px] font-medium text-gray-400 block">Sisa Stok</span>
                          <span className={`text-lg font-black ${varietas?.status === 'Kritis' ? 'text-[#F9303B]' : 'text-[#020202]'}`}>
                            {(varietas?.sisa || 0).toLocaleString('id-ID')} <span className={`text-xs font-normal ${varietas?.status === 'Kritis' ? 'text-red-500' : 'text-gray-500'}`}>Pkk</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredVarietas.length === 0 && (
                  <div className="bg-white/80 rounded-[24px] p-8 text-center text-gray-500 shadow-sm border border-gray-100">
                    Tidak ada varietas yang cocok dengan kata kunci "{searchQuery}".
                  </div>
                )}

              </div>

            </div>

            {/* KOLOM KANAN ALERTS & QUICK STATS */}
            <div className="space-y-6 lg:sticky lg:top-24">
              
              {data?.alert_kritis && (
                <div className="bg-white/95 rounded-[28px] p-5 shadow-lg border-2 border-[#F9303B] flex flex-col gap-4 backdrop-blur-sm hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 shadow-inner">
                      <span className="text-[#F9303B] text-2xl font-bold"><CgDanger /></span>
                    </div>
                    <div>
                      <h4 className="text-[#F9303B] font-black text-base tracking-wide uppercase">Stok Kritis!!</h4>
                      <span className="text-[10px] font-bold text-gray-400 block uppercase">Tindakan Diperlukan</span>
                    </div>
                  </div>
                  
                  <p className="text-[#646464] text-xs font-medium leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-800">{data.alert_kritis?.nama} ({data.alert_kritis?.umur} Bulan)</span> sisa {data.alert_kritis?.sisa} bibit. Harap mutasi kecambah untuk menyeimbangkan inventaris.
                  </p>
                  
                  <button className="w-full bg-red-50 hover:bg-red-100 text-[#F9303B] text-xs font-bold py-3 rounded-xl border border-red-100 shadow-sm transition-colors active:scale-95">
                    Cek Detail Log Kritis
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                
                {/* Card Masuk */}
                <div className="bg-white/95 rounded-2xl p-5 shadow-md border border-gray-100 backdrop-blur-sm hover:border-[#3c8bcc]/30 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[#A8AFBB] font-bold text-xs tracking-wider uppercase">Masuk</span>
                    <span className="text-xs font-bold text-[#3c8bcc] bg-[#3c8bcc]/10 px-2 py-0.5 rounded">60% Target</span>
                  </div>
                  <span className="text-3xl font-black text-[#020202] block mt-2">{(data?.total_masuk || 0).toLocaleString('id-ID')}</span>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden relative">
                    <div className="bg-[#3c8bcc] h-full rounded-full w-[60%]" />
                  </div>
                </div>

                {/* Card Terjual */}
                <div className="bg-white/95 rounded-2xl p-5 shadow-md border border-gray-100 backdrop-blur-sm hover:border-[#C5A830]/30 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[#A8AFBB] font-bold text-xs tracking-wider uppercase">Terjual</span>
                    <span className="text-xs font-bold text-[#C5A830] bg-[#C5A830]/10 px-2 py-0.5 rounded">45% Rasio</span>
                  </div>
                  <span className="text-3xl font-black text-[#020202] block mt-2">{(data?.total_terjual || 0).toLocaleString('id-ID')}</span>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden relative">
                    <div className="bg-[#C5A830] h-full rounded-full w-[45%]" />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}