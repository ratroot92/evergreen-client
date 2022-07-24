import { IRole } from '../types/roles-type';

export const ADD_ROLE = 'ADD_ROLE';
export const DELETE_ROLE = 'DELETE_ROLE';
export const SET_ROLES = 'SET_ROLES';
export const EDIT_ROLE = 'EDIT_ROLE';

export interface ADD_ROLE_ACTION {
  type: typeof ADD_ROLE;
  role: IRole;
}

export interface EDIT_ROLE_ACTION {
  type: typeof EDIT_ROLE;
  role: IRole;
}

export interface DELETE_ROLE_ACTION {
  type: typeof DELETE_ROLE;
  _id: string;
}

export interface SET_ROLES_ACTION {
  type: typeof SET_ROLES;
  roles: IRole[];
}

export type RoleTypes = ADD_ROLE_ACTION | EDIT_ROLE_ACTION | DELETE_ROLE_ACTION | SET_ROLES_ACTION;
