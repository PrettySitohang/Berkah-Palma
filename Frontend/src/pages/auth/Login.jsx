import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post('https://dummyjson.com/auth/login', dataForm);
            localStorage.setItem('token', response.data.token);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login gagal, cek kembali username/password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            {/* Header Login sesuai desain Berkah Palma */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
                <p className="text-gray-500 text-sm">Selamat datang kembali di Berkah Palma</p>
            </div>

            {/* Alert Error */}
            {error && (
                <div className="bg-red-50 border-s-4 border-red-500 p-4 mb-6 flex items-center shadow-sm transition-all">
                    <BsFillExclamationDiamondFill className="text-red-500 me-3 text-xl" />
                    <span className="text-sm text-red-700 font-medium">{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username Input */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email or Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={dataForm.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all placeholder:text-gray-300"
                        placeholder="username"
                        required
                    />
                </div>

                {/* Password Input */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <Link to="#" className="text-xs text-gray-400 hover:text-green-600 transition-colors">
                            Forget Password
                        </Link>
                    </div>
                    <input
                        type="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all placeholder:text-gray-300"
                        placeholder="********"
                        required
                    />
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center">
                    <input 
                        type="checkbox" 
                        id="remember" 
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer" 
                    />
                    <label htmlFor="remember" className="ms-2 text-sm text-gray-500 cursor-pointer select-none">
                        Remember me
                    </label>
                </div>

                {/* Submit Button - Hijau Berkah Palma */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-full font-bold text-white shadow-md shadow-green-200 transition-all transform active:scale-95 flex justify-center items-center ${
                        loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                    {loading ? (
                        <>
                            <ImSpinner2 className="me-2 animate-spin text-xl" />
                            Memproses...
                        </>
                    ) : "Login"}
                </button>
            </form>
        </div>
    );
}