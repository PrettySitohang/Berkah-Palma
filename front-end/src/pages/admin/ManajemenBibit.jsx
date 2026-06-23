import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiSliders, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { HiPlus } from 'react-icons/hi';
import Bg from '../../../public/img/foto_bibit_sawit_1.png';
import Header from '../../components/Header';

export default function ManajemenBibit() {
  const navigate = useNavigate();
  
  // 🟢 STATE UNTUK INTEGRASI API LARAVEL
  const [daftarBibit, setDaftarBibit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pencarian, setPencarian] = useState('');

  // 🟢 FUNGSI MENGAMBIL DATA DARI BACKEND
  const ambilDataBibit = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/bibit');
      const hasil = await response.json();

      if (hasil.success) {
        setDaftarBibit(hasil.data); // Menyimpan array varietas + stok
      } else {
        setError('Gagal memuat data dari database internal.');
      }
    } catch (err) {
      setError('Koneksi ke backend Laravel gagal. Pastikan "php artisan serve" menyala!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Jalankan penarikan data saat halaman dibuka
  useEffect(() => {
    ambilDataBibit();
  }, []);

  // 🟢 FUNGSI CRUD: HAPUS VARIETAS DARI SISTEM
  const handleHapus = async (id, nama) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus varietas "${nama}" dari sistem?`)) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/bibit/${id}`, {
          method: 'DELETE',
        });
        const hasil = await response.json();
        
        if (hasil.success) {
          alert('Varietas bibit berhasil dihapus!');
          ambilDataBibit(); // Ambil ulang data segar dari database
        } else {
          alert('Gagal menghapus data varietas.');
        }
      } catch (err) {
        alert('Terjadi kesalahan jaringan saat menghapus data.');
      }
    }
  };

  // 🟢 HELPER: BIAR INISIAL KARTU GENERATE OTOMATIS DARI NAMA VARIETAS
  const dapatkanInisial = (nama) => {
    if (!nama) return 'B';
    const kata = nama.split(' ');
    if (kata.length >= 2) {
      return (kata[0][0] + kata[1][0]).toUpperCase(); // Contoh: "Tenera Sriwijaya" -> "TS"
    }
    return nama.substring(0, 2).toUpperCase();
  };

  // 🟢 FILTER: PENCARIAN REAL-TIME BERDASARKAN NAMA VARIETAS
  const dataTerfilter = daftarBibit.filter((bibit) =>
    bibit.nama_varietas.toLowerCase().includes(pencarian.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen pb-10 font-sans selection:bg-[#2DAB80] selection:text-white relative bg-fixed bg-cover bg-center z-0"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      {/* Overlay gradasi transparan */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#294D29]/10 via-white/80 to-white/95 pointer-events-none z-10" />

      {/* Konten utama */}
      <div className="relative z-20">
        
        {/* Area Hijau Atas (Header & Judul) */}
        <div className="bg-[#294D29] text-white rounded-bl-[60px] rounded-br-none shadow-md relative z-30 pb-20">
          
          {/* NAVBAR ATAS */}
          <Header />

          {/* Bagian Judul dan Tombol Tambah */}
          <div className="px-6 pt-6 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold tracking-wide">Manajemen</h1>
              <h2 className="text-3xl font-bold tracking-wide mt-1">Bibit</h2>
              <p className="text-xs text-gray-300 mt-4 font-medium tracking-wide">Master Data Varietas</p>
            </div>
            
            {/* Tombol redirect ke form input bibit bawaan App.jsx kamu */}
            <button 
              onClick={() => navigate('/admin/bibit/form')}
              className="bg-[#68B984] hover:bg-[#57a673] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1 transition-colors mt-2"
            >
              <HiPlus className="text-base" /> Tambah Bibit
            </button>
          </div>

        </div>

        {/* Konten Utama (Form Pencarian & Daftar Kartu) */}
        <div className="px-5 -mt-8 relative z-30 space-y-4">
          
          {/* Bar Pencarian dan Filter */}
          <div className="bg-[#1E3A1E]/30 p-2.5 rounded-2xl flex gap-2 items-center backdrop-blur-md">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FiSearch className="text-lg" />
              </span>
              <input 
                type="text" 
                placeholder="Cari nama varietas..." 
                value={pencarian}
                onChange={(e) => setPencarian(e.target.value)} // 👈 Pencarian langsung aktif saat diketik
                className="w-full bg-white/95 text-gray-700 placeholder-gray-400 text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none font-medium shadow-sm"
              />
            </div>
            <button className="bg-white/95 text-gray-500 p-2.5 rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
              <FiSliders className="text-lg rotate-90" />
            </button>
          </div>

          {/* Status Loading / Error */}
          {loading && (
            <div className="bg-white/80 rounded-2xl p-6 text-center text-gray-600 font-medium shadow-sm">
              Sedang mengambil data dari database Palma Nursery...
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 text-red-600 rounded-2xl p-6 text-center font-medium shadow-sm border border-red-200">
              {error}
            </div>
          )}

          {/* Iterasi List Data Varietas Asli dari Database */}
          {!loading && !error && (
            <div className="space-y-4">
              {dataTerfilter.length === 0 ? (
                <div className="bg-white/90 rounded-2xl p-10 text-center text-gray-500 font-medium shadow-md">
                  Tidak ada varietas bibit yang cocok atau database masih kosong.
                </div>
              ) : (
                dataTerfilter.map((varietas) => (
                  <div 
                    key={varietas.id_varietas} 
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/40 flex flex-col justify-between"
                  >
                    {/* Bagian Atas Kartu */}
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 items-center">
                        {/* Inisial otomatis dari data asli */}
                        <div className="w-12 h-12 rounded-full bg-[#D1F5E9] text-[#1E5641] font-bold text-base flex items-center justify-center shrink-0 shadow-inner">
                          {dapatkanInisial(varietas.nama_varietas)}
                        </div>
                        <div>
                          <h4 className="text-[#020202] font-extrabold text-base tracking-tight">
                            {varietas.nama_varietas}
                          </h4>
                          <p className="text-gray-500 text-xs font-semibold mt-0.5">
                            Umur: {varietas.umur_bulan} Bulan
                          </p>
                        </div>
                      </div>
                      
                      {/* Badge Hijau menampilkan jumlah STOK FISIK ASLI dari tabel tb_stok_bibit */}
                      <span className="text-[10px] font-bold bg-[#E6F4EA] text-[#137333] px-3 py-1 rounded-full tracking-wider border border-green-100">
                        {varietas.stok ? `${varietas.stok.jumlah_stok} BATANG` : '0 BATANG'}
                      </span>
                    </div>

                    <hr className="border-gray-200/60 my-3" />

                    {/* Bagian Bawah Kartu */}
                    <div className="flex justify-between items-end gap-4">
                      <p className="text-gray-600 text-xs font-medium leading-relaxed max-w-[75%]">
                        {varietas.deskripsi || 'Tidak ada deskripsi botani untuk varietas ini.'}
                      </p>
                      
                      <div className="flex gap-2 shrink-0">
                        {/* Tombol Edit */}
                        <button 
                          onClick={() => navigate(`/admin/bibit/form`, { state: { editData: varietas } })}
                          className="p-2 bg-white/80 text-gray-500 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors shadow-sm"
                        >
                          <FiEdit2 className="text-sm" />
                        </button>
                        
                        {/* Tombol Hapus Terhubung API */}
                        <button 
                          onClick={() => handleHapus(varietas.id_varietas, varietas.nama_varietas)}
                          className="p-2 bg-white/80 text-red-500 rounded-lg border border-red-50 hover:bg-red-50 transition-colors shadow-sm"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}