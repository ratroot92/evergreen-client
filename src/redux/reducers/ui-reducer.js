/* eslint-disable no-console */
const initialState = {
  loading: true,
};
const uiReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_LOADING':
      console.log('SET_LOADING', action);
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default uiReducer;
