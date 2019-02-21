/**
 * Localize application by setting locale value by incoming route path
 * @module Localize
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { localeInPath } from './';
/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* children react component */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  /* Function to set locale  */
  onSetLocale: PropTypes.func.isRequired,
};
/**
 *
 * @param children
 * @param onSetLocale
 * @returns {XML}
 * @constructor
 */
const Localize = ({ children, onSetLocale }) => {
  return (
    <Switch>
      <Route
        path={localeInPath}
        render={({ match: { params: { locale } } }) => {
          onSetLocale(locale);
          return children;
        }}
      />
      <Route path="/" render={() => children}/>
    </Switch>
  );
};

Localize.propTypes = propTypes;

export default Localize;
