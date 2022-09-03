/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import AdminLogin from '../pages/admin/Login/AdminLogin';

export default function ProtectedRoutes({ element: Component, ...rest }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isLoginSuccessfull, isOtpVerified } = useSelector((state) => state.auth);
  return isLoginSuccessfull && isOtpVerified ? <Outlet /> : <AdminLogin />;
}
