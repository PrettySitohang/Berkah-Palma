import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import './assets/tailwind.css';

// --- LAYOUTS ---
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));

// --- ADMIN PAGES ---
const LoginAdmin = lazy(() => import('./pages/admin/LoginAdmin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const KelolaPesanan = lazy(() => import('./pages/admin/KelolaPesanan'));
const DetailPenjualan = lazy(() => import('./pages/admin/DetailPenjualan'));
const ManajemenBibit = lazy(() => import('./pages/admin/ManajemenBibit'));
const InputBibit = lazy(() => import('./pages/admin/InputBibit'));
const ManajemenAkun = lazy(() => import('./pages/admin/ManajemenAkun'));
const InputAkun = lazy(() => import('./pages/admin/InputAkun'));

// --- CUSTOMER & OTHERS (Disamakan dengan struktur folder di image_4b08bd.png) ---
const Customer = lazy(() => import('./pages/Customer'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Redirect dari root (/) ke halaman login admin sementara */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* --- ROUTING AUTHENTICATION --- */}
        <Route element={<AuthLayout />}>
          <Route path="/admin/login" element={<LoginAdmin />} />
        </Route>

        {/* --- ROUTING ADMIN PANEL --- */}
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