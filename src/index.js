import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import App from './app/App';
//import * as serviceWorker from './serviceWorker';
import { APP_ROOT } from './config/app';
import Localize from './app/Localize';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Localize render={props => <App {...props} />} />
    </BrowserRouter>
  </Provider>, APP_ROOT
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
