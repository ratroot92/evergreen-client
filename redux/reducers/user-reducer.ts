/* eslint-disable @typescript-eslint/no-unused-vars */

import { ADD_USER, DELETE_USER, EDIT_USER, SET_USERS, UserTypes } from '../action-types/user-action-types';
import { IUser } from '../types/user-type';

const userReducersDefaultState: IUser[] = [];

const userReducer = (state = userReducersDefaultState, action: UserTypes): IUser[] => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.user];
    case DELETE_USER:
      return state.filter(({ _id }) => _id !== action._id);
    case SET_USERS:
      return action.users;

    case EDIT_USER:
      return state.map((user) => {
        if (user._id === action.user._id) {
          return {
            ...user,
            ...action.user,
          };
        } else {
          return user;
        }
      });

    default:
      return state;
  }
};

export { userReducer };
