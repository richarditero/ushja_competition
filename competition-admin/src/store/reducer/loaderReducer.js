import { loaderReducerConstant } from '../reducerConstant';

const loaderReducer = (state = {}, action) => {
  switch (action.type) {
    case loaderReducerConstant.TOGGLE_LOADER:
      return {
        ...state,
        loader: action.value,
      };
    case loaderReducerConstant.TOGGLE_LOADING:
      return {
        ...state,
        loading: action.value,
      };
    default:
      return state;
  }
};

export default loaderReducer;
