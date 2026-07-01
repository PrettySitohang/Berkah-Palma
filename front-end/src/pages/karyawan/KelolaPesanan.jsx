import React, { useState } from 'react';
import { FiEye, FiCheckCircle, FiSearch, FiSliders } from 'react-icons/fi';
import Bg from '../../../public/img/foto_bibit_sawit_1.png';
import Header from '../../components/Header';

export default function KelolaPesanan() {
  const [activeTab, setActiveTab] = useState('menunggu');
  const [pencarian, setPencarian] = useState('');

  // Dummy Data Terintegrasi
  const dataPesanan = [
    { 
      invoice: 'INV-001', 
      waktu: '11 Jun 2026, 09:15', 
      pelanggan: 'KUD Tani Makmur', 
      varietas: 'PPKS Simalungun', 
      qty: '1.500 Pokok', 
      total: 'Rp 67.500.000', 
      status: 'MENUNGGU' 
    },
    { 
      invoice: 'INV-002', 
      waktu: '11 Jun 2026, 10:30', 
      pelanggan: 'PT Sawit Mas', 
      varietas: 'Topas Series 3', 
      qty: '500 Pokok', 
      total: 'Rp 22.500.000', 
      status: 'MENUNGGU' 
    },
    { 
      invoice: 'INV-003', 
      waktu: '10 Jun 2026, 15:45', 
      pelanggan: 'Bpk. Sudirman', 
      varietas: 'Socfindo La Me', 
      qty: '100 Pokok', 
      total: 'Rp 4.500.000', 
      status: 'MENUNGGU' 
    },
  ];

  // Pemfilteran Data Real-Time
  const dataTerfilter = dataPesanan.filter(item => 
    item.pelanggan.toLowerCase().includes(pencarian.toLowerCase()) ||
    item.invoice.toLowerCase().includes(pencarian.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen pb-16 font-sans selection:bg-[#2DAB80] selection:text-white relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      {/* Overlay Backdrop gradasi */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-white/80 to-gray-50/95 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        {/* --- SECTION 1: RESPONSIVE HEADER AREA --- */}
        <div className="bg-[#294D29]/95 text-white px-6 md:px-12 pt-6 pb-24 md:pb-28 rounded-bl-[40px] md:rounded-bl-[80px] shadow-lg relative z-10 -mt-1 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <span className="text-[10px] bg-white/10 text-gray-200 font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                Transaksi Berjalan
              </span>
              <h1 className="text-3xl font-black tracking-tight mt-2 md:text-4xl">Kelola <span className="font-light text-gray-200">Pesanan</span></h1>
            </div>
            <p className="text-xs text-gray-300 font-medium sm:text-right hidden sm:block">
              Manajemen Logistik & Penjualan Bibit
            </p>
          </div>
        </div>

        {/* --- SECTION 2: MAIN CONTENT CONTAINER --- */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 md:-mt-14 relative z-20 flex-1 flex flex-col gap-5 w-full">
          
          {/* Bar Pencarian Premium & Kontrol Tab */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between w-full">
            
            {/* TABS (Gaya Segmen Premium) */}
            <div className="bg-white rounded-full p-1.5 flex shadow-xl border border-gray-100 backdrop-blur-sm flex-1 max-w-xl">
              <button onClick={() => setActiveTab('menunggu')} className={`flex-1 text-center py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-200 ${activeTab === 'menunggu' ? 'bg-[#294D29] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>
                Menunggu (3)
              </button>
              <button onClick={() => setActiveTab('diproses')} className={`flex-1 text-center py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-200 ${activeTab === 'diproses' ? 'bg-[#294D29] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>
                Diproses
              </button>
              <button onClick={() => setActiveTab('selesai')} className={`flex-1 text-center py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-200 ${activeTab === 'selesai' ? 'bg-[#294D29] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>
                Selesai
              </button>
            </div>

            {/* Pencarian Pintar */}
            <div className="bg-white p-1.5 rounded-full flex gap-2 items-center shadow-xl border border-gray-100 flex-1 max-w-md lg:max-w-xs ml-auto">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <FiSearch className="text-sm" />
                </span>
                <input 
                  type="text" 
                  placeholder="Cari invoice/pelanggan..." 
                  value={pencarian}
                  onChange={(e) => setPencarian(e.target.value)}
                  className="w-full bg-transparent text-gray-700 placeholder-gray-400 text-xs pl-9 pr-2 py-2 rounded-full focus:outline-none font-medium"
                />
              </div>
            </div>

          </div>

          {/* --- CONTAINER UTAMA DATA --- */}
          <div className="bg-white rounded-[28px] shadow-xl pt-6 pb-6 border border-gray-100 flex flex-col justify-between flex-1 w-full min-h-[450px]">
            
            {/* 🖥️ LAYOUT TABLE: Otomatis Aktif di Layar Desktop (md keatas) */}
            <div className="hidden md:block overflow-x-auto w-full px-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-4 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase w-[22%]">No. Invoice & Waktu</th>
                    <th className="pb-4 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase w-[23%]">Pelanggan</th>
                    <th className="pb-4 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase w-[25%]">Varietas / Qty</th>
                    <th className="pb-4 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase w-[18%]">Total Harga</th>
                    <th className="pb-4 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase text-center w-[12%]">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {dataTerfilter.map((item, index) => (
                    <tr key={index} className="align-middle group hover:bg-gray-50/50 transition-colors">
                      <td className="py-4">
                        <span className="text-sm font-black text-[#020202] block group-hover:text-[#294D29] transition-colors">{item.invoice}</span>
                        <span className="text-[10px] font-bold text-[#A8AFBB] block mt-0.5">{item.waktu}</span>
                      </td>
                      <td className="py-4 pr-2">
                        <span className="text-xs font-bold text-gray-700 block">{item.pelanggan}</span>
                        <span className="inline-block bg-[#FFF4EC] text-[#FF8A48] text-[9px] font-extrabold tracking-widest px-2 py-0.5 rounded-md mt-1 border border-orange-100">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 pr-2">
                        <span className="text-xs font-bold text-[#294D29] block">{item.varietas}</span>
                        <span className="text-[11px] font-extrabold text-[#2DAB80] block mt-0.5">{item.qty}</span>
                      </td>
                      <td className="py-4 font-black text-sm text-[#020202]">
                        {item.total}
                      </td>
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button className="bg-[#2DAB80] hover:bg-[#238A66] text-white text-[10px] font-black tracking-widest px-4 py-2 rounded-xl transition-all uppercase shadow-sm flex items-center gap-1 active:scale-95">
                            <FiCheckCircle className="text-xs" /> Proses
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 📱 LAYOUT MOBILE CARD LIST: Otomatis Aktif di Ponsel (Di bawah ukuran md) */}
            <div className="md:hidden px-4 space-y-4 overflow-y-auto max-h-[500px] no-scrollbar">
              {dataTerfilter.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3 shadow-inner relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-black text-gray-900 block">{item.invoice}</span>
                      <span className="text-[10px] font-medium text-gray-400 block">{item.waktu}</span>
                    </div>
                    <span className="bg-[#FFF4EC] text-[#FF8A48] text-[9px] font-black tracking-widest px-2.5 py-1 rounded-md border border-orange-100">
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200/60 pt-2 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">Pelanggan:</span>
                      <span className="font-bold text-gray-700">{item.pelanggan}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">Varietas:</span>
                      <span className="font-bold text-[#294D29]">{item.varietas}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">Jumlah Batang:</span>
                      <span className="font-black text-[#2DAB80]">{item.qty}</span>
                    </div>
                    <div className="flex justify-between text-xs pt-1 border-t border-dashed border-gray-200">
                      <span className="text-gray-500 font-bold">Total Nilai:</span>
                      <span className="font-black text-sm text-gray-900">{item.total}</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#2DAB80] text-white font-black text-[10px] tracking-widest py-3 rounded-xl uppercase flex items-center justify-center gap-1 shadow-sm active:scale-95">
                    <FiCheckCircle className="text-xs" /> Proses Transaksi
                  </button>
                </div>
              ))}
            </div>

            {/* Info Kosong */}
            {dataTerfilter.length === 0 && (
              <div className="text-center py-16 text-gray-400 font-bold text-sm">
                Tidak ada pesanan transaksi yang ditemukan.
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}