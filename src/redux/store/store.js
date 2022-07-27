import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth-reducer';
import userReducer from '../reducers/user-reducer';

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
