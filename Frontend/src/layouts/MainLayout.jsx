import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; 
import Header from "../components/Header";
import Footer from "../components/Footer"; // Tambahkan Footer untuk Newsletter

export default function MainLayout() {
    return (
        <div className="bg-[#F8F9FA] min-h-screen flex flex-col">
            {/* 1. Header Atas (Full Width) sesuai image_9e4b5a.png */}
            <Header /> 

            <div className="flex flex-1">
                {/* 2. Sidebar Samping (Sticky/Fixed) */}
                <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white">
                    <Sidebar />
                </aside>

                {/* 3. Area Konten Utama */}
                <div className="flex-1 flex flex-col">
                    <main className="p-6 flex-1">
                        {/* Area Banner atau Welcome Message bisa diletakkan di dalam Dashboard.jsx */}
                        <div className="max-w-7xl mx-auto">
                            <Outlet />
                        </div>
                    </main>

                    {/* 4. Footer Newsletter sesuai bagian bawah image_9e4b5a.png */}
                    <Footer />
                </div>
            </div>
        </div>
    );
}