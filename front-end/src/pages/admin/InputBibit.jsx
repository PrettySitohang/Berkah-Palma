import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";
import { FiInfo } from "react-icons/fi";
import Bg from "../../../public/img/foto_bibit_sawit_1.png";

export default function InputBibit() {
  const navigate = useNavigate();

  // STAF DATA FORM
  const [formData, setFormData] = useState({
    nama_varietas: "",
    umur_bulan: "",
    deskripsi: "",
    jumlah_stok: "",
  });

  const [loading, setLoading] = useState(false);

  // STATE UNTUK NOTIFIKASI TEMPORER (SISTEM ELEGAN)
  const [notifikasi, setNotifikasi] = useState({
    muncul: false,
    pesan: "",
    tipe: "sukses",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // HANDLER SIMPAN DATA
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nama_varietas ||
      !formData.umur_bulan ||
      !formData.jumlah_stok
    ) {
      setNotifikasi({
        muncul: true,
        pesan: "Mohon lengkapi seluruh kolom wajib (*), bos!",
        tipe: "gagal",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/api/bibit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nama_varietas: formData.nama_varietas,
          umur_bulan: parseInt(formData.umur_bulan),
          deskripsi: formData.deskripsi,
          jumlah_stok: parseInt(formData.jumlah_stok),
        }),
      });

      const hasil = await response.json();

      if (response.ok && hasil.success) {
        // TRIGGER NOTIFIKASI SUKSES DAISYUI
        setNotifikasi({
          muncul: true,
          pesan: "Stok Berhasil ditambahkan",
          tipe: "sukses",
        });

        // Kosongkan form input
        setFormData({
          nama_varietas: "",
          umur_bulan: "",
          deskripsi: "",
          jumlah_stok: "",
        });

        // Beri jeda 2.5 detik agar user bisa melihat pesannya, lalu redirect otomatis
        setTimeout(() => {
          navigate("/admin/bibit");
        }, 2500);
      } else {
        setNotifikasi({
          muncul: true,
          pesan: hasil.message || "Gagal menyimpan data ke database.",
          tipe: "gagal",
        });
      }
    } catch (error) {
      console.error(error);
      setNotifikasi({
        muncul: true,
        pesan: "Koneksi gagal! Pastikan server backend Laravel Anda menyala.",
        tipe: "gagal",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pb-12 font-sans selection:bg-[#2DAB80] selection:text-white relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white/90 pointer-events-none z-0" />

      {notifikasi.muncul && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md transition-all duration-300">
          {notifikasi.tipe === "sukses" ? (
            <div role="alert" className="alert alert-success text-sm font-bold tracking-wide shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{notifikasi.pesan}</span>
            </div>
          ) : (
            <div role="alert" className="alert alert-error text-sm font-bold tracking-wide shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{notifikasi.pesan}</span>
            </div>
          )}
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* HEADER HIJAU ASIMETRIS */}
        <div className="bg-[#294D29] text-white px-6 pt-8 pb-20 rounded-bl-[60px] rounded-br-[60px] shadow-md relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/bibit")}
              className="text-2xl focus:outline-none"
              aria-label="Kembali"
            >
              <HiChevronLeft />
            </button>
            <div className="space-y-0.5">
              <h1 className="text-2xl font-bold tracking-wide">
                Input Varietas
              </h1>
              <p className="text-xs text-gray-300/90 font-medium">
                Master Data Varietas
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 -mt-10 relative z-20 flex-1 w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-5 py-6 space-y-6"
          >
            {/* BOX INFO */}
            <div className="bg-[#EAEFEA]/80 border-2 border-[#315631a0] rounded-2xl p-4 flex gap-3 items-start">
              <FiInfo className="text-[#294D29] text-lg mt-0.5 shrink-0" />
              <p className="text-[#435343] text-xs font-semibold leading-relaxed">
                Form ini digunakan untuk mendaftarkan jenis varietas baru. Untuk
                penambahan stok bibit, gunakan menu{" "}
                <span className="font-bold text-[#294D29]">Manajemen Stok</span>
                .
              </p>
            </div>

            {/* INPUT 1: Nama Varietas */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Nama Varietas <span className="text-[#F9303B]">*</span>
              </label>
              <input
                type="text"
                name="nama_varietas"
                value={formData.nama_varietas}
                onChange={handleChange}
                placeholder="Contoh: PPKS Simalungun"
                className="w-full bg-[#F9FBF9] border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all"
                required
              />
            </div>

            {/* INPUT 2: Umur Bibit */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Umur Bibit <span className="text-[#F9303B]">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  name="umur_bulan"
                  value={formData.umur_bulan}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full bg-[#F9FBF9] border border-gray-200 rounded-xl pl-4 pr-20 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all"
                  required
                />
                <span className="absolute right-3 bg-gray-100 text-gray-400 text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-lg border border-gray-200/50 pointer-events-none">
                  BULAN
                </span>
              </div>
            </div>

            {/* INPUT 3: Stok Fisik Awal */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Kuantitas / Stok Fisik Awal{" "}
                <span className="text-[#F9303B]">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  name="jumlah_stok"
                  value={formData.jumlah_stok}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full bg-[#F9FBF9] border border-gray-200 rounded-xl pl-4 pr-20 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all"
                  required
                />
                <span className="absolute right-3 bg-gray-100 text-gray-400 text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-lg border border-gray-200/50 pointer-events-none">
                  BATANG
                </span>
              </div>
            </div>

            {/* INPUT 4: Deskripsi Tambahan */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-[#020202] tracking-wide block">
                  Deskripsi Tambahan
                </label>
                <span className="bg-gray-200/60 text-gray-400 text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md">
                  OPSIONAL
                </span>
              </div>
              <textarea
                rows="4"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                placeholder="Tuliskan keunggulan atau karakteristik varietas di sini..."
                className="w-full bg-[#F9FBF9] border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* BUTTON SUBMIT */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#435343] hover:bg-[#294D29]"} text-white text-sm font-bold py-4 rounded-xl shadow-md transition-all focus:outline-none tracking-wide cursor-pointer`}
              >
                {loading ? "Sedang Menyimpan Data..." : "Simpan Varietas"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}