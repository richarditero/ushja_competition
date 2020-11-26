import jwt_decode from 'jwt-decode';
import { userReducerConstant } from '../reducerConstant';

const initialState = {
  isLoggedIn: loginCheck(),
  userDetails: {},
};

function loginCheck() {
  const credentials = JSON.parse(localStorage.getItem('credentials'));
  if (credentials?.AccessToken) {
    const { exp } = jwt_decode(credentials.AccessToken);
    if (Date.now() <= exp * 1000) {
      return true;
    }
  }
  return false;
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case userReducerConstant.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };

    case userReducerConstant.SET_USERDETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case userReducerConstant.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
