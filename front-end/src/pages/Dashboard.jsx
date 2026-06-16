import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="space-y-0">
  
            {/* Konten Utama dengan Padding agar tidak menempel ke pinggir */}
            <div className="p-6 space-y-6">
                
                {/* 2. Jadwal Kerja / Order History Table */}
                <div className="bg-white rounded-none border border-gray-100 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800">Jadwal Kerja Hari ini</h3>
                        <button className="text-green-600 font-semibold text-sm hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Order ID</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium">Total</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <tr key={item} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-700">#73{item}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">8 Sep, 2026</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 font-bold">$135.00 (5 Products)</td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-600 text-xs">
                                                Processing
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-green-600 text-sm font-bold hover:text-green-700 transition-colors">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}