
import { LoaderTypes, SET_LOADER } from "../action-types/loader-action-types";

  

  const loaderReducer = (
    state = false,
    action: LoaderTypes,
  ): boolean => {
    switch (action.type) {
      case SET_LOADER:
        return action.loading;
      default:
        return state;
    }
  };
  
  export { loaderReducer }