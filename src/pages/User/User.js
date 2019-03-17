import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { localizePath } from '../../localization/index';

import Logout from './Logout';
import Profile from './Profile';
import Orders from './Orders';
import ResetPassword from './ResetPassword';

import { renderRoute } from '../../app/App';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Current locale. */
  locale: PropTypes.string.isRequired,
};

const User = ({ locale }) => {
  return (
  <Switch>
    <Route exact path={localizePath('/user/logout', locale)} render={renderRoute(Logout)}/>
    <Route exact path={localizePath('/user/profile', locale)} component={renderRoute(Profile)}/>
    <Route exact path={localizePath('/user/orders', locale)} component={renderRoute(Orders)}/>
    <Route exact path={localizePath('/user/reset-password', locale)} component={renderRoute(ResetPassword)}/>
  </Switch>
)};

const mapStateToProps = state => (
  {
    locale: state.app.locale,
  }
);

User.propTypes = propTypes;

export default connect(mapStateToProps, null)(User);
