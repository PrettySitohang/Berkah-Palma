import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiSliders, FiEdit2, FiTrash2, FiAlertCircle } from 'react-icons/fi';
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
        setDaftarBibit(hasil.data); 
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

  useEffect(() => {
    ambilDataBibit();
  }, []);

  // 🟢 FUNGSI CRUD: HAPUS VARIETAS
  const handleHapus = async (id, nama) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus varietas "${nama}" dari sistem?`)) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/bibit/${id}`, {
          method: 'DELETE',
        });
        const hasil = await response.json();
        
        if (hasil.success) {
          alert('Varietas bibit berhasil dihapus!');
          ambilDataBibit(); 
        } else {
          alert('Gagal menghapus data varietas.');
        }
      } catch (err) {
        console.error(err);
        alert('Terjadi kesalahan jaringan saat menghapus data.');
      }
    }
  };

  // 🟢 HELPER: INISIAL KARTU OTOMATIS
  const dapatkanInisial = (nama) => {
    if (!nama) return 'BP';
    const kata = nama.split(' ');
    if (kata.length >= 2) {
      return (kata[0][0] + kata[1][0]).toUpperCase(); 
    }
    return nama.substring(0, 2).toUpperCase();
  };

  // 🟢 FILTER PENCARIAN REAL-TIME
  const dataTerfilter = daftarBibit.filter((bibit) =>
    bibit.nama_varietas.toLowerCase().includes(pencarian.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen pb-16 font-sans selection:bg-[#2DAB80] selection:text-white relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      {/* Overlay Backdrop gradasi */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-white/80 to-gray-50/95 pointer-events-none z-0" />

      <div className="relative z-10">
        <Header />

        {/* --- SECTION 1: RESPONSIVE HEADER AREA --- */}
        <div className="bg-[#294D29]/95 text-white px-6 md:px-12 pt-6 pb-24 md:pb-28 rounded-bl-[40px] md:rounded-bl-[80px] shadow-lg relative z-10 -mt-1 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
            
            <div>
              <span className="text-[10px] bg-white/10 text-gray-200 font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                Master Data Varietas
              </span>
              <h1 className="text-3xl font-black tracking-tight mt-2 md:text-4xl">Manajemen <span className="font-light text-gray-200">Bibit</span></h1>
            </div>
            
            {/* Tombol Tambah (Sesuai rute /karyawan/bibit/form) */}
            <button 
              onClick={() => navigate('/karyawan/bibit/form')}
              className="bg-[#C5A830] hover:bg-[#A88E25] text-white text-xs font-black px-6 py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 sm:mt-2 uppercase tracking-wider"
            >
              <HiPlus className="text-base" /> Tambah Bibit Baru
            </button>
          </div>
        </div>

        {/* --- SECTION 2: MAIN CONTENT CONTAINER --- */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 md:-mt-14 relative z-20 space-y-6">
          
          {/* Bar Pencarian Premium */}
          <div className="bg-white/90 p-2 md:p-3 rounded-full flex gap-2 items-center shadow-xl border border-gray-100 backdrop-blur-sm max-w-2xl">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <FiSearch className="text-lg" />
              </span>
              <input 
                type="text" 
                placeholder="Cari nama varietas sawit..." 
                value={pencarian}
                onChange={(e) => setPencarian(e.target.value)}
                className="w-full bg-transparent text-gray-700 placeholder-gray-400 text-sm pl-12 pr-4 py-3 rounded-full focus:outline-none font-medium"
              />
            </div>
            <button className="bg-gray-50 text-gray-500 w-11 h-11 rounded-full shadow-inner flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-100 shrink-0">
              <FiSliders className="text-lg rotate-90" />
            </button>
          </div>

          {/* --- STATE HANDLING (LOADING / ERROR) --- */}
          {loading && (
            <div className="bg-white/95 rounded-3xl p-10 text-center shadow-xl border border-gray-100 backdrop-blur-sm max-w-2xl flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-[#2DAB80] border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600 text-sm font-semibold">Sedang menyinkronkan data database Palma Nursery...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50/95 text-red-600 rounded-3xl p-6 shadow-lg border border-red-200 backdrop-blur-sm max-w-2xl flex items-start gap-4">
              <FiAlertCircle className="text-3xl shrink-0 mt-0.5 text-red-500" />
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wide text-red-800">Gangguan Koneksi Sistem</h4>
                <p className="text-xs font-medium mt-1 leading-relaxed text-red-700/90">{error}</p>
              </div>
            </div>
          )}

          {/* --- DATA LIST CONTAINER --- */}
          {!loading && !error && (
            <div className="space-y-4">
              {dataTerfilter.length === 0 ? (
                <div className="bg-white/90 rounded-3xl p-12 text-center text-gray-500 font-bold shadow-md max-w-2xl border border-gray-100">
                  Tidak ada varietas bibit yang cocok atau database masih kosong.
                </div>
              ) : (
                dataTerfilter.map((varietas) => (
                  /* Transformasi baris: Fleksibel runtut kebawah di mobile, sejajar baris rapi di desktop */
                  <div 
                    key={varietas.id_varietas} 
                    className="bg-white/95 rounded-[24px] p-6 shadow-md border border-gray-100 lg:flex lg:items-center lg:justify-between gap-6 backdrop-blur-sm group hover:shadow-xl hover:border-[#2DAB80]/20 transition-all duration-300"
                  >
                    {/* Bagian Identitas Utama (Kiri) */}
                    <div className="flex gap-4 items-center lg:w-1/3">
                      <div className="w-14 h-14 rounded-2xl bg-[#D1F5E9] text-[#1E5641] font-black text-base flex items-center justify-center shrink-0 shadow-inner group-hover:bg-[#2DAB80] group-hover:text-white transition-colors duration-300">
                        {dapatkanInisial(varietas.nama_varietas)}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-[#020202] font-black text-lg tracking-tight group-hover:text-[#294D29] transition-colors">
                          {varietas.nama_varietas}
                        </h4>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-0.5 rounded uppercase tracking-wider block inline-block">
                          Fase Umur: {varietas.umur_bulan} Bulan
                        </span>
                      </div>
                    </div>

                    {/* Deskripsi Botani (Tengah) */}
                    <div className="my-4 lg:my-0 flex-1 lg:px-4 lg:border-l lg:border-gray-100">
                      <p className="text-gray-500 text-xs font-medium leading-relaxed line-clamp-2 md:line-clamp-none">
                        {varietas.deskripsi || 'Tidak ada deskripsi botani resmi untuk varietas sawit ini.'}
                      </p>
                    </div>

                    {/* Kontrol & Stok Log (Kanan) */}
                    <div className="flex justify-between items-center lg:justify-end lg:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                      <div className="text-left lg:text-right">
                        <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Stok Fisik</span>
                        <span className="text-base font-black text-[#137333] bg-[#E6F4EA] px-3 py-1.5 rounded-xl border border-green-100 inline-block mt-0.5 tracking-tight shadow-sm">
                          {varietas.stok ? `${varietas.stok.jumlah_stok.toLocaleString('id-ID')} BATANG` : '0 BATANG'}
                        </span>
                      </div>
                      
                      {/* Aksi CRUD */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => navigate(`/karyawan/bibit/form`, { state: { editData: varietas } })}
                          className="w-10 h-10 bg-gray-50 hover:bg-[#294D29] text-gray-500 hover:text-white rounded-xl border border-gray-200/60 flex items-center justify-center transition-all shadow-sm active:scale-90"
                          title="Edit Varietas"
                        >
                          <FiEdit2 className="text-sm" />
                        </button>
                        
                        <button 
                          onClick={() => handleHapus(varietas.id_varietas, varietas.nama_varietas)}
                          className="w-10 h-10 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl border border-red-100 flex items-center justify-center transition-all shadow-sm active:scale-90"
                          title="Hapus Varietas"
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