import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            {/* Banner Background Atas (Sesuai image_9e483b.png) */}
            <div className="w-full max-w-[1200px] bg-white rounded-t-2xl shadow-sm border-b overflow-hidden">
                <div className="p-6 flex items-center gap-2">
                    {/* Logo Berkah Palma */}
                    <div className="flex items-center gap-2">
                        <div className="bg-green-600 p-2 rounded-lg">
                             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                            Berkah <span className="text-green-600">Palma</span>
                        </h1>
                    </div>
                </div>

                {/* Dekorasi Gambar Daun Sawit */}
                <div className="h-32 w-full bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590424744295-88339454199c?q=80&w=2000')" }}>
                    <div className="absolute inset-0 bg-green-900/30 flex items-center justify-center">
                         <h2 className="text-white text-xl font-bold drop-shadow-md">Welcome Karyawan!</h2>
                    </div>
                </div>
            </div>

            {/* Container Form (Outlet) */}
            <div className="w-full max-w-[1200px] bg-white rounded-b-2xl shadow-xl flex items-center justify-center py-16 px-4">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-8">
                © 2026 Berkah Palma Management System. All rights reserved.
            </p>
        </div>
    );
}