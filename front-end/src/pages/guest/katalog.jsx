import React, { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineStar,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineCheckCircle,
  AiOutlineDown,
} from "react-icons/ai";
import {
  BsWhatsapp,
  BsShieldCheck,
  BsAward,
  BsSearch,
  BsInstagram,
  BsTiktok,
  BsGeoAlt,
} from "react-icons/bs";

// Import aset lokal (Sesuaikan path dengan struktur folder Anda)
import Logo from "../../../public/img/Logo.png";
import Bg from "../../../public/img/foto_bibit_sawit_1.png";
import S1 from "../../../public/img/S1.jpeg";
import S2 from "../../../public/img/S2.jpeg";
import S3 from "../../../public/img/S3.jpeg";
import S4 from "../../../public/img/S4.jpeg";

// --- DATA DUMMY (Bisa diganti dengan API/Database nantinya) ---
const DATAKATALOG = [
  {
    id: 1,
    nama: "Tenera (DxP) PPKS",
    umur: "6 Bulan",
    deskripsi:
      "Varietas unggul produksi tinggi, adaptasi luas di berbagai jenis lahan, dan pertumbuhan meninggi lambat.",
    stok: 5190,
    harga: "Rp 45.000",
    rating: "4.9",
    badge: "Terlaris",
    gambar: [S1, S2, S3, S4],
  },
  {
    id: 2,
    nama: "Tenera (DxP) Sriwijaya",
    umur: "4 Bulan",
    deskripsi:
      "Dikenal dengan rerata rendemen minyak yang tinggi dan peka terhadap manajemen pemupukan optimal.",
    stok: 3465,
    harga: "Rp 38.000",
    rating: "4.8",
    badge: "Unggulan",
    gambar: [S2, S3, S4, S1],
  },
  {
    id: 3,
    nama: "Tenera (DxP) Lonsum",
    umur: "3 Bulan",
    deskripsi:
      "Kualitas genetika premium, sangat direkomendasikan untuk peremajaan lahan sawit rakyat.",
    stok: 150,
    harga: "Rp 32.000",
    rating: "4.9",
    badge: "Stok Terbatas",
    gambar: [S3, S4, S1, S2],
  },
];

const ARTIKEL = [
  {
    id: 1,
    judul: "Cara Memilih Bibit Sawit Berkualitas",
    kategori: "Kualitas",
    tanggal: "12 Okt 2023",
    img: S1,
  },
  {
    id: 2,
    judul: "Perawatan Kecambah Sawit di Pre-Nursery",
    kategori: "Kecambah",
    tanggal: "05 Nov 2023",
    img: S2,
  },
  {
    id: 3,
    judul: "Pentingnya Sertifikasi pada Benih Sawit",
    kategori: "Bibit",
    tanggal: "20 Des 2023",
    img: S3,
  },
];

const FAQ = [
  {
    t: "Apakah bibit yang dijual bersertifikat resmi?",
    j: "Ya, seluruh bibit kami memiliki sertifikat resmi dari balai benih dan lembaga terkait.",
  },
  {
    t: "Bagaimana sistem pengiriman bibitnya?",
    j: "Kami melayani pengiriman menggunakan armada truk khusus yang aman hingga ke lokasi lahan Anda (S&K Berlaku).",
  },
  {
    t: "Apakah ada garansi jika bibit mati di jalan?",
    j: "Kami memberikan garansi pergantian bibit jika terjadi kerusakan fatal selama proses pengiriman oleh tim kami.",
  },
];

const TESTIMONI = [
  {
    nama: "Bpk. Sudirman",
    lokasi: "Siak",
    komentar:
      "Bibit PPKS dari Berkah Palma pertumbuhannya sangat seragam dan bonggolnya besar.",
  },
  {
    nama: "Ibu Rahmawati",
    lokasi: "Pelalawan",
    komentar:
      "Pelayanan sangat ramah, dikasih panduan pemupukan juga setelah beli.",
  },
];

