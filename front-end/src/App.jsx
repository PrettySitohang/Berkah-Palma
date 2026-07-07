import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import './assets/tailwind.css';

// --- LAYOUTS ---
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));

// --- ADMIN PAGES ---
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const KelolaPesanan = lazy(() => import('./pages/admin/KelolaPesanan'));
const DetailPenjualan = lazy(() => import('./pages/admin/DetailPenjualan'));
const ManajemenBibit = lazy(() => import('./pages/admin/ManajemenBibit'));
const InputBibit = lazy(() => import('./pages/admin/InputBibit'));
const ManajemenAkun = lazy(() => import('./pages/admin/ManajemenAkun'));
const InputAkun = lazy(() => import('./pages/admin/InputAkun'));
const Profile = lazy(() => import('./pages/Profile'));

// --- AUTH PAGES ---
const Login = lazy(() => import('./pages/auth/Login'));
const Forgot = lazy(() => import('./pages/auth/Forgot'));

// --- KARYAWAN PAGES ---
const DashboardKaryawan = lazy(() => import('./pages/karyawan/Dashboard'));
const KelolaPesananKaryawan = lazy(() => import('./pages/karyawan/KelolaPesanan'));
const DetailPenjualanKaryawan = lazy(() => import('./pages/karyawan/DetailPenjualan'));
const ManajemenBibitKaryawan = lazy(() => import('./pages/karyawan/ManajemenBibit'));
const InputBibitKaryawan = lazy(() => import('./pages/karyawan/InputBibit'));

// --- CUSTOMER & OTHERS (Disamakan dengan struktur folder di image_4b08bd.png) ---
const Customer = lazy(() => import('./pages/guest/katalog'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Redirect dari root (/) ke halaman login umum */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* --- ROUTING AUTHENTICATION --- */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot" element={<Forgot />} />
        </Route>

        {/* --- ROUTING ADMIN PANEL (dilindungi, cuma role admin yang bisa masuk) --- */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<MainLayout />}>
            {/* Default rute /admin langsung ke dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            <Route path="pesanan" element={<KelolaPesanan />} />
            <Route path="pesanan/detail" element={<DetailPenjualan />} />
            
            <Route path="bibit" element={<ManajemenBibit />} />
            <Route path="bibit/form" element={<InputBibit />} />
            
            <Route path="akun" element={<ManajemenAkun />} />
            <Route path="akun/form" element={<InputAkun />} />

            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* --- ROUTING KARYAWAN PANEL (dilindungi, cuma role staf/karyawan yang bisa masuk) --- */}
        <Route element={<ProtectedRoute allowedRoles={['staf', 'karyawan']} />}>
          <Route path="/karyawan" element={<MainLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardKaryawan />} />
            <Route path="pesanan" element={<KelolaPesananKaryawan />} />
            <Route path="pesanan/detail" element={<DetailPenjualanKaryawan />} />
            <Route path="bibit" element={<ManajemenBibitKaryawan />} />
            <Route path="bibit/form" element={<InputBibitKaryawan />} />

            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* --- ROUTING CUSTOMER (Publik) --- */}
        <Route path="/customer" element={<Customer />} />

        {/* --- ROUTING NOT FOUND --- */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
}

export default App;