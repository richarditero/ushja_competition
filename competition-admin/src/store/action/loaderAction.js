import { loaderReducerConstant } from '../reducerConstant';

export const toggleLoader = (value) => (dispatch) => {
  dispatch({ type: loaderReducerConstant.TOGGLE_LOADER, value });
};

export const toggleLoading = (value) => (dispatch) => {
  dispatch({ type: loaderReducerConstant.TOGGLE_LOADING, value });
};
