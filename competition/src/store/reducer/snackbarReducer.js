import {snackBarReducerConstant} from '../reducerConstant';

const snackbarReducer = (state = {}, action) => {
  switch (action.type) {
    case snackBarReducerConstant.SNACKBAR_SUCCESS:
      return {
        ...state,
        snackbarOpen: true,
        successSnackbarMessage: action.message,
        severity: 'success'
      };
    case snackBarReducerConstant.SNACKBAR_FAILURE:
      return {
        ...state,
        snackbarOpen: true,
        failureSnackbarMessage: action.message,
        severity: 'error'
      };
    case snackBarReducerConstant.SNACKBAR_CLEAR:
      return {
        ...state,
        snackbarOpen: false,
        errorSnackbarOpen: false,
        successSnackbarMessage: '',
        failureSnackbarMessage: '',
        infoSnackbarOpen: false
      };
    default:
      return state;
  }
};

export default snackbarReducer;
