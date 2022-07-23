/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dataServer from '../../../services/axios.config';
import { AuthContext } from '../../../utils/AuthProvider';
// import { setLocale } from 'yup';
export default function index() {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);

  const [state, setState] = React.useState({
    otp: 0,
    loading: false,
  });

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    if (token === null || user === null) {
      router.push('/admin/login');
    } else {
      setState({ ...state, loading: true });
    }
  }, []);

  const submit = async () => {
    try {
      setState({ ...state, loading: false });
      if (state.otp === 0) {
        toast('Invalid otp');
        return;
      }
      const user: any = JSON.parse(localStorage.getItem('user') || '{}');
      const requestPayload: any = {
        number: state.otp,
        type: user.type,
        payload: user.payload,
        validFor: '/api/auth/otp',
      };
      const response: any = await dataServer.post(`/auth/otp`, requestPayload);

      toast(response.data.message);
      authContext.isAuthenticated(true);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    } catch (err: any) {
      if (err.status === 401) {
        setTimeout(() => {
          router.push('/admin/login');
        }, 2000);
      }
      toast(err.message);
    } finally {
      setState({ ...state, loading: true });
    }
  };
  return (
    <div>
      {state.loading === false ? (
        <div></div>
      ) : (
        <div className="row">
          <div className="col-md-4 offset-4">
            <div className="card">
              <div className="card-header">OTP</div>
              <div className="card-body">
                <label>Enter Otp</label>
                <input type="number" className="form-control" onChange={(e) => setState({ ...state, otp: +e.target.value })} />
              </div>
              <div className="card-footer d-flex flex-row justify-content-between align-items-center">
                <input type="submit" onClick={submit} className="btn btn-sm btn-success" />
                <button className="btn btn-sm btn-warning" onClick={() => router.push('/admin/login')}>
                  Back
                </button>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}
