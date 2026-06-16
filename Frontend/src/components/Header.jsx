import { FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header id="header-container" className="w-full flex flex-col bg-white shadow-sm">
            {/* 1. Top Bar (Informasi Lokasi & Akses) sesuai image_9e4b5a.png */}
            <div className="w-full bg-[#333333] text-gray-300 text-[11px] py-2 px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>Store Location: Lincoln- 344, Illinois, Chicago, USA</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                        <span>Eng</span>
                        <FaChevronDown className="text-[8px]" />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                        <span>USD</span>
                        <FaChevronDown className="text-[8px]" />
                    </div>
                    <div className="h-3 w-px[1px] bg-gray-600"></div>
                    <div className="flex gap-2">
                        <Link to="/auth/login" className="hover:text-white transition-colors">Sign In</Link>
                        <span>/</span>
                        <Link to="/auth/register" className="hover:text-white transition-colors">Sign Up</Link>
                    </div>
                </div>
            </div>

            <div className="w-full py-5 px-8 flex justify-between items-center border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="p-1">
                        <svg 
                            className="w-8 h-8 text-green-600" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                        >
                            <path d="M12,22V17C12,17 12,14 10,12C8,10 4,10 4,10C4,10 4,14 6,16C8,18 12,19 12,19M12,19C12,19 16,18 18,16C20,14 20,10 20,10C20,10 16,10 14,12C12,14 12,17 12,17V22Z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        Berkah <span className="text-green-600">Palma</span>
                    </h1>
                </div>
                {/* User Greeting (Opsional, untuk konsistensi Dashboard) */}
                <div className="hidden md:flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Karyawan</p>
                        <p className="text-sm font-bold text-gray-700">Pretty</p>
                    </div>
                    <img
                        id="profile-avatar"
                        src="https://avatar.iran.liara.run/public/65"
                        className="w-10 h-10 rounded-full border-2 border-green-50 shadow-sm"
                        alt="Profile"
                    />
                </div>
            </div>
            <div className="relative h-32 w-full overflow-hidden shadow-sm">
                <img 
                    src="https://i.pinimg.com/736x/cb/47/fc/cb47fcb14f43b537852f8bf4e20c2371.jpg" 
                    alt="Berkah Palma Nursery" 
                    className="w-full h-full object-cover"
                />
                {/* Overlay dengan tulisan di tengah (justify-center) */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-white tracking-wide drop-shadow-md">
                        Welcome Karyawan!
                    </h2>
                </div>
            </div>
        </header>
    );
}