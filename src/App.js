/**
 * Main Application Component.
 * Load local detection path and pass it to Layout component
 * @module App
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import { APP_LOCALES, APP_DEFAULT_LOCALE } from './config/app';

import './App.scss';

/**
 * Locals in path
 * @type {string}
 */
const localePath = `/:locale(${APP_LOCALES.filter(locale => locale !== APP_DEFAULT_LOCALE).join('|')})`;

const App = () => (
  <Switch>
    <Route path={localePath} component={Layout} />
    <Route path="/" component={Layout} />
  </Switch>
);
export default App;
