/**
 * Localize application by setting locale value by incoming route path
 * @module Localize
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { localeInPath, APP_DEFAULT_LOCALE } from '../../localization';
import { setLocale } from '../../actions/app';


const propTypes = {
  /** Function to handle locale change */
  callSetLocale: PropTypes.func.isRequired,
  /** Anything that can be rendered.  */
  render: PropTypes.func.isRequired,
};

const Localize = ({ render, callSetLocale, ...otherProps }) => {

  const r = (locale) => {
    setTimeout(() => callSetLocale(locale), 0);
    return render({ locale, ...otherProps });
  };

  return (
    <Switch>
      <Route
        path={localeInPath}
        render={({ match: { params: { locale } } }) => r(locale)}
      />
      <Route
        path="/"
        render={() => r(APP_DEFAULT_LOCALE)}
      />
    </Switch>
  );
};
Localize.propTypes = propTypes;

const mapDispatchToProps = dispatch => (
  {
    callSetLocale: data => dispatch(setLocale(data)),
  }
);

const C = connect(null, mapDispatchToProps)(Localize);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />}/>;