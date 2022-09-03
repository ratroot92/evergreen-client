/* eslint-disable  */
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import AdminLogin from './pages/admin/Login/AdminLogin';
import AdminDashboard from './pages/admin/Dashboard/AdminDashboard';
import AdminOtp from './pages/admin/Otp/AdminOtp';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import ProtectedRoutes from './hoc/AdminRoute';
import { startSetAuth } from './redux/actions/auth-actions';

function OtpProtectedRoutes({ element: Component, ...rest }) {
  const { loginPayload, isLoginSuccessfull, isOtpVerified } = useSelector((state) => state.auth);
  if (isLoginSuccessfull) {
    return !isOtpVerified ? <Outlet /> : <Navigate to="/admin/dashboard" />;
  } else {
    return <Navigate to="/admin/login" />;
  }
}

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export default function App() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  let [color, setColor] = React.useState('#ffffff');
  React.useEffect(() => {
    setTimeout(() => {
      dispatch(startSetAuth());
    }, 2000);
  }, []);

  return (
    <div className="row">
      {loading ? (
        <div className="row">
          <div className="col-md-12">
            <div className="g-center-r">
              <ClipLoader color={color} loading={loading} cssOverride={override} size={800} />
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<OtpProtectedRoutes />}>
            <Route path="/admin/otp" element={<AdminOtp />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
          </Route>

          <Route path="*" element={<RouteNotFound />} />
        </Routes>
      )}

      {/* <Navbar /> */}
    </div>
  );
}

const RouteNotFound = () => {
  return (
    <div>
      <p className="text-white">RouteNotFound</p>
    </div>
  );
};
