/**
 * Main Application Component.
 * Load locale detection path and pass it to Layout component
 * @module App
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import { localeInPath } from './localization';

import './App.scss';

const App = () => (
  <Switch>
    <Route path={localeInPath} component={Layout} />
    <Route path="/" component={Layout} />
  </Switch>
);
export default App;
