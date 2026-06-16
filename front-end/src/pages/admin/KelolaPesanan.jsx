import React, { useState } from 'react';
import Bg from '../../../public/img/foto_bibit_sawit_1.png';
import Header from '../../components/Header';

export default function KelolaPesanan() {
  const [activeTab, setActiveTab] = useState('menunggu');

  // Menggabungkan semua kolom dari figma 1 & figma 2 agar menjadi tabel panjang utuh
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

  return (
    <div 
      className="min-h-screen pb-12 font-sans selection:bg-[#2DAB80] selection:text-white relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
    <Header title="Kelola Pesanan" subtitle="Daftar transaksi dalam format tabel" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white/90 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        
        <div className="bg-[#294D29] text-white px-6 pt-6 pb-20 rounded-bl-[60px] rounded-br-none shadow-md relative z-10">
          
          <div className="mt-8">
            <h1 className="text-3xl font-bold tracking-wide">Kelola Pesanan</h1>
            <p className="text-xs text-gray-300/90 font-medium mt-1">Daftar transaksi dalam format tabel</p>
          </div>
        </div>

        {/* KONTEN UTAMA */}
        <div className="px-5 -mt-10 relative z-20 flex-1 flex flex-col gap-5">
          
          {/* TABS */}
          <div className="bg-white rounded-full p-1.5 flex justify-between items-center shadow-sm border border-gray-100">
            <button onClick={() => setActiveTab('menunggu')} className={`flex-1 text-center py-2.5 rounded-full text-xs font-bold tracking-wide transition-all ${activeTab === 'menunggu' ? 'bg-[#294D29] text-white shadow-sm' : 'text-gray-400'}`}>
              Menunggu (3)
            </button>
            <button onClick={() => setActiveTab('diproses')} className={`flex-1 text-center py-2.5 rounded-full text-xs font-bold tracking-wide transition-all ${activeTab === 'diproses' ? 'bg-[#294D29] text-white shadow-sm' : 'text-gray-400'}`}>
              Diproses
            </button>
            <button onClick={() => setActiveTab('selesai')} className={`flex-1 text-center py-2.5 rounded-full text-xs font-bold tracking-wide transition-all ${activeTab === 'selesai' ? 'bg-[#294D29] text-white shadow-sm' : 'text-gray-400'}`}>
              Selesai
            </button>
          </div>

          {/* KARTU TABEL DENGAN OPERASI SCROLL */}
          <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] pt-6 pb-4 flex flex-col justify-between flex-1 min-h-[400px]">
            
            {/* 💡 KUNCI RESPONSIVITAS: overflow-x-auto & minimal width tabel (min-w-[750px]) */}
            <div className="overflow-x-auto overflow-y-hidden w-full px-5 scrollbar-thin">
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase w-[22%]">No. Invoice & Waktu</th>
                    <th className="pb-3 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase w-[23%]">Pelanggan</th>
                    <th className="pb-3 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase w-[25%]">Varietas / Qty</th>
                    <th className="pb-3 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase w-[18%]">Total Harga</th>
                    <th className="pb-3 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase text-center w-[12%]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {dataPesanan.map((item, index) => (
                    <tr key={index} className="align-middle">
                      {/* Kolom 1 (Figma 1) */}
                      <td className="py-4.5">
                        <span className="text-sm font-black text-[#020202] block">{item.invoice}</span>
                        <span className="text-[10px] font-bold text-[#A8AFBB] block whitespace-nowrap">{item.waktu}</span>
                      </td>
                      {/* Kolom 2 (Figma 1) */}
                      <td className="py-4.5 pr-2">
                        <span className="text-xs font-bold text-[#435343] block line-clamp-1">{item.pelanggan}</span>
                        <span className="inline-block bg-[#FFF4EC] text-[#FF8A48] text-[9px] font-extrabold tracking-widest px-2 py-0.5 rounded-md mt-1">
                          {item.status}
                        </span>
                      </td>
                      {/* Kolom 3 (Figma 2) */}
                      <td className="py-4.5 pr-2">
                        <span className="text-xs font-bold text-[#294D29] block">{item.varietas}</span>
                        <span className="text-[11px] font-bold text-[#2DAB80] block mt-0.5">{item.qty}</span>
                      </td>
                      {/* Kolom 4 (Figma 2) */}
                      <td className="py-4.5 font-black text-sm text-[#020202]">
                        {item.total}
                      </td>
                      {/* Kolom 5 (Aksi Bersama) */}
                      <td className="py-4.5 text-center">
                        <button className="bg-[#2DAB80] hover:bg-[#238A66] text-white text-[10px] font-black tracking-widest px-4 py-2 rounded-xl transition-all uppercase">
                          Proses
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            

          </div>

        </div>
      </div>
    </div>
  );
}