import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import "./assets/tailwind.css";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/auth/Login"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ManajemenBibit = lazy(() => import("./pages/Admin/ManajemenBibit"));

// ... bagian import atas tetap sama

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Grup Rute yang menggunakan MainLayout (Ada Sidebar & Desain Desktop) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Grup Rute Autentikasi */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* 🟢 UBAHAN DI SINI: Letakkan rute ini mandiri di luar rute lainnya */}
        <Route path="/manajemen-bibit" element={<ManajemenBibit />} />
      </Routes>
    </Suspense>
  );
}

export default App;