import authServer from '../../config/axios.config';
import { startLoading, stopLoading } from './ui-actions';

const startSetLogin = (payload) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await authServer.post(`/auth/login`, payload);
    if (response.status === 200) {
      dispatch({ type: 'SET_LOGIN_SUCCESS', payload });
    } else {
      dispatch({ type: 'SET_LOGIN_FAILED', payload: false });
    }
  } catch (err) {
    dispatch({ type: 'SET_LOGIN_FAILED', payload: false });
  } finally {
    dispatch(stopLoading());
  }
};

const startSetOtp = (payload) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await authServer.post(`/auth/otp`, payload);
    if (response.status === 200) {
      dispatch({ type: 'SET_OTP_SUCCESS', payload: true });
    } else {
      dispatch({ type: 'SET_OTP_FAILED', payload: false });
    }
  } catch (err) {
    dispatch({ type: 'SET_OTP_FAILED', payload: false });
  } finally {
    dispatch(stopLoading());
  }
};

const startSetAuth = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await authServer.get(`/auth/isAuthenticated`);
    if (response.status === 200) {
      dispatch({ type: 'SET_IS_LOGGED_SUCCESS', payload: true });
    } else {
      dispatch({ type: 'SET_IS_LOGGED_FAILED', payload: false });
    }
  } catch (err) {
    dispatch({ type: 'SET_IS_LOGGED_FAILED', payload: false });
  } finally {
    dispatch(stopLoading());
  }
};

export { startSetLogin, startSetOtp, startSetAuth };
