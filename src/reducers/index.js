import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import app from './app';
import dictionary from './dictionary';
import user from './user';
import cart from './cart';

const rootReducer = combineReducers({
  form: formReducer,
  app,
  dictionary,
  user,
  cart
});

export default rootReducer;
