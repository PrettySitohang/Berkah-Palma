import { useState, useEffect, useMemo } from "react";
import { AiOutlineInbox } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";
import {
  FiUsers,
  FiPackage,
  FiShoppingBag,
  FiAlertTriangle,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import React from "react";
import Header from "../../components/Header";
import bgHero from "../../assets/foto_bibit_sawit.png";

const API_BASE = "http://127.0.0.1:8000/api";

const NAMA_BULAN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
const DONUT_WARNA = ["#5B7F52", "#8C8672", "#A3491F", "#C9A24B", "#4B6B8C"];

// Bentuk data kosong dipakai sebagai default sebelum fetch selesai / kalau fetch gagal,
// supaya semua akses field di JSX aman tanpa optional chaining berantai.
const DATA_KOSONG = {
  total_stok: 0,
  total_jual_bulan_ini: 0,
  total_afkir_bulan_ini: 0,
  total_varietas: 0,
  staf_aktif: 0,
  pesanan_bulan_ini: 0,
  varietas_kritis_count: 0,
  rincian_varietas: [],
  tren_bulanan: [],
  aktivitas_terakhir: [],
};

export default function Dashboard() {
  const [mode, setMode] = useState("bulan"); // "bulan" | "semua"
  const [bulan, setBulan] = useState(new Date().getMonth());
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [tahunTampil, setTahunTampil] = useState(new Date().getFullYear());
  const [periodOpen, setPeriodOpen] = useState(false);
  const [varietasOpen, setVarietasOpen] = useState(false);

  // Filter varietas disimpan sebagai id (bukan nama) supaya bisa dikirim langsung ke API.
  const [daftarVarietas, setDaftarVarietas] = useState([]);
  const [varietasFilterId, setVarietasFilterId] = useState(null);

  const [data, setData] = useState(DATA_KOSONG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const periodLabel =
    mode === "semua" ? "Semua Waktu" : `${NAMA_BULAN[bulan]} ${tahun}`;

  const varietasFilterLabel = varietasFilterId
    ? daftarVarietas.find((v) => v.id_varietas === varietasFilterId)
        ?.nama_varietas || "Semua Varietas"
    : "Semua Varietas";

  // Ambil daftar varietas sekali di awal, buat isi dropdown filter.
  useEffect(() => {
    fetch(`${API_BASE}/varietas-bibit`)
      .then((res) => res.json())
      .then((list) => setDaftarVarietas(Array.isArray(list) ? list : []))
      .catch((err) => console.error("Gagal mengambil daftar varietas:", err));
  }, []);

  // Ambil data dashboard tiap kali filter periode/varietas berubah.
  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (mode === "semua") {
      params.set("semua", "1");
    } else {
      params.set("bulan", String(bulan + 1)); // input user 0-indexed, backend 1-indexed
      params.set("tahun", String(tahun));
    }
    if (varietasFilterId) params.set("id_varietas", varietasFilterId);

    fetch(`${API_BASE}/dashboard?${params.toString()}`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) throw new Error(res.message || "Gagal mengambil data.");
        setData({ ...DATA_KOSONG, ...res.data });
      })
      .catch((err) => {
        console.error("Gagal mengambil data dashboard:", err);
        setError("Gagal memuat data dashboard. Pastikan server backend menyala.");
      })
      .finally(() => setLoading(false));
  }, [mode, bulan, tahun, varietasFilterId]);

  const rincianVarietas = data.rincian_varietas;
  const trenBulanan = data.tren_bulanan;
  const varietasKritisPertama = rincianVarietas.find((v) => v.status === "kritis");

  const totalSisaDonut = useMemo(
    () => rincianVarietas.reduce((s, d) => s + (d.stok || 0), 0),
    [rincianVarietas]
  );
  const trenMax = useMemo(
    () =>
      Math.max(1, ...trenBulanan.flatMap((t) => [t.jual || 0, t.afkir || 0])),
    [trenBulanan]
  );

  const R = 60,
    C = 2 * Math.PI * R;
  let offsetAkumulasi = 0;

  return (
    <div
      className="min-h-screen relative font-sans text-slate-800 pb-20"
      style={{ fontFamily: '"Poppins", sans-serif' }}
    >
      <Header />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="fixed inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${bgHero})`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(68,96,68,.72) 0%, rgba(68,96,68,.46) 3%, rgba(255,255,255,.62) 54%, rgba(255,255,255,1) 120%)",
            }}
          />
        </div>
      </div>
      <div className="relative font-sans selection:bg-[#5B7F52] selection:text-white pb-10">
        <div className="bg-[#294D29] text-white px-6 pt-4 pb-16 rounded-bl-[60px] rounded-br-none shadow-md relative z-10 -mt-1">
          <h1 className="text-3xl font-bold tracking-wide">Overview</h1>
          <h2 className="text-3xl font-bold tracking-wide mt-1">Stok Bibit</h2>
          <p className="text-xs text-white/50 mt-2 font-mono tracking-wide">
            Periode: {data.periode?.label || periodLabel}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {/* Dropdown periode */}
            <div className="relative">
              <button
                onClick={() => setPeriodOpen(!periodOpen)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold px-4 py-2 rounded-full border border-white/15 transition-colors cursor-pointer"
              >
                {periodLabel}
                <FiChevronDown
                  className={`transition-transform ${periodOpen ? "rotate-180" : ""}`}
                />
              </button>

              {periodOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-[#FBF9F4] rounded-2xl shadow-xl border border-[#8C8672]/20 p-4 z-50">
                  <button
                    onClick={() => {
                      setMode("semua");
                      setPeriodOpen(false);
                    }}
                    className={`w-full text-left text-xs font-bold px-3 py-2.5 rounded-lg mb-3 transition-colors cursor-pointer ${mode === "semua" ? "bg-[#24391F] text-white" : "text-[#20241D] hover:bg-[#8C8672]/10"}`}
                  >
                    Semua Waktu
                  </button>

                  <div className="flex items-center justify-between mb-2 px-1">
                    <button
                      onClick={() => setTahunTampil((t) => t - 1)}
                      className="text-[#8C8672] hover:text-[#20241D] p-1 cursor-pointer"
                    >
                      <FiChevronLeft />
                    </button>
                    <span className="text-xs font-bold text-[#20241D] font-mono">
                      {tahunTampil}
                    </span>
                    <button
                      onClick={() => setTahunTampil((t) => t + 1)}
                      className="text-[#8C8672] hover:text-[#20241D] p-1 cursor-pointer"
                    >
                      <FiChevronRight />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {NAMA_BULAN.map((nm, idx) => {
                      const aktif =
                        mode === "bulan" &&
                        bulan === idx &&
                        tahun === tahunTampil;
                      return (
                        <button
                          key={nm}
                          onClick={() => {
                            setBulan(idx);
                            setTahun(tahunTampil);
                            setMode("bulan");
                            setPeriodOpen(false);
                          }}
                          className={`text-[11px] font-bold py-2 rounded-lg transition-colors cursor-pointer ${aktif ? "bg-[#5B7F52] text-white" : "text-[#6B665A] hover:bg-[#8C8672]/10"}`}
                        >
                          {nm}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown varietas */}
            <div className="relative">
              <button
                onClick={() => setVarietasOpen(!varietasOpen)}
                className="flex items-center gap-2 bg-transparent hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/15 transition-colors cursor-pointer"
              >
                {varietasFilterLabel}
                <FiChevronDown
                  className={`transition-transform ${varietasOpen ? "rotate-180" : ""}`}
                />
              </button>

              {varietasOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-[#FBF9F4] rounded-2xl shadow-xl border border-[#8C8672]/20 p-2 max-h-72 overflow-y-auto z-50">
                  <button
                    onClick={() => {
                      setVarietasFilterId(null);
                      setVarietasOpen(false);
                    }}
                    className={`w-full text-left text-xs font-bold px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${!varietasFilterId ? "bg-[#24391F] text-white" : "text-[#20241D] hover:bg-[#8C8672]/10"}`}
                  >
                    Semua Varietas
                  </button>
                  {daftarVarietas.map((v) => (
                    <button
                      key={v.id_varietas}
                      onClick={() => {
                        setVarietasFilterId(v.id_varietas);
                        setVarietasOpen(false);
                      }}
                      className={`w-full text-left text-xs font-bold px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${varietasFilterId === v.id_varietas ? "bg-[#24391F] text-white" : "text-[#20241D] hover:bg-[#8C8672]/10"}`}
                    >
                      {v.nama_varietas}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-5 lg:px-8 pt-4 max-w-7xl mx-auto space-y-5">
          {error && (
            <div className="bg-[#FBF9F4] border border-[#A3491F]/30 text-[#A3491F] text-sm font-semibold rounded-2xl p-4">
              {error}
            </div>
          )}

          {/* KPI utama */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#24391F] text-white rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-white/60 font-bold text-[11px] tracking-wide uppercase">
                  Sisa Stok
                </span>
                <AiOutlineInbox className="text-white/60" />
              </div>
              <h3 className="text-3xl font-black my-2 font-mono tracking-tight">
                {loading ? "…" : data.total_stok.toLocaleString("id-ID")}
              </h3>
              <div className="text-[11px] font-bold text-[#9CC28A]">
                Total bibit siap jual
              </div>
            </div>

            <div className="bg-[#FBF9F4] rounded-2xl p-5 shadow-sm border border-[#8C8672]/20">
              <span className="text-[#8C8672] font-bold text-[11px] tracking-wider uppercase">
                Terjual
              </span>
              <span className="text-3xl font-black text-[#20241D] font-mono block mt-2">
                {loading ? "…" : data.total_jual_bulan_ini.toLocaleString("id-ID")}
              </span>
              <span className="text-[11px] font-medium text-[#8C8672]">
                {data.periode?.label || periodLabel}
              </span>
            </div>

            <div className="bg-[#FBF9F4] rounded-2xl p-5 shadow-sm border border-[#A3491F]/20">
              <span className="text-[#8C8672] font-bold text-[11px] tracking-wider uppercase">
                Afkir
              </span>
              <span className="text-3xl font-black text-[#A3491F] font-mono block mt-2">
                {loading ? "…" : data.total_afkir_bulan_ini.toLocaleString("id-ID")}
              </span>
              <span className="text-[11px] font-medium text-[#8C8672]">
                {data.periode?.label || periodLabel}
              </span>
            </div>

            <div className="bg-[#FBF9F4] rounded-2xl p-5 shadow-sm border border-[#8C8672]/20">
              <span className="text-[#8C8672] font-bold text-[11px] tracking-wider uppercase">
                Pesanan
              </span>
              <span className="text-3xl font-black text-[#20241D] font-mono block mt-2">
                {loading ? "…" : data.pesanan_bulan_ini.toLocaleString("id-ID")}
              </span>
              <span className="text-[11px] font-medium text-[#8C8672]">
                {data.periode?.label || periodLabel}
              </span>
            </div>
          </div>

          {/* Ringkasan sekunder */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#FBF9F4] rounded-xl p-4 shadow-sm border border-[#8C8672]/20 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#24391F]/5 flex items-center justify-center text-lg shrink-0 text-[#24391F]">
                <FiPackage />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase block text-[#8C8672]">
                  Total Varietas
                </span>
                <span className="text-lg font-black font-mono text-[#20241D]">
                  {loading ? "…" : data.total_varietas}
                </span>
              </div>
            </div>

            <div className="bg-[#FBF9F4] rounded-xl p-4 shadow-sm border border-[#8C8672]/20 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#24391F]/5 flex items-center justify-center text-lg shrink-0 text-[#24391F]">
                <FiUsers />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase block text-[#8C8672]">
                  Staf Aktif
                </span>
                <span className="text-lg font-black font-mono text-[#20241D]">
                  {loading ? "…" : data.staf_aktif}
                </span>
              </div>
            </div>

            <div className="bg-[#FBF9F4] rounded-xl p-4 shadow-sm border border-[#8C8672]/20 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#24391F]/5 flex items-center justify-center text-lg shrink-0 text-[#24391F]">
                <FiShoppingBag />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase block text-[#8C8672]">
                  Pesanan {mode === "semua" ? "" : "Bulan Ini"}
                </span>
                <span className="text-lg font-black font-mono text-[#20241D]">
                  {loading ? "…" : data.pesanan_bulan_ini}
                </span>
              </div>
            </div>

            <div className="bg-[#FBF9F4] rounded-xl p-4 shadow-sm border border-[#8C8672]/20 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#24391F]/5 flex items-center justify-center text-lg shrink-0 text-[#24391F]">
                <FiAlertTriangle />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase block text-[#8C8672]">
                  Varietas Kritis
                </span>
                <span className="text-lg font-black font-mono text-[#20241D]">
                  {loading ? "…" : data.varietas_kritis_count}
                </span>
              </div>
            </div>
          </div>

          {/* Banner Stok Kritis — hanya muncul kalau memang ada varietas kritis */}
          {varietasKritisPertama && (
            <div className="bg-[#FBF9F4] rounded-2xl p-4 sm:p-5 shadow-sm border-l-4 border-[#A3491F] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <div className="flex items-start gap-3 flex-1">
                <CgDanger className="text-[#A3491F] text-2xl mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-[#A3491F] font-black text-base tracking-wide">
                    Stok Kritis
                  </h4>
                  <p className="text-[#6B665A] text-xs font-medium leading-relaxed mt-0.5">
                    {varietasKritisPertama.nama_varietas} (
                    {varietasKritisPertama.umur_bulan} Bulan) sisa{" "}
                    {varietasKritisPertama.stok.toLocaleString("id-ID")} bibit.
                    Harap mutasi kecambah
                    {data.varietas_kritis_count > 1
                      ? ` — ${data.varietas_kritis_count - 1} varietas lain juga kritis.`
                      : "."}
                  </p>
                </div>
              </div>
              <button className="text-[#A3491F] text-xs font-bold py-2.5 px-6 rounded-lg border border-[#A3491F]/30 hover:bg-[#A3491F]/5 transition-colors whitespace-nowrap cursor-pointer">
                Cek Detail
              </button>
            </div>
          )}

          {/* Grafik tren + Donut komposisi */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-[#FBF9F4] rounded-2xl shadow-sm border border-[#8C8672]/20 p-5">
              <div className="flex items-center justify-between mb-5">
                <h5 className="font-extrabold text-[#20241D] text-base tracking-tight">
                  Tren 6 Bulan
                </h5>
                <div className="flex items-center gap-4 text-[11px] font-bold text-[#8C8672]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#5B7F52]" /> Jual
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#A3491F]" /> Afkir
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 items-end h-40">
                {trenBulanan.map((t, idx) => (
                  <div
                    key={`${t.bulan}-${t.tahun}-${idx}`}
                    className="flex flex-col items-center gap-1.5 h-full justify-end"
                  >
                    <div className="flex gap-1 items-end h-full w-full justify-center">
                      <div
                        className="w-2.5 bg-[#5B7F52] rounded-t"
                        style={{ height: `${(t.jual / trenMax) * 100}%` }}
                      />
                      <div
                        className="w-2.5 bg-[#A3491F] rounded-t"
                        style={{ height: `${(t.afkir / trenMax) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#8C8672]">
                      {t.bulan}
                    </span>
                  </div>
                ))}
                {!loading && trenBulanan.length === 0 && (
                  <div className="col-span-6 text-center text-xs text-[#8C8672] font-medium">
                    Belum ada data transaksi.
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#FBF9F4] rounded-2xl shadow-sm border border-[#8C8672]/20 p-5">
              <h5 className="font-extrabold text-[#20241D] text-base tracking-tight mb-4">
                Komposisi Stok
              </h5>
              {totalSisaDonut > 0 ? (
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <svg
                    viewBox="0 0 160 160"
                    className="w-40 h-40 shrink-0 -rotate-90"
                  >
                    <circle
                      cx="80"
                      cy="80"
                      r={R}
                      fill="none"
                      stroke="#8C8672"
                      strokeOpacity="0.12"
                      strokeWidth="18"
                    />
                    {rincianVarietas.map((d, i) => {
                      const porsi = (d.stok || 0) / totalSisaDonut;
                      const dash = porsi * C;
                      const el = (
                        <circle
                          key={d.id_varietas}
                          cx="80"
                          cy="80"
                          r={R}
                          fill="none"
                          stroke={DONUT_WARNA[i % DONUT_WARNA.length]}
                          strokeWidth="18"
                          strokeDasharray={`${dash} ${C - dash}`}
                          strokeDashoffset={-offsetAkumulasi}
                          strokeLinecap="butt"
                        />
                      );
                      offsetAkumulasi += dash;
                      return el;
                    })}
                  </svg>
                  <div className="space-y-2.5 w-full">
                    {rincianVarietas.map((d, i) => (
                      <div
                        key={d.id_varietas}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="flex items-center gap-2 text-[#20241D] font-medium">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                DONUT_WARNA[i % DONUT_WARNA.length],
                            }}
                          />
                          {d.nama_varietas}
                        </span>
                        <span className="font-mono font-bold text-[#6B665A]">
                          {Math.round(((d.stok || 0) / totalSisaDonut) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-xs text-[#8C8672] font-medium py-8">
                  {loading ? "Memuat…" : "Belum ada stok tercatat."}
                </div>
              )}
            </div>
          </div>

          {/* Detail Varietas */}
          <div className="bg-[#FBF9F4] rounded-2xl shadow-sm border border-[#8C8672]/20 overflow-hidden">
            <div className="px-5 py-4 border-b border-[#8C8672]/15">
              <h5 className="font-extrabold text-[#20241D] text-base tracking-tight">
                Detail Varietas
              </h5>
            </div>

            <table className="w-full hidden lg:table">
              <thead>
                <tr className="text-left text-[11px] font-bold text-[#8C8672] uppercase tracking-wider">
                  <th className="px-5 py-3">Varietas</th>
                  <th className="px-5 py-3">Umur</th>
                  <th className="px-5 py-3 text-right">Jual</th>
                  <th className="px-5 py-3 text-right">Afkir</th>
                  <th className="px-5 py-3 text-right">Sisa</th>
                  <th className="px-5 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {rincianVarietas.map((v) => (
                  <tr key={v.id_varietas} className="border-t border-[#8C8672]/10">
                    <td className="px-5 py-4 font-sans font-bold text-[#20241D]">
                      {v.nama_varietas}
                    </td>
                    <td className="px-5 py-4 font-sans text-[#6B665A]">
                      {v.umur_bulan} Bulan
                    </td>
                    <td className="px-5 py-4 text-right text-[#6B665A]">
                      -{(v.jual_bulan_ini || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="px-5 py-4 text-right text-[#A3491F]">
                      -{(v.afkir_bulan_ini || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="px-5 py-4 text-right font-bold text-[#20241D]">
                      {(v.stok || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span
                        className={`text-xs font-bold inline-flex items-center gap-1.5 ${v.status === "aman" ? "text-[#5B7F52]" : "text-[#A3491F]"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${v.status === "aman" ? "bg-[#5B7F52]" : "bg-[#A3491F]"}`}
                        />
                        {v.status === "aman" ? "Aman" : "Kritis"}
                      </span>
                    </td>
                  </tr>
                ))}
                {!loading && rincianVarietas.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center font-sans text-[#8C8672]">
                      Tidak ada data varietas untuk filter ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="lg:hidden divide-y divide-[#8C8672]/15">
              {rincianVarietas.map((v) => (
                <div key={v.id_varietas} className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-extrabold text-[#20241D] text-base tracking-tight">
                        {v.nama_varietas}
                      </h5>
                      <span className="text-[10px] font-bold text-[#8C8672] tracking-wider block mt-0.5">
                        UMUR {v.umur_bulan} BULAN
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold inline-flex items-center gap-1.5 ${v.status === "aman" ? "text-[#5B7F52]" : "text-[#A3491F]"}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${v.status === "aman" ? "bg-[#5B7F52]" : "bg-[#A3491F]"}`}
                      />
                      {v.status === "aman" ? "Aman" : "Kritis"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div>
                      <span className="text-[11px] font-bold text-[#8C8672] block mb-1 font-sans">
                        Jual
                      </span>
                      <span className="text-xs font-extrabold text-[#6B665A]">
                        -{(v.jual_bulan_ini || 0).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#8C8672] block mb-1 font-sans">
                        Afkir
                      </span>
                      <span className="text-xs font-extrabold text-[#A3491F]">
                        -{(v.afkir_bulan_ini || 0).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#8C8672] block mb-1 font-sans">
                        Sisa
                      </span>
                      <span className="text-xs font-extrabold text-[#20241D]">
                        {(v.stok || 0).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {!loading && rincianVarietas.length === 0 && (
                <div className="p-8 text-center text-sm text-[#8C8672]">
                  Tidak ada data varietas untuk filter ini.
                </div>
              )}
            </div>
          </div>

          {/* Aktivitas Terakhir */}
          <div className="bg-[#FBF9F4] rounded-2xl shadow-sm border border-[#8C8672]/20 p-5">
            <h5 className="font-extrabold text-[#20241D] text-base tracking-tight mb-4">
              Aktivitas Terakhir
            </h5>
            <div className="space-y-4">
              {data.aktivitas_terakhir.map((a, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B7F52] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[#20241D] font-medium">{a.teks}</p>
                    <span className="text-[11px] font-mono text-[#8C8672]">
                      {a.waktu}
                    </span>
                  </div>
                </div>
              ))}
              {!loading && data.aktivitas_terakhir.length === 0 && (
                <p className="text-sm text-[#8C8672]">Belum ada aktivitas tercatat.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}