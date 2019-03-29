import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { throttle } from 'lodash';
import rootReducer from './reducers/index';
import { saveState, loadState } from './services/local-storage';

const DEV = process.env.NODE_ENV !== 'production';

const middleware = DEV ? [promise, thunk, logger] : [promise, thunk];

const composeEnhancers = DEV && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(...middleware))
);

store.subscribe(throttle(() => {
  saveState({ ...store.getState() });
}, 1000));

export default store;
