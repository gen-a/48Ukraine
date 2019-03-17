/**
 * UserNavigator Component.
 * Placeholder fot the description
 * @module UserNavigator
 */
import React from 'react';
import { connect } from 'react-redux';
import UserNavigator from '../../Layout/UserNavigator';
import { Route } from 'react-router-dom';
import { logOut } from '../../../actions/user';


const mapStateToProps = state => (
  {
    email: state.user.profile.email,
  }
);
const mapDispatchToProps = dispatch => (
  {
    callLogOut: () => dispatch(logOut()),
  }
);
const C = connect(mapStateToProps, mapDispatchToProps)(UserNavigator);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />}/>;
