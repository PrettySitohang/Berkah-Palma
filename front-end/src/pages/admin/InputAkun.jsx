import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi2';
import { FiEye, FiEyeOff, FiInfo, FiCheckCircle } from 'react-icons/fi';
import Bg from '../../../public/img/foto_bibit_sawit_1.png';
import axios from 'axios';

export default function InputAkun() {
  const navigate = useNavigate();

  // FORM DATA STATE
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    role: '', // Menyimpan 'admin' atau 'staf'
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  // STATE NOTIFIKASI TOAST FLOATING (SISTEM ELEGAN BALAPAN)
  const [notifikasi, setNotifikasi] = useState({
    muncul: false,
    pesan: '',
    tipe: 'sukses'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // HANDLER SIMPAN DATA KE API LARAVEL
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi data wajib isi
    if (!formData.name || !formData.username || !formData.role || !formData.password) {
      setNotifikasi({
        muncul: true,
        pesan: 'Mohon lengkapi seluruh kolom wajib (*), bos!',
        tipe: 'gagal'
      });
      return;
    }

    try {
      setLoading(true);

      // Hitung inisial otomatis (Contoh: Budi Santoso -> BS)
      const words = formData.name.trim().split(' ');
      const initials = words.length === 1 
        ? words[0].substring(0, 2).toUpperCase() 
        : (words[0][0] + words[1][0]).toUpperCase();

      // Pilih warna background bulat secara acak untuk profil list
      const colors = ['bg-emerald-600', 'bg-blue-600', 'bg-amber-500', 'bg-teal-600', 'bg-indigo-600'];
      const color = `${colors[Math.floor(Math.random() * colors.length)]} text-white`;

      // Kirim data murni ke API Berkah Palma Laravel
      const response = await axios.post('http://127.0.0.1:8000/api/staf', {
        name: formData.name,
        username: formData.username.toLowerCase().replace(/\s+/g, ''), // Otomatis lowercase & hapus spasi
        role: formData.role, // 'admin' atau 'staf'
        password: formData.password,
        status: isActive ? 'aktif' : 'nonaktif',
        initials: initials,
        color: color
      });

      if (response.status === 201 || response.status === 200) {
        // TRIGGER NOTIFIKASI FLOATING SUKSES
        setNotifikasi({
          muncul: true,
          pesan: 'Mantap bos! Akun staf baru berhasil disimpan dan siap operasional.',
          tipe: 'sukses'
        });

        // Kosongkan form input kembali
        setFormData({ name: '', username: '', role: '', password: '' });
        setIsActive(true);

        // Jeda 2.5 detik lalu redirect otomatis ke halaman utama manajemen akun
        setTimeout(() => {
          navigate('/admin/akun');
        }, 2500);
      }
    } catch (error) {
      console.error(error);
      let pesanError = 'Koneksi gagal! Pastikan server backend Laravel Anda menyala.';
      
      if (error.response && (error.response.status === 422 || error.response.status === 500)) {
        pesanError = 'Waduh bos, Username tersebut sudah terdaftar! Gunakan nama lain.';
      }

      setNotifikasi({
        muncul: true,
        pesan: pesanError,
        tipe: 'gagal'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen pb-10 font-sans selection:bg-[#2DAB80] selection:text-white relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/95 to-white/98 pointer-events-none z-0" />

      {/* TAMPILAN ELEMEN NOTIFIKASI FLOATING (TOAST ALERT) */}
      {notifikasi.muncul && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[99] w-[90%] max-w-md animate-bounce">
          <div className={`shadow-xl rounded-2xl p-4 flex gap-3 items-center border ${
            notifikasi.tipe === 'sukses' 
              ? 'bg-[#E6F4EA] border-green-200 text-[#137333]' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {notifikasi.tipe === 'sukses' ? (
              <FiCheckCircle className="text-xl shrink-0" />
            ) : (
              <FiInfo className="text-xl shrink-0" />
            )}
            <p className="text-xs font-bold tracking-wide leading-tight">
              {notifikasi.pesan}
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Header dengan Trigger Navigasi Balik */}
        <div className="bg-[#294D29] text-white px-4 py-5 flex items-center gap-3 shadow-md sticky top-0 z-50">
          <button 
            type="button"
            onClick={() => navigate(-1)} 
            className="text-2xl focus:outline-none cursor-pointer hover:bg-white/10 p-1 rounded-full transition-all" 
            aria-label="Kembali"
          >
            <HiChevronLeft />
          </button>
          <span className="text-lg font-bold tracking-wide">Input Akun Staf</span>
        </div>

        {/* INTEGRASI PEMBUNGKUS FORM UNTUK SUBMIT DATA */}
        <form onSubmit={handleSubmit} className="flex-1 px-6 pt-8 pb-24 space-y-8 bg-white/30 backdrop-blur-[1px]">
          
          {/* Data Profile */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-black text-[#020202] tracking-tight">Data Profile</h2>
              <p className="text-[#747474] text-xs font-medium mt-1 leading-relaxed">
                Lengkapi form di bawah untuk menambahkan staf baru ke sistem.
              </p>
            </div>

            {/* INPUT Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Nama Lengkap <span className="text-[#F9303B]">*</span>
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama..." 
                className="w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all shadow-sm"
                required
              />
            </div>

            {/* INPUT Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Username <span className="text-[#F9303B]">*</span>
              </label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="budi.karyawan" 
                className="w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all shadow-sm"
                required
              />
            </div>

            {/* DROPDOWN HAK AKSES (HANYA 2 OPSI SESUAI FIGMA) */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Hak Akses <span className="text-[#F9303B]">*</span>
              </label>
              <div className="relative">
                <select 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#020202] appearance-none focus:outline-none focus:border-[#294D29] focus:bg-white transition-all shadow-sm cursor-pointer"
                  required
                >
                  <option value="">Pilih akses...</option>
                  <option value="admin">Admin</option>
                  <option value="staf">Karyawan</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200/60" />

          {/* Keamanan */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-[#020202] tracking-tight">Keamanan</h2>

            {/* INPUT Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Password <span className="text-[#F9303B]">*</span>
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimal 8 karakter" 
                  className="w-full bg-white/90 border border-gray-200 rounded-xl pl-4 pr-12 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all shadow-sm"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 text-lg focus:outline-none cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* TOGGLE SAKLAR STATUS OPERASIONAL */}
            <div className="flex justify-between items-center pt-2">
              <div className="space-y-0.5">
                <span className="text-sm font-black text-[#020202] tracking-wide block">Aktifkan Akun</span>
                <span className="text-xs font-medium text-[#747474] block">Staf dapat langsung login</span>
              </div>
              
              <button 
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out focus:outline-none cursor-pointer ${isActive ? 'bg-[#294D29]' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isActive ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* AREA BUTTONS AKSI */}
          <div className="flex items-center justify-between pt-10">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="text-[#747474]/80 hover:text-[#020202] text-sm font-bold tracking-wide focus:outline-none transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className={`text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all focus:outline-none cursor-pointer ${
                loading ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-[#435343] hover:bg-[#294D29] shadow-gray-200'
              }`}
            >
              {loading ? 'Menyimpan...' : 'Simpan Data'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}