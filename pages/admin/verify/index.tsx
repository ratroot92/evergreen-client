/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import dataServer from '../../../services/axios.config';
import { AuthContext } from '../../../context/AuthProvider';
// import { setLocale } from 'yup';
export default function index() {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);

  const [state, setState] = React.useState({
    otp: 0,
    loading: false,
  });

  React.useEffect(() => {
    if (authContext.user === null) {
      router.push('/admin/login');
    } else {
      if (authContext.isAuthenticated) {
        router.push('/admin/dashboard');
      } else {
        setState({ ...state, loading: true });
      }
    }
  }, [authContext.user]);

  const submit = async () => {
    try {
      setState({ ...state, loading: false });
      if (state.otp === 0) {
        toast('Invalid otp');
        return;
      }

      const requestPayload: any = {
        number: state.otp,
        type: authContext.user.type,
        payload: authContext.user.payload,
        validFor: '/api/auth/otp',
      };
      const response: any = await dataServer.post(`/auth/otp`, requestPayload);
      toast(response.data.message);
      authContext.setIsAuthenticated(true);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    } catch (err: any) {
      if (err.status === 401) {
        toast(err.message);
        setTimeout(() => {
          authContext.setUser(null);
          router.push('/admin/login');
        }, 2000);
      }
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
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => {
                    authContext.setUser(null);
                    router.push('/admin/login');
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
