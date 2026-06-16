import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [bibit, setBibit] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/varietas-bibit")
      .then((res) => {
        console.log("RESPONSE:", res.data);
        console.log("IS ARRAY:", Array.isArray(res.data));

        setBibit(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div id="dashboard-container" className="space-y-0">
      <div className="p-6 space-y-6">
        {/* Data Varietas Bibit dari Laravel */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Data Varietas Bibit
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : bibit.length === 0 ? (
            <p>Tidak ada data.</p>
          ) : (
            <div className="space-y-3">
              {bibit.map((item) => (
                <div key={item.id_varietas} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">
                    {item.nama_varietas}
                  </h3>

                  <p className="text-gray-600">Umur: {item.umur_bulan} bulan</p>

                  <p className="text-gray-500">
                    {item.deskripsi || "Tidak ada deskripsi"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tabel Dashboard Lama */}
        <div className="bg-white rounded-none border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">
              Jadwal Kerja Hari Ini
            </h3>

            <button className="text-green-600 font-semibold text-sm hover:underline">
              View All
            </button>
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
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      #73{item}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      8 Sep, 2026
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700 font-bold">
                      $135.00 (5 Products)
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-gray-600 text-xs">Processing</span>
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
