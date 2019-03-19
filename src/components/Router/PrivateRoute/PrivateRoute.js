/**
 * Private React Route
 * @module PrivateRoute
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Redirect from '../Redirect';

import { localizePath } from '../../../localization/index';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Flag Is user authenticated. */
  isAuthenticated: PropTypes.bool,
  /** Children element to be rendered inside the component. */
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
  /** REnder function. */
  render: PropTypes.func,
  /** Current application localization */
  locale: PropTypes.string.isRequired,
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  isAuthenticated: false,
  component: null,
  render: null
};

/**
 * Main function of the PrivateRoute component.
 * @param Component {Element}
 * @param isAuthenticated {boolean}
 * @param locale {string}
 * @param rest
 * @constructor
 */
const PrivateRoute = ({ render, component, isAuthenticated, locale, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const { location: { pathname } } = props;
        if (isAuthenticated === true) {
          return component ? React.createElement(component, props) : render(props);
        } else {
          return (
            <Redirect
              to={localizePath('/', locale)}
              message={{
                body: `You have to log in to enter the page ${pathname}`,
                type: 'error',
                title: 'access denied'
              }}
            />
          );
        }
      }}
    />
  )
};

PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;

const mapStateToProps = state => (
  {
    isAuthenticated: state.user.isAuthenticated,
    locale: state.app.locale
  }
);

export default connect(mapStateToProps, null)(PrivateRoute);
