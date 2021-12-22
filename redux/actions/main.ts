import * as t from '../types';
export const setCategory = (categories: any) => ({
  type: t.SET_CATEGORY,
  payload: categories,
});
