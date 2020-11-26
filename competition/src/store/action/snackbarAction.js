import {snackBarReducerConstant} from '../reducerConstant';

export const showSuccessSnackbar = message => {
  return dispatch => {
    dispatch({type: snackBarReducerConstant.SNACKBAR_SUCCESS, message});
  };
};

export const showFailureSnackbar = message => {
  return dispatch => {
    dispatch({type: snackBarReducerConstant.SNACKBAR_FAILURE, message});
  };
};

export const clearSnackbar = () => {
  return dispatch => {
    dispatch({type: snackBarReducerConstant.SNACKBAR_CLEAR});
  };
};
