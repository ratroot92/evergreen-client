/* eslint-disable  */
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLogin from './pages/admin/login';
import AdminOtp from './pages/admin/otp';

export default function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={auth.login && auth.otpVerified ? <Navigate to={'/admin'} /> : <HomePage />} />
        <Route path="admin" element={<DashboardAdmin />}>
          <Route path="login" element={!auth.login && !auth.otpVerified ? <AdminLogin /> : <Navigate to={'/admin/otp'} />} />
          <Route path="otp" element={auth.login ? auth.otpVerified ? <Navigate to={'/admin'} /> : <AdminOtp /> : <Navigate to={'/admin/login'} />} />
        </Route>
        {/* <Route path="/admin/otp" element={<AdminOtp />} /> */}
        <Route path="*" element={<RouteNotFound />} />
      </Routes>
    </>
  );
}

const HomePage = () => {
  return (
    <div>
      <p className="text-white">HomePage</p>
    </div>
  );
};

const DashboardAdmin = () => {
  return (
    <div>
      <p className="text-white">DashboardAdmin</p>
      <Outlet />
    </div>
  );
};

const RouteNotFound = () => {
  return (
    <div>
      <p className="text-white">RouteNotFound</p>
    </div>
  );
};
