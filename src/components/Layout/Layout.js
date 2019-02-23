/**
 * Application layout Component
 * Set page layout
 * @module Layout
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '../Dev/Container';
import Browse from '../Sections/Browse';
import PrivateRoute from '../PrivateRoute';
import User from '../Loadables/User';
import Login from '../Pages/Login';
import WindowResizeDetect from '../UI/Detect/WindowResize';
import Toast from '../UI/Toast';
import SystemMessage from '../UI/SystemMessage';
import Loader from '../UI/Loader';
import { setWindowSize } from '../../actions/app';
import { localizePath } from '../../localization';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* Current locale string . */
  locale: PropTypes.string.isRequired,
  /* On resize window to store data into redux store. */
  onWindowResize: PropTypes.func.isRequired,
};

const Layout = ({ locale, onWindowResize }) => {
  return (
    <>
    <WindowResizeDetect onResize={onWindowResize} />
    <Switch>
      <Route exact path={localizePath('/dev', locale)} component={Container} />
      <Route exact path={localizePath('/', locale)} component={Container} />
      <Route exact path={localizePath('/browse/:department', locale)} component={Browse} />
      <Route exact path={localizePath('/login', locale)} component={Login} />
      <PrivateRoute path={localizePath('/user', locale)} component={User} />
    </Switch>
    <Toast />
    <SystemMessage />
    <Loader />
    </>
  );
};

Layout.propTypes = propTypes;

const mapStateToProps = state => (
  {
    locale: state.app.locale
  }
);

const mapDispatchToProps = dispatch => (
  {
    onWindowResize: data => dispatch(setWindowSize(data))
  }
);

const C = connect(mapStateToProps, mapDispatchToProps)(Layout);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />} />;
