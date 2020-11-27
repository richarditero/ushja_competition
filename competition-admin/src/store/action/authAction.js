import { userReducerConstant } from '../reducerConstant';
import ApiUtil from '../../util/ApiUtil';
import { showFailureSnackbar } from './snackbarAction';
import { toggleLoading } from './loaderAction';
import ApiRouter from '../../constants';

export const getUserDeatils = (uri) => (dispatch) => {
/*   ApiUtil.getWithToken(uri)
    .then((res) => {
      dispatch({
        type: userReducerConstant.SET_USERDETAILS,
        payload: res.data,
      });
    })
    .catch(() => {}); */
};
export const loginUser = (url, data) => (dispatch) => {
  dispatch(toggleLoading(true));
  ApiUtil.loginUser(url, data)
    .then(() => {
      dispatch(getUserDeatils(ApiRouter.ADMIN_USER));
      dispatch({ type: userReducerConstant.LOGIN_SUCCESS });
      dispatch(toggleLoading(false));
    })
    .catch((err) => {
      dispatch(toggleLoading(false));
      if (err && err.response?.data.msg) {
        dispatch(showFailureSnackbar(err.response.data.msg));
      }
    });
};

export const logout = (url, data) => (dispatch) => {
  dispatch({ type: userReducerConstant.LOGOUT });
};
