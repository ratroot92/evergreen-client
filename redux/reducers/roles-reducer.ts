/* eslint-disable @typescript-eslint/no-unused-vars */

import { ADD_ROLE, DELETE_ROLE, EDIT_ROLE, RoleTypes, SET_ROLES } from '../action-types/roles-action-types';
import { IRole } from '../types/roles-type';

const userReducersDefaultState: IRole[] = [];

const roleReducer = (state = userReducersDefaultState, action: RoleTypes): IRole[] => {
  switch (action.type) {
    case ADD_ROLE:
      return [...state, action.role];
    case DELETE_ROLE:
      return state.filter(({ _id }) => _id !== action._id);
    case SET_ROLES:
      return action.roles;

    case EDIT_ROLE:
      return state.map((role) => {
        if (role._id === action.role._id) {
          return {
            ...role,
            ...action.role,
          };
        } else {
          return role;
        }
      });

    default:
      return state;
  }
};

export { roleReducer };
