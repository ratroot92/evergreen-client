/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from 'redux';
import { USER_SERVICE_API_URL } from '../../constant/constant';
import dataServer from '../../services/axios.config';
import { AppActions } from '../action-types';
import { ADD_USER, DELETE_USER, EDIT_USER, SET_USERS } from '../action-types/user-action-types';
import { AppState } from '../store/configureStore';
import { IUser } from '../types/user-type';
import { setErrors } from './error-actions';

export const addUser = (user: IUser): AppActions => ({
  type: ADD_USER,
  user,
});

export const deleteUser = (_id: string): AppActions => ({
  type: DELETE_USER,
  _id,
});

export const editUser = (user: IUser): AppActions => ({
  type: EDIT_USER,
  user,
});

export const setUser = (users: IUser[]): AppActions => ({
  type: SET_USERS,
  users,
});

export const startAddUser = (userData: {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: number;
  createdAt: string;
  updatedAt: string;
}) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const { _id = '', username = '', email = '', password = '', role = 0, createdAt = '', updatedAt = '' } = userData;
    const user = {
      _id,
      username,
      email,
      password,
      role,
      createdAt,
      updatedAt,
    };
    return dispatch(
      addUser({
        ...user,
      })
    );
  };
};

export const startDeleteUser = (_id: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dataServer.defaults.baseURL = USER_SERVICE_API_URL;
    dataServer
      .delete(`/user`, { data: { _id } })
      .then((response: any) => dispatch(deleteUser(response.data.data)))
      .catch((err: any) => dispatch(setErrors([err.message])));
  };
};

export const startEditUser = (user: IUser) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(editUser(user));
  };
};

export const startSetUser = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dataServer.defaults.baseURL = USER_SERVICE_API_URL;
    dataServer
      .get(`/user`)
      .then((response: any) => dispatch(setUser(response.data.data)))
      .catch((err: any) => dispatch(setErrors([err.message])));
  };
};
