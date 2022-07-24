
import { User } from './User';


export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_USERS = 'SET_USERS';
export const EDIT_USER = 'EDIT_USER';

export interface ADD_USER_ACTION {
  type: typeof ADD_USER;
  user: User;
}

export interface EDIT_USER_ACTION {
  type: typeof EDIT_USER;
  user: User;
}

export interface DELETE_USER_ACTION {
  type: typeof DELETE_USER;
  id: string;
}

export interface SET_USERS_ACTION {
  type: typeof SET_USERS;
  users: User[];
}

/**
 * USER TYPES END
 */


export type UserTypes =
  | ADD_USER_ACTION
  | EDIT_USER_ACTION
  | DELETE_USER_ACTION
  | SET_USERS_ACTION;


export type AppActions = UserTypes;