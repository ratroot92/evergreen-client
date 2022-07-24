/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from 'redux';
import { AppActions } from '../action-types';
import { SET_LOADER } from '../action-types/loader-action-types';



export const setLoader = (loading: boolean): AppActions => ({
  type: SET_LOADER,
  loading,
});




export const startSetLoader = (loading:boolean) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
     dispatch(setLoader(loading))
  };
};