/**
 * Main Application Component.
 * Load important application settings into redux and set the basic routes
 * @module App
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from './components/Dev/Container';
import WindowResizeDetect from './components/UI/Detect/WindowResize';
import { setWindowSize } from './actions/app';
import PrivateRoute from './components/PrivateRoute';
import User from './components/Loadables/User';
import Login from './components/Pages/Login';
import Toast from './components/UI/Toast';
import SystemMessage from './components/UI/SystemMessage';
import Loader from './components/UI/Loader';

import './App.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* On resize window to store data into redux store. */
  onWindowResize: PropTypes.func.isRequired
};
/**
 * Default settings for resize detection.
 * @type {object}
 */
const defaultProps = {};

const App = ({ onWindowResize }) => (
  <>
    <WindowResizeDetect onResize={onWindowResize} />
    <Switch>
      <Route exact path="/dev" component={Container} />
      <Route exact path="/" component={Container} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/user" component={User} />
    </Switch>
    <Toast />
    <SystemMessage />
    <Loader />
  </>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const mapDispatchToProps = (dispatch) => {
  return {
    onWindowResize: (data) => dispatch(setWindowSize(data))
  }
};

export default connect(null, mapDispatchToProps)(App);
