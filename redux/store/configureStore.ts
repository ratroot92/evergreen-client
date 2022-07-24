import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { AppActions } from '../action-types';
import { loaderReducer } from '../reducers/loader-reducer';
import { userReducer } from '../reducers/user-reducer';
export const rootReducer = combineReducers({
    users: userReducer,
    loading:loaderReducer

});

export type AppState = ReturnType<typeof rootReducer>;
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
);

export type RootState = ReturnType<typeof rootReducer>