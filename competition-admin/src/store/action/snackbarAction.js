import { snackBarReducerConstant } from '../reducerConstant';

export const showSuccessSnackbar = (message) => (dispatch) => {
  dispatch({ type: snackBarReducerConstant.SNACKBAR_SUCCESS, message });
};

export const showFailureSnackbar = (message) => (dispatch) => {
  dispatch({ type: snackBarReducerConstant.SNACKBAR_FAILURE, message });
};

export const clearSnackbar = () => (dispatch) => {
  dispatch({ type: snackBarReducerConstant.SNACKBAR_CLEAR });
};
