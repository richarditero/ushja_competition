import { combineReducers } from 'redux';
import authReducer from './authReducer';
import snackbarReducer from './snackbarReducer';
import loaderReducer from './loaderReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  loader: loaderReducer,

});

export default rootReducer;
