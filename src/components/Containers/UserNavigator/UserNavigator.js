/**
 * UserNavigator Component.
 * Placeholder fot the description
 * @module UserNavigator
 */
import React from 'react';
import { connect } from 'react-redux';
import UserNavigator from '../../Layout/UserNavigator';
import { Route } from 'react-router-dom';

const mapStateToProps = state => (
  {
    email: state.user.profile.email,
  }
);

const C = connect(mapStateToProps, null)(UserNavigator);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />}/>;
