import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import app from './app';
import user from './user';

const rootReducer = combineReducers({
  form: formReducer,
  app,
  user
});

export default rootReducer;
