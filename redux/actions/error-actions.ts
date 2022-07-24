/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from 'redux';
import { AppActions } from '../action-types';
import { SET_ERROR } from '../action-types/error-action-types';

export const setErrors = (errors: String[]): AppActions => ({
  type: SET_ERROR,
  errors,
});

export const startSetErrors = (errors: String[]) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(setErrors(errors));
  };
};
