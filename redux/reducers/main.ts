import * as t from '../types';
const main = (
  state = {
    categories: [],
  },
  action: any
) => {
  switch (action.type) {
    case t.SET_CATEGORY:
      return {
        ...state,
        categories: {
          name: action.payload,
        },
      };
    default:
      return { ...state };
  }
};

export default main;
