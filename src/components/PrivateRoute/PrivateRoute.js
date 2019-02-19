/**
 * Private React Route
 * @module PrivateRoute
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* Flag Is user authenticated. */
  isAuthenticated: PropTypes.bool,
  /* Children element to be rendered inside the component. */
  component: PropTypes.element.isRequired,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  isAuthenticated: false
};

/**
 * Main function of the PrivateRoute component.
 * @param Component
 * @param isAuthenticated
 * @param rest
 * @constructor
 */
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);

PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
