import { useState } from 'react';
import { Link } from 'react-router-dom'; // Hanya import yang diperlukan
import { ImSpinner2 } from "react-icons/im";
import { BsArrowLeft } from "react-icons/bs";

export default function Forgot() {
    // navigate dihapus karena kita pakai Link di bawah
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);
        setMessage("");

        // Simulasi pengiriman link reset
        setTimeout(() => {
            setLoading(false);
            setMessage("Link reset telah dikirim ke email Anda!");
        }, 1500);
    };

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h2>
                <p className="text-gray-500 text-sm px-4">
                    Masukkan email Anda untuk menerima instruksi reset kata sandi.
                </p>
            </div>

            {message && (
                <div className="bg-green-50 border-s-4 border-green-500 p-4 mb-6 shadow-sm animate-pulse">
                    <p className="text-sm text-green-700 font-medium text-center">
                        {message}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label 
                        htmlFor="email" 
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all placeholder:text-gray-300"
                        placeholder="contoh@email.com"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-full font-bold text-white shadow-md shadow-green-100 transition-all transform active:scale-95 flex justify-center items-center ${
                        loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                    {loading ? (
                        <>
                            <ImSpinner2 className="me-2 animate-spin text-xl" />
                            Mengirim...
                        </>
                    ) : "Kirim Link Reset"}
                </button>

                <div className="text-center mt-6">
                    {/* Menggunakan Link menggantikan fungsi navigate */}
                    <Link 
                        to="/auth/login" 
                        className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-green-600 transition-colors"
                    >
                        <BsArrowLeft className="me-2" />
                        Kembali ke Halaman Login
                    </Link>
                </div>
            </form>
        </div>
    );
}