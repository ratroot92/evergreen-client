const initialState = {
  login: false,
  otpVerified: false,
  isAuthenticated: false,
  user: null,
  loginPayload: {
    payload: null,
    type: null,
  },
  loading: false,
};
const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return { ...state, login: action.payload };
    case 'SET_LOGIN_TYPE':
      return { ...state, loginPayload: action.payload };
    case 'SET_OTP':
      return { ...state, otpVerified: action.payload };
    case 'SET_IS_AUTHECTICATED':
      return { ...state, isAuthenticated: action.payload, otpVerified: action.payload, login: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default authReducer;
