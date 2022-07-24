export const SET_ERROR = 'SET_ERROR';

export interface SET_ERROR_ACTION {
  type: typeof SET_ERROR;
  errors: String[];
}

export type ErrorTypes = SET_ERROR_ACTION;
