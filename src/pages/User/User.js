import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { localizePath } from '../../localization/index';

import Profile from './Profile';
import Orders from './Orders';
import ResetPassword from './ResetPassword';
import NotFound from '../../pages/NotFound';

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
    <Route exact path={localizePath('/user/profile', locale)} component={renderRoute(Profile)}/>
    <Route exact path={localizePath('/user/orders', locale)} component={renderRoute(Orders)}/>
    <Route exact path={localizePath('/user/orders/page/:page', locale)} component={renderRoute(Orders)}/>
    <Route exact path={localizePath('/user/reset-password', locale)} component={renderRoute(ResetPassword)}/>
    <Route path="/user/*" component={NotFound} />
  </Switch>
)};

const mapStateToProps = state => (
  {
    locale: state.app.locale,
  }
);

User.propTypes = propTypes;

export default connect(mapStateToProps, null)(User);
