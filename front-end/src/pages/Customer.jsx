import React from 'react';
import PageHeader from '../components/PageHeader';
import customerData from '../data/customers.json';

export default function Customer() {
  return (
    <div className="p-2">
      {/* PageHeader dengan props title, breadcrumb, dan children (tombol) */}
      <PageHeader 
        title="Customer List" 
        breadcrumb={["Dashboard", "Customer List"]}
      >
        <button 
          id="add-button" 
          className="bg-hijau text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all active:scale-95"
          onClick={() => alert("Form Add Customer akan muncul!")}
        >
          Add Customer
        </button>
      </PageHeader>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-8 border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30">
                <th className="p-5 font-bold text-gray-400 text-sm uppercase tracking-wider">Customer ID</th>
                <th className="p-5 font-bold text-gray-400 text-sm uppercase tracking-wider">Customer Name</th>
                <th className="p-5 font-bold text-gray-400 text-sm uppercase tracking-wider">Email</th>
                <th className="p-5 font-bold text-gray-400 text-sm uppercase tracking-wider">Phone</th>
                <th className="p-5 font-bold text-gray-400 text-sm uppercase tracking-wider">Loyalty</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((cust, index) => (
                <tr 
                  key={index} 
                  className="border-b border-gray-50 hover:bg-green-50/30 transition-colors group"
                >
                  {/* Akses data menggunakan key yang sesuai di JSON Anda */}
                  <td className="p-5 text-gray-700 font-semibold">{cust["Customer ID"]}</td>
                  <td className="p-5 text-gray-900 font-medium group-hover:text-hijau">{cust["Customer Name"]}</td>
                  <td className="p-5 text-gray-500">{cust["Email"]}</td>
                  <td className="p-5 text-gray-600">{cust["Phone"]}</td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest ${
                      cust["Loyalty"] === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 
                      cust["Loyalty"] === 'Silver' ? 'bg-gray-200 text-gray-700' : 
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {cust["Loyalty"].toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer info total data */}
      <div className="mt-4 text-sm text-gray-400 italic">
        Menampilkan {customerData.length} total customer terdaftar.
      </div>
    </div>
  );
}