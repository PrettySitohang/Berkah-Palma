import React, { useState } from 'react';
// Import background
import bgHero from '../../assets/foto_bibit_sawit.png'; 
// Import logo
import logoBerkah from '../../assets/logo_berkah.png'; 

const LoginAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative p-5 font-sans antialiased overflow-hidden m-0">
      
      {/* 1. Latar Belakang Dasar Putih */}
      <div className="absolute inset-0 bg-white z-0"></div>

      {/* 2. Latar Belakang Gambar dengan Opacity 63% */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.63]"
        style={{ backgroundImage: `url(${bgHero})` }}
      ></div>

      {/* 3. Lapisan Gradient Linear */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(180deg, 
            rgba(68, 96, 68, 0.72) 0%, 
            rgba(68, 96, 68, 0.46) 3%, 
            rgba(255, 255, 255, 0) 16%, 
            rgba(255, 196, 82, 0.22) 36%, 
            rgba(255, 255, 255, 0.62) 54%, 
            rgba(255, 255, 255, 0.95) 79%, 
            rgba(255, 255, 255, 1) 100%)`
        }}
      ></div>

      {/* KONTEN UTAMA - Dikunci maksimal lebarnya 380px agar tidak raksasa di Desktop */}
      <div className="relative z-10 w-full max-w-[380px] flex flex-col items-center">
        
        {/* Bagian Header / Logo */}
        <div className="text-center mb-7">
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* Ukuran logo distandarkan */}
            <img 
              src={logoBerkah} 
              alt="Logo Berkah Palma" 
              className="w-12 h-12 object-contain" 
            />
            <span className="font-bold text-[#2a4530] tracking-wide text-[15px]">BERKAH PALMA</span>
          </div>
          <p className="text-slate-800 font-medium text-[14px]">Selamat Datang di Panel Admin</p>
          <h1 className="text-[18px] font-black text-slate-900 mt-0.5">Berkah Palma Nursery</h1>
        </div>

        {/* Card Form Login - Padding dikembalikan ke p-8 yang pas */}
        <div className="bg-white w-full rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-7 md:p-8">
          <h2 className="text-[22px] font-bold text-center text-slate-800 mb-6">Masuk Admin</h2>

          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                // Padding input dikecilkan sedikit (py-3) agar lebih ramping
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-[#2a4530] focus:ring-1 focus:ring-[#2a4530] transition-colors placeholder:text-slate-400"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Kata Sandi"
                className="w-full border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-[14px] focus:outline-none focus:border-[#2a4530] focus:ring-1 focus:ring-[#2a4530] transition-colors placeholder:text-slate-400"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2a4530] transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] md:text-[12px] pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-slate-700 transition-colors">
                <input 
                  type="checkbox" 
                  className="w-3.5 h-3.5 rounded border-slate-300 text-[#2a4530] focus:ring-[#2a4530] cursor-pointer" 
                />
                Ingat Saya
              </label>
              <a href="#" className="text-slate-500 hover:text-[#2a4530] transition-colors">Lupa Kata Sandi?</a>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#2a4530] hover:bg-[#1e3223] text-white font-bold py-3 text-[14px] rounded-full transition-all active:scale-[0.98] shadow-lg shadow-black/10"
              >
                Masuk
              </button>
            </div>
          </form>

          <p className="text-center text-[12px] text-slate-500 mt-6">
            Belum punya akun? <a href="#" className="font-bold text-slate-800 hover:text-[#2a4530] transition-colors">Daftar</a>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;