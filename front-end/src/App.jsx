import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import './assets/tailwind.css';
import InputAkun from './pages/admin/InputAkun';
import InputBibit from './pages/admin/InputBibit';
import KelolaPesanan from './pages/admin/KelolaPesanan';

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
// Pages (Dashboard sudah mengarah ke dalam folder admin)
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));

const Customer = lazy(() => import('./pages/Customer'));
const Order = lazy(() => import('./pages/Order'));
const Login = lazy(() => import('./pages/auth/Login'));
const Forgot = lazy(() => import('./pages/auth/Forgot'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/admin/inputBibit" element={<InputBibit />} />
        <Route path="/admin/kelolaPesanan" element={<KelolaPesanan />} />
        <Route path="/admin/inputAkun" element={<InputAkun />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route element={<MainLayout />}>
          <Route path="/customer" element={<Customer />} />
          <Route path="/order" element={<Order />} />
        </Route>

        {/* Jalur Login & Forgot password */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Tangkapan kalau ketik alamat ngawur */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;