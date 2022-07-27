/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { startSetOtp } from '../../../redux/actions/auth-actions';

export default function index() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [state, setState] = React.useState({
    otp: 0,
    loading: false,
  });

  React.useEffect(() => {
    console.log('auth ==>', auth);
    if (auth.login && auth.otpVerified) {
      console.log('logged in ');
    }
  }, [auth]);

  const submit = async () => {
    if (state.otp === 0) {
      toast('Invalid otp');
      return;
    }
    const requestPayload = {
      number: state.otp,
      validFor: '/api/auth/otp',
      type: auth.loginPayload.type,
      payload: auth.loginPayload.payload,
    };
    dispatch(startSetOtp(requestPayload));
  };
  return (
    <div>
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
                type="button"
                className="btn btn-sm btn-warning"
                onClick={() => {
                  //   router.push('/admin/login');
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
