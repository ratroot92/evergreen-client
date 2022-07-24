/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from 'redux';
import { USER_SERVICE_API_URL } from '../../constant/constant';
import dataServer from '../../services/axios.config';
import { AppActions } from '../action-types';
import { ADD_ROLE, DELETE_ROLE, EDIT_ROLE, SET_ROLES } from '../action-types/roles-action-types';
import { AppState } from '../store/configureStore';
import { IRole } from '../types/roles-type';
import { setErrors } from './error-actions';

export const addRole = (role: IRole): AppActions => ({
  type: ADD_ROLE,
  role,
});

export const deleteRole = (_id: string): AppActions => ({
  type: DELETE_ROLE,
  _id,
});

export const editRole = (role: IRole): AppActions => ({
  type: EDIT_ROLE,
  role,
});

export const setRole = (roles: IRole[]): AppActions => ({
  type: SET_ROLES,
  roles,
});

export const startAddRole = (roleData: { _id: string; name: string }) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const { _id = '', name = '' } = roleData;
    const role = {
      _id,
      name,
    };
    return dispatch(
      addRole({
        ...role,
      })
    );
  };
};

export const startDeleteRole = (_id: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dataServer.defaults.baseURL = USER_SERVICE_API_URL;
    dataServer
      .delete(`/role`, { data: { _id } })
      .then((response: any) => dispatch(deleteRole(response.data.data)))
      .catch((err: any) => dispatch(setErrors([err.message])));
  };
};

export const startEditRole = (role: IRole) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(editRole(role));
  };
};

export const startSetRoles = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dataServer.defaults.baseURL = USER_SERVICE_API_URL;
    dataServer
      .get(`/role`)
      .then((response: any) => dispatch(setRole(response.data.data)))
      .catch((err: any) => dispatch(setErrors([err.message])));
  };
};
