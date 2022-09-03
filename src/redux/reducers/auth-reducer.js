/* eslint-disable no-console */
const initialState = {
  loginPayload: null,
  isLoginSuccessfull: false,
  isOtpVerified: false,
};
const loginReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_LOGIN_SUCCESS':
      return { ...state, loginPayload: action.payload, isLoginSuccessfull: true };
    case 'SET_LOGIN_FAILED':
      return { ...state, isLoginSuccessfull: false };
    case 'SET_OTP_SUCCESS':
      return { ...state, isOtpVerified: true };
    case 'SET_OTP_FAILED':
      return { ...state, isOtpVerified: false, loginPayload: null, isLoginSuccessfull: false };
    case 'SET_IS_LOGGED_SUCCESS':
      return { ...state, isOtpVerified: true, isLoginSuccessfull: true };
    case 'SET_IS_LOGGED_FAILED':
      return { ...state, loginPayload: null, isLoginSuccessfull: false, isOtpVerified: false };
    default:
      return state;
  }
};

export default loginReducer;
