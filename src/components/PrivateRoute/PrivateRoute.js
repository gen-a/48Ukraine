/**
 * Private React Route
 * @module PrivateRoute
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { localizePath } from '../../localization';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Flag Is user authenticated. */
  isAuthenticated: PropTypes.bool,
  /** Children element to be rendered inside the component. */
  component: PropTypes.element.isRequired,
  /** Current application localization */
  locale: PropTypes.string.isRequired,
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
 * @param Component {Element}
 * @param isAuthenticated {boolean}
 * @param locale {string}
 * @param rest
 * @constructor
 */
const PrivateRoute = ({ component: Component, isAuthenticated, locale, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={localizePath('/login', locale)}/>
    )}
  />
);

PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    isAuthenticated: state.user.isAuthenticated,
    locale: state.app.locale
  }
);

export default connect(mapStateToProps, null)(PrivateRoute);
