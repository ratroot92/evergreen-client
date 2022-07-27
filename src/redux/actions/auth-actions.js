/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import authServer from '../../config/axios.config';

const startSetLogin = (payload) => async (dispatch) => {
  try {
    const response = await authServer.post(`/auth/login`, payload);
    if (response.status === 200) {
      dispatch({ type: 'SET_LOGIN', payload: true });
    }
  } catch (err) {
    dispatch({ type: 'SET_LOGIN', payload: false });
  }
};

const startSetOtp = (payload) => async (dispatch) => {
  try {
    const response = await authServer.post(`/auth/otp`, payload);
    if (response.status === 200) {
      dispatch({ type: 'SET_OTP', payload: true });
    }
  } catch (err) {
    dispatch({ type: 'SET_OTP', payload: false });
  }
};

const startSetAuthenticated = () => async (dispatch) => {
  try {
    console.log('startSetAuthenticated');
    console.log('startSetAuthenticated');
    console.log('startSetAuthenticated');
    console.log('startSetAuthenticated');

    const response = await authServer.get(`/auth/isAuthenticated`);
    if (response.status === 200) {
      dispatch({ type: 'SET_IS_AUTHECTICATED', payload: true });
    }
  } catch (err) {
    dispatch({ type: 'SET_IS_AUTHECTICATED', payload: false });
  }
};

export { startSetLogin, startSetOtp, startSetAuthenticated };
