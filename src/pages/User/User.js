import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { localizePath } from '../../localization/index';

import Profile from './Profile';
import Orders from './Orders';
import ResetPassword from './ResetPassword';
import NotFound from '../../pages/NotFound';


/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Current locale. */
  locale: PropTypes.string.isRequired,
};

const User = (props) => {
  const { locale } = props;
  return (
    <Switch>
      <Route
        exact
        path={localizePath('/user/reset-password', locale)}
        render={routeProps => <ResetPassword {...props} {...routeProps} />}
      />
      <Route
        exact
        path={localizePath('/user/profile', locale)}
        render={routeProps => <Profile {...props} {...routeProps} />}
      />
      <Route
        exact
        path={localizePath('/user/orders', locale)}
        render={routeProps => <Orders {...props} {...routeProps} />}
      />
      <Route
        exact
        path={localizePath('/user/orders/page/:page', locale)}
        render={routeProps => <Orders {...props} {...routeProps} />}
      />
      <Route
        path="/user/*"
        render={routeProps => <NotFound {...props} {...routeProps} />}
      />
    </Switch>
  );
};

const mapStateToProps = state => (
  {
    locale: state.app.locale,
  }
);

User.propTypes = propTypes;

export default connect(mapStateToProps, null)(User);
