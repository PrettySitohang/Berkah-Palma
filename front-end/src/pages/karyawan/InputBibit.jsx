import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiChevronLeft } from "react-icons/hi2";
import { FiInfo } from "react-icons/fi";
import Bg from "../../../public/img/foto_bibit_sawit_1.png";

export default function InputBibit() {
  const navigate = useNavigate();

  // State utama form input
  const [formData, setFormData] = useState({
    id_varietas: "", 
    jumlah_stok: "",
  });

  // State data master dropdown & loading
  const [daftarVarietas, setDaftarVarietas] = useState([]);
  const [loadingVarietas, setLoadingVarietas] = useState(true);
  const [loading, setLoading] = useState(false);

  // State penampung notifikasi pop-up
  const [notifikasi, setNotifikasi] = useState({
    muncul: false,
    pesan: "",
    tipe: "sukses",
  });

  // Ambil daftar varietas dari database saat halaman dibuka
  useEffect(() => {
    const ambilDataVarietas = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/bibit");
        const hasil = await response.json();
        
        if (response.ok) {
          // Antisipasi jika API mereturn objek response bungkus data ({ data: [...] })
          const dataArray = Array.isArray(hasil) ? hasil : hasil.data;
          if (Array.isArray(dataArray)) {
            setDaftarVarietas(dataArray);
          }
        }
      } catch (error) {
        console.error("Error fetching varietas:", error);
        setNotifikasi({
          muncul: true,
          pesan: "Gagal memuat daftar varietas dari server.",
          tipe: "gagal",
        });
      } finally {
        setLoadingVarietas(false);
      }
    };

    ambilDataVarietas();
  }, []);

  // Handler mengubah nilai input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler submit pengiriman data stok ke Laravel
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi Sederhana di Sisi Klien
    if (!formData.id_varietas || !formData.jumlah_stok) {
      setNotifikasi({
        muncul: true,
        pesan: "Silakan pilih varietas dan isi jumlah stok terlebih dahulu!",
        tipe: "gagal",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/bibit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id_varietas: parseInt(formData.id_varietas), 
          jumlah_stok: parseInt(formData.jumlah_stok),
        }),
      });

      const hasil = await response.json();

      if (response.ok && hasil.success) {
        setNotifikasi({
          muncul: true,
          pesan: "Stok fisik berhasil ditambahkan ke database sistem!",
          tipe: "sukses",
        });

        // Reset form kembali kosong
        setFormData({
          id_varietas: "",
          jumlah_stok: "",
        });

        // Tunggu sebentar agar user melihat pemberitahuan sukses, lalu redirect halaman
        setTimeout(() => {
          navigate("/karyawan/bibit");
        }, 2500);
      } else {
        setNotifikasi({
          muncul: true,
          pesan: hasil.message || "Gagal memperbarui data stok bibit.",
          tipe: "gagal",
        });
      }
    } catch (error) {
      console.error("Koneksi Error:", error);
      setNotifikasi({
        muncul: true,
        pesan: "Koneksi terputus! Pastikan server backend Laravel Anda menyala.",
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
      {/* Lapisan Latar Belakang Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white/90 pointer-events-none z-0" />

      {/* Tampilan Pop-up Notifikasi */}
      {notifikasi.muncul && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md transition-all duration-300">
          {notifikasi.tipe === "sukses" ? (
            <div role="alert" className="alert text-sm font-bold tracking-wide shadow-xl bg-emerald-500 text-white border-none flex gap-3 p-4 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{notifikasi.pesan}</span>
            </div>
          ) : (
            <div role="alert" className="alert text-sm font-bold tracking-wide shadow-xl bg-rose-500 text-white border-none flex gap-3 p-4 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{notifikasi.pesan}</span>
            </div>
          )}
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* HEADER ATAS */}
        <div className="bg-[#294D29] text-white px-6 pt-8 pb-20 rounded-bl-[60px] rounded-br-[60px] shadow-md relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/karyawan/bibit")}
              className="text-2xl focus:outline-none cursor-pointer"
              aria-label="Kembali"
            >
              <HiChevronLeft />
            </button>
            <div className="space-y-0.5">
              <h1 className="text-2xl font-bold tracking-wide">
                Tambah Stok Bibit
              </h1>
              <p className="text-xs text-gray-300/90 font-medium">
                Inputkan stok fisik bibit ke dalam sistem
              </p>
            </div>
          </div>
        </div>

        {/* CONTAINER FORM */}
        <div className="px-8 -mt-10 relative z-20 flex-1 w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-5 py-6 space-y-6"
          >
            {/* BOX PETUNJUK INFORMASI */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 flex gap-3 items-start">
              <FiInfo className="text-green-600 text-lg mt-0.5 shrink-0" />
              <p className="text-green-800 text-xs font-semibold leading-relaxed">
                <span className="font-bold">Akses Karyawan:</span> Anda hanya dapat menambahkan kuantitas stok untuk varietas yang telah terdaftar resmi oleh admin. Pilih varietas dari opsi di bawah, lalu isi jumlah fisiknya.
              </p>
            </div>

            {/* FIELD INPUT 1: Dropdown Pilih Varietas */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Pilih Varietas Bibit <span className="text-[#F9303B]">*</span>
              </label>
              {loadingVarietas ? (
                <div className="w-full bg-[#F9FBF9] border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-400">
                  Memuat daftar varietas...
                </div>
              ) : (
                <select
                  name="id_varietas"
                  value={formData.id_varietas}
                  onChange={handleChange}
                  className="w-full bg-[#F9FBF9] border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#020202] focus:outline-none focus:border-[#294D29] focus:bg-white transition-all cursor-pointer"
                  required
                >
                  <option value="">-- Pilih Varietas --</option>
                  {daftarVarietas.map((varietas) => (
                    <option key={varietas.id_varietas} value={varietas.id_varietas}>
                      {varietas.nama_varietas} ({varietas.umur_bulan} bulan)
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* FIELD INPUT 2: Input Angka Jumlah Stok */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#020202] tracking-wide block">
                Jumlah Stok Bibit <span className="text-[#F9303B]">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  name="jumlah_stok"
                  value={formData.jumlah_stok}
                  onChange={handleChange}
                  placeholder="0"
                  min="1"
                  className="w-full bg-[#F9FBF9] border border-gray-200 rounded-xl pl-4 pr-20 py-3.5 text-sm text-[#020202] placeholder:text-gray-300 focus:outline-none focus:border-[#294D29] focus:bg-white transition-all"
                  required
                />
                <span className="absolute right-3 bg-gray-100 text-gray-400 text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-lg border border-gray-200/50 pointer-events-none">
                  BATANG
                </span>
              </div>
            </div>

            {/* TOMBOL PENGIRIMAN */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || loadingVarietas}
                className={`w-full ${loading || loadingVarietas ? "bg-gray-400 cursor-not-allowed" : "bg-[#2DAB80] hover:bg-[#1f8860]"} text-white text-sm font-bold py-4 rounded-xl shadow-md transition-all focus:outline-none tracking-wide cursor-pointer`}
              >
                {loading ? "Sedang Menyimpan..." : "Tambahkan Stok"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}