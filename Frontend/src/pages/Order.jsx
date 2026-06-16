import React from 'react';
import PageHeader from '../components/PageHeader';
import orderData from '../data/orders.json';

export default function Order() {
  return (
    <div className="p-2">
      <PageHeader 
        title="Order List" 
        breadcrumb={["Dashboard", "Order List"]}
      >
        <button className="bg-hijau text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all">
          Add Orders
        </button>
      </PageHeader>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-8 border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="p-5 font-bold text-gray-400 text-sm">Order ID</th>
              <th className="p-5 font-bold text-gray-400 text-sm">Customer Name</th>
              <th className="p-5 font-bold text-gray-400 text-sm">Status</th>
              <th className="p-5 font-bold text-gray-400 text-sm">Total Price</th>
              <th className="p-5 font-bold text-gray-400 text-sm">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                {/* Gunakan kurung siku [] untuk properti yang memiliki spasi */}
                <td className="p-5 text-gray-700 font-semibold">{order["Order ID"]}</td>
                <td className="p-5 text-gray-700">{order["Customer Name"]}</td>
                <td className="p-5">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                    order["Status"] === 'Completed' ? 'bg-green-100 text-green-600' : 
                    order["Status"] === 'Pending' ? 'bg-orange-100 text-orange-600' : 
                    'bg-red-100 text-red-600'
                  }`}>
                    {order["Status"]}
                  </span>
                </td>
                <td className="p-5 text-gray-700 font-medium">
                  Rp {Number(order["Total Price"]).toLocaleString('id-ID')}
                </td>
                <td className="p-5 text-gray-500 text-sm">{order["Order Date"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}