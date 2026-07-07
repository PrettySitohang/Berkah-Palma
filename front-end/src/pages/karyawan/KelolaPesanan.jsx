import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiSearch, FiXCircle, FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Bg from '../../../public/img/foto_bibit_sawit_1.png';
import Header from '../../components/Header';

export default function KelolaPesanan() {
  // State untuk Filter & Kontrol API
  const [activeTab, setActiveTab] = useState('Pending');
  const [pencarian, setPencarian] = useState('');
  const [dataPesanan, setDataPesanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // State baru untuk penampung Metadata Pagination dari Server
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const perPage = 10; // Jumlah data per halaman tabel desktop

  // Fungsi fetch data dinamis dengan query string parameter
  const ambilDataPesanan = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      // Menyusun URL beserta parameter filter, search, & pagination ke backend
      const url = `http://127.0.0.1:8000/api/penjualan?status=${activeTab}&search=${pencarian}&page=${currentPage}&per_page=${perPage}`;
      const response = await fetch(url);
      const hasil = await response.json();
      
      if (response.ok && hasil.success) {
        setDataPesanan(hasil.data || []);
        // Menyimpan status pagination dari backend
        setCurrentPage(hasil.pagination.current_page);
        setLastPage(hasil.pagination.last_page);
        setTotalData(hasil.pagination.total);
      } else {
        setErrorMsg(hasil.message || "Gagal memuat data transaksi.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Koneksi gagal! Silakan periksa server backend Laravel.");
    } finally {
      setLoading(false);
    }
  };

  // Triger ambil data ulang otomatis saat tab, halaman, atau pencarian berubah
  useEffect(() => {
    ambilDataPesanan();
  }, [activeTab, currentPage, pencarian]);

  // Reset halaman ke nomor 1 jika user berpindah tab atau mengetik pencarian baru
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1); 
  };

  const handleSearchChange = (e) => {
    setPencarian(e.target.value);
    setCurrentPage(1);
  };

  const ubahStatusPesanan = async (idPenjualan, statusBaru) => {
    if (!window.confirm(`Ubah status pesanan ke ${statusBaru}?`)) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/penjualan/${idPenjualan}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ status: statusBaru }),
      });
      const hasil = await response.json();
      if (response.ok && hasil.success) {
        alert("Status berhasil diperbarui!");
        ambilDataPesanan(); // Refresh data halaman saat ini
      } else {
        alert(hasil.message || "Gagal memperbarui status.");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi.");
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="min-h-screen pb-16 font-sans relative bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${Bg})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-white/80 to-gray-50/95 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        {/* HEADER AREA */}
        <div className="bg-[#294D29]/95 text-white px-6 md:px-12 pt-6 pb-24 md:pb-28 rounded-bl-[40px] md:rounded-bl-[80px] shadow-lg relative z-10 -mt-1 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <span className="text-[10px] bg-white/10 text-gray-200 font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">Transaksi Berjalan</span>
              <h1 className="text-3xl font-black tracking-tight mt-2 md:text-4xl">Kelola <span className="font-light text-gray-200">Pesanan</span></h1>
            </div>
            <p className="text-xs text-gray-300 font-medium hidden sm:block">Manajemen Logistik & Penjualan Bibit</p>
          </div>
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 md:-mt-14 relative z-20 flex-1 flex flex-col gap-5 w-full">
          
          {/* TABS & SEARCH BAR CONTROLS */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between w-full">
            <div className="bg-white rounded-full p-1.5 flex shadow-xl border border-gray-100 backdrop-blur-sm flex-1 max-w-2xl overflow-x-auto gap-1">
              {['Pending', 'Diproses', 'Selesai', 'Batal'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => handleTabChange(tab)} 
                  className={`flex-1 text-center py-2.5 px-3 rounded-full text-[11px] font-black tracking-wider uppercase transition-all duration-200 whitespace-nowrap ${activeTab === tab ? 'bg-[#294D29] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {tab} {activeTab === tab ? `(${totalData})` : ''}
                </button>
              ))}
            </div>

            <div className="bg-white p-1.5 rounded-full flex gap-2 items-center shadow-xl border border-gray-100 flex-1 max-w-md lg:max-w-xs ml-auto">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><FiSearch className="text-sm" /></span>
                <input 
                  type="text" 
                  placeholder="Cari invoice/pelanggan..." 
                  value={pencarian}
                  onChange={handleSearchChange}
                  className="w-full bg-transparent text-gray-700 placeholder-gray-400 text-xs pl-9 pr-2 py-2 rounded-full focus:outline-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* MAIN DATA CONTAINER */}
          <div className="bg-white rounded-[28px] shadow-xl pt-6 pb-4 border border-gray-100 flex flex-col justify-between flex-1 w-full min-h-[480px]">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
                <FiRefreshCw className="animate-spin text-2xl text-[#2DAB80]" />
                <span className="text-xs font-bold">Menyinkronkan data dengan server...</span>
              </div>
            ) : errorMsg ? (
              <div className="text-center py-24 text-rose-500 font-bold text-xs px-6">{errorMsg}</div>
            ) : (
              <>
                {/* 🖥️ DESKTOP VIEW */}
                <div className="hidden md:block overflow-x-auto w-full px-6 flex-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="pb-4 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase w-[22%]">No. Invoice & Waktu</th>
                        <th className="pb-4 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase w-[23%]">Pelanggan & Kontak</th>
                        <th className="pb-4 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase w-[25%]">Detail Item (Varietas)</th>
                        <th className="pb-4 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase w-[18%]">Total Harga</th>
                        <th className="pb-4 text-[10px] font-black text-[#A8AFBB] tracking-widest uppercase text-center w-[12%]">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {dataPesanan.map((item, index) => (
                        <tr key={`${item.id_penjualan}-${index}`} className="align-middle group hover:bg-gray-50/50 transition-colors">
                          <td className="py-4">
                            <span className="text-sm font-black text-[#020202] block group-hover:text-[#294D29] transition-colors">{item.id_penjualan}</span>
                            <span className="text-[10px] font-bold text-[#A8AFBB] block mt-0.5">{item.tanggal_transaksi}</span>
                          </td>
                          <td className="py-4 pr-2">
                            <span className="text-xs font-bold text-gray-700 block">{item.nama_pelanggan}</span>
                            <span className="text-[10px] text-gray-400 block">{item.no_hp}</span>
                            <span className="inline-block bg-gray-100 text-gray-600 text-[9px] font-extrabold px-2 py-0.5 rounded mt-1 border border-gray-200">{item.jenis_pembelian}</span>
                          </td>
                          <td className="py-4 pr-2">
                            <span className="text-xs font-bold text-[#294D29] block">{item.nama_varietas || 'Bibit Kelapa Sawit'}</span>
                            <span className="text-[11px] font-extrabold text-[#2DAB80] block mt-0.5">{item.jumlah_item || 0} Pokok</span>
                          </td>
                          <td className="py-4 font-black text-sm text-[#020202]">
                            {typeof item.total_harga === 'number' ? formatRupiah(item.total_harga) : 'Rp 4.500.000'}
                          </td>
                          <td className="py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {/* Pencocokan menggunakan string asli dari state tab/data */}
                              {(item.status === 'Pending' || item.status === 'PENDING') && (
                                <>
                                  <button onClick={() => ubahStatusPesanan(item.id_penjualan, 'DIPROSES')} className="bg-[#2DAB80] hover:bg-[#238A66] text-white text-[9px] font-black tracking-wider px-3 py-1.5 rounded-xl transition-all uppercase flex items-center gap-1 shadow-sm">
                                    <FiCheckCircle /> Terima
                                  </button>
                                  <button onClick={() => ubahStatusPesanan(item.id_penjualan, 'BATAL')} className="bg-rose-500 hover:bg-rose-600 text-white text-[9px] font-black tracking-wider px-3 py-1.5 rounded-xl transition-all uppercase flex items-center gap-1 shadow-sm">
                                    <FiXCircle /> Tolak
                                  </button>
                                </>
                              )}
                              {(item.status === 'Diproses' || item.status === 'DIPROSES') && (
                                <button onClick={() => ubahStatusPesanan(item.id_penjualan, 'SELESAI')} className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-black tracking-wider px-4 py-1.5 rounded-xl transition-all uppercase flex items-center gap-1 shadow-sm">
                                  <FiCheckCircle /> Selesai
                                </button>
                              )}
                              {['Selesai', 'SELESAI', 'Batal', 'BATAL'].includes(item.status) && (
                                <span className="text-[10px] font-bold text-gray-400">Tinjauan Selesai</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 📱 MOBILE CARD VIEW */}
                <div className="md:hidden px-4 space-y-4 overflow-y-auto max-h-[460px] flex-1">
                  {dataPesanan.map((item, index) => (
                    <div key={`${item.id_penjualan}-mobile-${index}`} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3 shadow-inner relative overflow-hidden">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-black text-gray-900 block">{item.id_penjualan}</span>
                          <span className="text-[10px] font-medium text-gray-400 block">{item.tanggal_transaksi}</span>
                        </div>
                        <span className="bg-gray-200 text-gray-700 text-[9px] font-black px-2.5 py-1 rounded-md uppercase">{item.jenis_pembelian}</span>
                      </div>
                      <div className="border-t border-gray-200/60 pt-2 space-y-1.5 text-xs">
                        <div className="flex justify-between"><span className="text-gray-400 font-medium">Pelanggan:</span><span className="font-bold text-gray-700">{item.nama_pelanggan}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400 font-medium">Varietas:</span><span className="font-bold text-[#294D29]">{item.nama_varietas}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400 font-medium">Jumlah:</span><span className="font-black text-[#2DAB80]">{item.jumlah_item} Pokok</span></div>
                      </div>
                      <div className="flex gap-2 w-full pt-1">
                        {(item.status === 'Pending' || item.status === 'PENDING') && (
                          <>
                            <button onClick={() => ubahStatusPesanan(item.id_penjualan, 'DIPROSES')} className="flex-1 bg-[#2DAB80] text-white font-black text-[10px] py-2.5 rounded-xl uppercase flex items-center justify-center gap-1"><FiCheckCircle /> Terima</button>
                            <button onClick={() => ubahStatusPesanan(item.id_penjualan, 'BATAL')} className="flex-1 bg-rose-500 text-white font-black text-[10px] py-2.5 rounded-xl uppercase flex items-center justify-center gap-1"><FiXCircle /> Tolak</button>
                          </>
                        )}
                        {(item.status === 'Diproses' || item.status === 'DIPROSES') && (
                          <button onClick={() => ubahStatusPesanan(item.id_penjualan, 'SELESAI')} className="w-full bg-blue-600 text-white font-black text-[10px] py-2.5 rounded-xl uppercase flex items-center justify-center gap-1"><FiCheckCircle /> Selesai</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {dataPesanan.length === 0 && (
                  <div className="text-center py-16 text-gray-400 font-bold text-sm flex-1 flex items-center justify-center">
                    Tidak ada transaksi dengan kriteria ini yang ditemukan.
                  </div>
                )}

                {/* --- BARIS UTAMA PAGINATION CONTROLS (DESKTOP & MOBILE) --- */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between px-6 w-full text-xs">
                  <div className="text-gray-400 font-medium">
                    Menampilkan <span className="font-bold text-gray-700">{dataPesanan.length}</span> dari <span className="font-bold text-gray-700">{totalData}</span> data pesanan
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-xl border border-gray-200 flex items-center justify-center transition-all ${currentPage === 1 ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50 active:scale-95'}`}
                    >
                      <FiChevronLeft className="text-base" />
                    </button>

                    <div className="bg-gray-50 text-[#294D29] px-4 py-2 rounded-xl font-black border border-gray-100 tracking-wider">
                      Halaman {currentPage} / {lastPage}
                    </div>

                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPage))}
                      disabled={currentPage === lastPage}
                      className={`p-2 rounded-xl border border-gray-200 flex items-center justify-center transition-all ${currentPage === lastPage ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50 active:scale-95'}`}
                    >
                      <FiChevronRight className="text-base" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}