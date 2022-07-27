/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Navbar from './components/Navbar/Navbar';
import AuthProvider from './context/AuthContext';
import AdminLogin from './pages/admin/login';
import AdminOtp from './pages/admin/otp';

import store from './redux/store/store';
import { Provider } from 'react-redux';
import AdminRoute from './hoc/AdminRoute';
import { startSetAuthenticated } from './redux/actions/auth-actions';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    {/* </AuthProvider> */}
  </React.StrictMode>
);
