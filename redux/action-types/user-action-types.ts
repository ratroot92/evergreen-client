
import { IUser } from '../types/user-type';


export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_USERS = 'SET_USERS';
export const EDIT_USER = 'EDIT_USER';

export interface ADD_USER_ACTION {
  type: typeof ADD_USER;
  user: IUser;
}

export interface EDIT_USER_ACTION {
  type: typeof EDIT_USER;
  user: IUser;
}

export interface DELETE_USER_ACTION {
  type: typeof DELETE_USER;
  _id: string;
}

export interface SET_USERS_ACTION {
  type: typeof SET_USERS;
  users: IUser[];
}


export type UserTypes =
  | ADD_USER_ACTION
  | EDIT_USER_ACTION
  | DELETE_USER_ACTION
  | SET_USERS_ACTION;