// --- MAIN COMPONENT ---
export default function CompanyProfile() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduk, setSelectedProduk] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [jumlahPesan, setJumlahPesan] = useState(100);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const menuItems = [
    { label: "Beranda", id: "hero" },
    { label: "Tentang Kami", id: "tentang-kami" },
    { label: "Katalog Produk", id: "produk" },
    { label: "Artikel", id: "artikel" },
    { label: "Kontak", id: "kontak" },
  ];

  const scrollToSection = (id) => {
    setIsOpenMenu(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#020202] font-sans selection:bg-[#2DAB80] selection:text-white relative">
      {/* ================= HEADER & NAVBAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#294D29]/95 backdrop-blur-md shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center text-white">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <img
              src={Logo}
              alt="Logo"
              className="w-8 h-8 object-contain rounded-full bg-white p-0.5"
            />
            <span className="text-sm md:text-base font-bold tracking-wider uppercase">
              Berkah Palma
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-200">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-[#C5A830] cursor-pointer transition-colors"
              >
                {item.label}
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className="md:hidden text-2xl text-white focus:outline-none"
          >
            {isOpenMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpenMenu && (
          <div className="absolute top-[100%] left-0 w-full bg-[#294D29] border-t border-white/10 shadow-xl md:hidden">
            <ul className="flex flex-col text-sm font-semibold uppercase text-gray-100 p-4">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => scrollToSection(item.id)}
                  className="py-3 px-4 hover:bg-white/10 rounded-lg cursor-pointer"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* ================= 1. BERANDA (HERO SECTION) ================= */}
      <section
        id="hero"
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${Bg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#294D29]/70 to-gray-50 
          pointer-events-none z-0" />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left space-y-6">
            <span className="inline-block py-1 px-3 rounded-full bg-[#C5A830]/20 text-[#C5A830] font-bold 
            text-xs border border-[#C5A830]/50 backdrop-blur-sm">
              Distributor Bibit Sawit Unggul Terpercaya
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Investasi Terbaik untuk{" "}
              <span className="text-[#C5A830]">Masa Depan</span> Kebun Anda
            </h1>
            <p className="text-gray-200 text-sm md:text-base max-w-xl mx-auto lg:mx-0">
              Menyediakan kecambah dan bibit kelapa sawit bersertifikat resmi
              untuk hasil panen yang maksimal dan berkelanjutan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => scrollToSection("produk")}
                className="w-full sm:w-auto bg-[#C5A830] hover:bg-[#A88E25] text-white font-bold px-8 py-3 
                rounded-full transition-all shadow-lg"
              >
                Lihat Katalog Bibit
              </button>
              <button
                onClick={() => scrollToSection("tentang-kami")}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 
                text-white font-bold px-8 py-3 rounded-full transition-all"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="w-full lg:w-[400px] bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20">
            <h3 className="font-bold text-[#294D29] mb-4 text-center">
              Kenapa Memilih Kami?
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl">
                <BsShieldCheck className="text-2xl text-[#C5A830]" />
                <div>
                  <h4 className="font-bold text-sm">100% Bersertifikat</h4>
                  <p className="text-xs text-gray-500">
                    Legalitas bibit terjamin resmi
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl">
                <AiOutlineCheckCircle className="text-2xl text-[#C5A830]" />
                <div>
                  <h4 className="font-bold text-sm">Kualitas Super (DxP)</h4>
                  <p className="text-xs text-gray-500">
                    Tingkat rendemen minyak tinggi
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl">
                <BsAward className="text-2xl text-[#C5A830]" />
                <div>
                  <h4 className="font-bold text-sm">Pendampingan</h4>
                  <p className="text-xs text-gray-500">
                    Konsultasi gratis perawatan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MITRA KAMI (Part of Beranda) */}
      {/* <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Mitra & Sumber Benih Kami
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
            {/* Ganti text ini dengan tag <img /> logo mitra Anda jika sudah ada */}
            {/* <h2 className="font-black text-xl text-gray-800">PPKS</h2>
            <h2 className="font-black text-xl text-gray-800">LONSUM</h2>
            <h2 className="font-black text-xl text-gray-800">SRIWIJAYA</h2>
            <h2 className="font-black text-xl text-gray-800">SOCFINDO</h2>
          </div>
        </div>
      </section> */} 

      {/* ================= 2. TENTANG KAMI ================= */}
      <section id="tentang-kami" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Kiri: Gambar & Sejarah */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={S1}
                  alt="Kebun"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <img
                  src={S2}
                  alt="Bibit"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8"
                />
              </div>
            </div>

            {/* Kanan: Teks & Visi Misi */}
            <div className="space-y-6">
              <h4 className="text-[#C5A830] font-bold text-sm uppercase tracking-wider">
                Tentang Kami
              </h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#294D29]">
                Dedikasi untuk Kelapa Sawit Indonesia
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                <strong>Berkah Palma</strong> adalah perusahaan penangkar bibit
                kelapa sawit yang berdiri sejak tahun 2015. Berawal dari
                komitmen untuk membantu petani swadaya mendapatkan bahan tanaman
                yang berkualitas, kini kami telah berkembang menjadi mitra
                strategis berbagai perkebunan skala menengah hingga besar di
                wilayah Sumatera.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex-1 border-l-4 border-l-[#2DAB80]">
                  <h3 className="font-bold text-[#020202] mb-2">Visi</h3>
                  <p className="text-xs text-gray-500">
                    Menjadi penyedia bibit kelapa sawit bersertifikat terbaik
                    dan terpercaya yang mendukung perkebunan berkelanjutan.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex-1 border-l-4 border-l-[#C5A830]">
                  <h3 className="font-bold text-[#020202] mb-2">Misi</h3>
                  <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
                    <li>Menjaga kemurnian genetika bibit.</li>
                    <li>Menerapkan Good Agricultural Practices (GAP).</li>
                    <li>Memberikan edukasi bagi para petani mitra.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. INFORMASI PRODUK (KATALOG) ================= */}
      <section id="produk" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h4 className="text-[#C5A830] font-bold text-sm uppercase tracking-wider">
                Katalog Produk
              </h4>
              <h2 className="text-3xl font-extrabold text-[#294D29] mt-2">
                Pilihan Varietas Unggulan
              </h2>
              <p className="text-gray-500 text-sm mt-3">
                Silakan cari dan pilih bibit berdasarkan umur dan jenis varietas
                yang sesuai dengan rencana tanam Anda.
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <AiOutlineSearch />
              </span>
              <input
                type="text"
                placeholder="Cari bibit (ex: PPKS, 6 Bulan)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm 
                focus:outline-none focus:ring-2 focus:ring-[#2DAB80]/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATAKATALOG.filter(
              (item) =>
                item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.umur.toLowerCase().includes(searchTerm.toLowerCase()),
            ).map((produk) => (
              <div
                key={produk.id}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden 
                hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-56 relative overflow-hidden bg-gray-100">
                  <img
                    src={produk.gambar[0]}
                    alt={produk.nama}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 
                  rounded-full text-xs font-bold text-[#294D29]">
                    {produk.umur}
                  </div>
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold 
                      uppercase tracking-wider text-white ${produk.badge === "Terlaris" ? "bg-[#C5A830]" : produk.badge === 
                        "Stok Terbatas" ? "bg-red-500" : "bg-[#2DAB80]"}`}
                  >
                    {produk.badge}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                      {produk.nama}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {produk.deskripsi}
                    </p>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl text-sm">
                    <div className="text-center">
                      <span className="block text-[10px] font-bold text-gray-400">
                        STOK
                      </span>
                      <span className="font-bold text-gray-700">
                        {produk.stok} Pkk
                      </span>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                      <span className="block text-[10px] font-bold text-gray-400">
                        RATING
                      </span>
                      <span className="font-bold text-gray-700 flex items-center gap-1 justify-center">
                        <AiOutlineStar className="text-yellow-500" />{" "}
                        {produk.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <span className="block text-xs text-gray-400">
                        Harga per pokok
                      </span>
                      <span className="font-extrabold text-[#294D29] text-lg">
                        {produk.harga}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProduk(produk);
                        setShowOrderModal(true);
                      }}
                      className="bg-[#294D29] hover:bg-[#1f3a1f] text-white px-5 py-2.5 
                      rounded-full text-xs font-bold transition-colors"
                    >
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AKTIVITAS & GALERI ================= */}
      <section className="py-16 bg-[#294D29] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Aktivitas & Galeri Kami
            </h2>
            <p className="text-white/70 text-sm mt-2 max-w-2xl mx-auto">
              Momen kegiatan perawatan, penyortiran, hingga pengiriman bibit ke
              lahan konsumen.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[S1, S2, S3, S4].map((img, idx) => (
              <div
                key={idx}
                className="h-40 md:h-56 rounded-2xl overflow-hidden relative group"
              >
                <img
                  src={img}
                  alt={`Galeri ${idx}`}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity
                 flex items-center justify-center">
                  <BsSearch className="text-white text-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. ARTICLES (ARTIKEL EDUKASI) ================= */}
      <section id="artikel" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center">
            <h4 className="text-[#C5A830] font-bold text-sm uppercase tracking-wider">
              Artikel & Wawasan
            </h4>
            <h2 className="text-3xl font-extrabold text-[#294D29] mt-2">
              Edukasi Seputar Sawit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTIKEL.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg 
                transition-all border border-gray-100"
              >
                <img
                  src={art.img}
                  alt={art.judul}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 
                    py-1 rounded uppercase tracking-wider">
                      {art.kategori}
                    </span>
                    <span className="text-xs text-gray-400">{art.tanggal}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2 leading-snug">
                    {art.judul}
                  </h3>
                  <a
                    href="#"
                    className="text-sm font-bold text-[#2DAB80] hover:underline"
                  >
                    Baca selengkapnya &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONI & FAQ ================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16">
          {/* Testimoni */}
          <div>
            <h4 className="text-[#C5A830] font-bold text-sm uppercase tracking-wider mb-6">
              Ulasan Pelanggan
            </h4>
            <div className="space-y-6">
              {TESTIMONI.map((testi, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative"
                >
                  <span className="absolute top-4 right-6 text-4xl text-gray-200 font-serif">
                    "
                  </span>
                  <p className="text-gray-600 text-sm italic mb-4 relative z-10">
                    {testi.komentar}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#294D29] rounded-full flex items-center 
                    justify-center text-white font-bold text-sm">
                      {testi.nama.charAt(5)} {/* Ambil inisial nama */}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-gray-800">
                        {testi.nama}
                      </h5>
                      <span className="text-xs text-gray-500">
                        {testi.lokasi}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h4 className="text-[#C5A830] font-bold text-sm uppercase tracking-wider mb-6">
              Pertanyaan Umum (FAQ)
            </h4>
            <div className="space-y-3">
              {FAQ.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                    className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="font-bold text-sm text-gray-800">
                      {faq.t}
                    </span>
                    <AiOutlineDown
                      className={`text-gray-500 transition-transform ${openFAQ === idx ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFAQ === idx && (
                    <div className="p-5 pt-0 bg-white text-sm text-gray-600 border-t border-gray-100">
                      {faq.j}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. FOOTER & KONTAK PERSON ================= */}
      <footer
        id="kontak"
        className="bg-[#1A301A] text-gray-300 pt-16 pb-8 border-t-4 border-[#C5A830]"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Kolom 1: Branding */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-10 h-10 object-contain rounded-full bg-white p-1"
                />
                <span className="text-xl font-extrabold text-white tracking-widest uppercase">
                  Berkah Palma
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Solusi cerdas investasi masa depan melalui penyediaan bibit
                kelapa sawit unggul bersertifikat.
              </p>
            </div>

            {/* Kolom 2: Tautan Cepat */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
                Tautan Cepat
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection("hero")}
                    className="hover:text-[#C5A830] transition-colors"
                  >
                    Beranda
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("tentang-kami")}
                    className="hover:text-[#C5A830] transition-colors"
                  >
                    Tentang Kami
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("produk")}
                    className="hover:text-[#C5A830] transition-colors"
                  >
                    Katalog Produk
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("artikel")}
                    className="hover:text-[#C5A830] transition-colors"
                  >
                    Artikel
                  </button>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Kontak Info */}
            <div className="space-y-4">
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
                Hubungi Kami
              </h4>
              <div className="flex items-start gap-3 text-sm">
                <BsGeoAlt className="text-[#C5A830] text-lg shrink-0 mt-0.5" />
                <p>
                  Jl. Lintas Timur Sumatera, Kab. Siak, Riau, Indonesia 28671
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <BsWhatsapp className="text-[#C5A830] text-lg shrink-0" />
                <p>+62 812-3456-7890</p>
              </div>
            </div>

            {/* Kolom 4: Sosial Media */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
                Sosial Media
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                   hover:bg-[#2DAB80] hover:text-white transition-all"
                >
                  <BsWhatsapp className="text-lg" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                   hover:bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 hover:text-white transition-all"
                >
                  <BsInstagram className="text-lg" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                   hover:bg-black hover:text-white transition-all"
                >
                  <BsTiktok className="text-lg" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Berkah Palma. Hak Cipta Dilindungi
            Undang-Undang.
          </div>
        </div>
      </footer>

      {/* ================= MODAL PEMESANAN (Tetap Dipertahankan & Dipercantik) ================= */}
      {showOrderModal && selectedProduk && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-5 z-[60]">
          <div className="bg-white rounded-t-[32px] sm:rounded-3xl p-6 w-full sm:max-w-md space-y-5 shadow-2xl animate-slide-up sm:animate-fade-in">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#C5A830] bg-[#C5A830]/10 px-2 py-1 rounded uppercase">
                  Form Pesanan
                </span>
                <h3 className="font-bold text-xl text-[#020202] mt-2">
                  {selectedProduk.nama}
                </h3>
                <p className="text-sm text-gray-500">
                  Fase Umur: {selectedProduk.umur}
                </p>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-red-500 text-2xl"
              >
                <AiOutlineClose />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Jumlah Pokok (Min. 50)
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setJumlahPesan((p) => Math.max(50, p - 10))}
                  className="w-12 h-12 bg-gray-100 rounded-xl font-bold text-xl hover:bg-gray-200"
                >
                  -
                </button>
                <input
                  type="number"
                  value={jumlahPesan}
                  onChange={(e) => setJumlahPesan(Number(e.target.value))}
                  className="w-full bg-gray-50 h-12 rounded-xl border border-gray-200 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#2DAB80]"
                />
                <button
                  onClick={() => setJumlahPesan((p) => p + 10)}
                  className="w-12 h-12 bg-gray-100 rounded-xl font-bold text-xl hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-[#294D29]/5 p-4 rounded-2xl flex justify-between items-center border border-[#294D29]/10">
              <span className="text-gray-600 font-medium text-sm">
                Estimasi Investasi:
              </span>
              <span className="font-black text-[#294D29] text-xl">
                Rp{" "}
                {(
                  jumlahPesan *
                  parseInt(selectedProduk.harga.replace(/[^0-9]/g, ""))
                ).toLocaleString("id-ID")}
              </span>
            </div>

            <a
              href={`https://wa.me/6281234567890?text=Halo%20Admin%20Berkah%20Palma,%20saya%20tertarik%20untuk%20memesan%20bibit:%0A%0AVarietas:%20*${selectedProduk.nama}*%0AUmur:%20*${selectedProduk.umur}*%0AJumlah:%20*${jumlahPesan}%20Pokok*%0A%0AMohon%20info%20ketersediaan%20dan%20ongkos%20kirimnya.%20Terima%20kasih.`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#2DAB80] text-white text-sm font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#238c68] shadow-lg transition-all active:scale-95"
            >
              <BsWhatsapp className="text-lg" />
              Lanjutkan ke WhatsApp
            </a>
          </div>
        </div>
      )}

      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1ebd5a] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl z-40 transition-transform hover:-translate-y-1"
      >
        <BsWhatsapp />
      </a>
    </div>
  );
}
