import snackbarReducer from './snackbarReducer';


import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  snackbar: snackbarReducer,

});

export default rootReducer;
